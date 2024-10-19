---
title: Azure CLI Commands
author: ChocolateAceCream
date: 2024/10/05 10:24
categories:
 - Azure
tags:
 - DevOps
 - Azure
 - Cloud
---

# Azure CLI Commands <Badge text="Azure" type="warning" />

## login
> az login

## set account subscription ID
>  az account set --subscription "35akss-subscription-id"

## create a service principal
> az ad sp create-for-rbac --role="Contributor" --scopes="/subscriptions/<SUBSCRIPTION_ID>"

## format terraform xxx.tf file
> terraform fmt

## validate terraform xxx.tf file
> terraform validate

## init terraform
> terraform init

## apply terraform xxx.tf file
> terraform apply