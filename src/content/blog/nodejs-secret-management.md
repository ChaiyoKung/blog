---
title: "เก็บ Secret อย่างปลอดภัยใน Node.js"
description: "Node.js Developer ต้องรู้! วิธีเก็บ Secret อย่างปลอดภัย สร้างแอปพลิเคชันที่แข็งแกร่ง ป้องกันข้อมูลรั่วไหล"
createdAt: "Jan 22, 2025"
heroImage: "/blog/nodejs-secret-management/banner.png"
tags:
  - "Node.js"
  - "Security"
  - "Secrets"
  - "Dotenv"
  - "Software Development"
---

เนื่องจากผมได้มีโอกาส Review Node.js Code น้อง ๆ ฝึกงานหลายคน แล้วพบว่า บางคนก็เขียน DB Connection String ไว้ใน Code เลย บางคนก็ดีหน่อย เก็บ DB Connection String ไว้ใน `.env` แต่ดัน Push `.env` ขึ้น GitHub 😱

วันนี้ก็เลยอยากแนะนำวิธีการเก็บ Secret เช่น DB Connection String อย่างปลอดภัยใน Node.js

ผมมี Code ตัวอย่างที่ไม่ดีอยู่

![Bad code with DB connection string in source code](/blog/nodejs-secret-management/1.png)

จะเห็นว่า Code นี้มีการเขียน DB Connection String ไว้ใน Code เลย ซึ่งสิ่งที่ไม่ควรทำ เพราะว่าถ้าใครได้ไฟล์ Source Code นี้ไป ก็สามารถเข้าถึง DB ของเราได้ แล้วข้อมูลลับของเราก็จะหลุด!

สิ่งที่เราควรทำคือเก็บ Secret ไว้ในไฟล์ `.env`

![Using .env file for secrets](/blog/nodejs-secret-management/2.png)

โดยเราจะใช้ Library `dotenv` (https://github.com/motdotla/dotenv) ในการจัดการ

![dotenv library usage](/blog/nodejs-secret-management/3.png)

ไฟล์ `.env` มันเปรียบเหมือนการที่เราสร้างตัวแปรเก็บไว้ในภายในเครื่องคอมฯ ของเรา และเวลาที่เราเอา Code นี้ไป Deploy ขึ้น Server จริง ๆ ที่ Server ก็จะมีให้ตั้งค่าตัวแปรนี้เหมือนกัน ตัวแปรพวกนี้เราเรียกว่า "Environment Variable"

แต่เราห้าม Push `.env` ขึ้นไปที่ GitHub นะ ไปเพิ่มใส่ `.gitignore` เดี๋ยวนี้เลย!

![Adding .env to .gitignore](/blog/nodejs-secret-management/4.png)

สิ่งที่เราควรทำคือ เขียน Docs วิธีการ Setup Project ขึ้นมา

โดยส่วนตัว ผมจะสร้างไฟล์ `.env.example` เอาไว้เก็บตัวอย่างไฟล์ `.env` โดยห้ามใส่ค่าที่เป็น Secret ในนี้เลย

![.env.example file](/blog/nodejs-secret-management/5.png)

แล้วก็เขียน Docs วิธีการ Setup Project ใน `README.md` ว่าให้ Copy `.env.example` แล้วเปลี่ยนชื่อเป็น `.env` เอาแทน

![README.md setup instructions](/blog/nodejs-secret-management/6.png)

เพียงเท่านี้ เราก็สามารถเก็บ Secret อย่างปลอดภัยใน Node.js ได้แล้ว 🎉

`.env` ไม่ได้จำกัดว่าจะต้องเก็บแต่ Secret นะ สามารถเก็บพวกตัวแปร Configuration อย่างเช่น `APP_NAME`, `PORT`, หรืออื่น ๆ อะไรก็ได้ตามที่เราต้องการ

Source Code ของ Demo ทั้งหมดผมเก็บไว้ที่ https://github.com/ChaiyoKung/nodejs-secret-management นะครับ สามารถเข้าไปส่องกันได้ ถ้ากดดาวด้วยจะขอบคุณมากครับ

ขอบคุณครับ
