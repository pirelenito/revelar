# Revelar

Create stunning presentations in **Markdown** using [Reveal.js](https://github.com/hakimel/reveal.js) from the comfort of your command line.

Start by installing the `revelar` utility globally:

```shell
npm install --g revelar
```

Then, from within any folder you can start the revelar server:

```shell
cd my_presentation
revelar
```

Open the presentation server in your browser at [http://localhost:8000](http://localhost:8000).

And start coding your slides in **Markdown**.

## Anatomy of a slide

Revelar will load as many markdown files are available in the folder its executed, creating for each a separate section in your presentation. It will sort the files by name while loading, so you can have files like `01-introduction.md`, `02-about-me.md` and so on to enforce your sequence.

To tell Revelar where a slide ends and another begins you need to place a special separator: `--`.

So a Markdown file with three slides would look like:

```markdown
# Revelar
## This is awesome

[paulo.ragonha.me](http://paulo.ragonha.me)

[@pirelenito](http://twitter.com/pirelenito)

--
# A second slide

--
# And a third
```

## Configuration

To change the default parameters that are passed while initializing [Reveal.js](https://github.com/hakimel/reveal.js), create a `revelar_config.json` file at the same folder of the slide files and add any of the [available Reveal.js config options](https://github.com/hakimel/reveal.js#configuration).

Bellow is an example that disables the controls, disables the progress indicator and changes the transition effect:

```json
{
  "transition": "linear",
  "controls": false,
  "progress": false
}
```

## Themes

It is possible to change the theme of the presentation from the [available Reveal.js themes](https://github.com/hakimel/reveal.js#theming) by specifying it in the `revelar_config.json` file:

```json
{
  "theme": "sky"
}
```

### Custom themes

You can place your custom theme files inside the `themes` folder and use them the same way as a default theme.

## Bootstraping a new presentation

If you want a template to start a new presentation, Revelar can help you with that.

```bash
revelar create my-project
```

This command will create a new folder called `my-project` with some sample slides, a config file and a theme.

## Acknowledgments

This is build on top of the amazing [Reveal.js](https://github.com/hakimel/reveal.js) framework.

## Author

[Paulo Ragonha](http://paulo.ragonha.me).
