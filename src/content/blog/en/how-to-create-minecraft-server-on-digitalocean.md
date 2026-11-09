---
title: "How to Create a Minecraft Server on DigitalOcean (Step by Step)"
description: "A detailed guide to create a Minecraft Server on DigitalOcean, with pictures. You can read it even if you don't use DigitalOcean."
createdAt: "Oct 8, 2024"
heroImage: "/blog/how-to-create-minecraft-server-on-digitalocean/banner.png"
tags:
  - "Minecraft Server"
  - "DigitalOcean"
  - "Cloud Hosting"
  - "Java Development"
  - "Hobby"
---

A detailed guide to create a Minecraft Server on DigitalOcean, with pictures. You can read it even if you don't use DigitalOcean.

> In this blog, I use Minecraft Java Edition Version 1.21.1 as the example.

Let's get started!

First, we need to sign up for DigitalOcean. Click this link: https://www.digitalocean.com/
(If you already have an account, skip this step.)

After you log in, you will see first-project. DigitalOcean creates this Project for you, so you can start right away.

I will use first-project. But if you want a separate Project, just click the New Project button.

![DigitalOcean first project interface](/blog/how-to-create-minecraft-server-on-digitalocean/1.png)

To create a Minecraft Server on the Cloud, we need a VM. DigitalOcean calls a VM a Droplet.

> Droplets are Linux-based virtual machines (VMs) that run on top of virtualized hardware. Each Droplet you create is a new server you can use, either standalone or as part of a larger, cloud-based infrastructure.

Click the Droplets menu, then click Create Droplet.

![Create Droplet button in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/2.png)

Next, choose the Region for your server. Then choose a Datacenter.

I use the "Singapore" Region because it is the closest one to Thailand, so the Ping is lower. Singapore has only one Datacenter, so there is no other choice. Just use the one they give you.

![Region selection in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/3.png)

Then choose the OS and the OS Version you want.

I use the OS "Ubuntu" and Version "24.04 (LTS) x64".

![Operating system selection in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/4.png)

P.S. In the Marketplace tab, you can search for Minecraft. You will find a ready-to-use Image for a Minecraft Server. But it has a different Minecraft Version from the one I want, so I set it up myself.

Next, choose the Size. This is the Spec of your machine. I suggest at least 2 GB of Ram. The OS already uses almost 0.5 GB of Ram, and the Minecraft Server uses another 1 GB (you can change this to more or less).

I use Basic > Regular > Ram 2 GB. The price is in the picture: $12/month (at the time I write this blog, it is about 401.30 baht/month).

![Droplet size selection in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/5.png)

This part is up to you. If you worry about space, you can add more Storage, but it costs extra.
You can also turn on Backup for your data. This costs extra too. I don't take either one.

![Additional storage and backup options in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/6.png)

Next, choose how to log in and control this Droplet.
If you want to be a bit safer, use an SSH Key.
If you want it easy, use a Password.
I will use a Password. It's easy!

![Login method selection in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/7.png)

Next, you will see the things DigitalOcean suggests for us.
I only take Add improved metrics monitoring and alerting, because it is Free. (You can use it to Monitor your Droplet: how much CPU, Ram, and Storage it uses now, and more.)

![Metrics monitoring option in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/8.png)

We are almost done creating the Droplet. Just a little more. Here you give it a name, so you can remember what this Droplet is for. If you have many Projects, you can also choose which Project to put it in. Then click Create Droplet.
In this blog, I name it minecraft-server and use first-project.

![Droplet naming and project selection in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/9.png)

Wait a moment while it creates the Droplet.

![Droplet creation progress in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/10.png)

The Droplet is ready!

![Droplet creation completed in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/11.png)

Okay, now we will start the Minecraft Server. Click the Droplet name to open the Droplet details page.

![Droplet details page in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/12.png)

Now click the Console button to control this Droplet.

![Console button in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/13.png)

