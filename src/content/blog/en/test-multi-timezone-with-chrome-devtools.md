---
title: "Test Multi-timezone Easily with Chrome DevTools"
description: "How to change the Timezone and Location in Chrome DevTools, so you can test a multi-timezone system easily without changing your computer's Timezone."
createdAt: "Sep 19, 2025"
heroImage: "/blog/test-multi-timezone-with-chrome-devtools/banner.png"
tags:
  - "Chrome"
  - "DevTools"
  - "Timezone"
  - "Testing"
  - "Frontend"
---

# Test Multi-timezone Easily with Chrome DevTools

If your system supports Multi-timezone, you need to test every Timezone. Many people change the Timezone of their computer directly. That is a hassle, and it can affect your other apps.

Today I want to show you an easier way. You can change the Timezone right inside Chrome DevTools. You don't need to touch your system settings at all.

## How to Change the Timezone with Chrome DevTools

0. **Check your current Timezone**

   You can see that I am in `UTC+7 (Asia/Bangkok)` right now. I will try to change it to the Japan Timezone (`UTC+9`).
   ![Shows the current Timezone in DevTools](/blog/test-multi-timezone-with-chrome-devtools/1.png)

1. **Open Chrome DevTools**

   Press `F12`, or right-click and choose Inspect.
   ![Open Chrome DevTools](/blog/test-multi-timezone-with-chrome-devtools/2.png)

2. **Open the Sensors menu**

   Click the `...` button (the three dots at the top right of DevTools).
   Choose `More tools` > `Sensors`.
   ![Open the Sensors menu in DevTools](/blog/test-multi-timezone-with-chrome-devtools/3.png)

3. **Change the Location and Timezone**

   At the bottom, you will see a section called "Location".
   Change it from `No override` to the city you want, such as `Tokyo`.
   You will see the `Timezone ID` change to `Asia/Tokyo` right away.
   ![Change the Location and Timezone in DevTools](/blog/test-multi-timezone-with-chrome-devtools/4.png)

4. **Refresh the web page**

   Refresh the page so the website loads the data again. You will see the time on the website change to the Timezone you chose.
   ![Refresh the web page after changing the Timezone](/blog/test-multi-timezone-with-chrome-devtools/5.png)

5. **You can change other Location settings too**

   Besides the Timezone, you can also change the Latitude/Longitude to fake your location. For example, if you choose Tokyo, the Marker on the map moves to Japan.
   ![You can change other Location settings too](/blog/test-multi-timezone-with-chrome-devtools/6.png)

6. **Go back to your original Timezone**

   If you want to use your computer's Timezone again, just change the Location back to `No override`.
   ![Go back to your original Timezone](/blog/test-multi-timezone-with-chrome-devtools/7.png)

## Summary

Changing the Timezone in Chrome DevTools makes it easier to test time-related features. You don't need to touch your main system settings, and you can fake the Location too. It is great for Developers and QA who need to test many countries.

Thank you!
