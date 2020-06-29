import React, { Fragment, useState, useReducer, useEffect } from "react"
import { Header } from "./components/layouts"
import Body from "./components/Body"
import AppContext from "./contexts/AppContext"

const App = () => {
  const [user, setUser] = useReducer(
    (state, action) => (action.user ? action.user : state),
    {},
    () => {
      const stored = JSON.parse(localStorage.getItem("currentUser"))
      return Object.keys(stored).length !== 0 ? stored : {}
    }
  )

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(user))
  }, [user])

  const [token, setToken] = useReducer(
    (state, action) => (action.token ? action.token : state),
    "",
    () => {
      const stored = localStorage.getItem("userToken")
      return stored !== "null" || stored !== null ? stored : ""
    }
  )

  useEffect(() => {
    localStorage.setItem("userToken", token)
  }, [token])

  const appAlert = useState({})

  return (
    <AppContext.Provider
      value={{
        currentUser: user,
        setCurrentUser: setUser,
        userToken: token,
        setUserToken: setToken,
        appAlert: appAlert,
      }}
    >
      <Fragment>
        <Header />
        <Body />
      </Fragment>
    </AppContext.Provider>
  )
}

export default App
