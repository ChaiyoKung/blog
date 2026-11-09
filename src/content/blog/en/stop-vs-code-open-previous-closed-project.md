---
title: "Can We Stop VS Code from Opening the Last Project?"
description: "Maybe you want VS Code to show a blank window each time you open it, not the last project you closed."
createdAt: "Oct 11, 2024"
heroImage: "/blog/stop-vs-code-open-previous-closed-project/banner.png"
tags:
  - "VS Code"
  - "Productivity"
  - "Customization"
  - "Tips"
  - "Hacks"
---

Every time we open VS Code, it opens the last project we closed. Some people don't like this. It can make VS Code start slowly because it needs time to load the project. Or maybe you have other reasons.

In this blog, I will show you how to stop VS Code from opening the last project you closed.

First, open VS Code. Then open the VS Code settings from the UI, or press `ctrl + ,` (Windows/Linux) or `cmd + ,` (MacOS).

![VS Code Settings UI](/blog/stop-vs-code-open-previous-closed-project/1.png)

Search for window.restoreWindows and change the value to none.

![Change window.restoreWindows to none](/blog/stop-vs-code-open-previous-closed-project/2.png)

That's all! Now each time you open VS Code, you will get a blank window.

![Blank VS Code window](/blog/stop-vs-code-open-previous-closed-project/3.png)
