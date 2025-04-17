---
title: "ใช้ Azure Key Vault สำหรับจัดการ Terraform Secret Variable"
description: "เพิ่มความปลอดภัยให้ Terraform Secret Variable ด้วย Azure Key Vault จัดการ Secret โดยไม่ต้องเก็บในไฟล์ .tfvars พร้อมวิธีตั้งค่าและใช้งาน"
createdAt: "Feb 11, 2025"
heroImage: "/blog/azure-key-vault-secret-tfvars/banner.png"
tags:
  - "Terraform"
  - "Azure Key Vault"
  - "DevOps"
  - "Secrets"
  - "Security"
---

โดยปกติแล้ว Terraform เราจะเก็บ Secret ไว้ในไฟล์ `.tfvars` ซึ่งเป็นสิ่งที่ถูกต้องแล้ว แต่เราสามารถ Improve เรื่อง Security ได้มากขึ้นไปอีกโดยการเอา Secret ไปเก็บไว้ใน Vault แทน

ซึ่งใน Blog นี้เราจะใช้ Azure Key Vault ในการจัดการกับ Terraform Secret Variable นั่นเอง

(ถ้าอยากรู้ว่าทำไมต้องใช้ Azure Key Vault ให้อ่านนี่ [Why use Azure Key Vault?](https://learn.microsoft.com/en-us/azure/key-vault/general/overview#why-use-azure-key-vault))

ตอนนี้ผมมี Azure Resources ประมาณนี้ที่ถูกสร้างผ่าน Terraform

![Azure resources created using Terraform](/blog/azure-key-vault-secret-tfvars/1.png)

ซึ่งถ้าดูจาก Terraform Code จะเห็นว่า Web App มีการใช้ Terraform Variable ที่เป็นข้อมูลประเภท Sensitive Data (Secret) ซึ่งถูกกำหนดค่าไว้ที่ไฟล์ `terraform.tfvars`

![Terraform code showing sensitive data in tfvars file](/blog/azure-key-vault-secret-tfvars/2.png)

สิ่งที่ผมต้องการคือ ผมจะไม่เก็บ Secret ใน `terraform.tfvars` แล้ว แต่จะไปเก็บที่ Azure Key Vault แทน

งั้นเรามาสร้าง Azure Key Vault กันก่อน

ผมจะสร้างผ่าน Azure Portal เลย ส่วนใครอยากสร้างผ่าน Terraform ก็ได้ ไม่มีปัญหา

![Azure Key Vault creation in Azure Portal](/blog/azure-key-vault-secret-tfvars/3.png)

กรอกข้อมูล ตั้งค่าอะไรตามใจเลย

![Azure Key Vault configuration settings](/blog/azure-key-vault-secret-tfvars/4.png)

ของผมก็ประมาณนี้ กด Create เลย

![Azure Key Vault creation progress](/blog/azure-key-vault-secret-tfvars/5.png)

สร้างเสร็จแล้ว

![Azure Key Vault successfully created](/blog/azure-key-vault-secret-tfvars/6.png)

เพื่อให้เราสามารถจัดการ Secret ใน Azure Key Vault ได้ เราจำเป็นจะต้องมีสิทธิ์ "Key Vault Secrets Officer"

งั้นมาเพิ่มสิทธิ์กัน

กดเข้าไปที่ Azure Key Vault ที่เราสร้างเมื่อกี้ แล้วกด Add role assignment

![Adding role assignment in Azure Key Vault](/blog/azure-key-vault-secret-tfvars/7.png)

ค้นหา Role ชื่อ Key Vault Secrets Officer > กดเลือก > กด Next

![Selecting Key Vault Secrets Officer role](/blog/azure-key-vault-secret-tfvars/8.png)

กด Select members > ค้นหาชื่อตัวเองหรือคนที่ต้องการให้สิทธิ์แล้วกดเลือก > กด Select > กด Review + assign

![Selecting members for role assignment](/blog/azure-key-vault-secret-tfvars/9.png)

อ่านทบทวนการตั้งค่าอีกรอบ ถ้าถูกต้องแล้วก็กด Review + assign ได้เลย

![Review and assign role settings](/blog/azure-key-vault-secret-tfvars/10.png)

เรียบร้อย ตอนนี้ผมก็ให้สิทธิ์ตัวเองในการจัดการ Azure Key Vault Secret แล้ว

มาสร้าง Secret กัน

ไปที่แท็บ Secrets > กด Generate/Import

![Navigating to Secrets tab in Azure Key Vault](/blog/azure-key-vault-secret-tfvars/11.png)

ใส่ชื่อ ใส่ค่า แล้วกด Create เลย

![Creating a new secret in Azure Key Vault](/blog/azure-key-vault-secret-tfvars/12.png)

เยี่ยมเลย สร้างเสร็จแล้ว

![Secret successfully created in Azure Key Vault](/blog/azure-key-vault-secret-tfvars/13.png)

ต่อมาเราจะแก้ Terraform Code ให้ไปอ่าน Secret จาก Azure Key Vault แทน

สำหรับการดึงค่า Secret เราจะใช้ `azurerm_key_vault_secret` Data Block (https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/data-sources/key_vault_secret)

![Terraform code using azurerm_key_vault_secret data block](/blog/azure-key-vault-secret-tfvars/14.png)

ทดสอบรัน `terraform plan` แล้วได้ No Changes ตามที่ต้องการ สุดยอดมาก 🎉

เพียงเท่านี้ เราก็สามารถใช้ Azure Key Vault สำหรับจัดการ Terraform Secret Variable ได้แล้ว

ส่วน Source Code ที่ใช้ใน Blog นี้ผมเก็บไว้ที่ https://github.com/ChaiyoKung/azure-key-vault-secret-tfvars นะครับ ใครสนใจไปส่องได้ กดดาวได้ ⭐

ขอบคุณครับ
