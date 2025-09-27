---
title: "วิธีเปิด Terraria Server บน DigitalOcean (แบบละเอียด)"
description: "วิธีเปิด Terraria Server บน DigitalOcean แบบละเอียดพร้อมภาพประกอบ ถึงไม่ใช้ DigitalOcean ก็อ่านได้"
createdAt: "Sep 28, 2025"
heroImage: "/blog/how-to-create-terraria-server-on-digitalocean/banner.png"
tags:
  - "Terraria Server"
  - "DigitalOcean"
  - "Cloud Hosting"
  - "Game Server"
  - "Hobby"
---

# วิธีเปิด Terraria Server บน DigitalOcean (แบบละเอียด)

> Terraria Server ใน Blog นี้จะใช้เปิดสำหรับ Terraria Version 1.4.4.9 เป็นตัวอย่าง

## ทำไมต้องเปิด Terraria Server เอง?

คุณอาจจะสงสัยว่า Terraria มันก็สามารถเล่นแบบ Multiplayer ได้อยู่แล้วนี่นา แค่ให้คนนึงเป็น Host ก็พอแล้ว ทำไมต้องมาเปิด Server เอง คอยจ่ายค่า Cloud ด้วย?

ผมเจอปัญหาว่าเวลาเล่นหลาย ๆ คน หลายครั้งที่เราว่างไม่ตรงกัน บางทีผมว่างตอนกลางวัน แต่เพื่อนผมว่างตอนกลางคืน บางวันผมไม่อยากเล่น แต่เพื่อนผมอยากเล่น ตอนนี้ทุกอย่างมันขึ้นกับคนที่เป็น Host หมดเลย ถ้าเขาไม่ว่าง เราก็เล่นไม่ได้ ถ้าเขาไม่อยากเล่น เราก็เล่นไม่ได้

**จะดีกว่าไหมถ้าเรามี Server ที่เปิดตลอดเวลา เราจะเข้าไปเล่นตอนไหนก็ได้ เลยตัดสินใจมาเปิด Server เองซะเลย**

## สมัคร DigitalOcean

