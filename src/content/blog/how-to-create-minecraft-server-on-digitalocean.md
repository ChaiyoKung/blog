---
title: "วิธีเปิด Minecraft Server บน DigitalOcean (แบบละเอียด)"
description: "วิธีเปิด Minecraft Server บน DigitalOcean แบบละเอียดพร้อมภาพประกอบ ถึงไม่ใช้ DigitalOcean ก็อ่านได้"
createdAt: "Oct 8, 2024"
heroImage: "/blog/how-to-create-minecraft-server-on-digitalocean/banner.png"
tags:
  - "Minecraft Server"
  - "DigitalOcean"
  - "Cloud Hosting"
  - "Java Development"
  - "Hobby"
---

วิธีเปิด Minecraft Server บน DigitalOcean แบบละเอียดพร้อมภาพประกอบ ถึงไม่ใช้ DigitalOcean ก็อ่านได้

> Minecraft Server ใน Blog นี้จะใช้เปิดสำหรับ Minecraft Java Edition Version 1.21.1 เป็นตัวอย่าง

มาเริ่มกันเลย

อย่างแรกคงเป็นอะไรไปไม่ได้นอกจากไปสมัคร DigitalOcean ก่อน กดที่ลิงก์นี้ได้เลย https://www.digitalocean.com/
(ถ้าสมัครแล้วก็ข้ามขั้นตอนนี้ไปเลย)

พอเรา Login เข้ามาแล้ว ก็จะเจอกับ first-project เป็น Project เริ่มต้นที่ทาง DigitalOcean เขาสร้างไว้ให้เราเริ่มใช้งานได้เลย

ซึ่งนี้ผมจะใช้ first-project นี่แหละ แต่ว่าใครอยากสร้าง Project แยกก็กดปุ่ม New Project ได้เลย

![DigitalOcean first project interface](/blog/how-to-create-minecraft-server-on-digitalocean/1.png)

ในการสร้าง Minecraft Server บน Cloud นั้น เราจะใช้ VM ซึ่ง VM ใน DigitalOcean เขาเรียกมันว่า Droplet

> Droplets are Linux-based virtual machines (VMs) that run on top of virtualized hardware. Each Droplet you create is a new server you can use, either standalone or as part of a larger, cloud-based infrastructure.

กดที่เมนู Droplets จากนั้นกด Create Droplet

![Create Droplet button in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/2.png)

ต่อมาเลือก Region ว่าเราจะใช้ Server ที่อยู่ Region ไหน และเลือก Datacenter

ผมใช้ Region “Singapore” เพราะว่าอยู่ใกล้ไทยสุด Ping จะได้น้อยหน่อย ส่วน Datacenter ที่ Singapore มีที่เดียวอะนะ เลยไม่มีตัวเลือกอื่น ก็ใช้ที่เขาให้มานั่นแหละ

![Region selection in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/3.png)

และก็เลือก OS และ OS Version ที่ต้องการ

ผมใช้ OS “Ubuntu” Version “24.04 (LTS) x64”

![Operating system selection in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/4.png)

ปล. จริง ๆ ตรง Tab Marketplace ถ้าค้นหา Minecraft ก็จะเจอ Image แบบพร้อมใช้สำหรับเปิด Minecraft Server เลยนะ แต่ว่ามันเป็น Minecraft คนละ Version กับที่ผมต้องการ ผมเลยเลือกสร้างเอง

ต่อมาเลือก Size ประมาณว่าเลือก Spec เครื่องที่ต้องการ แนะนำ Ram ขั้นต่ำ 2 GB นะ เพราะ OS ก็กิน Ram ไปเกือบ 0.5 GB แล้ว แล้ว Minecraft Server ก็ใช้ Ram อีก 1 GB (มากกว่าหรือน้อยกว่าก็แล้วแต่จะปรับ)

ผมใช้ Basic > Regular > Ram 2 GB ราคาก็ตามในภาพ $12/เดือน (ถ้าตอนนี้ที่เขียน Blog นี้ก็ประมาณ 401.30 บาท/เดือน)

![Droplet size selection in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/5.png)

ส่วนตรงนี้แล้วแต่ ใครอยากเพิ่ม Storage ก็เพิ่มได้ ถ้ากลัวไม่พอ แต่คิดเงินเพิ่มนะ
และก็ใครอยาก Backup ข้อมูลไว้ด้วยก็กดได้ คิดเงินเพิ่มเหมือนกัน ส่วนผมไม่เอาทั้งคู่

![Additional storage and backup options in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/6.png)

