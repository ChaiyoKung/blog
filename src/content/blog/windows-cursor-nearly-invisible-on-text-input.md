---
title: "วิธีแก้ปัญหา Cursor เลือกข้อความ (Text Select) แทบมองไม่เห็นบน Windows 11"
description: "คู่มือแก้ปัญหา Cursor เลือกข้อความที่แทบมองไม่เห็น หลังอัปเดต AMD display driver บน Windows 11"
createdAt: "Sep 26, 2025"
heroImage: "/blog/windows-cursor-nearly-invisible-on-text-input/banner.png"
tags:
  - "Windows 11"
  - "AMD Driver"
  - "Cursor Issue"
  - "Registry Fix"
  - "Tech Support"
---

# วิธีแก้ปัญหา Cursor เลือกข้อความ (Text Select) แทบมองไม่เห็นบน Windows 11

ถ้าคุณเจอปัญหา Cursor เลือกข้อความ (Text Select Pointer) แทบจะมองไม่เห็นเวลาชี้บนตัวหนังสือสีดำพื้นหลังขาว คุณไม่ได้เจอคนเดียว ปัญหานี้เกิดขึ้นหลังจาก Windows update ที่ติดตั้ง AMD display driver เวอร์ชันใหม่ บทความนี้จะอธิบายปัญหาและวิธีแก้ไข

## วิธีแก้ไข

### ขั้นตอนที่ 1: สร้างไฟล์ Registry

1. เปิด Notepad แล้ววางโค้ดนี้ลงไป:

   ```
   Windows Registry Editor Version 5.00

   [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\Dwm]
   "OverlayTestMode"=dword:00000005
   ```

2. บันทึกไฟล์โดยตั้งนามสกุลเป็น `.reg` เช่น `FixCursorBug.reg`

### ขั้นตอนที่ 2: นำ Registry ไปใช้

1. ดับเบิลคลิกไฟล์ `FixCursorBug.reg`
2. กดยืนยันทุกหน้าต่างที่ถาม เพื่อ merge ข้อมูลเข้า Windows Registry

### ขั้นตอนที่ 3: Restart เครื่อง

Restart เครื่องคอมพิวเตอร์เพื่อให้การเปลี่ยนแปลงมีผล

### ขั้นตอนที่ 4: ทดสอบ Cursor

หลัง Restart ให้ลองทดสอบ Cursor เลือกข้อความบนเว็บไซต์หรือแอปที่มีตัวหนังสือสีดำพื้นขาว Cursor ควรจะกลับมาแสดงผลปกติ

## อ้างอิง

ดูรายละเอียดและการพูดคุยเพิ่มเติมเกี่ยวกับปัญหานี้ได้ที่:

- [Chromium Issue Tracker](https://issues.chromium.org/issues/40239916)
- [Microsoft Answers Forum](https://answers.microsoft.com/en-us/windows/forum/all/text-select-pointer-goes-completely-white-colored/52ca5f37-d7f5-48c3-87ed-226562688a94)

ทำตามขั้นตอนข้างต้นนี้ คุณจะสามารถแก้ปัญหา Cursor เลือกข้อความแทบมองไม่เห็น และใช้งานเครื่องได้ตามปกติ

ขอบคุณที่อ่านจนจบ ขอให้ใช้งาน Windows อย่างมีความสุข!
