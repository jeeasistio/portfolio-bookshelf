import { styled } from '@material-ui/styles'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  redBtn: {
    background: `linear-gradient(${theme.palette.error.main}, ${theme.palette.error.main})`, 
    color: theme.palette.error.contrastText
  },
  greenBtn: {
    background: `linear-gradient(${theme.palette.success.main}, ${theme.palette.success.main})`, 
    color: theme.palette.error.contrastText
  }
}))

const RedButton = (props) => {
  const classes = useStyles();
  return <Button {...props} className={classes.redBtn} />
}

const GreenButton = (props) => {
  const classes = useStyles();
  return <Button {...props} className={classes.greenBtn} />
}

export { RedButton, GreenButton };