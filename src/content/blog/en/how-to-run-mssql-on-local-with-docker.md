---
title: "How to Run MSSQL on Your Own Machine with Docker"
description: "Learn how to run Microsoft SQL Server (MSSQL) on your own machine with Docker. Great for developers who need a database for testing or development."
createdAt: "Feb 23, 2026"
heroImage: "/blog/how-to-run-mssql-on-local-with-docker/banner.png"
tags:
  - "MSSQL"
  - "Docker"
  - "Database"
  - "DevOps"
  - "Software Development"
---

> In this blog, I will show you how to run MSSQL Server on your own machine with Docker. It is great for developers who want an easy database for testing and development.

## Why Run MSSQL with Docker?

- You do not need to install anything complicated on your real machine.
- You can delete the Container any time, so it does not waste space.
- It works well when you test or develop many projects at the same time.

## Get Your Machine Ready

First, install [Docker Desktop](https://www.docker.com/products/docker-desktop/). It works on Windows, macOS, and Linux.

![Docker Desktop download buttons for many operating systems](/blog/how-to-run-mssql-on-local-with-docker/1.png)

## Run MSSQL Server with Docker

Just use this command in your Terminal.

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p "1433:1433" -d "mcr.microsoft.com/mssql/server:2025-CU2-ubuntu-22.04"
```

- Change `<password>` to the password you want. It must have at least 8 characters. It must also have at least 3 of these 4 types: uppercase letters, lowercase letters, numbers, and special characters.

Example

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=MyStrongP@ssw0rd" -p "1433:1433" -d "mcr.microsoft.com/mssql/server:2025-CU2-ubuntu-22.04"
```

![Example of running MSSQL Server with Docker](/blog/how-to-run-mssql-on-local-with-docker/2.png)

If you want to stop the Container, use `docker ps` to see the name or ID of the Container that runs MSSQL. Then run `docker stop <container_id|container_name>`.

![Example of stopping a Container](/blog/how-to-run-mssql-on-local-with-docker/3.png)

> **Extra:**  
> You can see the Image Tags and versions on [Docker Hub: microsoft/mssql-server](https://hub.docker.com/r/microsoft/mssql-server)  
> There are many versions to choose from, like 2019, 2022, and 2025.  
> These are some Tags you can use:
>
> - `mcr.microsoft.com/mssql/server:2025-CU2-ubuntu-22.04`
> - `mcr.microsoft.com/mssql/server:2022-latest`
> - `mcr.microsoft.com/mssql/server:2019-latest`
>
> Pick the Tag for the version you want. You can also see more Tags on [MCR: mssql/server/tags](https://mcr.microsoft.com/artifact/mar/mssql/server/tags).

## Connect with sqlcmd Inside the Container

If you want to connect to the SQL Server in the Container, you can use the `sqlcmd` tool inside the Container. Run this command on your host machine:

```bash
docker exec -it "<container_id|container_name>" "/opt/mssql-tools18/bin/sqlcmd" -S "localhost" -U "sa" -P "<password>" -C
```

- Change `<container_id|container_name>` to the name or ID of the Container that runs MSSQL.
- Change `<password>` to the password you set when you ran the Container.

Example

```bash
docker exec -it "charming_greider" "/opt/mssql-tools18/bin/sqlcmd" -S "localhost" -U "sa" -P "MyStrongP@ssw0rd" -C
```

![Example of connecting with sqlcmd inside the Container](/blog/how-to-run-mssql-on-local-with-docker/4.png)

> **Note:**  
> Since SQL Server 2022 (16.x) CU 14 and SQL Server 2019 (15.x) CU 28, the Container Image comes with `mssql-tools18`.  
> The old `/opt/mssql-tools/bin` folder is going away. It is now `/opt/mssql-tools18/bin`, so it matches the latest version of the tools.  
> If you use an older Image, you may need the old path `/opt/mssql-tools/bin/sqlcmd`.

## Try Creating a Database

Connect, then run this command to create a new Database.

```sql
CREATE DATABASE MyApp;
GO
```

![Example of creating a Database with sqlcmd](/blog/how-to-run-mssql-on-local-with-docker/5.png)

## Connect to MSSQL with Any Tool

You can use [Azure Data Studio](https://learn.microsoft.com/en-us/azure-data-studio/download-azure-data-studio), [DBeaver](https://dbeaver.io/), or [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/en-us/ssms/install/install).

Use these settings.

| Host/Server | Port | User | Password               | Database (optional) |
| ----------- | ---- | ---- | ---------------------- | ------------------- |
| localhost   | 1433 | sa   | <The password you set> | MyApp (or anything) |

Example Connection String (for .NET, Node.js, etc.)

```
Server=tcp:localhost,1433;Initial Catalog=MyApp;Persist Security Info=False;User ID=sa;Password=MyStrongP@ssw0rd;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;
```

![Example of connecting with Azure Data Studio](/blog/how-to-run-mssql-on-local-with-docker/6.png)

![Example of connecting successfully with Azure Data Studio](/blog/how-to-run-mssql-on-local-with-docker/7.png)

## Extra Tips

If you want to keep your data after you remove the Container, add a Mount Volume (`-v`).

Example

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=MyStrongP@ssw0rd" -p "1433:1433" -v "mssql-data:/var/opt/mssql" -d "mcr.microsoft.com/mssql/server:2025-CU2-ubuntu-22.04"
```

## Summary

That's it! Now you have an MSSQL Server on your own machine. It is easy and clean, and you do not need to worry about making a mess of your machine.  
It works well for all kinds of testing and development.

Thank you!
