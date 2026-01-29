---
title: "Tools I Actually Use for Reverse Engineering"
date: "2025-12-23"
description: "My actual RE toolkit - no bullshit, just what works."
---

I've been doing reverse engineering actively since November 2024. Still in the early stages, but I've figured out what tools actually work and which ones are overhyped garbage. But it's still a PERSONAL preference, everyone is going to tell you the same thing.

## How I Got Here

I started with [Cheat Engine](https://www.cheatengine.org/) for games. Simple stuff. Then in July 2025 I got my heart broken by some random ass girl who was playing with my mind and absolutely destroyed my summer holidays. I started hating myself more, and in August I shifted to solving [crackmes](https://crackmes.one/) and actual reverse engineering work. Not just goofy games anymore.

## The Disassembler/Debugger Situation

This is where everyone has opinions. Here's mine.

I tried **[IDA](https://hex-rays.com/ida-free)**, **[Ghidra](https://github.com/NationalSecurityAgency/ghidra)**, **[Cutter](https://cutter.re/)**, **[x64dbg](https://x64dbg.com/)**, and more.

**[IDA](https://hex-rays.com/ida-free):** Industry standard, sure. The free version is limited as hell. The Pro versions cost \$1k-\$9k. I'm not paying that to *learn* before I even have a job. My parents are already paying \$6k a year for school. Pass.

**[Ghidra](https://github.com/NationalSecurityAgency/ghidra):** Really good. I like it. But I decided not to use it because of the Java setup shit. Maybe I'll return to it later.

**[x64dbg](https://x64dbg.com/):** Good for debugging. Not great for decompilation. I still use it sometimes to debug stuff tho,

**[Cutter](https://cutter.re/):** My love. Fast, portable, open-source, and it **works**. Has a built-in Ghidra decompiler without the Java setup garbage. For now, it's the best option for me.

## Memory Tools

**[Cheat Engine](https://www.cheatengine.org/).** Still. It's simple, it works, and it does what I need.

## Decompilers

For native code and crackmes, I use [Ghidra in Cutter](https://cutter.re/docs/user-docs/features.html#decompiler).

For Unity games (especially .NET), I use [dnSpyEx](https://github.com/dnspyex) - not the [original dnSpy](https://github.com/dnSpy/dnSpy), but the fork that's still maintained. When Unity games are built with [il2cpp](https://docs.unity3d.com/530/Documentation/Manual/IL2CPP), that's a different mess (more on that below).

## Scripting and Automation

I write automation scripts in **Python** (mostly I ask AI to do this stuff for me). 

Example: I was making cheats for GTFO (Unity game, il2cpp build). I used [il2cpp-dumper](https://github.com/Perfare/Il2CppDumper), but it spit out almost **1 million lines** of code. So I wrote a Python script to extract only the important offsets and structures.

Sorry but if you're doing RE and not automating repetitive tasks, you're wasting time.

## Anti-Cheat Bypass

I don't bypass serious anti-cheats yet - my skills aren't there. But for something simple like **VAC**, I can grab a random kernel driver, test it in a VM, pack it with my cheat, and call it a day.

Bypassing modern anti-cheats (EAC, BattlEye, Vanguard) is a whole different level. I'll get there eventually (i hope).

## Where I Learned This

- **YouTube** - Free tutorials, walkthroughs, beginner guides
- **UnknownCheats** - Forum with actual useful info and code
- **AI (Claude)** - For specific questions and debugging help

No paid courses. Just grinding through free resources and trial and error.

## Tools I Tried and Hate

**IDA.** I already explained why. It's good, but not worth the price when you're learning. People act like you *need* IDA to do RE. **You don't**.

If you can afford it and you're working professionally, sure. But if you're a student or just starting out, there are better free options.

## Paid vs Free Tools

**Free tools are enough when you're starting out.** Don't waste money on paid tools until you have a job in RE or you're making money from it.

Paid tools are worth it when you're professional. Not before.

## My Workflow

**For games:**
1. Check the build file structure - is it Unity, Unreal, or something else?
2. If Unity: is it .NET or il2cpp?
3. Use the appropriate tools based on that.

**For crackmes:**
1. Open Cutter
2. Start doing funny shit
3. ???
4. Solve it

It's really that simple. Don't overcomplicate it.

## Tools I Wish Existed

**AI-integrated decompilers.** Imagine an AI that can analyze repetitive patterns and automate basic reversing tasks. So you don't have to manually trace the same function logic over and over.

**Better decompilers for C/C++.** Current decompilers turn C/C++ code into a pointer mess. If someone made a decompiler that actually produces readable C/C++ code, I'd pay for it once.

## Final Thoughts

You don't need expensive tools to learn reverse engineering. You need patience, logic, and the ability to read assembly.

Start with free tools. Learn the basics. Once you're making money or working professionally, *then* consider paid tools.

And if someone tells you that you *need* IDA Pro to learn RE, they're full of shit.

---

**TLDR:** Cutter for disassembly/decompilation, [Cheat Engine](https://www.cheatengine.org/) for memory, [dnSpyEx](https://github.com/dnspyex) for .NET, Python for automation. Free tools are enough. IDA is overpriced for beginners. Don't waste money until you're professional.
