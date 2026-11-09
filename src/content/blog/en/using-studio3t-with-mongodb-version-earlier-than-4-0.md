---
title: "Using Studio 3T with MongoDB Versions Earlier Than 4.0"
description: "Use Studio 3T with MongoDB versions earlier than 4.0. This post shows how to download and install it, how to use the free version, and how to connect to a MongoDB 3.6 server."
createdAt: "May 7, 2025"
heroImage: "/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/banner.png"
tags:
  - "MongoDB"
  - "Studio 3T"
  - "Database Management"
  - "Version Compatibility"
  - "GUI Tools"
---

MongoDB Server is now on version 8.0. Because of this, MongoDB GUI tools no longer work with MongoDB Server versions earlier than 4.0.

But in real life, many places still use MongoDB Server versions earlier than 4.0. Some of them may have trouble updating to a new MongoDB Server version.

To use a MongoDB GUI tool with these old servers, we need Studio 3T version 2024.1.0. This is the latest version that still works with MongoDB Server versions earlier than 4.0.

## How to Download Studio 3T Version 2024.1.0

1. Go to https://studio3t.com/knowledge-base/articles/using-studio3t-with-earlier-mongodb-versions/

1. Click Download for your OS.
   ![Download Studio 3T](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/1.png)

1. Install Studio 3T as usual.

## Using Studio 3T for the First Time

1. Open Studio 3T. It is paid software, and it gives you a 30-day trial. But you can also use it for **free**. You just get fewer features. Click Next.
   ![Studio 3T welcome screen](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/2.png)

1. It asks you to sign in. If you don't have an account yet, click Sign Up. Or you can click Sign in with Google.
   ![Sign in options](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/3.png)
   ![Sign in with Google](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/4.png)

1. All done. Click Finish.
   ![Finish setup](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/5.png)

1. Here it is up to you. You can use the paid trial, or you can switch to the free version. I will switch to the free version, easy as that.
   ![Choose free version](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/6.png)

1. The free version loses a lot of features, but it is still good enough to use.
   ![Free version limitations](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/7.png)

## Connecting to a MongoDB Server Earlier Than 4.0

I have a MongoDB Server version 3.6 running in Docker.

```bash
docker run --name mongodb -p 27017:27017 -d mongo:3.6
```

![MongoDB Docker container running](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/8.png)

Let's try to connect with Studio 3T.

Click Create a new connection > enter the connection string `mongodb://localhost:27017` > click Next
![Create a new connection](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/9.png)

Click OK
![Connection settings confirmation](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/10.png)

Click Test Connection. If everything shows OK, the connection works > click OK
![Test connection successful](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/11.png)

Set a connection name and click Save.
![Save connection](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/12.png)

Now let's really connect.
![Connect to MongoDB](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/13.png)

Yay 🎉 It connects! (If you can't find the Connections list, it hides in the side bar. You can pin it open like I did.)
![Connections panel](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/14.png)

Let's try a query. It works fine.
![Query execution](/blog/using-studio3t-with-mongodb-version-earlier-than-4-0/15.png)

## Summary

Studio 3T version 2024.1.0 can work with MongoDB Server versions earlier than 4.0. But be careful not to update Studio 3T by accident. New versions do not support MongoDB Server versions earlier than 4.0 anymore.

I hope this blog helps everyone use Studio 3T with MongoDB Server versions earlier than 4.0. But it is better to update your MongoDB Server to the latest version, for better security and performance.

Thank you!
