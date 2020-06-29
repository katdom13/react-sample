const Bundler = require("parcel-bundler")
const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")

const app = express()

app.use(
  createProxyMiddleware("/api/v1/**", {
    target: "http://localhost:80",
  })
)

const bundler = new Bundler("src/index.html", {
  cache: false,
})
app.use(bundler.middleware())

app.listen(Number(process.env.PORT || 1234))
