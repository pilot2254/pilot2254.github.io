---
title: "So you want to start reverse engineering?"
date: "2025-12-28"
description: "This blog post is my attempt to give you a roadmap - the one I wish I had when I started. I'm not an expert, I'm still learning, but that's exactly why this might help. I remember what confused me, what I wish someone had explained better, and what actually worked."
---

Reverse engineering is hard as fuck. But if you're the type of person who sees a locked door and immediately wants to know what's behind it, or you've ever wondered "how the hell does this program actually work under the hood," then this might be for you.

I got serious about reverse engineering in mid-2025. Game development and web dev felt too... surface level. I wanted to understand how things *really* work. Not just write code that compiles, but understand what happens when it compiles. What the CPU actually does with your code. How programs protect themselves. How to break those protections.

This blog post is my attempt to give you a roadmap - the one I wish I had when I started. I'm not an expert, I'm still learning, but that's exactly why this might help. I remember what confused me, what I wish someone had explained better, and what actually worked.

## Before you start: Do you even qualify?

Seriously. If you don't have programming experience, stop reading and go learn that first. You need to understand:
- Variables, data types, functions, loops, conditionals
- Pointers and memory (crucial)
- How programs are structured
- Basic debugging

**You should know C or C++.** Not Python. Not JavaScript. Not Java. Here's why:

**You should know C or C++.** Not Python. Not JavaScript. Not Java. Here's why:

Python and JavaScript are high-level interpreted languages. They hide everything interesting from you. When you write `x = 5`, you don't allocate memory, you don't manage types, the language does it for you. That's great for productivity, terrible for understanding what's actually happening.

C/C++ forces you to think about memory. When you declare `int x = 5;`, you're allocating 4 bytes on the stack. When you use pointers (`int* ptr = &x;`), you're directly manipulating memory addresses. When your program crashes with a segfault, you fucked up memory management. This pain teaches you how computers actually work.

When you reverse engineer a program, you're looking at assembly code that was generated from something like C/C++. The closer your mental model is to how the compiler thinks, the easier RE becomes. If you only know Python, you'll be completely lost when you see `mov eax, [ebp-4]` because you've never thought about registers or stack frames.

I recommend starting with C/C++ crackmes because most native programs you'll reverse are written in these languages. The patterns you learn will directly apply to real-world RE work.

Also, if you're the type of person who needs help installing programs, this post isn't for you. I'm assuming you can download an executable, run it, and figure out basic software installation. If not, then this blog post is not for you.

## How computers actually work

You don't need a CS degree, but you need to understand the basics. I'll cover the essentials here, but I'm linking resources for deeper learning.

### The CPU, registers, and memory

Your CPU executes instructions. That's it. It reads an instruction from memory, executes it, moves to the next one. When you compile your C++ code, it becomes a series of these instructions (assembly/machine code).

**Registers** are tiny, extremely fast storage locations inside the CPU. Think of them as variables the CPU can access instantly. Common ones on x86-64:
- `rax`, `rbx`, `rcx`, `rdx` - general purpose registers
- `rsi`, `rdi` - often used for function arguments
- `rsp` - stack pointer (points to top of the stack)
- `rbp` - base pointer (points to bottom of current stack frame)
- `rip` - instruction pointer (points to next instruction to execute)

On 32-bit (x86), these are `eax`, `ebx`, etc. On 16-bit, `ax`, `bx`, etc. The pattern: `r` prefix = 64-bit, `e` prefix = 32-bit, no prefix = 16-bit.

**Memory** is slower but much larger. Your program's code, variables, heap allocations - everything lives in memory. The CPU loads data from memory into registers, does operations on registers, then stores results back to memory.

**The stack** is a region of memory used for function calls, local variables, and return addresses. It grows downward (toward lower memory addresses). When you call a function, the return address gets pushed onto the stack. When the function returns, that address gets popped off.

### Bits, bytes, and data types

A **bit** is a 0 or 1. A **byte** is 8 bits. Everything in a computer is bits.

When you see `int32` or `int64`:
- `int32` = 32 bits = 4 bytes (range: -2,147,483,648 to 2,147,483,647)
- `int64` = 64 bits = 8 bytes (much larger range)

An `unsigned int32` uses all 32 bits for positive numbers (0 to 4,294,967,295).

A pointer on a 64-bit system is 8 bytes (64 bits) because it needs to store a memory address.

