---
title: "วิธีรัน MSSQL บนเครื่องตัวเองด้วย Docker"
description: "สอนวิธีรัน Microsoft SQL Server (MSSQL) บนเครื่องตัวเองด้วย Docker เหมาะสำหรับ Developer ที่ต้องการ Database สำหรับทดสอบหรือพัฒนา"
createdAt: "Feb 23, 2026"
heroImage: "/blog/how-to-run-mssql-on-local-with-docker/banner.png"
tags:
  - "MSSQL"
  - "Docker"
  - "Database"
  - "DevOps"
  - "Software Development"
---

> Blog นี้จะสอนวิธีรัน MSSQL Server บนเครื่องตัวเองด้วย Docker เหมาะสำหรับ Developer ที่อยากได้ Database ไว้ทดสอบ/พัฒนาแบบง่าย ๆ

## ทำไมต้องรัน MSSQL ด้วย Docker?

- ไม่ต้องติดตั้งอะไรยุ่งยากบนเครื่องจริง
- ลบ Container ทิ้งเมื่อไหร่ก็ได้ ไม่เปลืองพื้นที่
- เหมาะกับการทดสอบ/พัฒนาหลาย Project พร้อมกัน

## เตรียมเครื่องให้พร้อม

ติดตั้ง [Docker Desktop](https://www.docker.com/products/docker-desktop/) ให้เรียบร้อย (รองรับทั้ง Windows, macOS, Linux)

![ปุ่มดาวน์โหลด Docker Desktop หลายระบบปฏิบัติการ](/blog/how-to-run-mssql-on-local-with-docker/1.png)

## สั่งรัน MSSQL Server ด้วย Docker

แค่ใช้คำสั่งนี้ใน Terminal ได้เลย

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p "1433:1433" -d "mcr.microsoft.com/mssql/server:2025-CU2-ubuntu-22.04"
```

- เปลี่ยน `<password>` เป็นรหัสผ่านที่ต้องการ (ต้องมีความยาวอย่างน้อย 8 ตัว และต้องมีอย่างน้อย 3 ใน 4 ประเภทต่อไปนี้: ตัวพิมพ์ใหญ่, ตัวพิมพ์เล็ก, ตัวเลข, และอักขระพิเศษ)

ตัวอย่าง

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=MyStrongP@ssw0rd" -p "1433:1433" -d "mcr.microsoft.com/mssql/server:2025-CU2-ubuntu-22.04"
```

![ตัวอย่างการรัน MSSQL Server ด้วย Docker](/blog/how-to-run-mssql-on-local-with-docker/2.png)

ถ้าอยากหยุด Container ให้ใช้ `docker ps` ดูชื่อหรือ ID ของ Container ที่รัน MSSQL อยู่ แล้ว `docker stop <container_id|container_name>`

![ตัวอย่างการหยุด Container](/blog/how-to-run-mssql-on-local-with-docker/3.png)

> **เพิ่มเติม:**  
> สามารถดูรายละเอียด Image Tag และเวอร์ชันต่าง ๆ ได้ที่ [Docker Hub: microsoft/mssql-server](https://hub.docker.com/r/microsoft/mssql-server)  
> มีให้เลือกหลายเวอร์ชัน เช่น 2019, 2022, 2025  
> ตัวอย่าง Tag ที่ใช้ได้ เช่น
>
> - `mcr.microsoft.com/mssql/server:2025-CU2-ubuntu-22.04`
> - `mcr.microsoft.com/mssql/server:2022-latest`
> - `mcr.microsoft.com/mssql/server:2019-latest`
>
> เลือก Tag ให้เหมาะกับเวอร์ชันที่ต้องการใช้งาน หรือดู Tag อื่น ๆ เพิ่มเติมในหน้า [MCR: mssql/server/tags](https://mcr.microsoft.com/artifact/mar/mssql/server/tags) ได้เลย

## เชื่อมต่อด้วย sqlcmd ใน Container

หากต้องการเชื่อมต่อกับ SQL Server ที่รันอยู่ใน Container สามารถใช้เครื่องมือ `sqlcmd` ที่อยู่ใน Container ได้เลย โดยใช้คำสั่งนี้บนเครื่อง host:

```bash
docker exec -it "<container_id|container_name>" "/opt/mssql-tools18/bin/sqlcmd" -S "localhost" -U "sa" -P "<password>" -C
```

- เปลี่ยน `<container_id|container_name>` เป็นชื่อหรือ ID ของ Container ที่รัน MSSQL อยู่
- เปลี่ยน `<password>` เป็นรหัสผ่านที่ตั้งไว้ตอนรัน Container

ตัวอย่าง

```bash
docker exec -it "charming_greider" "/opt/mssql-tools18/bin/sqlcmd" -S "localhost" -U "sa" -P "MyStrongP@ssw0rd" -C
```

![ตัวอย่างการเชื่อมต่อด้วย sqlcmd ใน Container](/blog/how-to-run-mssql-on-local-with-docker/4.png)

> **หมายเหตุ:**  
> ตั้งแต่ SQL Server 2022 (16.x) CU 14 และ SQL Server 2019 (15.x) CU 28 เป็นต้นไป Container Image จะมี `mssql-tools18` ติดมาด้วย  
> โฟลเดอร์ `/opt/mssql-tools/bin` เดิมกำลังถูกยกเลิก และเปลี่ยนเป็น `/opt/mssql-tools18/bin` เพื่อให้ตรงกับเวอร์ชันล่าสุดของเครื่องมือ  
> ถ้าใช้ Image เวอร์ชันเก่ากว่า อาจต้องใช้ path เดิม `/opt/mssql-tools/bin/sqlcmd`

## ทดสอบสร้าง Database

ลองเชื่อมต่อแล้วรันคำสั่งนี้เพื่อสร้าง Database ใหม่

```sql
CREATE DATABASE MyApp;
GO
```

![ตัวอย่างการสร้าง Database ด้วย sqlcmd](/blog/how-to-run-mssql-on-local-with-docker/5.png)

## เชื่อมต่อ MSSQL ด้วยโปรแกรมอะไรก็ได้

ใช้ [Azure Data Studio](https://learn.microsoft.com/en-us/azure-data-studio/download-azure-data-studio) หรือ [DBeaver](https://dbeaver.io/) หรือจะใช้ [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/en-us/ssms/install/install) ก็ได้

ตั้งค่าตามนี้

| Host/Server | Port | User | Password              | Database (optional)   |
| ----------- | ---- | ---- | --------------------- | --------------------- |
| localhost   | 1433 | sa   | <Password ที่ตั้งไว้> | MyApp (หรืออะไรก็ได้) |

ตัวอย่าง Connection String (สำหรับ .NET, Node.js, etc.)

```
Server=tcp:localhost,1433;Initial Catalog=MyApp;Persist Security Info=False;User ID=sa;Password=MyStrongP@ssw0rd;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;
```

![ตัวอย่างการเชื่อมต่อด้วย Azure Data Studio](/blog/how-to-run-mssql-on-local-with-docker/6.png)

![ตัวอย่างการเชื่อมต่อด้วย Azure Data Studio สำเร็จ](/blog/how-to-run-mssql-on-local-with-docker/7.png)

## Tips เพิ่มเติม

ถ้าอยากให้ข้อมูลไม่หายเวลา Remove Container ให้ Mount Volume (`-v`) เพิ่ม

ตัวอย่าง

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=MyStrongP@ssw0rd" -p "1433:1433" -v "mssql-data:/var/opt/mssql" -d "mcr.microsoft.com/mssql/server:2025-CU2-ubuntu-22.04"
```

## สรุป

แค่นี้ก็ได้ MSSQL Server ไว้ใช้บนเครื่องตัวเองแล้ว ง่าย สะอาด ไม่ต้องกลัวเครื่องเละ  
เหมาะกับการทดสอบ/พัฒนาทุกสาย

ขอบคุณครับ
