---
title: OSS
author: ChocolateAceCream
date: 2024/10/25 16:25
categories:
 - AWS
tags:
 - AWS
 - Go
 - S3
 - CloudFront
---

# How to build an OSS using native AWS components <Badge text="AWS" type="warning" />
## Why
utilize aws s3+cloudfront to make static assets fetching faster from frontend while maintain the security of assets.
## How
to make whole process secure, we will use presigned url to upload files to s3 and use signed url to download fields from cloudfront (which act as a cache layer in front of s3).
## What

### presigned url and s3
a whole file uploading process:
frontend send request to backend, so backend will first validate the access right of current user. Then generate a presigned url using path of asset, expiration time and bucket name with aws sdk. With presigned url send back to frontend, now frontend can direct upload file to s3 bucket, so traffic won't go through backend server (which reduce the bandwidth usage of backend server)

```go
func (a *AwsService) GetS3UploadPresignedUrl(c *gin.Context, user db.AUser, fileName string) (url string, err error) {
	path := user.Username + "/" + fileName
	req, err := singleton.AWS.PresignClient.PresignPutObject(c, &s3.PutObjectInput{
		Bucket: &singleton.Config.AWS.S3.Bucket,
		Key:    &path, // object name, s3 will store the file with this name
	}, func(opts *s3.PresignOptions) {
		opts.Expires = time.Duration(singleton.Config.AWS.S3.PresignedUrlExpiration) * time.Second
	})
	if err != nil {
		return
	}
	url = req.URL
	return
}
```

Alternatively, we can generate a presigned url for downloading assets as well.
```go
func (a *AwsService) GetS3DownloadPresignedUrl(c *gin.Context, user db.AUser, fileName string) (url string, err error) {
	path := user.Username + "/" + fileName
	req, err := singleton.AWS.PresignClient.PresignGetObject(c, &s3.GetObjectInput{
		Bucket: &singleton.Config.AWS.S3.Bucket,
		Key:    &path,
	}, func(opts *s3.PresignOptions) {
		opts.Expires = time.Duration(singleton.Config.AWS.S3.PresignedUrlExpiration) * time.Second
	})
	if err != nil {
		return
	}
	url = req.URL
	return
}
```
But directly download from s3 may cost a lot, especially for some hot assets that required by multiple users. we can implement cloudfront to solve this issue.

### signed url and cloudfront
we can put a cloudfront as CDN in front of s3 as cache layer, so get request will first hit cache of cloudfront and if missed, then fetch from s3.

similar to presigned url, a signed url can be generated using assets name, a private key and expiration time. Remember to upload your public key to cloudfront key group and assign access right for its origin s3 bucket.
```go
func (a *AwsService) GetCloudfrontSignedUrl(c *gin.Context, user db.AUser, fileName string) (signedURL string, err error) {
	privateKey, err := loadPrivateKey("certs/private_key.pem")
	if err != nil {
		fmt.Println("failed to load private key:", err.Error())
		return
	}

	signer := sign.NewURLSigner(singleton.Config.AWS.CloudFront.KeyID, privateKey)
	rawURL := singleton.Config.AWS.CloudFront.Prefix + user.Username + "/" + fileName
	fmt.Println("rawURL:", rawURL)
	expiration := time.Now().Add(time.Duration(singleton.Config.AWS.CloudFront.SignedUrlExpiration) * time.Second)
	signedURL, err = signer.Sign(rawURL, expiration)
	if err != nil {
		fmt.Println("failed to sign URL:", err.Error())
	}
	return
}

func loadPrivateKey(path string) (signer crypto.Signer, err error) {
	raw, err := os.ReadFile(path)
	if err != nil {
		return
	}

	// Decode the PEM block
	block, _ := pem.Decode(raw)
	if block == nil {
		return nil, fmt.Errorf("failed to decode PEM block from file: %s", path)
	}

	// Parse the private key based on the key type (RSA, ECDSA, etc.)
	switch block.Type {
	case "RSA PRIVATE KEY":
		privateKey, err := x509.ParsePKCS1PrivateKey(block.Bytes)
		if err != nil {
			return nil, fmt.Errorf("failed to parse RSA private key: %v", err)
		}
		return privateKey, nil

	case "EC PRIVATE KEY":
		privateKey, err := x509.ParseECPrivateKey(block.Bytes)
		if err != nil {
			return nil, fmt.Errorf("failed to parse EC private key: %v", err)
		}
		return privateKey, nil

	case "PRIVATE KEY": // This may handle PKCS#8 encoded keys
		privateKey, err := x509.ParsePKCS8PrivateKey(block.Bytes)
		if err != nil {
			return nil, fmt.Errorf("failed to parse PKCS#8 private key: %v", err)
		}

		// Check if it's of the correct type (RSA, ECDSA)
		switch key := privateKey.(type) {
		case *rsa.PrivateKey:
			return key, nil
		case *ecdsa.PrivateKey:
			return key, nil
		default:
			return nil, fmt.Errorf("unsupported private key type: %T", privateKey)
		}

	default:
		return nil, fmt.Errorf("unsupported private key type: %s", block.Type)
	}
}
```

