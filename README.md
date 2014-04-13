# Revelar

Create stunning presentations in **Markdown** using [Reveal.js](https://github.com/hakimel/reveal.js) from the confort of your command line.

## Getting started

```shell
npm install --g revelar
```

Create a new project with a `slides` folder and place your slide files in there.

Each file will correspond to a different section in your presentation. In each file you can have multiple slides, each separated by a `--` pattern like:

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

Then start the server

```shell
revelar
```

Open your fancy presentation at [http://0.0.0.0:8000/](http://0.0.0.0:8000/).

## Author

[Paulo Ragonha](http://paulo.ragonha.me).
