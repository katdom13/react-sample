import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import { Link, navigate } from "@reach/router"
import React, { Fragment, useContext } from "react"
import AppContext from "../../contexts/AppContext"
import { deepPurple } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}))

const Header = () => {
  const classes = useStyles()

  const context = useContext(AppContext)
  const { currentUser, setCurrentUser, userToken, setUserToken } = context
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "x-access-token": userToken,
      },
    }
    fetch("http://localhost:80/api/v1/logout", options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status && data.status == "success") {
          setUserToken({ token: "" })
          setCurrentUser({ user: {} })
          navigate("/login")
        }
      })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Sample Login
            </Link>
          </Typography>
          {Object.keys(currentUser).length === 0 ||
          userToken === "null" ||
          userToken === null ? (
            <Fragment>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>
                Sign up
              </Button>
            </Fragment>
          ) : (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  className={classes.purple}
                >{`${currentUser.first_name[0]}${currentUser.last_name[0]}`}</Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
