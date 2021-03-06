import Helmet from 'react-helmet'
import React from 'react'
import { Link } from 'legendary-pancake'

import documentationPages from './documentationPages'
import HTMLContent from './HTMLContent'
import Introduction from './Introduction'
import Layout from './Layout'

const pages = {
  // Front page
  '/': (callback) => {
    callback(
      <Layout>
        <Helmet title='Home page' />
        <h1>Home page</h1>
        <p><strong>legendary-pancake</strong> is an <strong><em>advanced</em></strong> static site builder based on React.js, webpack, and React Router.</p>
        <p>Read the <Link to='/introduction/'>introduction</Link>?</p>
      </Layout>
    )
  },

  // A redirect
  '/readme/': '/introduction/',

  // A synchronous route
  '/introduction/': (callback) => {
    callback(
      <Layout>
        <Helmet title='Introduction' />
        <h1>Introduction</h1>
        <Introduction />
      </Layout>
    )
  },

  // An asynchronous route (using require.ensure())
  '/pancake/': (callback) => {
    require.ensure([ ], () => {
      const PancakePage = require('./PancakePage').default
      callback(
        <Layout>
          <Helmet title='Pancake' />
          <PancakePage />
        </Layout>
      )
    })
  },

  // 404 page. By convention, use /no-match/.
  '/404.html': (callback) => {
    callback(
      <Layout>
        <Helmet title='404???' />
        <h1>404</h1>
      </Layout>
    )
  }
}

// Advanced usage: Generating documentation from asynchronously loaded
// Markdown files...
//
for (const documentationPage of documentationPages) {
  const { pathname, metadata } = documentationPage
  pages[pathname] = (callback) => {
    documentationPage.loadContent((html) => {
      callback(
        <Layout>
          <Helmet title={metadata.title} />
          <h1>{metadata.title}</h1>
          <HTMLContent html={html} />
        </Layout>
      )
    })
  }
}

export default pages
