---
title: "วิธีเปิด Minecraft Server บน AWS (แบบละเอียด)"
description: "วิธีเปิด Minecraft Server บน AWS แบบละเอียดพร้อมภาพประกอบ ถึงไม่ใช้ AWS ก็อ่านได้"
createdAt: "Jun 9, 2026"
heroImage: "/blog/how-to-create-minecraft-server-on-aws/banner.png"
tags:
  - "Minecraft Server"
  - "AWS"
  - "Cloud Hosting"
  - "Java Development"
  - "Hobby"
---

วิธีเปิด Minecraft Server บน AWS แบบละเอียดพร้อมภาพประกอบ ถึงไม่ใช้ AWS ก็อ่านได้

> Minecraft Server ใน Blog นี้จะใช้เปิดสำหรับ Minecraft Java Edition Version 1.21.1 เป็นตัวอย่าง

มาเริ่มกันเลย

อย่างแรกคงเป็นอะไรไปไม่ได้นอกจากไปสมัคร AWS ก่อน กดที่ลิงก์นี้ได้เลย https://aws.amazon.com/
(ถ้าสมัครแล้วก็ข้ามขั้นตอนนี้ไปเลย)

พอเรา Login เข้ามาแล้ว ก็จะเจอหน้า Console ของ AWS ที่มีเมนูเยอะพอสมควร แต่ไม่ต้องตกใจ เดี๋ยวผมพาไปทีละขั้นตอน

![AWS console after login](/blog/how-to-create-minecraft-server-on-aws/1.png)

ก่อนจะสร้างอะไร เราต้องเลือก Region ที่จะใช้งานก่อน ซึ่ง Region ก็คือที่ตั้งของ Data Center ที่เราจะใช้บริการนั่นเองครับ ถ้าไม่รู้จะเลือกอันไหนดี แนะนำให้เลือกที่ใกล้ผู้เล่น Minecraft ของเรามากที่สุด ในตัวอย่างนี้ผมเลือก `Asia Pacific (Thailand)`

![AWS region selection](/blog/how-to-create-minecraft-server-on-aws/2.png)

ถ้าไม่เจอ Region ที่ต้องการ ลองกด Manage Regions ดูครับ บาง Region อาจถูกปิดไว้

![AWS manage regions menu](/blog/how-to-create-minecraft-server-on-aws/3.png)

ในการสร้าง Minecraft Server บน Cloud เราจะใช้ VM ซึ่งใน AWS เขาเรียกว่า EC2 (Elastic Compute Cloud)

กดที่ช่องค้นหาแล้วพิมพ์ว่า "EC2" จากนั้นกดเลือก EC2 ได้เลย

![Searching for EC2 in AWS](/blog/how-to-create-minecraft-server-on-aws/4.png)

จะเจอหน้า EC2 Dashboard

![EC2 dashboard](/blog/how-to-create-minecraft-server-on-aws/5.png)

ดูที่แถบด้านซ้ายมือ แล้วกดที่ **Instances** จากนั้นกด **Launch instances** เพื่อสร้าง VM ตัวใหม่

![Instances page and launch button](/blog/how-to-create-minecraft-server-on-aws/6.png)

กรอกชื่อ Instance ของเราได้ตามใจชอบเลย ตรงนี้เปลี่ยนทีหลังได้เหมือนกัน

![Naming the EC2 instance](/blog/how-to-create-minecraft-server-on-aws/7.png)

ต่อมาเลือก OS ที่จะใช้รัน Minecraft Server ของเรา ในที่นี้ผมเลือก `Ubuntu Server 24.04 LTS (HVM), SSD Volume Type` นะครับ และให้สังเกต **Username** เอาไว้ด้วย เพราะเดี๋ยวต้องใช้ตอน Login เข้า VM

![Selecting Ubuntu AMI](/blog/how-to-create-minecraft-server-on-aws/8.png)

