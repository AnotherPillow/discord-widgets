# Discord Widgets

A reasonably good discord invite widget library.

## Usage

First, import the library by adding `<script src="https://anotherpillow.github.io/discord-widgets/widget.min.js"></script>` to your `<head>`

Then add this to a `<script>` tag somewhere *after* the import:

```js
const container = document.querySelector('#invite')
const widget = new DiscordWidget(
    '[SOME INVITE]', // String
    container // HTMLElement
)

widget.create()
```

An example can be found in [test.html](./test.html)


## Appearance

![img](https://github.com/AnotherPillow/discord-widgets/assets/85362273/63cde4b6-23d5-458e-a2af-c611291f4d0f)
