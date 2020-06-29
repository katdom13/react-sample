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
import React, { useContext, useState, useEffect } from "react"
import { useAlert } from "../hooks"
import AppContext from "../contexts/AppContext"
import { navigate } from "@reach/router"

const useStyles = makeStyles(() => ({
  paper: {
    padding: 20,
    marginTop: "50px",
    marginLeft: 20,
    marginRight: 20,
  },
}))

const Signup = () => {
  const classes = useStyles()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [hasPasswordError, setPasswordError] = useState(false)

  const context = useContext(AppContext)
  const { currentUser, setCurrentUser, userToken, setUserToken } = context
  const [alert, setAlert] = context.appAlert
  const [MyAlert] = useAlert()

  const handleSignup = () => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password,
      }),
    }
    fetch("http://localhost:80/api/v1/users", options)
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
          navigate("/signup")
        }
      })
  }

  useEffect(() => {
    if (password.length > 0 && confirm.length > 0 && password !== confirm) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }, [password, confirm])

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

  return (
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
                Register
              </Typography>
              <Divider variant="middle" />
              <br />
            </Grid>
            <Grid item>
              <form>
                <Box mb={2}>
                  <TextField
                    id="first_name"
                    name="first_name"
                    label="First name"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    id="last_name"
                    name="last_name"
                    label="Last name"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    id="username"
                    name="username"
                    label="Username"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    error={hasPasswordError}
                    helperText={
                      hasPasswordError ? "Passwords are not equal" : ""
                    }
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    id="confirm"
                    name="confirm"
                    label="Confirm password"
                    type="password"
                    value={confirm}
                    fullWidth
                    onChange={(e) => setConfirm(e.target.value)}
                    error={hasPasswordError}
                    helperText={
                      hasPasswordError ? "Passwords are not equal" : ""
                    }
                  />
                </Box>
                <Box>
                  <Grid container justify="center">
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={handleSignup}
                      disabled={hasPasswordError}
                    >
                      Signup
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

export default Signup
