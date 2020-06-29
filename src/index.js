import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

const el = document.getElementById("root")
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if (process.env.NODE_ENV === "production") {
  ReactDOM.hydrate(app, el)
} else {
  ReactDOM.render(app, el)
}
