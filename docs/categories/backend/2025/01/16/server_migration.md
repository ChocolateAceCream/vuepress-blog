---
title: Server migration
author: ChocolateAceCream
date: 2025/01/16 19:00
isTop: false
categories:
 - backend
tags:
 - EC2
 - AWS
 - Migration
---

# EC2 Server Migration <Badge text="AWS" type="warning" />

This week I have been working on server migration, to migrate server from us-west-1 to Mumbai. It's a very interesting journey, so I just want to write it done.

### General picture
It's not my first time doing this, so I know exactly what I need to do: install softwares, migrate files, migrate db, setup nginx etc...

### Problem #1: migrate 70gb folder
I used to use scp to transfer files between ec2s. However, this time I have a 70GB folder which contains thousands of small files, plus the long distance between mumbai and west-1, average scp speed is only 100kb/s, which means it will take me entire week to transfer that folder.

##### first try: rsync
I switched to rsync, since gpt told me it's faster than scp because it compresses data during transfer. But unfortunately, I cannot see obvious increase in speed.

##### second try: VPC
AWS specialist told me I can try vpc peering for these two ec2, but also I was told speed might be only 10%~15% faster. For the purpose of fun, I try it out myself. Forgot to mention, these EC2s belongs to two different root user account (boss said he can get business discount by using a new account provided by aws specialist), so this thing become very complicated since you have to create a role first and share it between two accounts. I did not get it to work by the end, but I did know basic flow of whole process, which is good to know.

##### third try: zip the folder
Also suggest by aws specialist, I should compress the folder and then send it. It does make sense, but turned out the main bottleneck is still the bandwidth, now speed reached 500kb/s, so still need 40 hours, near two days

##### last try: s3
I know s3 is fast, but i have no idea how fast it is. I guess also because ec2 and s3 is under the same aws eco-system, so this time I first upload the compressed folder to a s3 bucket i created in mumbai region, then download it from my new ec2. The upload speed is 200MB+ per second and download speed is even faster. The whole process took me less than an hour.
upload:

> aws s3 cp /local/path/to/file s3://your-bucket-name/

download:
> aws s3 cp s3://your-bucket-name/file /remote/path/

after the folder migration, I can easily run rsync to sync the folder (so files generated during transfer process will be synced.)

### Problem #2: domain cname & a record
in last migration, I faced this problem: when domain a record changed (point to new server ip), it may take hours for whole dns records updated worldwide. So this time my plan is to first use test domain to point to the new server ip, then in production domain, add cname so it can point to test domain.

However, the problem I found is that for the root domain, you cannot add cname that
point to other domains, you can only add a record to change its ip.
cname only works on subdomain. So, inevitably, it take hours for the traffic to fully re-direct to the new server.

### Problem #3: nginx setup and certbot
If no certbot involved, I can easily use a docker to start nginx and leave it running. However, since the ssl certificate is not free, and boss want to save money, so I need to leverage certbot's free ssl renew/issue function to obtain free ssl certificates, which means I need to integrate certbot with nginx. The docker approach then becomes very complex since renew ssl cert need to be done inside container, and port 80 traffic needs to be re-route to the nginx container. That's a lot of setups, so due to the pressure of deadline, I choose to install nginx directly on ec2 using snap.

After the default install, my nginx config like this
```conf
user www-data;
worker_processes auto;
pid /run/nginx.pid;
error_log /var/log/nginx/error.log;
include /etc/nginx/modules-enabled/*.conf;

events {
        worker_connections 768;
        # multi_accept on;
}

http {

        ##
        # Basic Settings
        ##

        sendfile on;
        tcp_nopush on;
        types_hash_max_size 2048;
        # server_tokens off;

        client_max_body_size 260M;
        # server_names_hash_bucket_size 64;
        # server_name_in_redirect off;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ##
        # SSL Settings
        ##

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;

        ##
        # Logging Settings
        ##

        access_log /var/log/nginx/access.log;

        ##
        # Gzip Settings
        ##

        gzip on;

        ##
        # Virtual Host Configs
        ##

        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
}

```

so next i only need to add my config inside sites-enabled folder. Here I met my first problem:
> nginx -t report conflict on port 80.

the reason of this issue is that inside that sites-enabled folder, there are two files, one is default and other is my config. So basically what nginx does is to merge any files inside sites-enable and then merge it in nginx.conf, which means my added config has conflict with default one. So by simply deleted the default one and reload nginx, everything is running on track. (Also, I used certbot to get ssl cert, and certbot will automatically add it to my config)

### Problem #4: pgsql views lost and locks
I haven't dig that deep into pgsql before, so my only knowledge about pgsql view is that it's some temp table generated by a sql that frequently called to update the temp table(so data is generated on the fly).

So when I start migrate my db using navicat, I got two problems:
1. views all lost from source db!
2. tables under migrating are temporarily locked, so most of my server apis are down!

lessons learned:
1. never to the db migration in office hour.
2. backup your db first.

Luckily in testing db, all views are still there, so I can just copy from there.

### Problem #5: aws region
As I mentioned above, I need to use the aws account provided by aws specialist so boss can get a discount. However, that account does not have any region in mideast (where our target customer live and this is the whole reason for this migration). So, I choose Mumbai (i have poor geo sense, so I thought Mumbai is like neighbor of mideast), and turned out the specialist who created this account did not enabled those regions from mideast so I did not see them! Then I was told I can enable myself, which I did not know initially. As a result, boss has to choose from 1. pay me to do another migration or 2. live with current one. Thanks god I did confirm with boss the region I choose, so he cannot blame me for this.

Lessons learned here:
1. aws regions can be enabled or disabled
2. sometimes send confirmation in group chat, more people means more chance to discover the mistake/misunderstanding at first place.