You will see a Terminal page like this.

![Terminal interface in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/14.png)

Let's install the Software Packages we need with this command. It will say "Press [Enter] to continue". Just press Enter. Wait a little, and you will see Done.

```bash
sudo add-apt-repository ppa:openjdk-r/ppa
```

![Adding OpenJDK repository](/blog/how-to-create-minecraft-server-on-digitalocean/15.png)

Then Update the list of Software Packages with this command.

```bash
sudo apt update
```

![Updating software packages](/blog/how-to-create-minecraft-server-on-digitalocean/16.png)

Okay, now let's install OpenJDK + JRE, so we can run the Minecraft Server.

We will install OpenJDK Version 21 + JRE, because Minecraft Server Version 1.21.1 needs it. Use this command. (It will ask you to confirm. Type `Y`, press Enter, and wait until it finishes.)

```bash
sudo apt install openjdk-21-jre-headless
```

![Installing OpenJDK](/blog/how-to-create-minecraft-server-on-digitalocean/17.png)

The installation is done!

![OpenJDK installation completed](/blog/how-to-create-minecraft-server-on-digitalocean/18.png)

Now we will install one more Software called "Screen". It lets us create a Session in the system and keep it running in the background. After we Start the Minecraft Server, we need to leave it running in the background. This way, when we close the Terminal, it will not Stop our Minecraft Server.

```bash
sudo apt install screen
```

![Installing Screen](/blog/how-to-create-minecraft-server-on-digitalocean/19.png)

Next, we will Config the Firewall a little. This lets us connect to the Minecraft Server with Port 25565. Use this command.

```bash
sudo ufw allow 25565
```

![Configuring firewall for Minecraft](/blog/how-to-create-minecraft-server-on-digitalocean/20.png)

Now let's create a Directory, so our files stay neat.

```bash
mkdir app
cd app
```

Next, we will Download Minecraft Server Version 1.21.1 to the machine with this command.
(The Download link comes from the Minecraft website: https://www.minecraft.net/en-us/download/server)

```bash
wget https://piston-data.mojang.com/v1/objects/59353fb40c36d304f2035d51e7d6e6baa98dc05c/server.jar
```

Then rename the Server file a little.

```bash
mv server.jar minecraft_server.1.21.1.jar
```

![Downloading Minecraft server jar](/blog/how-to-create-minecraft-server-on-digitalocean/21.png)

Next, we will open a Screen Session, because we are ready to run the Minecraft Server.

Type this command and press Enter.

```bash
screen
```

You will see a page like this.

![Screen session started](/blog/how-to-create-minecraft-server-on-digitalocean/22.png)

Press Space Bar or Enter, and you will go back to the normal Terminal page.

Okay, the moment we waited for is here. Let's Start the Minecraft Server!

Type this command and press Enter.

```bash
java -Xmx1024M -Xms1024M -jar minecraft_server.1.21.1.jar nogui
```

Then you will see an Error. Oh no! But don't panic. This is normal.

![Minecraft server EULA error](/blog/how-to-create-minecraft-server-on-digitalocean/23.png)

It asks us to accept the EULA (End-User License Agreement) first. Open the file `eula.txt` in any Text Editor you like. I will use Nano.

```bash
nano eula.txt
```

Change the value of `eula` to `true`.

![Editing EULA file](/blog/how-to-create-minecraft-server-on-digitalocean/24.png)

Press `Ctrl + O` and then Enter to Save the file. Then press `Ctrl + X` to exit Nano.

Next, we will set up the Server a little. This is up to you. You can skip it if you don't want to change anything.
Use this command.

```bash
nano server.properties
```

I will change the game difficulty (difficulty) to `normal`. I will also change the text under the Server name (motd).
There are many more things you can change. Try to learn what each Property does.

![Editing server properties](/blog/how-to-create-minecraft-server-on-digitalocean/25.png)

When you finish, Save the file and exit the Text Editor.

Now Start the Minecraft Server again.

```bash
java -Xmx1024M -Xms1024M -jar minecraft_server.1.21.1.jar nogui
```

Wait a little while it Generates the World. When you see the message `Done (xx.xxxs)! For help, type "help"`, the Minecraft Server has started successfully.

![Minecraft server started successfully](/blog/how-to-create-minecraft-server-on-digitalocean/26.png)

Now let's try to Join our Minecraft Server.

Open the Minecraft game and click Multiplayer.

![Minecraft multiplayer menu](/blog/how-to-create-minecraft-server-on-digitalocean/27.png)

Click Add Server.

![Add server menu in Minecraft](/blog/how-to-create-minecraft-server-on-digitalocean/28.png)

You will see this page. For Server Name, you can type anything. For Server Address, type the IP address of your Droplet. Then click Done. (If you want your friends to play with you, just send them the IP address.)

![Adding server details in Minecraft](/blog/how-to-create-minecraft-server-on-digitalocean/29.png)

The question is: where do we get the IP address of our Droplet? Actually, you have already seen this number twice.

The first place is here. Click Copy.

![Droplet IP address in DigitalOcean](/blog/how-to-create-minecraft-server-on-digitalocean/30.png)

The second place is here. Click Copy.
(It is the same value as the first one. Copy it from whichever place you like.)

![Droplet IP address in details page](/blog/how-to-create-minecraft-server-on-digitalocean/31.png)

If everything is right, you will see that our Minecraft Server is ready to join.

P.S. Do you see the text under the Server name? It comes from what we changed in `server.properties`.

![Minecraft server ready to join](/blog/how-to-create-minecraft-server-on-digitalocean/32.png)

Let's go in and try it.

![Playing in Minecraft server](/blog/how-to-create-minecraft-server-on-digitalocean/33.png)

We can play now!!!!!

Loading new Chunks may be a bit slow sometimes. But that's how it is. Our Droplet Spec is not very high (I just don't want to pay a lot, you know).

