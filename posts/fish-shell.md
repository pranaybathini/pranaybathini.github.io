---
title: "Fish Shell"
description: "Fish is a smart and user-friendly command-line shell for Linux, macOS, and the rest of the family."
date: "2021-03-08"
image: "/images/3_fish_shell.jpg"
tags: ["Shell", "Scripting"]
---

Previously, I used bash and zsh. After moving to the fish shell, a lot of things have changed and I am using it for nearly 2 years now. The user experience is extremely comfortable and enjoyable compared to other shells. I am not planning to go back and I suggest everyone should try it.

In this article, I am going to write everything about the fish shell.



## What is the fish shell?

Fish is a smart and user-friendly command-line shell for Linux, macOS, and the rest of the family. Notice the bold words. Let’s define the words now by delving into the features directly.





## Features
* Inline auto-suggestions based on history
* Tab completion using man-page data
* Syntax highlighting.
* Intuitive wildcard support.
* Web-based configuration
* Sane scripting


You can install fish in Ubuntu by running the following commands.


```bash
sudo apt-add-repository ppa:fish-shell/release-3
sudo apt-get update
sudo apt-get install fish

```

For other systems, refer [here](https://rootnroll.com/d/fish-shell/).



Let’s break them down

* Inline auto-suggestions based on history

* Smart auto-suggestions are rarely seen. Fish auto-suggestions are out of the box. This insanely awesome feature is very smooth and I feel it is better than zsh auto-suggestions. Actually, this is one of the primary reasons for shifting to the fish shell.

* Using your history, fish suggests the next possibilities of completing the commands. You can complete them with right-arrow key.



## Syntax highlighting


You can see, if something either a command or folder or file name doesn’t exist or invalid, it will highlight in red. If it exists, it will be in blue.

But, more importantly, while you type the prompt auto-suggests your previous commands (by recent and most used). This is far quicker than ctrl+r and usually shows the command you want 80% of the time.



So, no more ctrl+R, just type what you remember about the command you want to use and use top and bottom arrow keys.

## Tab completion using man-page data.

Fish parses CLI tool man pages, which makes it easy to provide auto-completions for most of the commands. You can use tab to get all the options.


## Intuitive wildcard support


This is what I like most about fish. So, Intuitive. Try the same in bash and zsh and let me know in comments if it works.


## Web-based configuration

You can set your colors and view functions, variables, and history all from a web page running on a local webserver. This is pretty much the only shell that offers this. How cool. You just need to launch the following command.

```fish
fish__config
```


## Sane Scripting

fish is fully scriptable, and its syntax is simple, clean, and consistent. You’ll never use do and done in a loop anymore. Clearly, it is different from bash.

```fish
for i in (seq 5)                   

    echo $i

end
```

Very clean indeed. For more reference [here](https://fishshell.com/docs/current/tutorial.html).


## Adding more customization

You can install themes for the fish shell too. Yes, if you have used zsh, you might have used the great oh-my zsh package manager. Oh my fish is the fish shell package manager.

## Oh my fish

Oh My Fish allows you to install packages that extend or modify the look of your shell. It’s fast, extensible, and easy to use.

## Installation

You can get started right away with the default setup by running this in your terminal:

```bash
curl -L https://get.oh-my.fish | fish
```

This will download the installer script and start the installation. 

For usage refer [here](https://github.com/oh-my-fish/oh-my-fish).

I have installed agnoster theme. So, far it is the best theme according to me.


## Agnoster theme characteristics
* Displays the status of the previous command, if failed
* Displays the working branch
* Displays uncommitted changes
* It doesn’t clutter the terminal


You can find many more customization related settings for fish [here](https://github.com/jorgebucaran/awsm.fish).



There aren’t many disadvantages faced by me. It works fine with almost all the tools I use except for some bash related commands.



Refer this stack overflow and hacker news for the discussion on fish not being a POSIX standard.