ต่อมาเป็นการเลือกวิธีการ Login เข้าไปควบคุม Droplet เครื่องนี้
ถ้าอยากปลอดภัยหน่อยก็ใช้ SSH Key
ถ้าเอาแบบง่ายก็ใช้ Password
ผมขอใช้ Password ละกัน ง่ายดี

![Login method selection in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/7.png)

ต่อมาเป็นสิ่งที่ DigitalOcean เขาแนะนำให้เราใช้
ผมเอาแค่ Add improved metrics monitoring and alerting พอ เพราะมัน Free (อันนี้เอาไว้ Monitor Droplet ได้ว่าตอนนี้ CPU ใช้ไปเท่าไรแล้ว, Ram ใช้ไปเท่าไรแล้ว, Storage ใช้ไปเท่าไรแล้ว และอื่น ๆ)

![Metrics monitoring option in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/8.png)

ใกล้จะสร้าง Droplet เสร็จแล้ว อีกนิดเดียว อันนี้ตั้งชื่อให้เราจำได้กันว่า Droplet คืออะไร และก็ถ้าเรามีหลาย Project ก็เลือกได้ว่าจะสร้างไว้ที่ Project ไหน จากนั้นก็กด Create Droplet เลย
ใน Blog นี้ผมตั้งชื่อว่า minecraft-server และใช้ first-project

![Droplet naming and project selection in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/9.png)

รอมันสร้างแป๊บนึง

![Droplet creation progress in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/10.png)

สร้าง Droplet เสร็จแล้ว

![Droplet creation completed in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/11.png)

เอาล่ะ ต่อมาจะเริ่มเปิด Minecraft Server แล้วนะ กดที่ชื่อ Droplet เพื่อเข้าไปหน้ารายละเอียดของ Droplet

![Droplet details page in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/12.png)

ที่นี้กดที่ปุ่ม Console เพื่อเข้าไปควบคุม Droplet เครื่องนี้

![Console button in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/13.png)

จะเจอหน้า Terminal แบบนี้

![Terminal interface in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/14.png)

ให้เราติดตั้ง Software Package ที่ต้องใช้โดยการใช้คำสั่งนี้ แล้วเขาจะบอกว่า “Press [Enter] to continue” เราก็กด Enter ไป จากนั้นรอไม่นาน ก็จะขึ้นว่า Done

```bash
sudo add-apt-repository ppa:openjdk-r/ppa
```

![Adding OpenJDK repository](/blog/how-to-create-minecraft-server-on-digitalocean/15.png)

จากนั้น Update รายการ Software Package ด้วยคำสั่งนี้

```bash
sudo apt update
```

![Updating software packages](/blog/how-to-create-minecraft-server-on-digitalocean/16.png)

เอาล่ะ มาติดตั้ง OpenJDK + JRE เพื่อให้สามารถรัน Minecraft Server ได้

เราจะติดตั้ง OpenJDK Version 21 + JRE เพราะใช้กับ Minecraft Server Version 1.21.1 ด้วยคำสั่งนี้ (มันจะมีให้พิมพ์ยืนยันนิดนึง ก็พิมพ์ `Y` และกด Enter ไป แล้วก็รอจนเสร็จ)

```bash
sudo apt install openjdk-21-jre-headless
```

![Installing OpenJDK](/blog/how-to-create-minecraft-server-on-digitalocean/17.png)

ติดตั้งเสร็จแล้ว

![OpenJDK installation completed](/blog/how-to-create-minecraft-server-on-digitalocean/18.png)

ที่นี้เราจะมาติดตั้ง Software อีกตัวนึงชื่อ “Screen” เอาไว้ทำให้เราสร้าง Session ในระบบแล้วปล่อยมันทำงานอยู่เบื้องหลังได้ เพราะว่าถ้าเรา Start Minecraft Server แล้ว เราจะต้องปล่อยมันทำงานอยู่เบื้องหลังไป เวลาปิด Terminal มันจะได้ไม่ไป Stop Minecraft Server เรา

```bash
sudo apt install screen
```

![Installing Screen](/blog/how-to-create-minecraft-server-on-digitalocean/19.png)

ต่อมาเราจะมา Config Firewall สักหน่อยเพื่อให้เราสามารถเชื่อมต่อมาที่ Minecraft Server ด้วย Port 25565 ได้ ด้วยคำสั่งนี้

```bash
sudo ufw allow 25565
```

![Configuring firewall for Minecraft](/blog/how-to-create-minecraft-server-on-digitalocean/20.png)

ทีนี้แวะสร้าง Directory นิดนึง จะได้เก็บไฟล์เป็นระเบียบ

```bash
mkdir app
cd app
```

