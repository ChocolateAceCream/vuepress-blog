---
title: Azure Concepts
author: ChocolateAceCream
date: 2024/10/05 10:24
categories:
 - Azure
tags:
 - DevOps
 - Azure
 - Cloud
---

# Azure Concepts <Badge text="Azure" type="warning" />

## Service Principal
A service principal is an application within Azure Active Directory with the authentication tokens that third-party platform needs to perform actions on your behalf.

when using terraform, you need to export to env variable
```json
{
  "appId": "d3c0de85-678e-4547-b355-xxxx",
  "displayName": "azure-cli-2024-10-xxxx",
  "password": "NDX8Q~nGEFHeJTwCIxxxx",
  "tenant": "bed0a26e-5471-4362-ab9f-xxxx"
}
```

## resource group
a logical container that holds related resources together. the resources within same group will share same access control(RBAC), lifecycle (update, delete, deploy). And all resource bills can be tracked for the same group

## CIDR Notation
format: xxx.xxx.xxx.xxx/xx
explain:
an ip address is 32 bit, can be divided into four 8 bit group, represented in decimal as xxx.xxx.xxx.xxx where xxx ranged from 0 to 255
the /xx part means first xx bits are used to represent network's host part, and 32-xx is the available ip address can be used in this network.
e.g.
10.0.0.1/24 means host part of this network is for 24 bits, which is 10.0.0 and last 8 bits are used as ip part, means all ips within this network is 10.0.0.1 (since 10.0.0.0 is used as network address, so it's typically not used for ips) to 10.0.0.254 (since 10.0.0.255 is used as broadcast address to send data to all hosts in the network)
