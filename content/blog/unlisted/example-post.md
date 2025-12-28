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

## Math

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
