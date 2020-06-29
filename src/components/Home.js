import { Box, Container, Grid, Paper, Typography } from "@material-ui/core"
import React from "react"

const Home = () => {
  return (
    <Grid container spacing={0} align="center" justify="center">
      <Grid item>
        <Paper elevation={3}>
          <Container>
            <Box m={15} py={8}>
              <Typography variant="h1" component="h2">
                Welcome
              </Typography>
            </Box>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Home