When you're reversing a program and see `mov dword ptr [rbp-4], 5`, that `dword` means "double word" = 4 bytes = 32-bit integer.

**Resources for deeper learning:**
- [How computers work (Crash Course)](https://www.youtube.com/watch?v=O5nskjZ_GoI)
- [CPU registers explained](https://www.youtube.com/watch?v=Vap_4SgRr5Q)
- [Memory and pointers (Khan Academy)](https://www.khanacademy.org/computing/computer-science/programming/pointers-dynamic-memory/a/pointers)

## How compilers work (the basics)

When you write C++ code and compile it, multiple things happen:

1. **Preprocessing** - handles `#include`, `#define`, macros
2. **Compilation** - converts C++ to assembly code
3. **Assembly** - converts assembly to machine code (binary)
4. **Linking** - combines your code with libraries, creates final executable

The compiler also *optimizes* your code. Your original source might have `x = 5; y = x + 3;` but the compiler might just do `y = 8` because it's smarter than you. This is why reversed code often looks nothing like the original.

Different **architectures** produce different assembly:
- x86 (32-bit Intel/AMD)
- x86-64 (64-bit Intel/AMD) 
- ARM (mobile devices, Apple Silicon)
- etc.

A program compiled for x86-64 on Windows won't run on ARM. The machine code is completely different. When you reverse engineer, you need to know what architecture you're dealing with.

**Different compilers** (GCC, Clang, MSVC) generate different assembly even from the same source code. They have different optimization strategies. Keep this in mind - there's no "one true way" code compiles.

## You need to learn assembly

There's no way around this. You can use decompilers (tools that try to convert assembly back to C-like code), but they're not perfect. You'll need to read raw assembly eventually.

Assembly looks scary at first:
```asm
push rbp
mov rbp, rsp
mov dword ptr [rbp - 4], 0
mov eax, dword ptr [rbp - 4]
pop rbp
ret
```

But it's just instructions. `mov` moves data. `push` puts something on the stack. `pop` takes something off the stack. `ret` returns from a function. You learn by doing.

I'm not gonna write a full assembly tutorial here (this post is long enough), but here are good resources:
- [x86 Assembly Crash Course (YouTube)](https://www.youtube.com/watch?v=75gBFiFtAb8)
- [Assembly Language Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/assembly_programming/index.htm)

You don't need to master assembly before starting RE. Learn the basics, then learn more as you go.

## Tools you'll need

I already wrote a blog post about [the tools I use for reverse engineering](/blog/reverse-engineering-tools-i-use). Go read that first if you haven't.

**TL;DR of that post:**
- **Cutter** - my main RE tool (free, open source, has decompiler)
- **x64dbg** - debugger (better debugging than Cutter, but no decompiler)
- **Cheat Engine** - for game hacking specifically

For beginners, I recommend [Cutter](https://cutter.re/). It has a decompiler that tries to show you C-like code alongside the assembly. This helps you understand what the assembly is doing.

x64dbg has a better debugger (step through code, set breakpoints, modify memory in real-time), but only shows assembly, no decompilation. Once you're comfortable with assembly, x64dbg becomes more useful.

## Starting with crackmes

**Crackmes** are intentionally vulnerable programs designed for learning RE. They're perfect for practice because:
- They're legal to reverse (unlike real software)
- They're small and focused (unlike real applications)
- They increase in difficulty gradually

Go to [crackmes.one](https://crackmes.one/) and then go to the search page.

### My recommended filters for beginners:
- **Difficulty:** Level 1
- **Quality:** 3.0 to 6.0 (filters out garbage)
- **Language:** C/C++ (but honestly, pick whatever interests you - I started with C/C++ and still don't know if that was the best choice)
- **Architecture:** Whatever your current system is (probably x86-64)
- **OS:** Whatever you're running (Windows/Linux/macOS)

Please make sure to read the [FAQ on crackmes.one](https://crackmes.one/faq). All the crackme files are in password-protected zips. The password is in the FAQ. Don't waste time trying to crack the zip encryption - that's not the challenge.

Crackmes.one and crackmes.de are generally safe - creators must disclose if there's malware. But always check the comments and description first. If something looks sketchy or explicitly mentions malware/viruses, run it in a VM. For normal Level 1-3 crackmes with good ratings, you're fine running them directly.

When you download a crackme, it's usually an executable that asks for a password or serial key. Your job is to find the correct input, or bypass the check entirely, or understand how the validation works.

## Learning Cutter

Don't just install Cutter and stare at it confused. Watch this tutorial first:
[Cutter Tutorial by RazviOverflow](https://youtu.be/zrXA3AC_658?si=qv6ebylT5F0bwll6)

It's 20 minutes and covers the interface, basic navigation, how to find interesting functions, how to read the decompiler output.

If you want to use x64dbg instead:
[x64dbg Tutorial by aXXo](https://youtu.be/7jtJ34Rc7jk?si=BOgvhCE68zqYOLkU)

But again, I recommend starting with Cutter because seeing decompiled code alongside assembly helps you learn faster.

## My actual workflow

Here's how I approach a crackme:

1. Run the program first. See what it does. Does it ask for a password? A serial? Does it just say "nope, wrong"?
2. Open it in Cutter
3. Look for interesting strings (Cutter has a strings panel). If it says "Correct password!" somewhere, that's a clue
4. Find the `main` function (or entry point). Follow the code flow
5. Look for comparisons (`cmp`, `test` instructions). This is usually where the password check happens
6. Try to understand the logic. Is it comparing your input to a hardcoded string? Is it doing math on your input?
7. Either find the correct input, or patch the binary to bypass the check

I'll be making a video showing exactly how I solve a crackme step-by-step. I'll update this post with the link once it's up. **[UPDATE: Video here - link-to-your-video-when-ready]**

## If you're into game hacking

This post focuses on native code and crackmes, but if you're interested in game hacking specifically, Unity games are a different beast.

**.NET/Mono Unity games** use managed code. You reverse these with dnSpyEx (not the original dnSpy - use the maintained fork). You're reading C# instead of assembly, which is way easier.

**IL2CPP Unity games** are compiled to native code. These require the same RE skills you're learning here - assembly, disassemblers, debuggers. They're harder but more interesting.

I cover my full game hacking setup in [my tools post](/blog/reverse-engineering-tools-i-use). If games are your main interest, read that after you get comfortable with basic crackmes.

## Practice: Reverse your own code

This is underrated advice. Write a simple C++ program:
```cpp
#include <iostream>
using namespace std;

int main() {
    int password = 12345;
    int input;
    
    cout << "Enter password: ";
    cin >> input;
    
    if (input == password) {
        cout << "Correct!" << endl;
    } else {
        cout << "Wrong!" << endl;
    }
    
    return 0;
}
```

Compile it with GCC (or MSVC, Clang, whatever):
```bash
g++ -o test test.cpp
```

Now reverse it in Cutter. You have the source code, so you can compare what you wrote versus what the assembly looks like. This is *incredibly* useful for understanding how high-level code translates to low-level instructions.

Try different things:
- Add more variables
- Use loops
- Use functions
- Turn on compiler optimizations (`g++ -O2 -o test test.cpp`) and see how the assembly changes

Build up your intuition for how C++ becomes assembly.

## Going deeper

I'm not gonna explain everything in detail here - that would make this post even longer and honestly, learning by doing is better than reading 10,000 words of theory.

But here are topics you'll eventually need to learn more about:
- **Calling conventions** (how functions pass arguments, how they return values)
- **Stack frames** (how the stack is organized during function calls)
- **Heap vs stack** (where different types of data live in memory)
- **Anti-debugging techniques** (how programs detect if you're debugging them)
- **Packing/obfuscation** (how programs hide their code)
- **Dynamic analysis** (running the program and watching it in a debugger)
- **Static analysis** (analyzing the code without running it)

You'll naturally learn these by solving harder crackmes and reading documentation when you get stuck. Don't try to master everything before starting - that's a trap. Just start solving crackmes and learn as you go.

## Final thoughts

Reverse engineering is frustrating. You'll spend hours on a crackme that's supposedly "easy" and feel like an idiot. You'll see assembly that makes no sense. You'll think "how the fuck does anyone understand this?"

That's normal. I've been there. I'm still there sometimes.

But when you finally crack a challenge, when you understand what the program is doing, when you bypass a protection or extract a hidden flag - that feeling is worth it.

If you want to give it a try, go download a Level 1 crackme right now. Don't overthink it. Just load it in Cutter and start poking around. You won't understand everything immediately. That's fine. You learn by struggling.

Good luck. And if you solve some interesting crackmes, let me know. I'm always looking for recommendations.

---

**Related posts:**
- [Tools I use for reverse engineering](/blog/reverse-engineering-tools-i-use)
