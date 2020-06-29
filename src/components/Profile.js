import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import EditIcon from "@material-ui/icons/Edit"
import SaveIcon from "@material-ui/icons/Save"
import React, { Fragment, useContext, useState, useEffect } from "react"
import AppContext from "../contexts/AppContext"
import ChangePassDialog from "./ChangePassDialog"
import { navigate } from "@reach/router"

const useStyles = makeStyles(() => ({
  card: {
    padding: 20,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  iconButton: {
    padding: 1,
  },
}))

const Profile = () => {
  const classes = useStyles()
  const context = useContext(AppContext)
  const { currentUser, setCurrentUser, userToken } = context
  const [, setAlert] = context.appAlert

  const [editMode, setEditMode] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState()
  const [day, setDay] = useState()
  const [year, setYear] = useState()

  useEffect(() => {
    setFirstName(currentUser.first_name)
    setLastName(currentUser.last_name)
    setUsername(currentUser.username)
  }, [currentUser])

  useEffect(() => {
    if (
      Object.keys(currentUser).length !== 0 &&
      (userToken !== "null" || userToken !== null)
    ) {
      const date = new Date(currentUser.create_date)
      setYear(Intl.DateTimeFormat("en", { year: "numeric" }).format(date))
      setMonth(Intl.DateTimeFormat("en", { month: "long" }).format(date))
      setDay(Intl.DateTimeFormat("en", { day: "2-digit" }).format(date))
    }
  }, [currentUser, userToken])

  useEffect(() => {
    if (
      Object.keys(currentUser).length === 0 ||
      userToken === "null" ||
      userToken === null
    ) {
      setAlert({
        severity: "warning",
        message: "You must be logged in",
      })
      navigate("/login")
    }
  }, [])

  const handleSaveEdit = () => {
    setEditMode(false)
    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-access-token": userToken,
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: username,
      }),
    }
    fetch(`http://localhost:80/api/v1/users/${currentUser.username}`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status && data.status === "status") {
          setCurrentUser({ user: data.user })
        }
      })
  }

  return Object.keys(currentUser).length !== 0 &&
    (userToken !== "null" || userToken !== null) ? (
    <Fragment>
      <Grid container justify="center">
        <Grid item xs={10} sm={8} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container justify="flex-end">
                {!editMode ? (
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    size="small"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveEdit}
                  >
                    Save
                  </Button>
                )}
              </Grid>
              <Typography variant="h4">Profile</Typography>
              <Typography color="textSecondary" variant="caption" gutterBottom>
                {`Member since: ${month} ${day}, ${year}`}
              </Typography>
              <Box my={2}>
                <TextField
                  id="first_name"
                  name="first_name"
                  label="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  InputProps={{
                    readOnly: !editMode,
                  }}
                />
              </Box>
              <Box my={2}>
                <TextField
                  id="last_name"
                  name="last_name"
                  label="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  InputProps={{
                    readOnly: !editMode,
                  }}
                />
              </Box>
              <Box my={2}>
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  InputProps={{
                    readOnly: !editMode,
                  }}
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setOpen(true)}
              >
                Change Password
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <ChangePassDialog open={open} setOpen={setOpen} />
    </Fragment>
  ) : null
}

export default Profile
