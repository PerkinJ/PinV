# PinV:a lightweight data visualization componnet library.

A **10kb** Redux-powered alternative to [preact-boilerplate](https://github.com/developit/preact-boilerplate), implementing a Data  Visualization Lightweight Componnet Library based d3.js


> As of `v2`, now wonderfully simplified via [preact-redux](https://github.com/developit/preact-redux) (no more preact-compat!).


---


# Quick-Start Guide

- [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Structure](#structure)


## Installation

**1. Clone this repo:**

```sh
git clone git@github.com:PerkinJ/PinV.git my-app
cd my-app
```


**2. Make it your own:**

```sh
rm -rf .git && git init && npm init
```

> :information_source: This re-initializes the repo and sets up your NPM project.


**3. Install the dependencies:**

```sh
npm install
```

> You're done installing! Now let's get started developing.



## Development Workflow


**4. Start a live-reload development server:**

```sh
PORT=8080 npm run dev
```

> This is a full web server nicely suited to your project. Any time you make changes within the `src` directory, it will rebuild and even refresh your browser.


**5. Generate a production build in `./build`:**

```sh
npm run build
```

You can now deploy the contents of the `build` directory to production!

> **Example:** deploy to [surge.sh](https://surge.sh):
>
> `npm i surge && surge build -d my-app.surge.sh`


---



## License

MIT


[Preact]: https://github.com/developit/preact
[webpack]: https://webpack.github.io
