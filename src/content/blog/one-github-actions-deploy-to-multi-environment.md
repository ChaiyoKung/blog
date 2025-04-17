---
title: "Deploy หลาย Environment ด้วย GitHub Actions เพียง Workflow เดียว (แบบละเอียด)"
description: "Deploy หลาย Environment ด้วย GitHub Actions เพียง Workflow เดียว ลดความซ้ำซ้อน พร้อมเทคนิคการจัดการ Secrets และ Variables อย่างมืออาชีพ"
createdAt: "Jan 4, 2025"
heroImage: "/blog/one-github-actions-deploy-to-multi-environment/banner.jpg"
tags:
  - "Github Actions"
  - "Multi Environment"
  - "CI/CD"
  - "DevOps"
  - "Automation"
---

โดยปกติแล้ว ถ้าเรามี GitHub Repo อันนึงแล้วเราต้องการ Deploy ไปหลาย Environment ผ่าน GitHub Actions เราคงจะสร้าง GitHub Actions มาหลาย ๆ Workflow แยกตาม Environment แต่ถ้าวิธีการ Deploy มันเหมือนกัน จะทำให้มี Duplicated Code ของ Workflow

แต่ว่า GitHub นั้นสามารถทำให้เรา Deploy หลาย Environment ด้วย GitHub Actions เพียง Workflow เดียวได้

วันนี้เรามาลองใช้งานกัน

