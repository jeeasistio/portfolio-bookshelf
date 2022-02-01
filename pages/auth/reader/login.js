import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import UserContext from '@contexts/UserContext'
import { useForm } from 'react-hook-form'
import MenuBookIcon from '@icons/MenuBook'
import Copyright from '@components/Copyright'
import { HLayout } from '@components/Layout'
import { Alert } from '@material-ui/lab'
import axios from 'axios'
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link as MuiLink,
  Paper,
  Box,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '90vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/featured?books)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  register: {
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& a': {
      display: 'block',
      marginTop: theme.spacing(1)
    }
  },
  alertStyle: {
    width: '100%'
  },
  readerStyle: {
    color: theme.palette.info.main
  },
  copyrightCtn: {
    color: theme.palette.text.secondary
  }
}))

const Login = () => {
  const classes = useStyles()
  const router = useRouter()
  const [status, setStatus] = useState({})

  const { register, handleSubmit, errors } = useForm()
  const { setUserRole } = useContext(UserContext)

  const loginFunc = async (data) => {
    setStatus({ status: 'info', message: 'Logging In...' })
    
    try {
      await axios.post('/api/auth/reader/login', data)
      setUserRole('reader')
      router.push('/')
    } catch (err) {
      setStatus({ status: 'error', message: err.response.data.msg })
    }
  }

  return (
    <div>
      <Head>
        <title>Login as librarian</title>
      </Head>
      <HLayout>
        <Grid container component="main" className={classes.root}>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <MenuBookIcon />
              </Avatar>
              <Typography component="pre" variant="h5" paragraph>
                Login as <span className={classes.readerStyle}>Reader</span>
              </Typography>
              {status.status && (
                <Alert severity={status.status} className={classes.alertStyle}>
                  {status.message}
                </Alert>
              )}
              <form className={classes.form} onSubmit={handleSubmit(loginFunc)}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Email Address"
                  type="email"
                  name="email"
                  autoFocus
                  error={errors.email}
                  helperText={errors.email?.message}
                  inputRef={register({
                    required: 'Please enter an email'
                  })}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  error={errors.password}
                  helperText={errors.password?.message}
                  inputRef={register({
                    required: 'Please enter a password',
                    minLength: {
                      value: 8,
                      message: 'Password too short'
                    },
                    maxLength: {
                      value: 20,
                      message: 'Password too long'
                    }
                  })}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Login
                </Button>
                <Grid container justify="center" className={classes.register}>
                  <Grid item>
                    <MuiLink href="/auth/reader/register" variant="body2">
                      Don't have an account? Register
                    </MuiLink>
                  </Grid>
                  <Grid item>
                    <MuiLink href="/auth/librarian/login" variant="body2">
                      Not a reader? Login as Librarian
                    </MuiLink>
                  </Grid>
                </Grid>
                <Box className={classes.copyrightCtn} mt={5}>
                  <Copyright align="center" />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </HLayout>
    </div>
  )
}

export default Login
