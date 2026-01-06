---
title: "How to start Game Hacking"
date: "2026-01-06" # yy mm dd
description: "Continuation of my older post about reverse engineering"
---

This is a continuation of my [reverse engineering guide](/blog/how-to-start-reverse-engineering). If you haven't read that yet, go read it first. You need to understand the basics of assembly, memory, and how programs work before jumping into game hacking.

## Why a Separate Blog?

Not everyone who learns reverse engineering wants to hack games. Some people reverse software for security research, malware analysis, or just to understand how things work.

Game hacking is a specific application of RE skills. It requires the same foundation, but the approach is different. You're not just analyzing - you're actively modifying behavior in real-time.

So if you're here specifically for game hacking, this is for you.

## How I Started

I was studying app development at home and game development at school (Skyro.ai). At some point I thought - how can I combine these two things to learn something new?

I searched for tutorials online and found Cheat Engine. Started with the basics, then moved to dnSpy for Unity games, and now I'm combining everything with C++ for more advanced stuff.

Game hacking became the bridge between understanding how games work (from a dev perspective) and understanding how they work at a low level (from a hacker perspective).

## Prerequisites

If you skipped my RE guide, here's what you need to know before starting:
- Basic programming (C++ preferred, C# is fine too)
- Understanding of memory, pointers, and addresses
- Basic assembly knowledge (you don't need to be an expert, but you should know what `mov`, `push`, `call` do)
- Ability to use a debugger/disassembler

If any of that sounds confusing, [go read the RE guide first](/blog/how-to-start-reverse-engineering).

## Legal Disclaimer (So I Don't Get Fucked)

I recommend practicing on single-player games or games you own. Most online games have Terms of Service that ban cheating, and I'm not responsible if you get banned or face legal consequences.

This guide is for educational purposes. Learn the skills, understand how games work, but don't be a dickhead in ranked matches.

Now that's out of the way, let's get started.

## Tools You'll Need

Here's what I actually use:

**[Cheat Engine](https://www.cheatengine.org/)** - Your main tool. Memory scanner, debugger, trainer maker. Essential.

**[dnSpyEx](https://github.com/dnspyex/dnSpy)** - For Unity games built with .NET (Mono). Not the original dnSpy - that's abandoned. Use the Ex fork.

**[il2cpp-dumper](https://github.com/Perfare/Il2CppDumper)** - For Unity games built with IL2CPP. Dumps assemblies so you can see class structures and offsets.

**[Cutter](https://cutter.re/) or [IDA](https://hex-rays.com/ida-free)** - For disassembly/decompilation. I use Cutter, but IDA's F5 pseudocode feature is beginner-friendly. Personal preference.

**[x64dbg](https://x64dbg.com/)** - For debugging native code. Better debugger than Cutter, no decompiler.

**[UE4Dumper/UEDumper](https://github.com/guttir14/UnrealDumper-4.25)** - For Unreal Engine games. Dumps SDK, offsets, classes. More on this later.

You don't need all of these right away. Start with Cheat Engine.

## Start With Cheat Engine

Cheat Engine is where everyone starts. It's simple, free, and powerful.

Download it, install it, and **do the tutorial**. Seriously. CE comes with a built-in tutorial (Tutorial-i386.exe or Tutorial-x86_64.exe). It teaches you:
- Scanning for values
- Finding what writes to an address
- Finding what accesses an address
- Code injection
- Pointers

[Here's a video walkthrough of the CE tutorial](LINK) if you get stuck.

Once you finish the tutorial, pick a simple single-player game and try to make a basic cheat. Change your health, infinite ammo, speed hacks - whatever. Just get comfortable with scanning memory and modifying values.

### Understanding Pointers

Pointers are essential. When you restart a game, memory addresses change. A pointer chain lets you find the same value every time.

Example: Your health might be at address `0x12345678` right now. But when you restart the game, it's at `0x87654321`. A pointer chain like `[Base + 0x10] + 0x20` will always find your health, no matter where it moves.

Cheat Engine has a pointer scanner. Use it. Learn how it works. [Here's a tutorial on pointers in CE](LINK).

### Cheat Tables (.CT Files)

A cheat table is a saved collection of addresses, scripts, and pointers. You can share these with others or use them as templates.

**Your first project:** Make a cheat table for a game you like. Include:
- Health pointer
- Ammo pointer
- Speed hack script
- Infinite money (if the game has economy)

This is your foundation. Master this before moving forward.

## Code Injection vs AOB Injection

This is where I fucked up as a beginner, so let me explain it clearly.

**Code Injection** - You inject your own assembly code into the game. Example: You find the instruction that decreases health, replace it with a `jmp` to your own code that does nothing (or increases health instead).

**AOB (Array of Bytes) Injection** - You search for a specific byte pattern in memory and inject code there. This is more reliable because memory addresses change between game updates, but byte patterns often stay the same.

In Cheat Engine, when you create a script, you can use either method. AOB is better for making scripts that survive game updates.

Example AOB script structure:

```asm
[ENABLE]
aobscanmodule(DecreaseHealth,game.exe,89 87 A0 00 00 00) // Find pattern
alloc(newmem,$1000)
label(code)
label(return)

newmem:
  // Your custom code here
  jmp return

code:
  // Original instruction
  mov [rdi+000000A0],eax
  jmp return

DecreaseHealth:
  jmp newmem

[DISABLE]
DecreaseHealth:
  mov [rdi+000000A0],eax
dealloc(newmem)
```

You don't need to understand all of this right now. Just know that AOB scripts are more stable than hardcoded addresses.

[Here's a tutorial on CE scripting](LINK).

## Types of Cheats

There are multiple ways to build cheats. Here are the main types:

**External Cheats** - Run as a separate process. Read/write memory from outside the game using Windows API (`ReadProcessMemory`, `WriteProcessMemory`). Easier to develop, easier to detect.

**Internal Cheats** - Injected directly into the game process (DLL injection). Can hook game functions, access internal structures directly. Harder to develop, harder to detect.

**Kernel Cheats** - Run in kernel mode (Ring 0). Can bypass most anti-cheats. Requires driver development knowledge. This is advanced - don't start here.

**DMA Cheats** - Use hardware (DMA card) to read memory without triggering anti-cheat. Expensive, complicated setup. Mostly used for competitive games with strong anti-cheats.

For learning, start with **Cheat Engine** (which is external). Once you're comfortable, move to **internal cheats** (C++ DLL injection).

Don't touch kernel or DMA stuff until you've mastered the basics.

## Unity Games

Unity is everywhere. Mobile games, indie games, even some AAA titles. There are two main build types, and the approach is completely different for each.

### .NET (Mono) Unity Games

These are compiled to C# bytecode and run on the Mono runtime. They're the easiest to reverse.

**How to identify:** Look in the game folder. If you see `Assembly-CSharp.dll`, it's a .NET build.

**Tool:** [dnSpyEx](https://github.com/dnspyex/dnSpy) (not the original dnSpy - that project is dead, use the Ex fork).

Open `Assembly-CSharp.dll` in dnSpyEx. You'll see the entire game code in readable C#. Classes, functions, variables - everything.

Want infinite health? Find the `Health` class, find the function that decreases health, and modify it. dnSpyEx lets you edit and recompile on the fly.

This is as easy as game hacking gets.

### IL2CPP Unity Games

IL2CPP (Intermediate Language To C++) converts C# code to C++ and compiles it to native code. This makes it way harder to reverse.

**How to identify:** Look for `GameAssembly.dll` and `il2cpp-data` folder instead of `Assembly-CSharp.dll`.

**Tool:** [il2cpp-dumper](https://github.com/Perfare/Il2CppDumper)

Run il2cpp-dumper on `GameAssembly.dll` and the `global-metadata.dat` file (in the il2cpp-data folder). It will dump:
- `dump.cs` - Class structures and function signatures (not actual code, just declarations)
- `script.json` - Offsets for everything

Now you can use these offsets in Cheat Engine or write a C++ external/internal cheat.

**Don't use il2cpp-inspector.** It's outdated. il2cpp-dumper is the standard.

Example: You want to find the player's health. Look in `dump.cs` for the `PlayerHealth` class. Find the offset. Use that offset in your cheat.

IL2CPP games require more work than .NET games, but they're still easier than native games because you have class structures and function names.

### Why IL2CPP Exists

Unity devs use IL2CPP for two reasons:
1. Performance (compiled C++ is faster than Mono)
2. Security (harder to reverse than .NET DLLs)

It works. IL2CPP games are harder to hack. But with il2cpp-dumper, you still have a huge advantage over reversing a game from scratch.

## Unreal Engine Games

Unreal is harder than Unity. The engine is huge, the code is complex, and you need to understand Unreal's internal structure.

### UEDumper

For Unreal games, you need [UEDumper](https://github.com/guttir14/UnrealDumper-4.25) (or UE4Dumper depending on the engine version).

This dumps:
- GObjects (global object array)
- GNames (global name array)
- GWorld (game world pointer)
- SDK (engine classes and structures)

But here's the problem: finding GObjects, GNames, and GWorld in the first place is complicated. You need to reverse the game binary, find patterns, understand Unreal's memory layout.

[Here's a tutorial on finding GWorld in IDA](https://www.youtube.com/watch?v=Iyie3LD9W8Y).

**My recommendation:** Don't start with Unreal. If you want to hack an Unreal game, stick to Cheat Engine tables for now. Once you're comfortable with Unity IL2CPP and native games, then try Unreal.

Unreal is the deep end. Don't jump in before you can swim.

## Why NOT to Start with Anti-Cheat Games

Some games have anti-cheat systems: EAC (Easy Anti-Cheat), BattlEye, Vanguard, etc.

Should you start with these games? **No.**

Not because it's unethical (though you'll get banned). Because it's way harder.

Anti-cheats detect:
- Cheat Engine by name
- Common injection methods
- Known byte patterns
- Kernel-level hooks

Bypassing anti-cheat requires:
- Kernel drivers (or exploiting vulnerable drivers)
- Advanced obfuscation
- DMA hardware (for the hardest anti-cheats)
- Constant updates (anti-cheats patch bypasses regularly)

Start with games that have **no anti-cheat**. Examples:
- Single-player games
- Older multiplayer games (CS 1.6, AssaultCube)
- Games with weak or no protection

Once you're comfortable making cheats for unprotected games, then you can research anti-cheat bypasses.

For something like Valorant (Vanguard) or Fortnite (EAC), you're looking at kernel-level work or DMA cards. That's not beginner territory.

## Don't Use AI for Reverse Engineering

AI won't help you here. I've tried.

Ask ChatGPT or Claude to help you reverse a game or bypass an anti-cheat, and it will either:
1. Refuse because it's "unethical"
2. Give you generic advice that doesn't apply to your specific game
3. Hallucinate completely wrong information

Reverse engineering requires understanding the specific code in front of you. AI can't see your game's memory. It can't analyze your assembly. It can't help you find pointers.

You need to learn this yourself. Read tutorials, watch videos, ask humans on forums (like UnknownCheats), but don't rely on AI.

## What NOT to Do

**Don't start with mobile games.** Rooting your phone, installing Game Guardian, only to find out that most mobile games are server-side or protected - it's not worth it. Mobile game hacking is its own beast. Don't touch it as a beginner or even intermediate.

**Don't pay for "cheat development courses."** Most are overpriced garbage. The free resources (YouTube, UnknownCheats, GuidedHacking's free content) are more than enough.

**Don't use public cheats in online games.** You will get banned. Public cheats are detected within days. If you want to cheat in online games (which I don't recommend), make your own private cheat.

**Don't skip the fundamentals.** You can't just download a source code paste, compile it, and understand what you're doing. Learn Cheat Engine first. Understand memory. Then move forward.

## Advice from Someone More Experienced

I asked TheCruZ (creator of kdmapper, experienced in cheat development and kernel stuff) for advice when I was starting. Here's what he told me:

**Start with games you actually like.** Motivation comes from working on something you care about. If you hate the game, you won't stay motivated when things get hard.

**Start with easy games.** Don't go for Valorant or Fortnite right away. Find a game with no anti-cheat and simple mechanics. Some games even ship with debug symbols (PDB files), which makes reversing way easier.

**IDA is beginner-friendly.** The F5 decompile feature shows you pseudocode that looks like the original C++ code. This helps you understand what the assembly is doing.

(I still prefer Cutter, but that's personal preference. Use what works for you.)

## Useful Resources

Here's what actually helped me:

**YouTube:**
- [Swashed](https://www.youtube.com/@Swashed_) - Beginner-friendly Cheat Engine tutorials
- [Intigriti](https://www.youtube.com/@intigriti) - More CE tutorials
- [GuidedHacking](https://www.youtube.com/@GuidedHacking) - Free tutorials (paid content on their site, but YouTube is free)
- [Cazz](https://www.youtube.com/@cazz) - CS2 hacking, really good content
- [Carlg](https://www.youtube.com/@carlgwastaken) - Also CS2 focused
- [manuroger](https://www.youtube.com/@manuroger112) - Some useful CS2 videos
- [null7953](https://www.youtube.com/@null7953/) - General cheat tutorials

**Forums:**
- [UnknownCheats.me](https://www.unknowncheats.me/) - Best forum for game hacking. Read, ask questions, learn from others.

**Personal:**
- Me - You can DM me on Discord: `@michal.flaska`. I'll try to help if I can. If I don't respond, I probably got banned (I'm not ghosting you).

## Your First Real Cheat

Here's what you should do:

1. **Pick a simple game.** Single-player, no anti-cheat, something you actually like playing.
2. **Make a cheat table in Cheat Engine.** Find health, ammo, money - whatever's relevant.
3. **Add pointers so the cheat works after restarting the game.**
4. **Write a simple script.** Infinite health, god mode, speed hack - something basic.
5. **Test it. Break it. Fix it.**

Once you've done that, you understand the basics.

Then move to Unity .NET games (easiest), then IL2CPP games (harder), then native games (hardest), and eventually Unreal if you're feeling ambitious.

## Final Thoughts

Game hacking is frustrating. You'll spend hours finding the right address only to realize the game has 20 layers of pointers. You'll write a cheat that works perfectly, then a game update breaks everything.

But when it works? When you finally crack a game you've been stuck on for days? That feeling is worth it.

Don't expect to hack AAA games with anti-cheat in your first month. Start small. Build up your skills. Learn from failures.

And most importantly: actually play around with this stuff. Don't just read tutorials and think you understand. You learn by doing.

Good luck. And if you hack something cool, let me know.

---

**Related posts:**
- [How to start reverse engineering](/blog/how-to-start-reverse-engineering)
- [Tools I use for reverse engineering](/blog/reverse-engineering-tools-i-use)
