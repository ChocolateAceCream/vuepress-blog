---
title: AWS CloudFormation Fundamentals
author: ChocolateAceCream
date: 2024/05/05 10:24
categories:
 - AWS
tags:
 - AWS
 - CloudFormation
---

# AWS CloudFormation Fundamentals <Badge text="CloudFormation" type="warning" />
AWS CloudFormation helps modeling and provisioning aws resources. Also, can be used to define your infrastructure as code (IaC)
#### Benefits
- versionv control of infrastructure
- spent less time on infra
- experiment quickly
#### Common usage
- implement a disaster recovery plan
- quickly replicate infra for more availability
- control and track changes of infra
- easy to create experimenting infra
## Resources
any of objects you created, e.g. S3 buckets, DynamoDB, EC2 etc
## Templates
JSON or YAML files that define the characteristics of stack params, mappings, resource props and output vals.
## Stack
Groups of related AWS resources created by template.

## Macros
AWS CloudFormation Macros can arbitrarily transform your template. It will take a JSON representation of your template(even though you can define your template as YAML, but it will convert to JSON as input) and output a JSON to replace the original one.
#### usage
- create DSL
- verify EC2 hard drives are encrypted
- verify all resources are tagged with a cost center
- add CloudWatch alarms for specific resources, depending on the resource type
- add dead-letter queues to Simple Queue Service queues/
### Summary
create a macros to call a lambda function which do the logic part of transforming JSON template. Also remember to assign proper IAM to let macro call the lambda function.