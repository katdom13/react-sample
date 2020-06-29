import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { navigate } from "@reach/router"
import React, { useContext, useState, useEffect } from "react"
import AppContext from "../contexts/AppContext"
import { useAlert } from "../hooks"

const useStyles = makeStyles(() => ({
  paper: {
    padding: 20,
    marginTop: "50px",
    marginLeft: 20,
    marginRight: 20,
  },
}))

const Login = () => {
  const classes = useStyles()
  const [identity, setIdentity] = useState("")
  const [password, setPassword] = useState("")

  const context = useContext(AppContext)
  const { currentUser, setCurrentUser, userToken, setUserToken } = context
  const [alert, setAlert] = context.appAlert
  const [MyAlert] = useAlert()

  const handleLogin = () => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identity: identity,
        password: password,
      }),
    }
    fetch("http://localhost:80/api/v1/login", options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status && data.status == "success") {
          setCurrentUser({ user: data.user })
          setUserToken({ token: data.token })
          navigate("/profile")
        } else {
          setAlert({
            severity: "error",
            message: data.error,
          })
          navigate("/login")
        }
      })
  }

  useEffect(() => {
    return () => {
      setAlert({})
    }
  }, [])

  useEffect(() => {
    if (
      Object.keys(currentUser).length !== 0 &&
      (userToken !== "null" || userToken !== null)
    ) {
      navigate("/profile")
    }
  }, [currentUser, userToken])

  return Object.keys(currentUser).length !== 0 &&
    (userToken !== "null" || userToken !== null) ? null : (
    <Grid container justify="center">
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper className={classes.paper} elevation={5}>
          <Grid container direction="column" justify="center">
            {Object.keys(alert).length !== 0 ? (
              <Grid item>
                <MyAlert
                  severity={alert.severity}
                  message={alert.message}
                  open={true}
                />
              </Grid>
            ) : null}
            <Grid item>
              <Typography gutterBottom variant="h4">
                Login
              </Typography>
              <Divider variant="middle" />
              <br />
            </Grid>
            <Grid item>
              <form action="">
                <Box mb={2}>
                  <TextField
                    id="identity"
                    name="identity"
                    label="Username/Email"
                    fullWidth
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    fullWidth
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Box>
                <Box>
                  <Grid container justify="center">
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  </Grid>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Login
