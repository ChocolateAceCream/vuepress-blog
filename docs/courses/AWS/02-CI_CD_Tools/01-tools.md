---
title: AWS CI/CD Pipeline Tools
author: ChocolateAceCream
date: 2024/05/05 10:25
categories:
 - AWS
tags:
 - AWS
 - CI/CD
---

# AWS CloudFormation Fundamentals <Badge text="CI/CD" type="warning" />
Available tools for build automated CI/CD pipeline

## CodeCommit
a fully managed source control service that hosts secure Git-based repos. It supports all git commands and works with your existing Git tools.
#### Benefits
- secure: automatically encrypts your files in transit and at rest, also integrated with IAM for access control for repos
- has a highly scalable, redundant, and durable architecture.
- code views, and control who can make changes to specific branches

## CodeBuild
CI service that compiles source code, run tests and produces software pkg that to be deployed.
#### Benefits
- can run separate builds concurrently, and can auto scale up
- can use customized build env, tools and runtimes
- secure: build artifaces are encrypted with customer-specific keys that managed by AWS KMS(key management service). Also it's integrated with IAM to control access to your build projects
### buildspec.yml
yaml formatted file used by COdeBUild that includes a collection of build commands and related settings that CodeBuild uses to run a build. You can include a buildspec as part of the source code (buildspec.yml in root folder) or define a buildspec when you create a build project (which will overriden the buildspec from root folder, ).
##### sample yml file
```yml
version: 0.2

env:
  variables:
    JAVA_HOME: "/usr/lib/jvm/java-8-openjdk-amd64"
  parameter-store:
    LOGIN_PASSWORD: /CodeBuild/dockerLoginPassword

phases:
  install:
    commands:
      - echo Entered the install phase...
      - apt-get update -y
      - apt-get install -y maven
    finally:
      - echo This always runs even if the update or install command fails
  pre_build:
    commands:
      - echo Entered the pre_build phase...
      - docker login –u User –p $LOGIN_PASSWORD
    finally:
      - echo This always runs even if the login command fails
  build:
    commands:
      - echo Entered the build phase...
      - echo Build started on `date`
      - mvn install
    finally:
      - echo This always runs even if the install command fails
  post_build:
    commands:
      - echo Entered the post_build phase...
      - echo Build completed on `date`

reports:
  arn:aws:codebuild:your-region:your-aws-account-id:report-group/report-group-name-1:
    files:
      - "**/*"
    base-directory: 'target/tests/reports'
    discard-paths: no
  reportGroupCucumberJson:
    files:
      - 'cucumber/target/cucumber-tests.xml'
    discard-paths: yes
    file-format: CucumberJson # default is JunitXml
artifacts:
  files:
    - target/messageUtil-1.0.jar
  discard-paths: yes
  secondary-artifacts:
    artifact1:
      files:
        - target/artifact-1.0.jar
      discard-paths: yes
    artifact2:
      files:
        - target/artifact-2.0.jar
      discard-paths: yes
cache:
  paths:
    - '/root/.m2/**/*'
```
break-down:
- cache: build cache location, can use s3, reusable between projects
- artifacts: output uploading location. discard-paths = yes means the build artifacts are placed in the same dir
- phases: representing different build phases, so CodeBase run commands accordingly.

## CodeDeploy
a fully managed deployment service that automates software deployments to a variety of compute services
#### Benefits
- can easily stopped and rolled back if errors happened
- easily launch and track the status of deployment, even real-time notifications
- can integrate with your existing toolchain(github, jenkins, codepiplelin)

