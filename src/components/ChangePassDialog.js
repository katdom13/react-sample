import React, { useState, useEffect, useContext } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Button,
} from "@material-ui/core"
import AppContext from "../contexts/AppContext"

const ChangePassDialog = ({ open, setOpen }) => {
  const [currPass, setCurrPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confirm, setConfirm] = useState("")
  const [isMismatched, setMismatched] = useState(false)
  const [isPasswordIncorrect, setPasswordIncorrect] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const context = useContext(AppContext)
  const { currentUser, setCurrentUser, userToken } = context

  useEffect(() => {
    if (newPass.length > 0 && confirm.length > 0 && newPass !== confirm) {
      setMismatched(true)
    } else {
      setMismatched(false)
    }
  }, [newPass, confirm])

  const handlePasswordChange = () => {
    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-access-token": userToken,
      },
      body: JSON.stringify({
        old_pass: currPass,
        new_pass: newPass,
      }),
    }
    fetch(`http://localhost:80/api/v1/users/${currentUser.username}`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status && data.status === "status") {
          setCurrentUser({ user: data.user })
          setOpen(false)
        } else {
          setPasswordIncorrect(true)
          setErrorMessage(data.error)
        }
      })
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
      <form>
        <DialogContent dividers>
          <Box mb={2}>
            <TextField
              id="curr_pass"
              name="curr_pass"
              label="Current password"
              type="password"
              value={currPass}
              fullWidth
              onChange={(e) => setCurrPass(e.target.value)}
              error={isPasswordIncorrect}
              helperText={isPasswordIncorrect ? errorMessage : ""}
            />
          </Box>
          <Box mb={2}>
            <TextField
              id="new_password"
              name="new_password"
              label="New password"
              type="password"
              value={newPass}
              fullWidth
              onChange={(e) => setNewPass(e.target.value)}
              error={isMismatched}
              helperText={isMismatched ? "Passwords are not equal" : ""}
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
              error={isMismatched}
              helperText={isMismatched ? "Passwords are not equal" : ""}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Box my={1}>
            <Button
              onClick={handlePasswordChange}
              color="primary"
              disabled={isMismatched || isPasswordIncorrect}
            >
              Save changes
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ChangePassDialog