ต่อมาเลือก Instance Type หรือ Spec ของ VM ที่จะใช้ มีผลกับราคาที่ต้องจ่ายด้วย สำหรับ Minecraft Server แนะนำ Ram ขั้นต่ำ 2 GB นะ เพราะ OS ก็กิน Ram ไปเกือบ 0.5 GB แล้ว ส่วน Minecraft Server ก็ใช้ Ram อีกประมาณ 1 GB (มากกว่าหรือน้อยกว่านี้ค่อยปรับได้)

ผมจะเลือกเป็น `t3.small` นะครับ เป็น Spec ที่เหมาะกับ Minecraft Server ขนาดเล็ก ๆ และราคาไม่แรงมาก

![Selecting instance type](/blog/how-to-create-minecraft-server-on-aws/9.png)

ต่อมาเลือก Key pair (login) เพื่อใช้ Login เข้า VM แบบปลอดภัย แต่ถ้าอธิบายเรื่องนี้ตอนนี้คงยาวไป เลยขอเลือก `Proceed without a key pair` ไปก่อนนะครับ (แต่ไม่แนะนำให้ทำแบบนี้ใน Production นะครับ)

![Key pair selection](/blog/how-to-create-minecraft-server-on-aws/10.png)

ต่อมาจะเป็นเรื่อง Network แล้วครับ ตรงนี้เราจะสร้าง **Security Group** ซึ่งทำหน้าที่คล้าย Firewall เพื่อคุมการเข้าถึง VM ของเรา เราจะต้องเปิด Port ที่ Minecraft Server ใช้งานด้วย เดี๋ยวมาดูกัน

กดที่ **Edit** เพื่อเข้าไปตั้งค่า Security Group ให้ละเอียดขึ้น

![Editing security group settings](/blog/how-to-create-minecraft-server-on-aws/11.png)

ตั้งชื่อ Security Group ของเราได้ตามใจชอบเลยครับ ในที่นี้ผมตั้งว่า "Minecraft Server SG"

![Naming the security group](/blog/how-to-create-minecraft-server-on-aws/12.png)

เขียน Description ให้กับ Security Group ของเราได้เลย เพื่อให้รู้ว่าใช้สำหรับอะไร

![Security group description](/blog/how-to-create-minecraft-server-on-aws/13.png)

ต่อมาเราจะจัดการ Inbound Security Group Rules เพื่อเปิด Port ที่ Minecraft Server ใช้งานครับ ตอนนี้ AWS ตั้งค่า `SSH (TCP 22)` แบบ `Anywhere` มาให้แล้ว เพื่อให้ Login เข้า VM ได้จากทุกที่ (แต่ถ้าจะปลอดภัยกว่านี้แนะนำให้ระบุ IP ที่รู้จักแทน)

![Default inbound security group rules](/blog/how-to-create-minecraft-server-on-aws/14.png)

เดี๋ยวมาเพิ่ม SSH Rule อีกอัน เพื่อให้เรา Login เข้า VM ผ่านหน้าเว็บ AWS ได้ด้วย กดที่ **Add security group rule**

![Adding a security group rule](/blog/how-to-create-minecraft-server-on-aws/15.png)

เลือก Type เป็น `SSH`, Source type เป็น `Custom`, แล้ว Source ค้นหาว่า "ec2" จากนั้นเลือก `com.amazonaws.<region>.ec2-instance-connect`

ต่อมาเป็น Rule ของ Minecraft Server เอง กดที่ **Add security group rule** อีกครั้ง เลือก Type เป็น `Custom TCP`, Port range เป็น `25565`, Source type เป็น `Anywhere` เพื่อให้ผู้เล่น Minecraft เชื่อมต่อเข้ามาเล่นได้จากทุกที่

![Adding Minecraft port rule](/blog/how-to-create-minecraft-server-on-aws/16.png)

สำหรับ Security Group Rules พวกนี้เรากลับมาแก้ทีหลังได้ตลอด ถ้าจะเพิ่มหรือลด Port ที่เปิดก็ทำได้เลยจากเมนูด้านซ้าย

