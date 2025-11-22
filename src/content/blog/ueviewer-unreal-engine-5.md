---
title: "วิธีดู Asset เกม Unreal Engine 5 ด้วย UE Viewer"
description: "สอนวิธีใช้ UE Viewer เปิด Asset เกมที่สร้างด้วย Unreal Engine 5 พร้อมรูปภาพประกอบทุกขั้นตอน"
createdAt: "Nov 23, 2025"
heroImage: "/blog/ueviewer-unreal-engine-5/banner.png"
tags:
  - "Unreal Engine"
  - "UE Viewer"
  - "Asset Extraction"
  - "Game Dev"
  - "umodel"
---

ใครเคยอยากดู Asset เกมที่สร้างด้วย Unreal Engine 5 แล้วเจอปัญหาแบบผมบ้าง? คือ UE Viewer (umodel) ตอนนี้มันรองรับถึงแค่ Unreal Engine 4 เอง แต่จริง ๆ แล้วมีวิธีใช้ UE Viewer เวอร์ชันที่รองรับ UE5 อยู่ เดี๋ยวผมจะมาเล่าให้ฟังแบบ step-by-step พร้อมรูปภาพประกอบทุกขั้นตอนเลย

## ขั้นตอนการใช้งาน

### 1. ไปโหลด UE Viewer เวอร์ชันปกติกันก่อน

เข้าไปที่เว็บ https://www.gildor.org/en/projects/umodel แล้วกดโหลด UE Viewer เวอร์ชันล่าสุดได้เลย

ในเว็บจะมีให้เลือกโหลดทั้ง Windows กับ Linux เลือกให้ตรงกับ OS ที่เราใช้งานนะ

![ดาวน์โหลด UE Viewer](/blog/ueviewer-unreal-engine-5/1.png)

โหลดเสร็จแล้วก็แตกไฟล์ออกมาไว้ที่โฟลเดอร์ที่เราสะดวกเลย

### 2. โหลด UE Viewer เวอร์ชันที่รองรับ Unreal Engine 5 ด้วย

ไปโหลดไฟล์จากลิงก์นี้เลย: https://drive.google.com/file/d/1oPEdPuXolNFiGCJRZBUNnZL8wi6o0hDU/view?usp=sharing (ขอบคุณเจ้าของลิงก์ด้วยครับ)

![ดาวน์โหลด UE Viewer UE5](/blog/ueviewer-unreal-engine-5/2.png)

โหลดมาแล้วก็แตกไฟล์ออกมาเหมือนเดิม

### 3. เอาไฟล์จากสองเวอร์ชันมารวมกันในโฟลเดอร์เดียว

ก็แค่เอาไฟล์ทั้งหมดจาก UE Viewer เวอร์ชันที่รองรับ UE5 ไปใส่รวมกับโฟลเดอร์ UE Viewer ปกติเลย ง่าย ๆ

![รวมไฟล์ UE Viewer ทั้งสองเวอร์ชันในโฟลเดอร์เดียวกัน](/blog/ueviewer-unreal-engine-5/3.png)

### 4. เปิดโปรแกรม UE Viewer ที่รองรับ UE5

เปิดโปรแกรมด้วยไฟล์ `umodel_materials_ue5.exe` ที่ได้จากเวอร์ชัน UE5 ได้เลย

![เปิดโปรแกรม UE Viewer UE5](/blog/ueviewer-unreal-engine-5/4.png)

ถ้าใครใช้ Windows อาจจะเจอหน้าต่าง "Windows protected your PC" โผล่มา ไม่ต้องตกใจ กด "More info" แล้วกด "Run anyway" ได้เลย

### 5. เปิดไฟล์ Asset ของเกมที่สร้างด้วย Unreal Engine 5 กันเลย

ถึงตรงนี้ UE Viewer ก็พร้อมเปิด Asset ของเกมที่สร้างด้วย UE5 แล้ว ลองเลือกไฟล์ที่อยากดูได้เลย

![ตัวอย่าง Asset ที่เปิดได้](/blog/ueviewer-unreal-engine-5/5.png)

## สรุป

วิธีนี้ผมลองมาแล้ว ใช้งานได้จริง ดู Asset เกม UE5 ได้แบบไม่ต้องรออัปเดตจากผู้พัฒนาเลย

หวังว่าบทความนี้จะช่วยให้ทุกคนดู Asset เกม UE5 ได้ง่ายขึ้นนะครับ

ขอบคุณเจ้าของเครื่องมือและข้อมูลด้วยครับ

ขอบคุณครับ

---

**ขอขอบคุณสำหรับข้อมูลและเครื่องมือ:**

- https://www.gildor.org/en/projects/umodel
- https://www.gildor.org/smf/index.php/topic,9222.0.html
- https://www.gildor.org/smf/index.php/topic,7906.0.html
