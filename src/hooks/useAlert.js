import { Box, Collapse, IconButton } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import { Alert, AlertTitle } from "@material-ui/lab"
import React, { useState, useEffect } from "react"

const useAlert = () => {
  const MyAlert = ({ severity, message, title = "", open = false }) => {
    const [isOpen, setOpen] = useState(true)
    useEffect(() => {
      setOpen(open)
    }, [open])
    return (
      <Box mb={2}>
        <Collapse in={isOpen}>
          <Alert
            severity={severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false)
                }}
              >
                {title !== "" ? <AlertTitle>{title}</AlertTitle> : null}
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {message}
          </Alert>
        </Collapse>
      </Box>
    )
  }
  return [MyAlert]
}

export default useAlert