![EC2 dashboard sidebar](/blog/how-to-create-minecraft-server-on-aws/17.png)

กลับมาตั้งค่า Storage กันต่อครับ ในที่นี้ผมใช้ `20 GB` ซึ่งพอสำหรับ Minecraft Server ขนาดเล็ก ๆ แล้ว แต่ถ้าใครอยากเพิ่มก็ปรับได้เลย

![Instance storage settings](/blog/how-to-create-minecraft-server-on-aws/18.png)

ครบแล้วครับส่วนหลัก ๆ ที่ต้องสนใจ กด **Launch instance** ได้เลย

![Launching the instance](/blog/how-to-create-minecraft-server-on-aws/19.png)

รอมันสร้างแป๊บนึงนะครับ

![Instance creation progress](/blog/how-to-create-minecraft-server-on-aws/20.png)

สร้างเสร็จแล้ว กด Instance ID เพื่อเข้าไปดูรายละเอียดของ Instance เราได้เลย

![Instance created successfully](/blog/how-to-create-minecraft-server-on-aws/21.png)

จะเห็นว่า **Instance state** ตอนนี้เป็น `Running` แล้ว แปลว่า VM ของเราพร้อมใช้งานแล้ว ต่อไปเราจะเข้าไปติดตั้ง Minecraft Server กัน กดที่ **Connect** ได้เลย

![Running instance details](/blog/how-to-create-minecraft-server-on-aws/22.png)

เลือกแท็บ **EC2 Instance Connect** แล้วกด **Connect** เพื่อเข้าไปใน VM ของเราได้เลย

![EC2 Instance Connect tab](/blog/how-to-create-minecraft-server-on-aws/23.png)

Login เข้ามาได้แล้ว

![Logged into EC2 instance](/blog/how-to-create-minecraft-server-on-aws/24.png)

ให้เราติดตั้ง Software Package ที่ต้องใช้ก่อน โดยใช้คำสั่งนี้ แล้วเขาจะบอกว่า "Press [Enter] to continue" เราก็กด Enter ไป จากนั้นรอไม่นานก็จะขึ้นว่า `Done`

```bash
sudo add-apt-repository ppa:openjdk-r/ppa
```

![Adding OpenJDK repository on AWS](/blog/how-to-create-minecraft-server-on-aws/25.png)

จากนั้น Update รายการ Software Package ด้วยคำสั่งนี้

```bash
sudo apt update
```

![Updating package lists on AWS](/blog/how-to-create-minecraft-server-on-aws/26.png)

เอาล่ะ มาติดตั้ง OpenJDK + JRE เพื่อให้รัน Minecraft Server ได้

เราจะติดตั้ง OpenJDK Version 21 + JRE เพราะใช้กับ Minecraft Server Version 1.21.1 ด้วยคำสั่งนี้ (จะมีให้พิมพ์ยืนยันนิดนึง ก็พิมพ์ `Y` แล้วกด Enter ไปได้เลย)

```bash
sudo apt install openjdk-21-jre-headless
```

![Installing OpenJDK on AWS](/blog/how-to-create-minecraft-server-on-aws/27.png)

ติดตั้งเสร็จแล้ว

![OpenJDK installation completed](/blog/how-to-create-minecraft-server-on-aws/28.png)

ทีนี้เราจะมาติดตั้ง Software อีกตัวชื่อ Screen เอาไว้สร้าง Session ให้รันอยู่เบื้องหลังได้ เพราะถ้าเรา Start Minecraft Server แล้ว ปิด Terminal ไปมันจะได้ไม่ Stop ตามไปด้วย

```bash
sudo apt install screen
```

![Installing Screen on AWS](/blog/how-to-create-minecraft-server-on-aws/29.png)

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

![Downloading Minecraft server jar on AWS](/blog/how-to-create-minecraft-server-on-aws/30.png)

ต่อมาเราจะเปิด Screen Session ไว้ก่อน เพราะเตรียมรัน Minecraft Server แล้ว

