---
title: "Understanding Pointers in C++"
date: "2025-12-27"
description: "Pointers confused me for a good while, but once they clicked, a lot of things in C++ started making sense. So let me break them down for you..."
---

If you've been learning C++ for a while, you've probably heard about pointers. And if you're like me when I first started, you probably thought "what the hell is this" when you saw code with asterisks and ampersands everywhere.

Pointers confused me for a good while, but once they clicked, a lot of things in C++ started making sense. So let me break them down for you.

## What Are Pointers?

A pointer is basically a variable that stores a memory address. That's it. Instead of holding a value like `5` or `"hello"`, it holds the location in memory where that value lives.

Think of it like this - your house has an address, right? The address isn't your actual house, it just tells you where to find it. Pointers work the same way. They don't hold the data itself, they hold the address where the data is stored.

## Why Do We Even Need Pointers?

Good question. When I first learned about them, I thought "why not just use regular variables?"

Here's why pointers are useful:

**Memory efficiency** - When you pass large objects (like arrays or structs) to functions, copying them is expensive. Pointers let you pass just the address instead of copying the whole thing.

**Dynamic memory** - Sometimes you don't know how much memory you need until runtime. Pointers let you allocate memory on the fly using `new` and `delete`.

**Direct memory manipulation** - In game development and reverse engineering (stuff I'm into), you need to access specific memory addresses. Pointers are essential for that.

**Data structures** - Things like linked lists, trees, and graphs rely heavily on pointers to connect nodes together.

If you want a basic overview of what pointers are, [W3Schools has a decent intro](https://www.w3schools.com/cpp/cpp_pointers.asp).

## How to Define a Pointer

Here's the syntax:

```cpp
int* ptr;
```

This creates a pointer called `ptr` that can point to an integer. The asterisk (`*`) tells the compiler "this is a pointer, not a regular variable."

Some people write it like `int *ptr` or `int * ptr` - it all works the same. I personally use `int* ptr` because it makes it clear that the type is "pointer to int."

## Getting an Address

To make a pointer actually point to something, you need to give it an address. You use the `&` operator (address-of operator) for this:

```cpp
int num = 42;
int* ptr = &num;
```

Now `ptr` holds the memory address of `num`. If you print `ptr`, you'll see something like `0x7ffeeb8b3a4c` - that's the hexadecimal memory address.

## Dereferencing

So you have a pointer that holds an address. How do you actually access the value at that address? You dereference it using the `*` operator:

```cpp
int num = 42;
int* ptr = &num;

std::cout << *ptr; // Prints 42
```

The `*` here means "go to the address stored in `ptr` and give me the value there."

You can also modify the value:

```cpp
*ptr = 100;
std::cout << num; // Prints 100
```

This is one of the powerful (and dangerous) things about pointers - you're directly manipulating memory.

## nullptr vs NULL

In older C++ code, you'd see pointers initialized with `NULL`:

```cpp
int* ptr = NULL;
```

`NULL` is basically just `0`. The problem is that `0` can be ambiguous - is it an integer or a null pointer?

Modern C++ (C++11 and later) introduced `nullptr`, which is explicitly a null pointer:

```cpp
int* ptr = nullptr;
```

Always use `nullptr` in modern C++. It's type-safe and makes your intentions clear. If you want to dive deeper into why `nullptr` exists, [this article explains it well](https://www.learncpp.com/cpp-tutorial/null-pointers/).

## Pointer Arithmetic

Pointers aren't just static addresses - you can do math with them. This is especially useful when working with arrays.

```cpp
int arr[5] = {10, 20, 30, 40, 50};
int* ptr = arr; // Points to first element

std::cout << *ptr; // Prints 10
ptr++; // Move to next element
std::cout << *ptr; // Prints 20
```

When you increment a pointer, it doesn't just add `1` to the address. It adds the size of the data type. So if you have an `int*` and you do `ptr++`, it moves forward by `sizeof(int)` bytes (usually 4 bytes).

You can also do:
- `ptr--` to move backward
- `ptr + 3` to jump ahead by 3 elements
- `ptr - 2` to go back by 2 elements

[GeeksforGeeks has some solid examples](https://www.geeksforgeeks.org/pointer-arithmetics-in-c-with-examples/) if you want to see more.

## Common Mistakes

**Uninitialized pointers** - If you declare a pointer without initializing it, it contains garbage:

```cpp
int* ptr; // Danger! Points to random memory
*ptr = 10; // Probably crashes your program
```

Always initialize pointers:

```cpp
int* ptr = nullptr;
```

**Dangling pointers** - If you delete memory but still have a pointer to it, that pointer is now dangling:

```cpp
int* ptr = new int(42);
delete ptr;
// ptr still holds the old address, but the memory is freed
*ptr = 10; // Undefined behavior - could crash or corrupt data
```

After deleting, set the pointer to `nullptr`:

```cpp
delete ptr;
ptr = nullptr;
```

**Memory leaks** - If you allocate memory with `new` and forget to `delete` it, you've got a memory leak:

```cpp
void bad_function() {
    int* ptr = new int(42);
    // Forgot to delete - memory is leaked
}
```

Always clean up:

```cpp
int* ptr = new int(42);
// Use ptr...
delete ptr;
```

Or better yet, use smart pointers (`std::unique_ptr`, `std::shared_ptr`) which handle cleanup automatically. But that's a topic for another post.

## Quick Example

Here's a simple program that shows pointers in action:

```cpp
#include <iostream>

int main() {
    int num = 100;
    int* ptr = &num;
    
    std::cout << "Value of num: " << num << std::endl;
    std::cout << "Address of num: " << &num << std::endl;
    std::cout << "Value stored in ptr: " << ptr << std::endl;
    std::cout << "Value ptr points to: " << *ptr << std::endl;
    
    *ptr = 200; // Change value through pointer
    std::cout << "New value of num: " << num << std::endl;
    
    return 0;
}
```

Output will be something like:
```
Value of num: 100
Address of num: 0x7ffeeb8b3a4c
Value stored in ptr: 0x7ffeeb8b3a4c
Value ptr points to: 100
New value of num: 200
```

## Wrapping Up

Pointers are one of those things that seem scary at first but become second nature once you use them enough. They're powerful, but you need to be careful - direct memory access means you can easily shoot yourself in the foot if you're not paying attention.

Start simple, practice with basic examples, and don't worry if it doesn't click immediately. It took me a while too.

In a future post, I might cover more advanced stuff like double pointers, pointers to functions, and how they're used in real projects. But for now, this should get you started.