ต่อมาเราจะ Download Minecraft Server Version 1.21.1 มาลงเครื่องด้วยคำสั่งนี้
(ลิงก์ Download ก็เอามาจากเว็บของ Minecraft นั่นแหละ https://www.minecraft.net/en-us/download/server)

```bash
wget https://piston-data.mojang.com/v1/objects/59353fb40c36d304f2035d51e7d6e6baa98dc05c/server.jar
```

และก็เปลี่ยนชื่อไฟล์ Server นิดนึง

```bash
mv server.jar minecraft_server.1.21.1.jar
```

![Downloading Minecraft server jar](/blog/how-to-create-minecraft-server-on-digitalocean/21.png)

ต่อมาเราจะเปิด Screen Session แล้ว เพราะเตรียมรัน Minecraft Server แล้ว

พิมพ์คำสั่งนี้ แล้วกด Enter

```bash
screen
```

จะได้หน้าตาแบบนี้

![Screen session started](/blog/how-to-create-minecraft-server-on-digitalocean/22.png)

ให้กด Space Bar หรือ Enter แล้วมันจะกลับมาหน้าปกติของ Terminal

เอาล่ะ และแล้วก็มาถึงเวลาที่รอคอย Start Minecraft Server นั่นเอง

พิมพ์คำสั่งนี้แล้ว Enter เลย

```bash
java -Xmx1024M -Xms1024M -jar minecraft_server.1.21.1.jar nogui
```

แล้วเราจะเจอว่ามัน Error อ้าว แต่ไม่ต้องตกใจนะ เป็นเรื่องปกติ

![Minecraft server EULA error](/blog/how-to-create-minecraft-server-on-digitalocean/23.png)

มันให้เราไปยอมรับ EULA (End-User License Agreement) ก่อน โดยการเปิดไฟล์ `eula.txt` ใน Text Editor ที่ถนัดได้เลย ผมขอใช้ Nano ละกัน

```bash
nano eula.txt
```

เปลี่ยนค่าของ `eula` ให้เป็น `true`

![Editing EULA file](/blog/how-to-create-minecraft-server-on-digitalocean/24.png)

กด `Ctrl + O` แล้ว Enter เพื่อ Save ไฟล์ จากนั้นกด `Ctrl + X` เพื่อออกจาก Nano

ต่อมาเราจะมาตั้งค่า Server กันนิดนึง อันนี้แล้วแต่นะว่าอยากเปลี่ยนค่าหรือเปล่า
โดยใช้คำสั่ง

```bash
nano server.properties
```

ที่ผมจะเปลี่ยนจะมีความยากของเกม (difficulty) เป็น `normal` และแก้ไขข้อความที่จะแสดงใต้ชื่อ Server (motd) ด้วย
จริง ๆ มันมีอะไรให้ปรับได้เยอะมาก ลองไปศึกษาดูว่าแต่ละ Property คืออะไร

![Editing server properties](/blog/how-to-create-minecraft-server-on-digitalocean/25.png)

แก้เสร็จแล้วก็ Save แล้วก็ออกจาก Text Editor

ที่นี้ให้เรา Start Minecraft Server อีกรอบ

```bash
java -Xmx1024M -Xms1024M -jar minecraft_server.1.21.1.jar nogui
```

และก็รอมัน Generate World นิดนึง จนเจอข้อความว่า `Done (xx.xxxs)! For help, type "help"` อันนี้ถือว่า Start Minecraft Server สำเร็จแล้ว

![Minecraft server started successfully](/blog/how-to-create-minecraft-server-on-digitalocean/26.png)

ที่นี้เรามาลองเข้าไป Join Minecraft Server ของเรากัน

เปิดเกม Minecraft ขึ้นมาเลย แล้วกดไปที่ Multiplayer

![Minecraft multiplayer menu](/blog/how-to-create-minecraft-server-on-digitalocean/27.png)

กด Add Server

![Add server menu in Minecraft](/blog/how-to-create-minecraft-server-on-digitalocean/28.png)

จะเห็นเป็นแบบนี้ ตรง Server Name จะกรอกอะไรก็ได้แล้วแต่ ส่วนตรง Server Address ให้กรอกเป็นเลข IP ของ Droplet เรา และก็กด Done (ถ้าจะให้เพื่อนเข้ามาเล่นด้วยก็ส่งเลข IP ให้เพื่อนไปนั่นแหละ)

![Adding server details in Minecraft](/blog/how-to-create-minecraft-server-on-digitalocean/29.png)

คำถามคือ แล้วเลข IP ของ Droplet เราเอามาจากไหนล่ะ จริง ๆ เลขนี้ผ่านตาเรามาแล้วสองรอบ

รอบแรกคือตรงนี้ กด Copy มาเลย

![Droplet IP address in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/30.png)

รอบที่สองคือตรงนี้ กด Copy มาเลย
(ค่าเดียวกันกับรอบแรกนั่นแหละ เลือกเอาเลยว่าจะ Copy จากตรงไหน)

![Droplet IP address in details page](/blog/how-to-create-minecraft-server-on-digitalocean/31.png)

ถ้าทุกอย่างถูกต้อง เราก็จะเจอว่า Minecraft Server ของเราพร้อมให้เข้าไปเล่นแล้ว

ปล. เห็นข้อความใต้ชื่อ Server ไหม ก็มาจากที่เราแก้ไขใน `server.properties` นั่นแหละ

![Minecraft server ready to join](/blog/how-to-create-minecraft-server-on-digitalocean/32.png)

ไหนลองเข้าไปเล่นดูหน่อย

![Playing in Minecraft server](/blog/how-to-create-minecraft-server-on-digitalocean/33.png)

เล่นได้แล้วววววว

มันอาจจะมี Load Chunk ใหม่ไม่เร็วบ้าง แต่ก็นั่นแหละ เราใช้ Droplet Spec ไม่สูงมาก (ก็ไม่อยากจ่ายแพงอะนะ)

เดี๋ยวก่อนจะจบ Blog นี้ ยังมีอีกเรื่องที่ขาดไปไม่ได้ คือการปล่อยให้ Minecraft Server มันทำงานตลอดเวลา คือเราจะมาเรียนรู้วิธีการใช้งาน Screen สำหรับจัดการ Session กันนิดนึง

คือตอนแรกก่อนที่จะ Start Minecraft Server เราได้สร้าง Screen Session ไปแล้วด้วยคำสั่ง `screen` แล้วเนอะ ที่นี้เราจะลองออกจาก Session กัน (แต่ไม่ได้ปิด Session นะ ระบบยังทำงานอยู่เบื้องหลัง) โดยการกด `Ctrl + A + D` จะได้ผลลัพธ์เป็นประมาณนี้อะนะ

![Detaching from Screen session](/blog/how-to-create-minecraft-server-on-digitalocean/34.png)

ทีนี้ลอง List Screen Session มาดูว่าเปิด Session อะไรไว้อยู่บ้าง
ด้วย `screen -list` จะเจอว่าตอนนี้มีอยู่ 1 Session ที่ทำงานอยู่เบื้องหลัง

![Listing Screen sessions](/blog/how-to-create-minecraft-server-on-digitalocean/35.png)

จากภาพด้านบน จำเลขที่ชี้ไว้นะ เราจะเอาไว้ใช้เวลาที่จะกลับไปทำงานกับ Session นั้นโดยใช้คำสั่ง `screen -r <เลข Session>` เช่น `screen -r 26103` พอพิมพ์แล้ว Enter ก็จะเห็นว่าเรากลับมาที่หน้า Minecraft Server เหมือนเดิม

![Reattaching to Screen session](/blog/how-to-create-minecraft-server-on-digitalocean/36.png)

อีกนิด ๆ นึง ที่ Minecraft Server ที่มันกำลังทำงานอยู่ เราสามารถพิมพ์ Command ของ Minecraft ได้ เช่น ให้สิทธิ์ OP, เสกของ หรือ เต๊ะคนออกจาก Server

ถ้าอยากรู้ว่าใช้ Command อะไรได้บ้าง ลองพิพม์ `help` แล้วกด Enter ดู มันก็จะแสดงรายงานของ Command ที่ใช้งานได้

![Minecraft server commands](/blog/how-to-create-minecraft-server-on-digitalocean/37.png)

จบของจริง

วิธีที่สอนไปจริง ๆ ไม่ได้จำกัดอยู่แค่กับ DigitalOcean นะ สามารถใช้วิธีนี้กับ VM บน Cloud เจ้าอื่น ๆ ได้ด้วยเหมือนกัน ต่างกันแค่ราคาและวิธีการสร้าง VM เท่านั้นเอง ส่วนตอนเปิด Minecraft Server ที่ทำผ่าน Terminal ก็ทำเหมือนกันทุก VM

หวังจาก Blog นี้จะเป็นประโยชน์สำหรับคนที่ต้องการเปิด Minecraft Server ทุกคน อย่างน้อยก็ตัวผมเองนี่แหละที่ถ้าลืมวิธีเปิดก็คงได้กลับมาอ่าน Blog ตัวเอง

สุดท้ายก็ขอขอบคุณเอกสารของ DigitalOcean ด้วยครับ https://www.digitalocean.com/community/tutorials/how-to-create-a-minecraft-server-on-ubuntu-22-04 เพราะวิธีการเปิดส่วนนึงก็เอามาจากเอกสารนี้นี่แหละ
