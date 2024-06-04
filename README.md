# Discord Widgets

A reasonably good discord invite widget library.

## Usage

First, import the library by adding `<script src="https://anotherpillow.github.io/discord-widgets/widget.min.js"></script>` to your `<head>`

Then add this to a `<script>` tag somewhere *after* the import:

```js
const container = document.querySelector('#invite')
const widget = new DiscordWidget(
    '[SOME INVITE]', // String
    container, // HTMLElement
    '/icon_discord.png' // String - **OPTIONAL** alt URL for image.
)

widget.create()
```

An example can be found in [test.html](./test.html)

## Appearance

![image](./assets/appearance.png)
