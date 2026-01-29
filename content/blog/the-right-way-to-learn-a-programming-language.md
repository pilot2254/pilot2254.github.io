---
title: "The Right Way to Learn a Programming Language"
date: "2026-01-29"
description: "Everyone learns their first language wrong. Here's how to actually learn a new one without fucking yourself over."
---

I'm currently learning C++. I also work with C# and Assembly (where I suck the most). I used to do JavaScript and TypeScript too, but I stopped with web dev because the scene is oversaturated as hell - [I wrote about that here](/blog/why-i-stopped-with-web-development).

Here's the thing - I'm not claiming I'm an expert. I don't know any language 100%. But I've learned enough to recognize when I'm learning wrong. And most people? They're learning wrong.

## The Biggest Fuckups When Learning a Language

Let me tell you the mistakes I see constantly - and the ones I made myself.

**Thinking you can skip basics because you know another language.** This is bullshit. Don't do it. Yeah, you know what a variable is. You understand loops. Cool. That doesn't mean you can skip learning how memory works in C++, or how ownership works in Rust, or whatever the core concept is in the language you're learning.

Each language has its own way of doing things. Learn it properly.

**Copy-pasting from AI or Stack Overflow without understanding it.** This one is deadly. I wrote a whole blog about [my AI addiction](/blog/stop-using-ai-to-do-your-work) (that's thankfully gone), so I'm not gonna repeat everything here. But let me be clear: if you're learning, you cannot copy-paste code you don't understand. You're not building a product right now, you're building your skills. Every time you paste code without understanding it, you're making yourself dumber.

**Being too ambitious too early.** When I started learning C++, I really wanted to build something big already. I thought small projects were useless. I ignored the basics. I wanted to jump straight to game engines, reverse engineering tools, complex systems.

That approach fucked me over for months. I felt like something was missing. I was too dependent on AI. I couldn't solve simple problems on my own because I never practiced them.

## What Actually Works: Small Projects

So I said fuck this shit, I'm missing something fundamental. I asked AI to give me small programming tasks - not projects, just *tasks*. Things like:
- Write a function that merges two sorted vectors into one sorted vector
- Rotate an array to the right by k positions
- Find the first non-repeating character in a string and return it
- Sort a vector of strings alphabetically
- Reverse a 2D matrix clockwise

These aren't exciting. They're not impressive. But they teach you the programming logic you actually need.

Here's how I do it:
1. Get a task from AI (or find one online)
2. Code it myself - no looking up solutions, no asking AI for help
3. Only when I'm genuinely stuck do I look something up
4. After I finish, I send my code to AI for review - not to write it for me, but to tell me what I did wrong and what I did right

This is completely different from asking AI to do your work. I'm forcing myself to think. I'm only using AI as a teacher, not as a crutch.

And it works. I'm noticing I need help way less often now.

## What I See Other People Doing Wrong

In my class, most people only code during school hours. They don't practice at home. Or if they do, they jump straight to ambitious projects and get frustrated when they can't finish them.

Here's a real example: we're learning C# for Unity. The first thing we did was make a game. Sounds cool, right? Except most people had never coded before. They see a `MonoBehaviour` class, don't even know what classes are, then see a combination of Unity and C# syntax all mixed together.

That's fucking overwhelming. And guess what happened? A lot of people gave up on coding entirely and switched to game design or 3D art, saying that they are dumb.

Some of them could've made it. Some of them probably weren't cut out for it. But I genuinely believe that if they had learned "the right way" - starting with pure C# basics, doing small tasks, building up gradually - they wouldn't have given up so fast.

## How I Approach Learning Now

When I do small projects, I don't set a time limit. I just code until it works. If I hit a problem, I struggle with it by myself until I genuinely can't figure it out. Then (and only then) I look it up or ask AI.

The key difference from before? I'm not asking AI to solve it for me. I'm asking AI to explain why my approach didn't work, or to point me in the right direction.

If you want to try this approach, here's what I recommend:

Ask AI (Claude, ChatGPT, whatever) to give you small programming tasks. Tell it:
- Don't give me solutions unless I explicitly ask
- Be honest about my code - tell me what's bad, not just what's good
- Give me tasks that focus on core concepts (arrays, strings, loops, etc.)

Then actually code them yourself. No copy-pasting. No shortcuts.

## What's a "Small Project" Anyway?

People hear "small projects" and think "build a to-do app" or "make a calculator." Sure, those work. But I'm talking even smaller.

A small project is a single function. A single problem. Something you can finish in 30 minutes to 2 hours.

Examples:
- Function that finds the longest word in a sentence
- Function that checks if a string is a palindrome
- Function that removes duplicates from a vector
- Function that calculates factorial recursively
- Function that converts a decimal number to binary

These aren't glamorous. You won't put them in your portfolio. But they teach you how to think in the language you're learning.

## Stop Overthinking

Another problem I had (and still have sometimes) - overthinking. Looking at a simple problem and thinking "there must be a clever solution" instead of just solving it the obvious way first.

These small tasks force you to stop overthinking. Just solve the problem. Make it work. Then optimize later if you want.

## The Web Dev Connection

I mentioned I stopped doing web dev because it's [oversaturated](/blog/why-i-stopped-with-web-development). But here's the thing - even in oversaturated fields, people who actually know their shit stand out.

The problem is most people don't know their shit. They learned by copy-pasting tutorials. They can build a landing page but can't explain how async/await works. They know React but don't understand JavaScript fundamentals.

Don't be that person. Learn properly from the start.

## Resources

Where do you get these practice problems?

**Ask AI.** Seriously. Tell Claude or ChatGPT: "Give me 10 small C++ programming tasks focused on arrays and strings. Don't give me solutions unless I ask. Be honest when reviewing my code."

**LeetCode Easy problems.** Yeah, LeetCode is known for interview prep, but the Easy section has solid fundamental practice.

**Codewars.** Similar concept, gamified, lots of beginner-friendly challenges.

**Your own brain.** Think of a small utility you need. A function that formats strings a certain way. A tool that processes a text file. Whatever. Then build it.

## Final Thoughts

Learning a programming language is not about rushing to build impressive projects. It's about building a foundation.

Small projects aren't glamorous. They're not exciting. You won't show them off to anyone. But they're how you actually learn.

I wasted months being too ambitious. Don't make the same mistake I did.

Start small. Practice fundamentals. Stop copy-pasting. And when you finally do build something big, you'll actually understand what the fuck you're doing.

---

**TLDR:** Stop being too ambitious when learning a new language. Do small tasks (merge sorted arrays, find palindromes, etc.) to build fundamentals. Don't copy-paste from AI - use it for review, not solutions. Practice at home, not just in class. Small projects teach you more than one big project you don't understand.