### things to notice
1. cloudfront cache size is a myth, we as aws user cannot control its size. Only thing we can control is ttl.
2. we can use ordered_cache_behavior field in terraform to control the cache behavior for certain path. if we have multiple ordered_cache_behavior, the order of path matching depends on the order of ordered_cache_behavior shown in the terraform config. If none matching found, default one will be applied
3. if we want to re-write the path (e.g. we add a prefix '/assets' so certain ordered_cache_behavior can be triggered, but we don't actually have a assets folder in s3 bucket, so we need to rewrite the path to eliminate '/assets'), we can use cloudfront function (only support js) to rewrite the request url.
4. remember to set ur s3 bucket access to private and also assign a OAI access to cloudfront to it can visit certain bucket
5. when create cloudfront using terraform, remember to assign key_group to each ordered_cache_behavior and default_cache_behavior (no need to do this if key group is generated using web portal, it will apply globally)
6. s3 does not have 'folder' concept, but you can still use path like '/admin/xx.png' or '/superadmin/xx.png'

```hcl
provider "aws" {
  region = "us-west-1"
}

# Define bucket names and tags in a map
locals {
  buckets = {
    dev  = { name = "chocolateacecream-iot-bucket-dev", tags = { Name = "MyPrivateIoTBucketDev", Environment = "Dev" } }
    prod = { name = "chocolateacecream-iot-bucket-prod", tags = { Name = "MyPrivateIoTBucketProd", Environment = "Prod" } }
  }

  # Shared behavior settings
  common_cache_settings = {
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]

    forwarded_values = {
      query_string = false
      cookies ={
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600   # Cache for 1 hour by default
    max_ttl     = 86400  # Cache for 1 day
  }
}

# Create S3 buckets using for_each
resource "aws_s3_bucket" "private_buckets" {
  for_each = local.buckets

  bucket = each.value.name

  tags = each.value.tags

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "GET"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

# Block public access for each bucket
resource "aws_s3_bucket_public_access_block" "block_public_access" {
  for_each = local.buckets

  bucket = aws_s3_bucket.private_buckets[each.key].id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Create Origin Access Identity for CloudFront (only allow cloudfront to visit s3)
resource "aws_cloudfront_origin_access_identity" "oai" {
  for_each = local.buckets

  comment = "OAI for ${each.key} S3 bucket"
}

# Public key for CloudFront
resource "aws_cloudfront_public_key" "public_key" {
  name       = "MyCloudFrontPublicKey"
  encoded_key = file("${path.module}/iot_admin_pub.pem")  # Use your public key file path here
  comment    = "Public key for CloudFront signed URLs"
}

# CloudFront Key Group
resource "aws_cloudfront_key_group" "key_group" {
  name = "MyCloudFrontKeyGroup"
  items = [aws_cloudfront_public_key.public_key.id]  # Associate the public key with the key group
}

# Create CloudFront distributions for each bucket
resource "aws_cloudfront_distribution" "cdn" {
  for_each = local.buckets

  origin {
    domain_name = aws_s3_bucket.private_buckets[each.key].bucket_regional_domain_name
    origin_id   = "S3-${each.key}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai[each.key].cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront distribution for ${each.key} environment"
  default_root_object = "index.html" // if not specify, then when visiting the root path, it will return 403 forbidden or 404 not found

# Specific cache behavior for images, inheriting from default behavior
  ordered_cache_behavior {
    path_pattern = "/assets/*"
    target_origin_id = "S3-${each.key}"

    # Use the shared cache settings from local variable
    viewer_protocol_policy = local.common_cache_settings.viewer_protocol_policy
    allowed_methods        = local.common_cache_settings.allowed_methods
    cached_methods         = local.common_cache_settings.cached_methods

    # Apply the trusted key group for signed URLs/cookies
    trusted_key_groups = [aws_cloudfront_key_group.key_group.id]

    forwarded_values {
      query_string = local.common_cache_settings.forwarded_values.query_string
      cookies {
        forward = local.common_cache_settings.forwarded_values.cookies.forward
      }
    }

    min_ttl     = local.common_cache_settings.min_ttl
    default_ttl = local.common_cache_settings.default_ttl
    max_ttl     = local.common_cache_settings.max_ttl
  }
  default_cache_behavior {
    target_origin_id       = "S3-${each.key}"
    viewer_protocol_policy = local.common_cache_settings.viewer_protocol_policy
    allowed_methods        = local.common_cache_settings.allowed_methods
    cached_methods         = local.common_cache_settings.cached_methods

    # Apply the trusted key group for signed URLs/cookies
    trusted_key_groups = [aws_cloudfront_key_group.key_group.id]
    forwarded_values {
      query_string = local.common_cache_settings.forwarded_values.query_string
      cookies {
        forward = local.common_cache_settings.forwarded_values.cookies.forward
      }
    }

    // if sender not specify the cache-control header, then use the default_ttl
    // if sender specify the cache-control header that longer than the max_ttl, use the max_ttl
    // if sender specify the cache-control header that shorter than the min_ttl, use the min_ttl
    min_ttl     = local.common_cache_settings.min_ttl
    default_ttl = local.common_cache_settings.default_ttl
    max_ttl     = local.common_cache_settings.max_ttl
  }


  restrictions {
    geo_restriction {
      restriction_type = "none"  # Allow access from all locations
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = each.value.tags
}


# Update S3 bucket policy to allow CloudFront OAI access
resource "aws_s3_bucket_policy" "bucket_policy" {
  for_each = local.buckets

  bucket = aws_s3_bucket.private_buckets[each.key].id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.oai[each.key].iam_arn
        },
        Action = "s3:GetObject",
        Resource = "${aws_s3_bucket.private_buckets[each.key].arn}/*"
      }
    ]
  })
}
```