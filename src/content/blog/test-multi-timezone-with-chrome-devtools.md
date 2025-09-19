---
title: "ทดสอบ Multi-timezone ง่าย ๆ ด้วย Chrome DevTools"
description: "วิธีเปลี่ยน Timezone และ Location บน Chrome DevTools เพื่อทดสอบระบบที่รองรับหลาย Timezone ได้สะดวก ไม่ต้องเปลี่ยน Timezone ของเครื่อง"
createdAt: "Sep 19, 2025"
heroImage: "/blog/test-multi-timezone-with-chrome-devtools/banner.png"
tags:
  - "Chrome"
  - "DevTools"
  - "Timezone"
  - "Testing"
  - "Frontend"
---

# ทดสอบ Multi-timezone ง่าย ๆ ด้วย Chrome DevTools

ถ้าระบบของเรารองรับ Multi-timezone การทดสอบให้ครบทุก Timezone ก็เป็นสิ่งสำคัญ หลายคนอาจจะเคยใช้วิธีเปลี่ยน Timezone ของเครื่องโดยตรง ซึ่งยุ่งยากและอาจกระทบกับแอปอื่น ๆ

วันนี้ขอแนะนำวิธีที่สะดวกกว่า คือการเปลี่ยน Timezone ผ่าน Chrome DevTools โดยตรง ไม่ต้องยุ่งกับการตั้งค่าระบบเลย

## วิธีเปลี่ยน Timezone ด้วย Chrome DevTools

0. **ตรวจสอบ Timezone ปัจจุบัน**

   จะเห็นว่าตอนนี้ผมอยู่ที่ `UTC+7 (Asia/Bangkok)` เดี๋ยวจะลองเปลี่ยนเป็น Timezone ของประเทศญี่ปุ่น (`UTC+9`)
   ![ALT](/blog/test-multi-timezone-with-chrome-devtools/1.png)

1. **เปิด Chrome DevTools**

   กด `F12` หรือคลิกขวาเลือก Inspect
   ![ALT](/blog/test-multi-timezone-with-chrome-devtools/2.png)

2. **เปิดเมนู Sensors**

   กดปุ่ม `...` (สามจุดมุมขวาบนของ DevTools)
   เลือก `More tools` > `Sensors`
   ![ALT](/blog/test-multi-timezone-with-chrome-devtools/3.png)

3. **เปลี่ยน Location และ Timezone**

   ที่แถบล่างสุดจะมีหัวข้อ "Location"
   เปลี่ยนจาก `No override` เป็นเมืองที่ต้องการ เช่น `Tokyo`
   จะเห็นว่า `Timezone ID` เปลี่ยนเป็น `Asia/Tokyo` ทันที
   ![ALT](/blog/test-multi-timezone-with-chrome-devtools/4.png)

4. **Refresh หน้าเว็บ**

   กด Refresh เพื่อให้เว็บโหลดข้อมูลใหม่ จะเห็นว่าเวลาบนเว็บเปลี่ยนเป็นเวลาของ Timezone ที่เลือก
   ![ALT](/blog/test-multi-timezone-with-chrome-devtools/5.png)

5. **เปลี่ยน Location อื่น ๆ ได้ด้วย**

   นอกจาก Timezone แล้ว ยังสามารถเปลี่ยน Latitude/Longitude เพื่อจำลองตำแหน่งที่ตั้งได้ด้วย เช่น เลือก Tokyo แล้ว Marker บนแผนที่ก็จะปักที่ญี่ปุ่น
   ![ALT](/blog/test-multi-timezone-with-chrome-devtools/6.png)

6. **กลับมาใช้ Timezone เดิม**

   หากต้องการกลับมาใช้ Timezone ของเครื่อง ให้เปลี่ยน Location กลับเป็น `No override` เท่านั้น
   ![ALT](/blog/test-multi-timezone-with-chrome-devtools/7.png)

## สรุป

การเปลี่ยน Timezone ผ่าน Chrome DevTools ช่วยให้ทดสอบระบบที่เกี่ยวข้องกับเวลาได้ง่ายขึ้น ไม่ต้องยุ่งกับการตั้งค่าระบบหลัก และยังสามารถจำลอง Location ได้อีกด้วย เหมาะมากสำหรับ Developer และ QA ที่ต้องทดสอบหลายประเทศ

ขอบคุณครับ
