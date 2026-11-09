---
title: "How to Create a Minecraft Server on AWS (Step by Step)"
description: "A detailed guide to creating a Minecraft Server on AWS, with pictures. You can follow it even if you don't use AWS."
createdAt: "Jun 14, 2026"
heroImage: "/blog/how-to-create-minecraft-server-on-aws/banner.png"
tags:
  - "Minecraft Server"
  - "AWS"
  - "Cloud Hosting"
  - "Java Development"
  - "Hobby"
---

A detailed guide to creating a Minecraft Server on AWS, with pictures. You can follow it even if you don't use AWS.

> In this blog, I use Minecraft Java Edition Version 1.21.1 as the example.

Let's start!

First, we need an AWS account. Click this link: https://aws.amazon.com/
(If you already have an account, skip this step.)

After you log in, you will see the AWS Console. It has a lot of menus, but don't worry. I will walk you through it step by step.

![AWS console after login](/blog/how-to-create-minecraft-server-on-aws/1.png)

Before we create anything, we need to choose a Region. A Region is the place where the Data Center is. If you don't know which one to pick, choose the one closest to your Minecraft players. In this example, I choose `Asia Pacific (Thailand)`.

![AWS region selection](/blog/how-to-create-minecraft-server-on-aws/2.png)

If you can't find the Region you want, try clicking Manage Regions. Some Regions may be turned off.

![AWS manage regions menu](/blog/how-to-create-minecraft-server-on-aws/3.png)

To make a Minecraft Server in the cloud, we use a VM. AWS calls it EC2 (Elastic Compute Cloud).

Click the search box and type "EC2". Then click EC2.

![Searching for EC2 in AWS](/blog/how-to-create-minecraft-server-on-aws/4.png)

You will see the EC2 Dashboard.

![EC2 dashboard](/blog/how-to-create-minecraft-server-on-aws/5.png)

Look at the left sidebar and click **Instances**. Then click **Launch instances** to create a new VM.

![Instances page and launch button](/blog/how-to-create-minecraft-server-on-aws/6.png)

Type any name you like for your Instance. You can change it later too.

![Naming the EC2 instance](/blog/how-to-create-minecraft-server-on-aws/7.png)

Next, choose the OS to run our Minecraft Server. I choose `Ubuntu Server 24.04 LTS (HVM), SSD Volume Type`. Also, remember the **Username**, because we need it when we log in to the VM.

![Selecting Ubuntu AMI](/blog/how-to-create-minecraft-server-on-aws/8.png)

Next, choose the Instance Type. This is the spec of the VM, and it changes the price. For a Minecraft Server, I suggest at least 2 GB of Ram. The OS uses almost 0.5 GB, and the Minecraft Server uses about 1 GB. (You can change this later if you need more or less.)

I choose `t3.small`. It fits a small Minecraft Server, and the price is not too high.

![Selecting instance type](/blog/how-to-create-minecraft-server-on-aws/9.png)

