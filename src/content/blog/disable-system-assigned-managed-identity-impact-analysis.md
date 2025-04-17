---
title: "ตรวจสอบผลกระทบก่อน Disable System-assigned Managed Identity"
description: "Disabled แล้วระบบจะยังใช้งานอยู่ได้เหมือนเดิมหรือเปล่า อยากรู้ว่า System-assigned Managed Identity ที่ Enabled อยู่นี้ มันถูกเอาไปใช้ที่ไหน"
createdAt: "Dec 20, 2024"
heroImage: "/blog/disable-system-assigned-managed-identity-impact-analysis/banner.png"
tags:
  - "Managed Identity"
  - "Impact Analysis"
  - "Azure"
  - "Cloud Infrastructure"
  - "Best Practices"
---

วันนี้ผมได้รับหน้าที่ Review Terraform Code แล้ว Change ที่เกิดขึ้นมันคือการ Disable System-assigned Managed Identity ที่ Azure App Service ตัวนึง

คำถามของผมคือ Disabled แล้วระบบจะยังใช้งานอยู่ได้เหมือนเดิมหรือเปล่า จะยัง Functional อยู่ใช่ไหม เพราะที่เราไป Enabled System-assigned Managed Identity แปลว่าเราต้องการที่จะทำให้ Azure App Service ตัวนี้มีสิทธิ์ที่จะทำอะไรสักอย่างกับ Azure Resource อื่น ๆ

สิ่งที่ผมอยากรู้ตอนนี้คือ System-assigned Managed Identity ที่ Enabled อยู่นี้ มันถูกเอาไปใช้ที่ไหนหรือเปล่า เอาไป Assigned ที่ไหนหรือเปล่า

ซึ่งเราสามารถรู้ได้จาก Azure Portal ได้เลย

![Azure Portal showing assigned identities](/blog/disable-system-assigned-managed-identity-impact-analysis/1.png)

ถ้าเห็นรายการ แสดงว่าถูกใช้งานหรือถูก Assigned ไว้อยู่

![Azure Portal showing no assigned identities](/blog/disable-system-assigned-managed-identity-impact-analysis/2.png)

ถ้าไม่เห็นรายการ แสดงว่าไม่ได้ถูกใช้งานหรือไม่ได้ถูก Assigned ไว้

![Azure Portal role assignment details](/blog/disable-system-assigned-managed-identity-impact-analysis/3.png)

หรือจะดูผ่าน Azure CLI นี้ก็ได้

```bash
# Retrieve the managed identity principal ID of the specified Azure Web App
principal_id=$(az webapp show --resource-group "rg-demo" --name "app-demo" --query "identity.principalId" -o tsv)

# List all role assignments associated with the managed identity
az role assignment list --all --assignee "$principal_id" --query "[].{Role:roleDefinitionName, Scope:scope}" -o table
```

ถ้าเห็นรายการ แสดงว่าถูกใช้งานหรือถูก Assigned ไว้อยู่

![Azure CLI showing assigned roles](/blog/disable-system-assigned-managed-identity-impact-analysis/4.png)

ถ้าไม่เห็นรายการ แสดงว่าไม่ได้ถูกใช้งานหรือไม่ได้ถูก Assigned ไว้

![Azure CLI showing no assigned roles](/blog/disable-system-assigned-managed-identity-impact-analysis/5.png)

สุดท้ายนี้ ก่อนจะ Disable System-assigned Managed Identity ก็อย่าลืมไปตรวจสอบกันก่อนนะครับว่ามันถูกใช้งานที่ไหนหรือเปล่า เผื่อว่า Disabled ไปแล้วมันทำให้ระบบใช้งานไม่ได้

ขอบคุณครับ

ปล. จาก Azure CLI ตัวอย่างมันเป็นการตรวจสอบของ Azure App Service เนอะ ถ้าอยากตรวจสอบที่ Azure Resource ประเภทอื่น ๆ ก็ใช้ Command Show ค่าของ Azure Resource ประเภทนั้น ๆ
