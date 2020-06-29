import express from "express"
import fs from "fs"
import path from "path"
import React from "react"
import ReactDOMServer from "react-dom/server"
import App from "../src/App"

const PORT = 3000
const app = express()

app.use("^/*$", (req, res) => {
  const markup = <App />
  console.log("DUMP", ReactDOMServer.renderToString(markup))
  fs.readFile(path.resolve("./dist/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send(`Error: ${err}`)
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(markup)}</div>`
      )
    )
  })
})

app.use(express.static(path.resolve(__dirname, "..", "dist")))

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`)
})
