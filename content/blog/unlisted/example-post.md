---
title: "Example Blog Post"
date: "2024-12-20"
description: "This is an example blog post for me to test functionalities of markdown rendering in my post."
---

# This is a heading

This is a paragraph with some **bold text** and *italic text*. You can also add [links](https://example.com).

## Code blocks

Here's some code:
```cpp
// helloworld in cpp
#include <iostream>

int main(){

  std::cout << "Hello World";

  return 0;
}
```

supports multiple languages:

```lua
-- bubblesort in lua
return function(
	list,
	less_than
)
	less_than = less_than or function(a, b)
		return a < b
	end
	for _ = 1, #list do
		for next = 2, #list do
			local previous = next - 1
			if less_than(list[next], list[previous]) then
				list[next], list[previous] = list[previous], list[next]
			end
		end
	end
end
```

## Inline code

Here's some inline code `printf("Hello World!");`

## Lists

- Unordered item 1
- Unordered item 2
- Unordered item 3

1. Ordered item 1
2. Ordered item 2
3. Ordered item 3

## Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |

And also a horizontal line:

---

## Images

![Alt text](https://www.wondercide.com/cdn/shop/articles/Upside_down_gray_cat.png)

> meow, i'm a cat

## Embeds

<iframe width="auto" height="auto" src="https://www.youtube.com/embed/Uj8XYvYUpnQ?si=7SryXBppuw1IyxxK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## KaTeX Math

### Inline Math

Einstein's famous equation: $E = mc^2$

The quadratic formula: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

---

### Block Math


$$
\begin{array}{rcl}
A & = & B \\
 & = & C \\
 & = & D
\end{array}
$$

---

$$
\sum_{\substack{
0 < i < m \\
0 < j < n\\
}} P(i,j)
$$

---

$$
\prod_{\substack{
p \leq x \\
\text{p prime}
}} \left( 1 - \dfrac{1}{p} \right)
$$

---

$$
f:\begin{array}{rcl}
I & \longrightarrow & J  \\
x & \longrightarrow & f(x)
\end{array}
$$

---

$$
|x| = \left\{ \begin{array}{cl}
x & : \ x \geq 0 \\
-x & : \ x < 0
\end{array} \right.
$$

---

$$
\begin{matrix}
R^n & \overset{A}{\longrightarrow} & R^m \\
\cong &  & \cong \\
R^n & \overset{B}{\longrightarrow} & R^m \\
\end{matrix}
$$

---

$$
\underbrace{
\overbrace{a+b}^6 \cdot \overbrace{c+d}^7
}_\text{example of text} = 42
$$

---

more info:
- https://katex.org/docs/supported.html
- https://latex.codecogs.com/eqneditor/editor.php
- https://latexeditor.lagrida.com/