Next, choose a Key pair (login). It gives you a safe way to log in to the VM. But it takes too long to explain now, so I choose `Proceed without a key pair` for this time. (But I don't suggest you do this in Production.)

![Key pair selection](/blog/how-to-create-minecraft-server-on-aws/10.png)

Now we come to the Network part. Here we create a **Security Group**. It works like a Firewall and controls who can reach our VM. We also need to open the Port that the Minecraft Server uses. Let's see how.

Click **Edit** to set up the Security Group in more detail.

![Editing security group settings](/blog/how-to-create-minecraft-server-on-aws/11.png)

Give your Security Group any name you like. I call mine "Minecraft Server SG".

![Naming the security group](/blog/how-to-create-minecraft-server-on-aws/12.png)

Write a Description for your Security Group, so you know what it is for.

![Security group description](/blog/how-to-create-minecraft-server-on-aws/13.png)

Next, we set the Inbound Security Group Rules to open the Port for the Minecraft Server. AWS already adds `SSH (TCP 22)` with `Anywhere`, so you can log in to the VM from any place. (For better safety, use an IP address that you know instead.)

![Default inbound security group rules](/blog/how-to-create-minecraft-server-on-aws/14.png)

Let's add one more SSH Rule. It lets us log in to the VM from the AWS website. Click **Add security group rule**.

![Adding a security group rule](/blog/how-to-create-minecraft-server-on-aws/15.png)

Set Type to `SSH` and Source type to `Custom`. In Source, search for "ec2" and choose `com.amazonaws.<region>.ec2-instance-connect`.

![Adding EC2 Instance Connect rule](/blog/how-to-create-minecraft-server-on-aws/16.png)

Next is the rule for the Minecraft Server itself. Click **Add security group rule** again. Set Type to `Custom TCP`, Port range to `25565`, and Source type to `Anywhere`. Now Minecraft players can connect from anywhere.

![Adding Minecraft port rule](/blog/how-to-create-minecraft-server-on-aws/17.png)

You can change these Security Group Rules any time. If you want to open or close a Port, use the menu on the left.

![EC2 dashboard sidebar](/blog/how-to-create-minecraft-server-on-aws/18.png)

Let's go back to the Storage settings. I use `20 GB`. This is enough for a small Minecraft Server, but you can make it bigger if you want.

![Instance storage settings](/blog/how-to-create-minecraft-server-on-aws/19.png)

That's all the main parts. Click **Launch instance**.

![Launching the instance](/blog/how-to-create-minecraft-server-on-aws/20.png)

Wait a moment while it creates the Instance.

![Instance creation progress](/blog/how-to-create-minecraft-server-on-aws/21.png)

It's done! Click the Instance ID to see the details of your Instance.

![Instance created successfully](/blog/how-to-create-minecraft-server-on-aws/22.png)

You can see that the **Instance state** is now `Running`. This means our VM is ready. Next, we go inside and install the Minecraft Server. Click **Connect**.

![Running instance details](/blog/how-to-create-minecraft-server-on-aws/23.png)

Choose the **EC2 Instance Connect** tab and click **Connect** to enter our VM.

![EC2 Instance Connect tab](/blog/how-to-create-minecraft-server-on-aws/24.png)

We are in!

![Logged into EC2 instance](/blog/how-to-create-minecraft-server-on-aws/25.png)

First, we install the software packages we need. Use this command. It will say "Press [Enter] to continue", so press Enter. Wait a bit and you will see `Done`.

```bash
sudo add-apt-repository ppa:openjdk-r/ppa
```

![Adding OpenJDK repository on AWS](/blog/how-to-create-minecraft-server-on-aws/26.png)

Then update the list of software packages with this command.

```bash
sudo apt update
```

![Updating package lists on AWS](/blog/how-to-create-minecraft-server-on-aws/27.png)

Okay, now let's install OpenJDK + JRE so we can run the Minecraft Server.

We install OpenJDK Version 21 + JRE, because Minecraft Server Version 1.21.1 needs it. Use this command. It will ask you to confirm, so type `Y` and press Enter.

```bash
sudo apt install openjdk-21-jre-headless
```

![Installing OpenJDK on AWS](/blog/how-to-create-minecraft-server-on-aws/28.png)

The install is done.

![OpenJDK installation completed](/blog/how-to-create-minecraft-server-on-aws/29.png)

Now we install one more tool called Screen. It lets us make a Session that runs in the background. Without it, the Minecraft Server would stop when we close the Terminal.

```bash
sudo apt install screen
```

![Installing Screen on AWS](/blog/how-to-create-minecraft-server-on-aws/30.png)

Now let's make a Directory first, so our files stay neat.

```bash
mkdir app
cd app
```

Next, we download Minecraft Server Version 1.21.1 to the VM with this command.
(The Download link comes from the Minecraft website: https://www.minecraft.net/en-us/download/server)

```bash
wget https://piston-data.mojang.com/v1/objects/59353fb40c36d304f2035d51e7d6e6baa98dc05c/server.jar
```

Then we rename the Server file a little.

```bash
mv server.jar minecraft_server.1.21.1.jar
```

![Downloading Minecraft server jar on AWS](/blog/how-to-create-minecraft-server-on-aws/31.png)

Next, we open a Screen Session, because we are about to run the Minecraft Server.

Type this command and press Enter.

```bash
screen
```

You will see a screen like this.

![Started Screen session](/blog/how-to-create-minecraft-server-on-aws/32.png)

Press Space Bar or Enter, and it goes back to the normal Terminal.

Okay, the moment we waited for is here. Let's Start the Minecraft Server!

Type this command and press Enter.

```bash
java -Xmx1024M -Xms1024M -jar minecraft_server.1.21.1.jar nogui
```

Oh no, we get an Error! But don't panic. This is normal.

![Minecraft server EULA error on AWS](/blog/how-to-create-minecraft-server-on-aws/33.png)

It wants us to accept the EULA (End-User License Agreement) first. Open the `eula.txt` file in any Text Editor you like. I use Nano.

```bash
nano eula.txt
```

Change the value of `eula` to `true`.

![Editing EULA file on AWS](/blog/how-to-create-minecraft-server-on-aws/34.png)

Press `Ctrl + O` and then Enter to Save the file. Then press `Ctrl + X` to leave Nano.

Next, let's set up the Server a little. This is optional, so change it only if you want to. Use this command.

```bash
nano server.properties
```

I change the game difficulty (`difficulty`) to `normal`. I also change the text under the Server name (`motd`). There are many more things you can change, so try to learn what each Property does.

![Editing server properties on AWS](/blog/how-to-create-minecraft-server-on-aws/35.png)

When you finish, Save and leave the Text Editor.

Now Start the Minecraft Server again.

```bash
java -Xmx1024M -Xms1024M -jar minecraft_server.1.21.1.jar nogui
```

Wait a bit while it Generates the World. When you see `Done (xx.xxxs)! For help, type "help"`, the Minecraft Server has started.

![Minecraft server started successfully on AWS](/blog/how-to-create-minecraft-server-on-aws/36.png)

Now let's try to Join our Minecraft Server.

Open the Minecraft game and click Multiplayer.

![Minecraft multiplayer menu](/blog/how-to-create-minecraft-server-on-aws/37.png)

Click Add Server.

![Add server button in Minecraft](/blog/how-to-create-minecraft-server-on-aws/38.png)

You will see this. For Server Name, type anything you like.

![Adding server name in Minecraft](/blog/how-to-create-minecraft-server-on-aws/39.png)

For Server Address, type the IP address of your VM. You can find it on the Instance summary page, at Public IPv4 address. You can use the Public DNS too.

(One more thing: the IP/DNS of the VM changes every time we stop and start it again. If you want it to stay the same, you need to set up an Elastic IP.)

Then click Done. If you want your friends to play too, send them the IP address or DNS.

![EC2 instance summary](/blog/how-to-create-minecraft-server-on-aws/40.png)

![Adding server address in Minecraft](/blog/how-to-create-minecraft-server-on-aws/41.png)

If everything is right, you will see that the Minecraft Server is ready to join.

P.S. Do you see the text under the Server name? It comes from what we changed in `server.properties`.

![Minecraft server ready to join](/blog/how-to-create-minecraft-server-on-aws/42.png)

Let's go in and try it.

![Joining Minecraft server on AWS](/blog/how-to-create-minecraft-server-on-aws/43.png)

We can play now!!!!!

Before we finish this blog, there is one more important thing. We want the Minecraft Server to run all the time. So let's learn a little about how to use Screen to manage Sessions.

Before we started the Minecraft Server, we made a Screen Session with the `screen` command, right? Now let's leave that Session. We don't close it, so the server keeps running in the background. Press `Ctrl + A + D`. You will get a result like this.

![Detaching from Screen session on AWS](/blog/how-to-create-minecraft-server-on-aws/44.png)

Now let's List the Screen Sessions to see which ones are open. Use `screen -list`. You can see we have 1 Session running in the background.

![Listing Screen sessions on AWS](/blog/how-to-create-minecraft-server-on-aws/45.png)

Remember the number in the picture above. We need it when we want to go back to that Session. Use the command `screen -r <Session number>`, for example `screen -r 19667`. Press Enter, and you will be back at the Minecraft Server screen again.

![Reattaching to Screen session on AWS](/blog/how-to-create-minecraft-server-on-aws/46.png)

One more small thing. While the Minecraft Server is running, you can type Minecraft Commands. For example, you can give OP rights, spawn items, or kick people out of the Server.

If you want to know which Commands you can use, type `help` and press Enter. It shows a list of Commands you can use.

![Minecraft server help command output](/blog/how-to-create-minecraft-server-on-aws/47.png)

That's really the end!

This method is not only for AWS. You can use it with a VM on other Cloud providers too. Only the price and the way to create the VM are different. The steps to run the Minecraft Server in the Terminal are the same on every VM.

I hope this Blog helps everyone who wants to create a Minecraft Server. At least it helps me, because if I forget how to do it, I can come back and read my own Blog.
