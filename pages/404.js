import { Box, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.common.white,
    padding: theme.spacing(8)
  },
  imgStyle: {
    maxWidth: '100%'
  }
}))

const Custom404 = () => {
  
  const classes = useStyles();
  
  return (
    <Box className={classes.root}>
      <Typography variant="h4">
        Page not found
      </Typography>
      <Box mt={2}>
        <img className={classes.imgStyle} src="/images/page-not-found.png" />
      </Box>
    </Box>
  )
}

export default Custom404;