พิมพ์คำสั่งนี้ แล้วกด Enter

```bash
screen
```

จะได้หน้าตาแบบนี้

![Started Screen session](/blog/how-to-create-minecraft-server-on-aws/31.png)

ให้กด Space Bar หรือ Enter แล้วมันจะกลับมาหน้าปกติของ Terminal

เอาล่ะ และแล้วก็มาถึงเวลาที่รอคอย Start Minecraft Server นั่นเอง

พิมพ์คำสั่งนี้แล้ว Enter เลย

```bash
java -Xmx1024M -Xms1024M -jar minecraft_server.1.21.1.jar nogui
```

แล้วเราจะเจอว่ามัน Error อ้าว แต่ไม่ต้องตกใจนะ เป็นเรื่องปกติ

![Minecraft server EULA error on AWS](/blog/how-to-create-minecraft-server-on-aws/32.png)

มันให้เราไปยอมรับ EULA (End-User License Agreement) ก่อน โดยการเปิดไฟล์ `eula.txt` ใน Text Editor ที่ถนัดได้เลย ผมขอใช้ Nano ละกัน

```bash
nano eula.txt
```

เปลี่ยนค่าของ `eula` ให้เป็น `true`

![Editing EULA file on AWS](/blog/how-to-create-minecraft-server-on-aws/33.png)

กด `Ctrl + O` แล้ว Enter เพื่อ Save ไฟล์ จากนั้นกด `Ctrl + X` เพื่อออกจาก Nano

ต่อมาเราจะมาตั้งค่า Server กันนิดนึง อันนี้แล้วแต่ว่าอยากเปลี่ยนค่าหรือเปล่า โดยใช้คำสั่ง

```bash
nano server.properties
```

ที่ผมจะเปลี่ยนจะมีความยากของเกม (`difficulty`) เป็น `normal` และแก้ข้อความที่จะแสดงใต้ชื่อ Server (`motd`) ด้วย จริง ๆ มันมีอะไรให้ปรับได้เยอะมาก ลองไปศึกษาดูว่าแต่ละ Property คืออะไร

![Editing server properties on AWS](/blog/how-to-create-minecraft-server-on-aws/34.png)

แก้เสร็จแล้วก็ Save แล้วก็ออกจาก Text Editor

ทีนี้ให้เรา Start Minecraft Server อีกรอบ

```bash
java -Xmx1024M -Xms1024M -jar minecraft_server.1.21.1.jar nogui
```

และก็รอมัน Generate World นิดนึง จนเจอข้อความว่า `Done (xx.xxxs)! For help, type "help"` อันนี้ถือว่า Start Minecraft Server สำเร็จแล้ว

![Minecraft server started successfully on AWS](/blog/how-to-create-minecraft-server-on-aws/35.png)

ทีนี้เรามาลองเข้าไป Join Minecraft Server ของเรากัน

เปิดเกม Minecraft ขึ้นมาเลย แล้วกดไปที่ Multiplayer

![Minecraft multiplayer menu](/blog/how-to-create-minecraft-server-on-aws/36.png)

กด Add Server

![Add server button in Minecraft](/blog/how-to-create-minecraft-server-on-aws/37.png)

จะเห็นเป็นแบบนี้ ตรง Server Name จะกรอกอะไรก็ได้ตามใจ ส่วนตรง Server Address ให้กรอกเป็นเลข IP ของ VM เรานะครับ ซึ่งดูได้จากหน้า Instance summary ตรง Public IPv4 address หรือจะใช้ Public DNS ก็ได้เหมือนกัน แล้วกด Done ถ้าจะให้เพื่อนเข้ามาเล่นด้วยก็ส่งเลข IP หรือ DNS ให้เพื่อนไปได้เลย

(แต่ต้องบอกเพิ่มนิดนึงว่า IP/DNS ของ VM มันจะเปลี่ยนทุกครั้งที่เราปิดแล้วเปิดใหม่ ถ้าใครอยากให้คงที่ก็ต้องไปตั้งค่า Elastic IP เพิ่มเติมนะครับ)

