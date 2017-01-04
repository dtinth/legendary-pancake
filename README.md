# legendary-pancake

> Great repository names are short and memorable. Need inspiration? How about __legendary-pancake__.
> —GitHub

__legendary-pancake__ is an ___advanced___ static site generator based on webpack, React and React Router.


## How it looks like

You define each of your page programmatically:

```js
const pages = {
  '/': (callback) => {
    callback(<Layout><HomePage /></Layout>)
  },
  '/profile/': (callback) => {
    callback(<Layout><ProfilePage /></Layout>)
  }
}

for (const article of require('./articles')) {
  pages[`/articles/${article.slug}/`] = (callback) => {
    article.loadContent().then((content) => {
      callback(<Layout><ArticlePage content={content} /></Layout>)
    })
  }
}

export default pages
```

Then legendary-pancake renders these pages into static HTML and also generates
a client side bundle to further enhance the experience.


## About

It has been extracted from Taskworld’s marketing site which requires:

- __Localization.__ The entire site may be translated into multiple languages.

- __A/B testing.__ We sometimes must generate more than one version of the same page to be able to perform A/B testing.

- __Prerendering.__ As a marketing site, web page performance is very important. The page must appear as quickly as possible. We need to prerender every page into static HTML files, so that they can be served quickly.

- __Code splitting.__ With many pages, it’s too slow to download the entire site’s content. It’s also not good to load each page on demand. We must be able to group related pages together to make navigation between related pages instantaneous.

Therefore, it has been designed for advanced users and gives you total control of:

- __Your site structure.__
  Unlike [Gatsby](https://github.com/gatsbyjs/gatsby), it doesn’t generate routes based on filesystem layout.
  _You_ define every route programmatically.

- __How you write CSS.__
  PostCSS? PreCSS? cssnext? Sass? LESS? Stylus? CSS Modules? Autoprefixer? Inline Styles?
  legendary-pancake has no preference on this.

- __The prerendering process.__
  You decide how your React element gets turned into an HTML file.

  You can use libraries like [react-document-title](https://github.com/gaearon/react-document-title), [react-helmet](https://github.com/nfl/react-helmet) to help with `<head>` elements, or roll your own solution.
  Inline your critical CSS or JS in your HTML file, or just use normal `<script>` tags. It’s all up to you.

- __Route loading.__ legendary-pancake has no preference on how to load your page contents. For small sites, you can package the entire site content in a single bundle.

  Or you can use webpack’s [code splitting](https://webpack.github.io/docs/code-splitting.html) or [bundle-loader](https://github.com/webpack/bundle-loader) to split your contents into multiple chunks which are loaded asynchronously, either eagerly or on-demand.
  Create a chunk for every page, or group related pages together based on analytics data, like we do at Taskworld.
  You’re in total control.

- __Your deployment process.__
  legendary-pancake can be configured to render pages into a different directory from the webpack assets. This allows for some advanced use-cases, such as A/B testing a static site.

But `legendary-pancake` will take care of these for you:

- __Development and building workflow.__
  It comes with a CLI tool to run the development server and generate the static site.

- __Managing URLs and route transitions.__
  legendary-pancake preconfigures React Router to support asynchronous routing and prerendering at the same time.


## Examples

* [legendary-pancake’s home page](https://taskworld.github.io/legendary-pancake/) is generated by legendary-pancake.
  The source code lives in the [examples/homepage](https://github.com/taskworld/legendary-pancake/tree/master/examples/homepage/) directory.