ตอนนี้ผมมี GitHub Repo (https://github.com/ChaiyoKung/github-actions-environment) เป็น Web App ง่าย ๆ สำหรับใช้ Demo เฉย ๆ

![GitHub Repo Example](/blog/one-github-actions-deploy-to-multi-environment/1.png)

และมี Azure App Service แยกตาม Environment สำหรับใช้ Demo

![Azure App Service Environments](/blog/one-github-actions-deploy-to-multi-environment/2.png)

เป้าหมายของผมคือการ Deploy Web App นี้ไปหลาย Environment ด้วย GitHub Actions เพียง Workflow เดียว

อย่างแรก สร้าง GitHub Actions ขึ้นมา 1 Workflow สำหรับ Deploy

Commit และก็ Push Code ไปเลย

```yaml
name: "Deploy"
run-name: "Deploy to ${{ inputs.environment }}"

on:
  workflow_dispatch:
    inputs:
      environment:
        type: environment
        description: "Environment to deploy to"
        required: true
        default: "dev"

env:
  DOTNET_VERSION: "8"
  DOTNET_OUTPUT_DIR: "GithubActionsEnvironment"

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    steps:
      - name: "Checkout"
        uses: actions/checkout@v4

      - name: "Setup .NET Core"
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: ${{ env.DOTNET_VERSION }}

      - name: "Build and Publish"
        run: |
          dotnet restore
          dotnet build -c "Release"
          dotnet publish -c "Release" -o "${{ env.DOTNET_OUTPUT_DIR }}"

      - name: "Deploy to Azure App Service"
        uses: azure/webapps-deploy@v3
        with:
          app-name: ${{ vars.AZURE_APP_SERVICE_NAME }}
          publish-profile: ${{ secrets.AZURE_APP_SERVICE_PUBLISH_PROFILE }}
          package: "${{ env.DOTNET_OUTPUT_DIR }}"
```

จะเห็นว่าใน Workflow มีการระบุ Input ที่เป็น Type "environment"

![Workflow Input Example](/blog/one-github-actions-deploy-to-multi-environment/3.png)

ส่วนตรง Step "Deploy to Azure App Service" มีการใช้งาน Variable และ Secret ซึ่งตรงนี้จะแยกตาม Environment เนื่องจากที่ Job ระบุ Environment เอาไว้

![Environment Variables and Secrets](/blog/one-github-actions-deploy-to-multi-environment/4.png)

ทีนี้เราจะมาเพิ่ม Variable และ Secret แยกตาม Environment กัน

กลับมาที่ GitHub Repo กดไปที่ Settings เลือก Environments กดปุ่ม New environment เพื่อสร้าง Environment

![Create New Environment](/blog/one-github-actions-deploy-to-multi-environment/5.png)

ตั้งชื่อ Environment แล้วกดปุ่ม Configure environment เพื่อสร้างได้เลย

![Configure Environment](/blog/one-github-actions-deploy-to-multi-environment/6.png)

พอสร้างเสร็จ ให้ Scroll ลงมาด้านล่างนิดนึง จะเห็นว่ามีให้เพิ่ม Environment Secret และ Environment Variable

![Environment Secrets and Variables Section](/blog/one-github-actions-deploy-to-multi-environment/7.png)

เดี๋ยวเราเพิ่ม Secret กันก่อนละกัน กดปุ่ม Add environment secret จากนั้นใส่ชื่อและค่าของ Secret ลงกดไป แล้วกด Add secret

![Add Environment Secret](/blog/one-github-actions-deploy-to-multi-environment/8.png)

มาเพิ่ม Variable กันต่อเลย กดปุ่ม Add environment variable จากนั้นใส่ชื่อและค่าของ Variable ลงกดไป แล้วกด Add variable

![Add Environment Variable](/blog/one-github-actions-deploy-to-multi-environment/9.png)

เรียบร้อย เสร็จแล้ว 1 Environment

![Environment Created](/blog/one-github-actions-deploy-to-multi-environment/10.png)

และเราก็ทำแบบนี้กับอีก 2 Environment ที่เหลือ สร้าง Environment เพิ่ม Secret เพิ่ม Variable

เสร็จแล้ว

![All Environments Created](/blog/one-github-actions-deploy-to-multi-environment/11.png)

ทีนี้เรามาทดสอบ Deploy กัน

กดมาที่ Actions เลือก "Deploy" Workflow กด Run workflow เลือก Environment ที่จะ Deploy กด Run workflow

![Run Workflow](/blog/one-github-actions-deploy-to-multi-environment/12.png)

Deploy เสร็จแล้ว

![Workflow Completed](/blog/one-github-actions-deploy-to-multi-environment/13.png)

ลองกดเข้าไปดู Workflow สักหน่อยว่า Deploy ไปถูกที่ตามที่เราต้องการเหลือเปล่า

ถูกต้อง เพราะเราเลือก "dev" Environment

![Deployed to Dev Environment](/blog/one-github-actions-deploy-to-multi-environment/14.png)

ลองเปิดเว็บดูซิว่าใช้งานได้หรือเปล่า

ใช้งานได้

![Dev Environment Web App](/blog/one-github-actions-deploy-to-multi-environment/15.png)

มาลอง Deploy กันอีกรอบ รอบนี้ขอ Deploy "uat" Environment ละกัน

Deploy ได้ถูกต้องและใช้งานได้

![UAT Environment Web App](/blog/one-github-actions-deploy-to-multi-environment/16.png)

ส่วนเว็บที่ "prod" Environment ก็จะขึ้นแบบนี้ เพราะยังไม่ได้ Deploy

![Prod Environment Not Deployed](/blog/one-github-actions-deploy-to-multi-environment/17.png)

อันสุดท้ายแล้ว มาลอง Deploy "prod" Environment กันหน่อยละกัน

เยี่ยมเลย ใช้งานได้

![Prod Environment Web App](/blog/one-github-actions-deploy-to-multi-environment/18.png)

เพียงเท่านี้เราก็สามารถ Deploy หลาย Environment ด้วย GitHub Actions เพียง Workflow เดียวเท่านั้น

บอกไว้ เผื่อสงสัย

ถาม: ถ้าเราไม่ได้เพิ่ม Environment Variable/Secret จะเกิดอะไรขึ้น\
ตอบ: เจ้า GitHub Actions Workflow มันจะไปใช้ Repository Variable/Secret แทน แต่ยังไม่มี Repository Variable/Secret อีก ก็จะได้ค่าว่างไปนั่นเอง

![Fallback to Repository Variables and Secrets](/blog/one-github-actions-deploy-to-multi-environment/19.png)

สุดท้ายแล้ว วิธีนี้ก็เป็นเพียง 1 แนวทางเท่านั้น ในโลกของความเป็นจริงเราคงไม่สามารถใช้ 1 วิธีการเพื่อแก้ปัญหามากมายได้ เพราะฉะนั้นให้เลือกเอาวิธีการที่เหมาะสมกับปัญหาที่ต้องการแก้ไขจริง ๆ จะดีกว่า

ขอบคุณครับ