![Adding server address in Minecraft](/blog/how-to-create-minecraft-server-on-aws/38.png)

ถ้าทุกอย่างถูกต้อง เราก็จะเห็นว่า Minecraft Server พร้อมให้เข้าไปเล่นแล้ว

ปล. เห็นข้อความใต้ชื่อ Server ไหม มาจากที่เราแก้ใน `server.properties` นั่นแหละ

![Minecraft server ready to join](/blog/how-to-create-minecraft-server-on-aws/39.png)

ไหนลองเข้าไปเล่นดูหน่อย

![Joining Minecraft server on AWS](/blog/how-to-create-minecraft-server-on-aws/40.png)

เล่นได้แล้วววววว

เดี๋ยวก่อนจะจบ Blog นี้ ยังมีอีกเรื่องที่ขาดไม่ได้ คือการปล่อยให้ Minecraft Server ทำงานตลอดเวลา เราจะมาเรียนรู้วิธีใช้งาน Screen สำหรับจัดการ Session กันนิดนึง

คือตอนแรกก่อนที่จะ Start Minecraft Server เราได้สร้าง Screen Session ไปแล้วด้วยคำสั่ง `screen` แล้วเนอะ ทีนี้เราจะลองออกจาก Session กัน (แต่ไม่ได้ปิด Session นะ ระบบยังทำงานอยู่เบื้องหลัง) โดยการกด `Ctrl + A + D` จะได้ผลลัพธ์ประมาณนี้

![Detaching from Screen session on AWS](/blog/how-to-create-minecraft-server-on-aws/41.png)

ทีนี้ลอง List Screen Session มาดูว่าเปิด Session อะไรไว้อยู่บ้าง ด้วย `screen -list` จะเห็นว่าตอนนี้มีอยู่ 1 Session ที่ทำงานอยู่เบื้องหลัง

![Listing Screen sessions on AWS](/blog/how-to-create-minecraft-server-on-aws/42.png)

จากภาพด้านบน จำเลขที่ชี้ไว้นะ เราจะเอาไว้ใช้เวลาจะกลับไปทำงานกับ Session นั้น โดยใช้คำสั่ง `screen -r <เลข Session>` เช่น `screen -r 26103` พอพิมพ์แล้ว Enter ก็จะเห็นว่าเรากลับมาที่หน้า Minecraft Server เหมือนเดิม

![Reattaching to Screen session on AWS](/blog/how-to-create-minecraft-server-on-aws/43.png)

อีกนิดนึง ที่ Minecraft Server ที่กำลังทำงานอยู่ เราสามารถพิมพ์ Command ของ Minecraft ได้ เช่น ให้สิทธิ์ OP, เสกของ หรือเตะคนออกจาก Server

ถ้าอยากรู้ว่าใช้ Command อะไรได้บ้าง ลองพิมพ์ `help` แล้วกด Enter ดู มันจะแสดงรายงานของ Command ที่ใช้งานได้

![Minecraft server help command output](/blog/how-to-create-minecraft-server-on-aws/44.png)

จบของจริง

วิธีที่สอนไปจริง ๆ ไม่ได้จำกัดอยู่แค่กับ AWS นะ สามารถใช้วิธีนี้กับ VM บน Cloud เจ้าอื่น ๆ ได้ด้วยเหมือนกัน ต่างกันแค่ราคาและวิธีการสร้าง VM เท่านั้นเอง ส่วนตอนเปิด Minecraft Server ที่ทำผ่าน Terminal ก็ทำเหมือนกันทุก VM

หวังว่า Blog นี้จะเป็นประโยชน์สำหรับคนที่ต้องการเปิด Minecraft Server ทุกคน อย่างน้อยก็ตัวผมเองนี่แหละที่ถ้าลืมวิธีเปิดก็คงได้กลับมาอ่าน Blog ตัวเอง
