---
title: Payment with Paypal
author: ChocolateAceCream
date: 2025/03/07 10:24
isTop: true
categories:
 - System Design
tags:
 - System Design
 - PayPal
---

# Payment with Paypal <Badge text="System" type="warning" />
Design a payment system using paypal

## Process flow
![regression_testing.png](../../../public/img/2025/03/07/paypal.drawio.png)

## Things to notice
1. required credentials:
- client-id
- client-secret
2. using sandbox
- api-sandbox: 'https://api.sandbox.paypal.com'
- api-base-live: 'https://api.paypal.com'