Before we end this blog, there is one more thing we must cover. It is how to keep the Minecraft Server running all the time. Let's learn how to use Screen to manage Sessions a little.

Before we Started the Minecraft Server, we already created a Screen Session with the `screen` command, right? Now let's leave that Session. (We don't close the Session. The system keeps running in the background.) Press `Ctrl + A + D`. You will get a result like this.

![Detaching from Screen session](/blog/how-to-create-minecraft-server-on-digitalocean/34.png)

Now let's List the Screen Sessions to see which ones are open.
Use `screen -list`. You will see 1 Session running in the background.

![Listing Screen sessions](/blog/how-to-create-minecraft-server-on-digitalocean/35.png)

In the picture above, remember the number I point to. We use it when we want to go back to that Session, with the command `screen -r <Session number>`, for example `screen -r 26103`. After you type it and press Enter, you will see that we are back on the Minecraft Server page again.

![Reattaching to Screen session](/blog/how-to-create-minecraft-server-on-digitalocean/36.png)

One more little thing. While the Minecraft Server is running, we can type Minecraft Commands. For example, we can give OP rights, spawn items, or kick a player out of the Server.

If you want to know which Commands you can use, type `help` and press Enter. It will show a list of the Commands you can use.

![Minecraft server commands](/blog/how-to-create-minecraft-server-on-digitalocean/37.png)

That's really the end!

What I showed you is not limited to DigitalOcean. You can use it with VMs on other Cloud providers too. Only the price and the way to create the VM are different. The steps to run the Minecraft Server in the Terminal are the same on every VM.

I hope this blog helps everyone who wants to create a Minecraft Server. At least it helps me. If I forget how to do it, I can come back and read my own blog.

Last, thank you to the DigitalOcean documentation: https://www.digitalocean.com/community/tutorials/how-to-create-a-minecraft-server-on-ubuntu-22-04. Part of the steps come from this document.
