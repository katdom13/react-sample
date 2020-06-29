import React from "react"
import { Router } from "@reach/router"
import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"
import Profile from "./Profile"

const Body = () => {
  return (
    <Router>
      <Home path="/" />
      <Login path="/login" />
      <Signup path="/signup" />
      <Profile path="/profile" />
    </Router>
  )
}

export default Body
