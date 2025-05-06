---
title: "ใช้งาน Studio 3T กับ MongoDB Version เก่ากว่า 4.0"
description: "แนะนำวิธีใช้ Studio 3T กับ MongoDB Version เก่ากว่า 4.0 โดยอธิบายขั้นตอนการ Download ติดตั้ง ใช้งานฟรีเบื้องต้น และการเชื่อมต่อกับ MongoDB Server 3.6"
createdAt: "May 7, 2025"
heroImage: "/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/banner.png"
tags:
  - "MongoDB"
  - "Studio 3T"
  - "Database Management"
  - "Version Compatibility"
  - "GUI Tools"
---

ปัจจุบัน MongoDB Server ได้อัปเดตเป็น Version 8.0 แล้ว ส่งผลให้ MongoDB GUI Tools ต่าง ๆ ไม่รองรับการใช้งานกับ MongoDB Server Version เก่ากว่า 4.0 แล้ว

แต่ว่าในความเป็นจริงแล้ว MongoDB Server Version เก่ากว่า 4.0 ก็ยังมีการใช้งานอยู่ในหลาย ๆ ที่ และอาจจะมีปัญหากับการอัปเดต MongoDB Server Version ใหม่ ๆ ด้วย

เพื่อให้สามารถใช้งาน MongoDB GUI Tools ได้กับ MongoDB Server Version เก่ากว่า 4.0 เราจึงต้องใช้ Studio 3T Version 2024.1.0 ซึ่งเป็น Version ล่าสุดที่รองรับการใช้งานกับ MongoDB Server Version เก่ากว่า 4.0

## วิธี Download Studio 3T Version 2024.1.0

1. เข้าไปที่ https://studio3t.com/knowledge-base/articles/using-studio3t-with-earlier-mongodb-versions/

1. กด Download ตาม OS ที่ใช้งาน
   ![Download Studio 3T](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/1.png)

1. ติดตั้ง Studio 3T ตามปกติ

## ใช้งาน Studio 3T ครั้งแรก

1. เปิด Studio 3T ขึ้นมา เนื่องจากว่า Studio 3T เป็นโปรแกรมเสียเงิน ซึ่งเขามีให้ทดลองใช้งาน 30 วัน แต่เราก็สามารถใช้งานแบบ**ฟรี**ได้ แค่ Feature จะมีจำกัด กด Next
   ![Studio 3T welcome screen](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/2.png)

1. เขาจะให้เรา Sign In นะ ถ้ายังไม่มี Account ก็สามารถกด Sign Up ได้ หรือจะกด Sign in with Google ก็ได้
   ![Sign in options](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/3.png)
   ![Sign in with Google](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/4.png)

1. เรียบร้อย กด Finish ได้เลย
   ![Finish setup](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/5.png)

1. ตรงนี้ก็แล้วแต่เราแล้วว่าจะใช้งานแบบตัวเสียเงินทดลองใช้ หรือจะเปลี่ยนเป็นแบบฟรี ผมขอเปลี่ยนเป็นแบบฟรีละกัน
   ![Choose free version](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/6.png)

1. แบบฟรีแล้ว Feature หายไปเยอะเลย แต่ก็ยังพอใช้งานได้อยู่
   ![Free version limitations](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/7.png)

## ลอง Connect ไปที่ MongoDB Server Version เก่ากว่า 4.0

ผมมี MongoDB Server Version 3.6 ที่รันผ่าน Docker ไว้

```bash
docker run --name mongodb -p 27017:27017 -d mongo:3.6
```

![MongoDB Docker container running](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/8.png)

เดี๋ยวลองใช้ Studio 3T Connect ไปดูนะ

กด Create a new connection > ใส่ Connection String `mongodb://localhost:27017` > กด Next
![Create a new connection](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/9.png)

กด OK
![Connection settings confirmation](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/10.png)

ลองกด Test Connection ดู จะเห็นขึ้น OK ทั้งหมดแปลว่า Connect ได้ > กด OK
![Test connection successful](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/11.png)

ตั้ง Connection name แล้วกด Save ได้เลย
![Save connection](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/12.png)

มา ลอง Connect จริง ๆ ดู
![Connect to MongoDB](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/13.png)

เย้ 🎉 Connect ได้ (ใครหารายการ Connections ไม่เจอ มันแอบซ่อนอยู่ที่แถบด้านข้าง เปิดให้มันแสดงตลอดเหมือนผมเลยก็ได้)
![Connections panel](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/14.png)

ลอง Query ดูสักหน่อย ใช้งานได้ปกติ
![Query execution](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/15.png)

## สรุป

Studio 3T Version 2024.1.0 สามารถใช้งานกับ MongoDB Server Version เก่ากว่า 4.0 ได้ แต่ระวังเผลออัปเดต Studio 3T เป็น Version ใหม่นะ เพราะว่า Version ใหม่ ๆ จะไม่รองรับการใช้งานกับ MongoDB Server Version เก่ากว่า 4.0 แล้ว

หวังว่า Blog นี้จะช่วยให้ทุกคนสามารถใช้งาน Studio 3T กับ MongoDB Server Version เก่ากว่า 4.0 ได้นะครับ แต่ทางที่ดีก็ควรที่จะอัปเดต MongoDB Server ให้เป็น Version ล่าสุดนะครับ เพื่อความปลอดภัยและประสิทธิภาพที่ดีกว่า

ขอบคุณครับ
