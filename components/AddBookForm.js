import React from 'react';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  innerRoot: {
    padding: theme.spacing(2)
  },
  textField: {
    margin: theme.spacing(1, 0)
  }
}))

const AddBookForm = () => {

  const classes = useStyles()

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box className={classes.innerRoot} component={Paper}>
        <Typography variant="h6">Book</Typography>
        <form className={classes.form}>
          <TextField className={classes.textField} fullWidth label="Title" variant="outlined" />
          <TextField className={classes.textField} fullWidth label="Author" variant="outlined" />
          <TextField className={classes.textField} multiline fullWidth label="Summary" variant="outlined" />
        </form>
      </Box>
    </Grid>
  )
};

export default AddBookForm;
