---
title: "How to Create a Terraria Server on DigitalOcean (Step by Step)"
description: "A detailed guide with pictures on how to create a Terraria Server on DigitalOcean. You can read it even if you don't use DigitalOcean."
createdAt: "Sep 28, 2025"
heroImage: "/blog/how-to-create-terraria-server-on-digitalocean/banner.png"
tags:
  - "Terraria Server"
  - "DigitalOcean"
  - "Cloud Hosting"
  - "Game Server"
  - "Hobby"
---

> In this blog, I will use Terraria Version 1.4.4.9 as an example for the Terraria Server.

## Why Create Your Own Terraria Server?

You may ask: Terraria already has Multiplayer, right? One person can be the Host, and that is enough. Why create your own server and pay for the Cloud?

Here is my problem. When we play with many people, we often have different free time. Sometimes I am free in the daytime, but my friend is free at night. Some days I don't want to play, but my friend does. Right now, everything depends on the Host. If the Host is busy, we can't play. If the Host doesn't want to play, we can't play.

**Wouldn't it be nicer to have a Server that is always on? Then we can join and play any time we want. So I decided to create my own Server!**

## Sign Up for DigitalOcean

The first step is simple. We need to sign up for DigitalOcean.  
Click this link: [https://www.digitalocean.com/](https://www.digitalocean.com/)  
_(If you already have an account, skip this step.)_

## Start Creating a Droplet

After you log in, you will see **first-project**. DigitalOcean creates this Project for you, so you can start right away.

I will use **first-project** here. But if you want a separate Project, click the **New Project** button.

![DigitalOcean first project interface](/blog/how-to-create-terraria-server-on-digitalocean/1.png)

To create a Terraria Server on the Cloud, we need a VM. DigitalOcean calls a VM a **Droplet**.

> Droplets are Linux-based virtual machines (VMs) that run on top of virtualized hardware. Each Droplet you create is a new server you can use, either standalone or as part of a larger, cloud-based infrastructure.

Click the **Droplets** menu. Then click **Create Droplet**.

![Create Droplet button in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/2.png)

## Choose a Region and Datacenter

Next, choose a **Region**. This is the place where your Server will live. Then choose a Datacenter.

I use the **Singapore** Region because it is the closest to Thailand, so the Ping is lower. Singapore has only one Datacenter, so I have no other choice. I just use the one they give me.

![Region selection in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/3.png)

## Choose an OS and OS Version

Then choose the **OS** and **OS Version** you want.

I use **Ubuntu** Version **24.04 (LTS) x64**.

![Operating system selection in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/4.png)

## Choose the Droplet Size

Next, choose the **Size**. This is the Spec of your machine.  
**I recommend 2 CPUs and 4 GB of Ram.** (I tried 1 CPU and 2 GB of Ram once. It could not create a large World.)

I use **Basic > Regular > 2 CPUs Ram 4 GB**. The price is in the picture: $24/month. (At the time I write this blog, that is about 773.46 baht/month.)

![Droplet size selection in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/5.png)

## Add Storage and Backup (Optional)

This part is up to you. If you worry about space, you can add more **Storage**. But it costs extra.  
You can also turn on **Backup** for your data. It costs extra too. I don't take either one.

![Additional storage and backup options in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/6.png)

## Choose a Login Method

Next, choose how to **Login** and control this Droplet.  
If you want to be a bit safer, use an **SSH Key**.  
If you want it easy, use a **Password**.  
I will use a **Password**. It is easy.

![Login method selection in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/7.png)

## Turn On Metrics Monitoring

Next are the things DigitalOcean recommends.  
I take only **Add improved metrics monitoring and alerting**, because it is Free. (With this, we can Monitor the Droplet. We can see how much CPU, Ram, and Storage we use, and more.)

![Metrics monitoring option in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/8.png)

## Name Your Droplet and Choose a Project

We are almost done creating the Droplet. Just a little more!  
Give it a name, so you remember what this Droplet is. If you have many Projects, you can also choose which Project it goes in. Then click **Create Droplet**.  
In this blog, I name it **terraria-server** and I use **first-project**.

![Droplet naming and project selection in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/9.png)

Wait a moment while it creates the Droplet.

![Droplet creation progress in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/10.png)

The Droplet is ready.

![Droplet creation completed in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/11.png)

## Start the Terraria Server

Okay, now we will start the Terraria Server.  
Click the Droplet name to open its details page.

![Droplet details page in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/12.png)

Now click the **Console** button to control this Droplet.

![Console button in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/13.png)

You will see a Terminal like this.

![Terminal interface in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/14.png)

### 1. Update the Software Package List

First, update the Software Package list with this command.

```bash
sudo apt update
```

![Updating software packages](/blog/how-to-create-terraria-server-on-digitalocean/15.png)

### 2. Install Unzip

Okay, let's install **Unzip** first. The Terraria Server file we will download is a `.zip` file.

```bash
sudo apt install unzip
```

![Installing Unzip](/blog/how-to-create-terraria-server-on-digitalocean/16.png)

### 3. Install Screen

Now we will install another Software called **Screen**. It lets us create a Session in the system and keep it running in the background. After we Start the Terraria Server, we need to leave it running in the background. With Screen, closing the Terminal will not Stop our Terraria Server.

```bash
sudo apt install screen
```

![Installing Screen](/blog/how-to-create-terraria-server-on-digitalocean/17.png)

### 4. Config the Firewall

Next, we will Config the **Firewall** a little. This lets us connect to the Terraria Server on Port 7777. Use this command.

```bash
sudo ufw allow 7777
```

![Configuring firewall for Terraria](/blog/how-to-create-terraria-server-on-digitalocean/18.png)

### 5. Create a Directory for Our Files

Now let's stop and create a **Directory**. This keeps our files neat.

```bash
mkdir app
cd app
```

![Creating app directory](/blog/how-to-create-terraria-server-on-digitalocean/19.png)

### 6. Download and Extract the Terraria Server

Next, we will Download **Terraria Server Version 1.4.4.9** to our machine with this command.  
(I got the Download link from the Terraria Wiki: [https://terraria.wiki.gg/wiki/Server#Downloads](https://terraria.wiki.gg/wiki/Server#Downloads))

```bash
wget https://terraria.org/api/download/pc-dedicated-server/terraria-server-1449.zip
```

Then extract the file with this command.

```bash
unzip terraria-server-1449.zip
```

![Downloading and extracting Terraria Server](/blog/how-to-create-terraria-server-on-digitalocean/20.png)

The files are extracted.

![Extracted Terraria Server files](/blog/how-to-create-terraria-server-on-digitalocean/21.png)

### 7. Go Into the Terraria Server Directory

List the Directory. You will see a folder named after the Version number, `1449`. Go into that folder.

```bash
ls -l
cd 1449
```

![Navigating to Terraria Server directory](/blog/how-to-create-terraria-server-on-digitalocean/22.png)

List the Directory again. You will see folders for each OS it supports. We use Linux, so go into the `Linux` folder.

```bash
ls -l
cd Linux
```

![Navigating to Linux directory](/blog/how-to-create-terraria-server-on-digitalocean/23.png)

### 8. Give Permission to the Terraria Server File

The Terraria Server file we will run is `TerrariaServer.bin.x86_64`. But right now we don't have permission to run it. We need to give it permission first. Use this command.

```bash
chmod +x TerrariaServer.bin.x86_64
```

![Adding execute permission to Terraria Server binary](/blog/how-to-create-terraria-server-on-digitalocean/24.png)

### 9. Open a Screen Session

Next, we will open a **Screen Session**, because we are ready to run the Terraria Server.

Type this command, then press Enter.

```bash
screen
```

It will look like this.

![Screen session started](/blog/how-to-create-terraria-server-on-digitalocean/25.png)

Press Space Bar or Enter. You will go back to the normal Terminal screen.

### 10. Start the Terraria Server

Okay, the moment we waited for is here. Time to **Start the Terraria Server**!

Type this command and press Enter.

```bash
./TerrariaServer.bin.x86_64
```

First, it asks if we want to create a new World or use an existing one. We don't have any World yet, so we will create a new one. Type `n` and press Enter.

![Starting Terraria Server and creating new world](/blog/how-to-create-terraria-server-on-digitalocean/26.png)

#### Choose the World Size

Then choose the size of the World: Small, Medium, or Large. Type the number 1, 2, or 3 and press Enter.

I choose **Large**.

> The World size also changes how much Ram the Server uses. The bigger the World, the more Ram it uses.

![Selecting world size](/blog/how-to-create-terraria-server-on-digitalocean/27.png)

#### Choose the World Difficulty

Then choose the difficulty: Classic, Expert, Master, or Journey. Type the number 1, 2, 3, or 4 and press Enter.

I choose **Master**.

![Selecting world difficulty](/blog/how-to-create-terraria-server-on-digitalocean/28.png)

#### Choose the Evil Biome

Next, choose the Evil Biome: Random, Corrupt, or Crimson. Type the number 1, 2, or 3 and press Enter.

I choose **Random**.

![Selecting evil biome](/blog/how-to-create-terraria-server-on-digitalocean/29.png)

#### Name the World

Then type the name of your World and press Enter.

I name mine **MyFirstWorld**.

![Naming the world](/blog/how-to-create-terraria-server-on-digitalocean/30.png)

#### Enter the World Seed

Then type the Seed for your World. (If you don't want one, leave it empty and it will pick one for you.) Press Enter.

I don't type anything. I leave it empty.

![Entering world seed](/blog/how-to-create-terraria-server-on-digitalocean/31.png)

#### Wait for the World to Be Created

Now wait a while for it to create the World.

![World creation in progress](/blog/how-to-create-terraria-server-on-digitalocean/32.png)

The World is ready.

> The World file is saved at `~/.local/share/Terraria/Worlds/`

It goes back to the World selection screen again.

This time, choose the World we just created. Type `1` and press Enter.

![Selecting the created world](/blog/how-to-create-terraria-server-on-digitalocean/33.png)

#### Set the Maximum Players

Then type the maximum number of players you want. (If you leave it empty, it uses the Default, which is 16 players.) Press Enter.

> The maximum number of players also changes how much Ram the Server uses. The more players, the more Ram it uses.

I leave it empty.

![Setting maximum players](/blog/how-to-create-terraria-server-on-digitalocean/34.png)

#### Set the Port

Next, set the Port to use. (If you leave it empty, it uses the Default, which is 7777.) Press Enter.

I leave it empty.

![Setting server port](/blog/how-to-create-terraria-server-on-digitalocean/35.png)

#### Set UPnP Port Forwarding

This step asks if you want it to Forward the Port automatically.

> If you use a Router that supports UPnP, it will Forward the Port for you automatically.

I don't use a Router, because we use a Cloud Server. So I type `n` and press Enter.

![UPnP port forwarding option](/blog/how-to-create-terraria-server-on-digitalocean/36.png)

#### Set a Password to Join the Server

Next, type a Password for joining the Server. (If you leave it empty, there is no Password. But please set one. It is safer.) Press Enter.

I use `Th1s_Secret` as the Password.

![Setting server password](/blog/how-to-create-terraria-server-on-digitalocean/37.png)

#### Wait for the Terraria Server to Start

Then wait a while for the Terraria Server to Start.

![Terraria Server starting](/blog/how-to-create-terraria-server-on-digitalocean/38.png)

The Terraria Server is up and running.

![Terraria Server started](/blog/how-to-create-terraria-server-on-digitalocean/39.png)

## How to Join the Terraria Server

Now let's try to Join our Terraria Server.

Open the Terraria game and click **Multiplayer**.

![Terraria Multiplayer menu](/blog/how-to-create-terraria-server-on-digitalocean/40.png)

Then click **Join via IP**.

![Terraria Join via IP option](/blog/how-to-create-terraria-server-on-digitalocean/41.png)

Choose the character you want to play.

![Terraria character selection](/blog/how-to-create-terraria-server-on-digitalocean/42.png)

Type the IP address of our Droplet and click Accept. (If you want your friends to play too, just send them this IP address.)

![Entering server IP in Terraria](/blog/how-to-create-terraria-server-on-digitalocean/43.png)

**The question is: where do we get the IP address of our Droplet?**  
Actually, we already saw this number twice.

- The first time is here. Click Copy.

  ![Droplet IP address in DigitalOcean](/blog/how-to-create-terraria-server-on-digitalocean/44.png)

- The second time is here. Click Copy.  
  (It is the same value as the first one. Copy from whichever place you like.)

  ![Droplet IP address in details page](/blog/how-to-create-terraria-server-on-digitalocean/45.png)

The Port is 7777 by default, so you don't need to change anything. Then click Accept.

![Terraria server connection details](/blog/how-to-create-terraria-server-on-digitalocean/46.png)

If everything is right, it will ask for a Password. Type the Password you set when you Started the Server, then click Accept.

![Entering server password in Terraria](/blog/how-to-create-terraria-server-on-digitalocean/47.png)

Sometimes you may get stuck on the **Found Server** screen like this.

![Terraria server found screen](/blog/how-to-create-terraria-server-on-digitalocean/48.png)

Don't worry. Click Cancel and try to Join again.

We are in. Yay!

![Successfully joined Terraria server](/blog/how-to-create-terraria-server-on-digitalocean/49.png)

## Using Screen to Manage Sessions

Wait, before we end this blog, there is one more thing we must cover. We want the Terraria Server to run all the time. So let's learn a little about how to use **Screen** to manage Sessions.

Before we Started the Terraria Server, we created a Screen Session with the `screen` command, remember? Now let's leave the Session. (We don't close it. The system keeps running in the background.) Press `Ctrl + A + D`. You will see something like this.

![Detaching from Screen session](/blog/how-to-create-terraria-server-on-digitalocean/50.png)

Now let's List the Screen Sessions to see which ones are open.  
Use `screen -list`. You will see that we have 1 Session running in the background.

![Listing Screen sessions](/blog/how-to-create-terraria-server-on-digitalocean/51.png)

Remember the number in the picture above. We need it when we want to go back to that Session. Use the command `screen -r <Session number>`. For example:

```bash
screen -r 3601
```

After you press Enter, you will see that we are back at the Terraria Server screen, just like before.

![Reattaching to Screen session](/blog/how-to-create-terraria-server-on-digitalocean/52.png)

## Terraria Server Commands

Just one more little thing! While the Terraria Server is running, we can type Terraria Commands. For example, we can kick a player out of the Server, send a message to the people in the Server, see who is in the Server, or even shut down the Server.

If you want to know which Commands you can use, type `help` and press Enter. It will show the list of Commands.

_(If you type it and get Invalid Command, press Enter once first. A `:` will show up, and then you can type Commands.)_

```bash
help
```

![Terraria server commands](/blog/how-to-create-terraria-server-on-digitalocean/53.png)

## Summary

The method in this blog is not only for DigitalOcean.  
You can use it with a VM on other Cloud providers too. Only the price and the way to create the VM are different. The steps to start the Terraria Server in the Terminal are the same on every VM.

I hope this blog helps everyone who wants to create a Terraria Server. At least it helps me. If I forget how to do it, I can come back and read my own blog.

Last, thank you to the Terraria Wiki for their docs.  
[https://terraria.wiki.gg/wiki/Server](https://terraria.wiki.gg/wiki/Server)  
Part of the steps in this blog come from that page.
