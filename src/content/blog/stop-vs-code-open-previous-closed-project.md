---
title: "VS Code อย่าเปิด Project ล่าสุดให้ได้ไหม"
description: "คุณอาจจะอยากให้ทุกครั้งที่เปิด VS Code มันได้หน้าว่างแทนการเปิด Project ล่าสุดที่เพิ่งปิดไป"
createdAt: "Oct 11, 2024"
heroImage: "/blog/stop-vs-code-open-previous-closed-project/banner.png"
tags:
  - "VS Code"
  - "Productivity"
  - "Customization"
  - "Tips"
  - "Hacks"
---

โดยปกติแล้วทุกครั้งที่เราเปิด VS Code มันจะเปิด Project ล่าสุดที่เราเพิ่งปิดไปก่อนหน้า แต่สำหรับบางคนแล้วอาจจะไม่ชอบ มันทำให้เปิด VS Code ช้าเพราะต้องใช้เวลาในการ Load Project หรือเหตุผลอื่น ๆ ก็ตาม

ใน Blog นี้ ผมจะบอกวิธีทำให้ตอนเปิด VS Code จะไม่เปิด Project ล่าสุดที่เพิ่งปิดไป

อยากแรกเลย เปิด VS Code ขึ้นมาก่อน แล้วเปิด Setting ของ VS Code ผ่าน UI หรือกดคีย์ลัด `ctrl + ,` (Windows/Linux) หรือ `cmd + ,` (MacOS)

![alt text](/blog/stop-vs-code-open-previous-closed-project/1.png)

ค้นหาว่า window.restoreWindows แล้วเปลี่ยนค่าเป็น none

![alt text](/blog/stop-vs-code-open-previous-closed-project/2.png)

เพียงเท่านี้ทุกครั้งที่เปิด VS Code ขึ้นมาเราก็จะได้หน้าว่างมาแทน

![alt text](/blog/stop-vs-code-open-previous-closed-project/3.png)