อย่างแรกคงเป็นอะไรไปไม่ได้นอกจากไปสมัคร DigitalOcean ก่อน  
กดที่ลิงก์นี้ได้เลย [https://www.digitalocean.com/](https://www.digitalocean.com/)  
_(ถ้าสมัครแล้วก็ข้ามขั้นตอนนี้ไปเลย)_

## เริ่มต้นสร้าง Droplet

พอเรา Login เข้ามาแล้ว ก็จะเจอกับ **first-project** เป็น Project เริ่มต้นที่ทาง DigitalOcean เขาสร้างไว้ให้เราเริ่มใช้งานได้เลย

ซึ่งนี้ผมจะใช้ **first-project** นี่แหละ แต่ว่าใครอยากสร้าง Project แยกก็กดปุ่ม **New Project** ได้เลย

![DigitalOcean first project interface](/blog/how-to-create-terraria-server-on-digitalocean/1.png)

ในการสร้าง Terraria Server บน Cloud นั้น เราจะใช้ VM ซึ่ง VM ใน DigitalOcean เขาเรียกมันว่า **Droplet**

> Droplets are Linux-based virtual machines (VMs) that run on top of virtualized hardware. Each Droplet you create is a new server you can use, either standalone or as part of a larger, cloud-based infrastructure.

กดที่เมนู **Droplets** จากนั้นกด **Create Droplet**

![Create Droplet button in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/2.png)

## เลือก Region และ Datacenter

ต่อมาเลือก **Region** ว่าเราจะใช้ Server ที่อยู่ Region ไหน และเลือก Datacenter

ผมใช้ Region **Singapore** เพราะว่าอยู่ใกล้ไทยสุด Ping จะได้น้อยหน่อย ส่วน Datacenter ที่ Singapore มีที่เดียวอะนะ เลยไม่มีตัวเลือกอื่น ก็ใช้ที่เขาให้มานั่นแหละ

![Region selection in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/3.png)

## เลือก OS และ OS Version

และก็เลือก **OS** และ **OS Version** ที่ต้องการ

ผมใช้ OS **Ubuntu** Version **24.04 (LTS) x64**

![Operating system selection in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/4.png)

## เลือกขนาด Droplet (Size)

ต่อมาเลือก **Size** ประมาณว่าเลือก Spec เครื่องที่ต้องการ  
**แนะนำ 2 CPUs และ Ram 4 GB** นะ (เคยลอง 1 CPU Ram 2 GB มันสร้าง World ขนาดใหญ่ไม่ไหว)

ผมใช้ **Basic > Regular > 2 CPUs Ram 4 GB** ราคาก็ตามในภาพ $24/เดือน (ถ้าตอนนี้ที่เขียน Blog นี้ก็ประมาณ 773.46 บาท/เดือน)

![Droplet size selection in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/5.png)

## เพิ่ม Storage และ Backup (ถ้าต้องการ)

ส่วนตรงนี้แล้วแต่ ใครอยากเพิ่ม **Storage** ก็เพิ่มได้ ถ้ากลัวไม่พอ แต่คิดเงินเพิ่มนะ  
และก็ใครอยาก **Backup** ข้อมูลไว้ด้วยก็กดได้ คิดเงินเพิ่มเหมือนกัน ส่วนผมไม่เอาทั้งคู่

![Additional storage and backup options in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/6.png)

## เลือกวิธี Login

ต่อมาเป็นการเลือกวิธีการ **Login** เข้าไปควบคุม Droplet เครื่องนี้  
ถ้าอยากปลอดภัยหน่อยก็ใช้ **SSH Key**  
ถ้าเอาแบบง่ายก็ใช้ **Password**  
ผมขอใช้ **Password** ละกัน ง่ายดี

![Login method selection in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/7.png)

## เปิด Metrics Monitoring

ต่อมาเป็นสิ่งที่ DigitalOcean เขาแนะนำให้เราใช้  
ผมเอาแค่ **Add improved metrics monitoring and alerting** พอ เพราะมัน Free (อันนี้เอาไว้ Monitor Droplet ได้ว่าตอนนี้ CPU ใช้ไปเท่าไรแล้ว, Ram ใช้ไปเท่าไรแล้ว, Storage ใช้ไปเท่าไรแล้ว และอื่น ๆ)

![Metrics monitoring option in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/8.png)

## ตั้งชื่อ Droplet และเลือก Project

ใกล้จะสร้าง Droplet เสร็จแล้ว อีกนิดเดียว  
อันนี้ตั้งชื่อให้เราจำได้กันว่า Droplet คืออะไร และก็ถ้าเรามีหลาย Project ก็เลือกได้ว่าจะสร้างไว้ที่ Project ไหน จากนั้นก็กด **Create Droplet** เลย  
ใน Blog นี้ผมตั้งชื่อว่า **terraria-server** และใช้ **first-project**

![Droplet naming and project selection in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/9.png)

รอมันสร้างแป๊บนึง

![Droplet creation progress in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/10.png)

สร้าง Droplet เสร็จแล้ว

![Droplet creation completed in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/11.png)

## เริ่มเปิด Terraria Server

เอาล่ะ ต่อมาจะเริ่มเปิด Terraria Server แล้วนะ  
กดที่ชื่อ Droplet เพื่อเข้าไปหน้ารายละเอียดของ Droplet

![Droplet details page in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/12.png)

ที่นี้กดที่ปุ่ม **Console** เพื่อเข้าไปควบคุม Droplet เครื่องนี้

![Console button in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/13.png)

จะเจอหน้า Terminal แบบนี้

![Terminal interface in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/14.png)

### 1. Update รายการ Software Package

เริ่มจาก Update รายการ Software Package ด้วยคำสั่งนี้

```bash
sudo apt update
```

![Updating software packages](/blog/how-to-create-terraria-server-on-digitalocean/15.png)

### 2. ติดตั้ง Unzip

เอาล่ะ มาติดตั้ง **Unzip** ก่อน เพราะไฟล์ Terraria Server ที่เราจะโหลดมานั้นเป็นไฟล์ `.zip`

```bash
sudo apt install unzip
```

![Installing Unzip](/blog/how-to-create-terraria-server-on-digitalocean/16.png)

### 3. ติดตั้ง Screen

ที่นี้เราจะมาติดตั้ง Software อีกตัวนึงชื่อ **Screen** เอาไว้ทำให้เราสร้าง Session ในระบบแล้วปล่อยมันทำงานอยู่เบื้องหลังได้ เพราะว่าถ้าเรา Start Terraria Server แล้ว เราจะต้องปล่อยมันทำงานอยู่เบื้องหลังไป เวลาปิด Terminal มันจะได้ไม่ไป Stop Terraria Server เรา

```bash
sudo apt install screen
```

![Installing Screen](/blog/how-to-create-terraria-server-on-digitalocean/17.png)

### 4. Config Firewall

ต่อมาเราจะมา Config **Firewall** สักหน่อยเพื่อให้เราสามารถเชื่อมต่อมาที่ Terraria Server ด้วย Port 7777 ได้ ด้วยคำสั่งนี้

```bash
sudo ufw allow 7777
```

![Configuring firewall for Terraria](/blog/how-to-create-terraria-server-on-digitalocean/18.png)

### 5. สร้าง Directory สำหรับเก็บไฟล์

ทีนี้แวะสร้าง **Directory** นิดนึง จะได้เก็บไฟล์เป็นระเบียบ

```bash
mkdir app
cd app
```

![Creating app directory](/blog/how-to-create-terraria-server-on-digitalocean/19.png)

### 6. Download และ Extract Terraria Server

ต่อมาเราจะ Download **Terraria Server Version 1.4.4.9** มาลงเครื่องด้วยคำสั่งนี้  
(ลิงก์ Download ก็เอามาจากเว็บ Terraria Wiki [https://terraria.wiki.gg/wiki/Server#Downloads](https://terraria.wiki.gg/wiki/Server#Downloads))

```bash
wget https://terraria.org/api/download/pc-dedicated-server/terraria-server-1449.zip
```

แล้วก็แตกไฟล์ด้วยคำสั่งนี้

```bash
unzip terraria-server-1449.zip
```

![Downloading and extracting Terraria Server](/blog/how-to-create-terraria-server-on-digitalocean/20.png)

แตกไฟล์เสร็จแล้ว

![Extracted Terraria Server files](/blog/how-to-create-terraria-server-on-digitalocean/21.png)

### 7. เข้าไปใน Directory ของ Terraria Server

ลอง List Directory ดู จะเห็นโฟลเดอร์ที่เป็นเลข Version `1449` อยู่ ให้เข้าไปในโฟลเดอร์นั้น

```bash
ls -l
cd 1449
```

![Navigating to Terraria Server directory](/blog/how-to-create-terraria-server-on-digitalocean/22.png)

List Directory ดู จะเห็นโฟลเดอร์แยกตาม OS ที่รองรับ ในกรณีนี้เราจะใช้ Linux ดังนั้นเข้าไปในโฟลเดอร์ `Linux`

```bash
ls -l
cd Linux
```

![Navigating to Linux directory](/blog/how-to-create-terraria-server-on-digitalocean/23.png)

### 8. เพิ่มสิทธิ์ให้ไฟล์ Terraria Server

คือไฟล์ Terraria Server ที่เราจะใช้รันนั้นชื่อ `TerrariaServer.bin.x86_64` แต่ว่าตอนนี้เรายังไม่มีสิทธิ์ในการรันไฟล์นี้ เราต้องเพิ่มสิทธิ์ให้มันก่อน ด้วยคำสั่งนี้

```bash
chmod +x TerrariaServer.bin.x86_64
```

![Adding execute permission to Terraria Server binary](/blog/how-to-create-terraria-server-on-digitalocean/24.png)

### 9. เปิด Screen Session

ต่อมาเราจะเปิด **Screen Session** เพราะเตรียมรัน Terraria Server แล้ว

พิมพ์คำสั่งนี้ แล้วกด Enter

```bash
screen
```

จะได้หน้าตาแบบนี้

![Screen session started](/blog/how-to-create-terraria-server-on-digitalocean/25.png)

ให้กด Space Bar หรือ Enter แล้วมันจะกลับมาหน้าปกติของ Terminal

### 10. Start Terraria Server

เอาล่ะ และแล้วก็มาถึงเวลาที่รอคอย **Start Terraria Server** นั่นเอง

พิมพ์คำสั่งนี้แล้ว Enter เลย

```bash
./TerrariaServer.bin.x86_64
```

ตอนแรกมันจะถามเราว่าเราจะสร้าง World ใหม่ หรือว่าใช้ World ที่มีอยู่แล้ว แต่ตอนนี้เรายังไม่มี World เลย เราจะสร้างใหม่ พิมพ์ `n` แล้ว Enter

![Starting Terraria Server and creating new world](/blog/how-to-create-terraria-server-on-digitalocean/26.png)

#### เลือกขนาด World

จากนั้นก็เลือกขนาดของ World ที่จะสร้าง Small, Medium, Large จะเอาขนาดไหนก็พิมพ์ตัวเลข 1, 2, 3 แล้ว Enter

ผมเลือก **Large**

> ขนาด World มีผลต่อการใช้ Ram ของ Server ด้วยนะ ยิ่งขนาดใหญ่ Ram ก็จะยิ่งกินเยอะตามไปด้วย

![Selecting world size](/blog/how-to-create-terraria-server-on-digitalocean/27.png)

#### เลือกความยากของ World

จากนั้นก็เลือกความยากของ World ที่จะสร้าง Classic, Expert, Master, Journey จะเอาแบบไหนก็พิมพ์ตัวเลข 1, 2, 3, 4 แล้ว Enter

ผมเลือก **Master**

![Selecting world difficulty](/blog/how-to-create-terraria-server-on-digitalocean/28.png)

#### เลือก Evil Biome

ต่อจากเลือก Evil Biome ว่าจะให้มัน Random, Corrupt, Crimson จะเอาแบบไหนก็พิมพ์ตัวเลข 1, 2, 3 แล้ว Enter

ผมเลือก **Random**

![Selecting evil biome](/blog/how-to-create-terraria-server-on-digitalocean/29.png)

#### ตั้งชื่อ World

จากนั้นก็พิมพ์ชื่อ World ที่จะสร้างลงไปเลย แล้ว Enter

ผมตั้งชื่อว่า **MyFirstWorld**

![Naming the world](/blog/how-to-create-terraria-server-on-digitalocean/30.png)

#### ใส่ Seed ของ World

จากนั้นก็พิมพ์ Seed ของ World ที่จะสร้างลงไปเลย (ถ้าไม่ใส่ก็ปล่อยว่างไว้ แล้วเดี๋ยวมันสุ่มให้) แล้ว Enter

ผมไม่ใส่อะไร ปล่อยว่างไว้

![Entering world seed](/blog/how-to-create-terraria-server-on-digitalocean/31.png)

#### รอสร้าง World

ทีนี้ก็รอให้มันสร้าง World สักพัก

![World creation in progress](/blog/how-to-create-terraria-server-on-digitalocean/32.png)

สร้าง World เสร็จแล้ว

> ไฟล์ World จะเก็บอยู่ที่ `~/.local/share/Terraria/Worlds/`

มันจะกลับมาหน้าเลือก World ใหม่อีกครั้ง

รอบนี้เราก็เลือก World ที่เราสร้างไว้เมื่อกี้เลย พิมพ์ `1` แล้ว Enter

![Selecting the created world](/blog/how-to-create-terraria-server-on-digitalocean/33.png)

#### กำหนดจำนวนผู้เล่นสูงสุด

จากนั้นให้ใส่จำนวนผู้เล่นสูงสุดที่เราต้องการ (ถ้าไม่ใส่ก็จะใช้ค่า Default คือ 16 คน) แล้ว Enter

> จำนวนผู้เล่นสูงสุดมีผลต่อการใช้ Ram ของ Server ด้วยนะ ยิ่งจำนวนผู้เล่นสูงสุดเยอะ Ram ก็จะยิ่งกินเยอะตามไปด้วย

ผมปล่อยว่างไว้

![Setting maximum players](/blog/how-to-create-terraria-server-on-digitalocean/34.png)

#### กำหนด Port

ต่อมากำหนด Port ที่จะใช้ (ถ้าไม่ใส่ก็จะใช้ค่า Default คือ 7777) แล้ว Enter

ผมปล่อยว่างไว้

![Setting server port](/blog/how-to-create-terraria-server-on-digitalocean/35.png)

#### ตั้งค่า UPnP Port Forwarding

อันนี้มันจะถามว่าจะให้ทำการ Forward Port อัตโนมัติให้ไหม

> ถ้าเราใช้ Router ที่รองรับ UPnP มันจะ Forward ให้เองอัตโนมัติเลย

ผมไม่ได้ใช้ Router เพราะว่าเราใช้ Cloud Server อยู่ เลยพิมพ์ `n` แล้ว Enter

![UPnP port forwarding option](/blog/how-to-create-terraria-server-on-digitalocean/36.png)

#### ตั้ง Password สำหรับ Join Server

ต่อมาใส่ Password สำหรับ Join Server (ถ้าไม่ใส่ก็จะไม่มี Password แต่ใส่เถอะ ปลอดภัยกว่า) แล้ว Enter

ผมใส่ Password ว่า `Th1s_Secret`

![Setting server password](/blog/how-to-create-terraria-server-on-digitalocean/37.png)

#### รอ Start Terraria Server

จากนั้นก็รอให้มัน Start Terraria Server สักพัก

![Terraria Server starting](/blog/how-to-create-terraria-server-on-digitalocean/38.png)

เปิด Terraria Server เสร็จแล้ว

![Terraria Server started](/blog/how-to-create-terraria-server-on-digitalocean/39.png)

## วิธี Join Terraria Server

ที่นี้เรามาลองเข้าไป Join Terraria Server ของเรากัน

เปิดเกม Terraria ขึ้นมาเลย แล้วกดไปที่ **Multiplayer**

![Terraria Multiplayer menu](/blog/how-to-create-terraria-server-on-digitalocean/40.png)

จากนั้นกดที่ **Join via IP**

![Terraria Join via IP option](/blog/how-to-create-terraria-server-on-digitalocean/41.png)

เลือกตัวละครที่จะใช้เล่น

![Terraria character selection](/blog/how-to-create-terraria-server-on-digitalocean/42.png)

กรอกเลข IP ของ Droplet เรา และก็กด Accept (ถ้าจะให้เพื่อนเข้ามาเล่นด้วยก็ส่งเลข IP ให้เพื่อนไปนั่นแหละ)

![Entering server IP in Terraria](/blog/how-to-create-terraria-server-on-digitalocean/43.png)

**คำถามคือ แล้วเลข IP ของ Droplet เราเอามาจากไหนล่ะ?**  
จริง ๆ เลขนี้ผ่านตาเรามาแล้วสองรอบ

- รอบแรกคือตรงนี้ กด Copy มาเลย

  ![Droplet IP address in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/44.png)

- รอบที่สองคือตรงนี้ กด Copy มาเลย  
  (ค่าเดียวกันกับรอบแรกนั่นแหละ เลือกเอาเลยว่าจะ Copy จากตรงไหน)

  ![Droplet IP address in details page](/blog/how-to-create-terraria-server-on-digitalocean/45.png)

เลข Port มัน Default คือ 7777 อยู่แล้ว ไม่ต้องเปลี่ยนอะไร จากนั้นกด Accept

![Terraria server connection details](/blog/how-to-create-terraria-server-on-digitalocean/46.png)

ถ้าทุกอย่างถูกต้อง มันจะถาม Password ให้ใส่ Password ที่เราตั้งไว้ตอน Start Server ลงไปเลย แล้วกด Accept

![Entering server password in Terraria](/blog/how-to-create-terraria-server-on-digitalocean/47.png)

บางครั้งอาจจะเจออาการค้างอยู่หน้า **Found Server** แบบนี้

![Terraria server found screen](/blog/how-to-create-terraria-server-on-digitalocean/48.png)

ให้กด Cancel แล้วลอง Join ใหม่อีกครั้ง

เข้าได้แล้ว เย้!

![Successfully joined Terraria server](/blog/how-to-create-terraria-server-on-digitalocean/49.png)

## การใช้งาน Screen สำหรับจัดการ Session

เดี๋ยวก่อนจะจบ Blog นี้ ยังมีอีกเรื่องที่ขาดไปไม่ได้ คือการปล่อยให้ Terraria Server มันทำงานตลอดเวลา คือเราจะมาเรียนรู้วิธีการใช้งาน **Screen** สำหรับจัดการ Session กันนิดนึง

คือตอนแรกก่อนที่จะ Start Terraria Server เราได้สร้าง Screen Session ไปแล้วด้วยคำสั่ง `screen` แล้วเนอะ ที่นี้เราจะลองออกจาก Session กัน (แต่ไม่ได้ปิด Session นะ ระบบยังทำงานอยู่เบื้องหลัง) โดยการกด `Ctrl + A + D` จะได้ผลลัพธ์เป็นประมาณนี้อะนะ

![Detaching from Screen session](/blog/how-to-create-terraria-server-on-digitalocean/50.png)

ทีนี้ลอง List Screen Session มาดูว่าเปิด Session อะไรไว้อยู่บ้าง  
ด้วย `screen -list` จะเจอว่าตอนนี้มีอยู่ 1 Session ที่ทำงานอยู่เบื้องหลัง

![Listing Screen sessions](/blog/how-to-create-terraria-server-on-digitalocean/51.png)

จากภาพด้านบน จำเลขที่ชี้ไว้นะ เราจะเอาไว้ใช้เวลาที่จะกลับไปทำงานกับ Session นั้นโดยใช้คำสั่ง `screen -r <เลข Session>` เช่น

```bash
screen -r 3601
```

พอพิมพ์แล้ว Enter ก็จะเห็นว่าเรากลับมาที่หน้า Terraria Server เหมือนเดิม

![Reattaching to Screen session](/blog/how-to-create-terraria-server-on-digitalocean/52.png)

## คำสั่ง Terraria Server

อีกนิดนึง ๆ ที่ Terraria Server ที่มันกำลังทำงานอยู่ เราสามารถพิมพ์ Command ของ Terraria ได้ เช่น เต๊ะคนออกจาก Server, ส่งข้อความไปหาคนที่อยู่ใน Server, ดูว่ามีใครบ้างที่อยู่ใน Server หรือแม้กระทั่งปิด Server ก็ได้

ถ้าอยากรู้ว่าใช้ Command อะไรได้บ้าง ลองพิมพ์ `help` แล้วกด Enter ดู มันก็จะแสดงรายงานของ Command ที่ใช้งานได้

_(ถ้าพิมพ์แล้วได้ Invalid Command ให้ลอง Enter สักรอบก่อน มันจะมี `:` ขึ้นมาให้พิมพ์ Command ได้)_

```bash
help
```

![Terraria server commands](/blog/how-to-create-terraria-server-on-digitalocean/53.png)

## สรุป

วิธีที่สอนไปจริง ๆ ไม่ได้จำกัดอยู่แค่กับ DigitalOcean นะ  
สามารถใช้วิธีนี้กับ VM บน Cloud เจ้าอื่น ๆ ได้ด้วยเหมือนกัน ต่างกันแค่ราคาและวิธีการสร้าง VM เท่านั้นเอง ส่วนตอนเปิด Terraria Server ที่ทำผ่าน Terminal ก็ทำเหมือนกันทุก VM

หวังจาก Blog นี้จะเป็นประโยชน์สำหรับคนที่ต้องการเปิด Terraria Server ทุกคน อย่างน้อยก็ตัวผมเองนี่แหละที่ถ้าลืมวิธีเปิดก็คงได้กลับมาอ่าน Blog ตัวเอง

สุดท้ายก็ขอขอบคุณเอกสารของ Terraria Wiki ด้วยครับ  
[https://terraria.wiki.gg/wiki/Server](https://terraria.wiki.gg/wiki/Server)  
เพราะวิธีการเปิดส่วนนึงก็เอามาจากเอกสารนี้นี่แหละ
