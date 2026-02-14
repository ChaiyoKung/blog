---
title: "Resolving the Nearly Invisible Text Select Cursor Issue on Windows 11"
description: "A guide to fixing the text select cursor issue caused by AMD display driver updates on Windows 11."
createdAt: "Sep 26, 2025"
heroImage: "/blog/windows-cursor-nearly-invisible-on-text-input/banner.png"
tags:
  - "Windows 11"
  - "AMD Driver"
  - "Cursor Issue"
  - "Registry Fix"
  - "Tech Support"
---

# Resolving the Nearly Invisible Text Select Cursor Issue on Windows 11

If you've recently encountered an issue where the text select pointer becomes nearly invisible when hovering over black text on a white background, you're not alone. This problem has been reported by users after a Windows update that installed a new AMD display driver. Here's a detailed look at the issue and how to resolve it.

## The Solution

### Step 1: Create a Registry File

1. Open Notepad and paste the following code:

   ```
   Windows Registry Editor Version 5.00

   [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\Dwm]
   "OverlayTestMode"=dword:00000005
   ```

2. Save the file with a `.reg` extension. For example, name it `FixCursorBug.reg`.

### Step 2: Apply the Registry Changes

1. Double-click the `FixCursorBug.reg` file.
2. Confirm any prompts to merge the information into the Windows Registry.

### Step 3: Restart Your Computer

Restart your system to apply the changes.

### Step 4: Test the Fix

After restarting, test the text select pointer on websites or applications with black text on a white background. The cursor should now behave as expected.

## References

For further details and discussions on this issue, check out the following resources:

- [Chromium Issue Tracker](https://issues.chromium.org/issues/40239916)
- [Microsoft Answers Forum](https://answers.microsoft.com/en-us/windows/forum/all/text-select-pointer-goes-completely-white-colored/52ca5f37-d7f5-48c3-87ed-226562688a94)

By following the steps outlined above, you can resolve the nearly invisible text select cursor issue and restore normal functionality to your system.

Thank you for reading, and happy computing!
