import { useState } from 'react'
import { useForm } from 'react-hook-form'
import EmailIcon from '@icons/Email'
import VisibilityIcon from '@icons/Visibility'
import VisibilityOffIcon from '@icons/VisibilityOff'
import NavigateNextIcon from '@icons/NavigateNext'
import LockIcon from '@icons/Lock'
import { 
  TextField, 
  Button, 
  Typography, 
  Box,
  InputAdornment,
  IconButton,
  makeStyles
} from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  formStyle: {
    padding: theme.spacing(2, 0),
    '& > div': {
      margin: theme.spacing(2, 0),
      display: 'flex',
      alignItems: 'center'
    },
    '& > div:last-child': {
      marginTop: theme.spacing(4)
    },
    '& > div > svg': {
      marginRight: theme.spacing(1)
    }
  },
  stepTitle: {
    marginBottom: theme.spacing(4)
  },
  buttonsStyle: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  inputStyle: {
    flex: 1
  },
  librarianStyle: {
    color: theme.palette.warning.main
  },
  readerStyle: {
    color: theme.palette.info.main
  }
}))

const Step1 = ({ fields, setFields, handleNext, librarian }) => {
  
  const classes = useStyles();
  const [showPass, setShowPass] = useState(false);
  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: fields
  });
  const watchedPass = watch('password');
  
  const nextFunc = (data) => {
    handleNext()
    setFields(prev => ({ ...prev, ...data }));
  } 
  
  return (
    <Box component="form" onSubmit={handleSubmit(nextFunc)} className={classes.formStyle}>
      <Typography className={classes.stepTitle} variant="h4" align="center">
        Register as {librarian ? 
          <span className={classes.librarianStyle}>Librarian</span>
        : <span className={classes.readerStyle}>Reader</span>
        }
      </Typography>
      <Box>
        <EmailIcon color="primary" fontSize="large" />
        <TextField 
          className={classes.inputStyle}
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          autoFocus
          error={errors.email}
          helperText={errors.email?.message}
          inputRef={register({
            required: 'Please enter an email'
          })}
        />
      </Box>
      
      <Box>
        <LockIcon color="primary" fontSize="large" />
        <TextField 
          className={classes.inputStyle}
          label="Password"
          variant="outlined"
          name="password"
          type={showPass ? 'text' : 'password'}
          error={errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: 
              <InputAdornment position="end">
                {showPass ?
                  <IconButton onClick={() => setShowPass(false)}>
                    <VisibilityOffIcon /> 
                  </IconButton>
                : <IconButton onClick={() => setShowPass(true)}>
                    <VisibilityIcon />
                  </IconButton>
                }
              </InputAdornment>
          }}
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
      </Box>
      
      <Box>
        <LockIcon color="action" fontSize="large" />
        <TextField 
          className={classes.inputStyle}
          label="Confirm Password"
          variant="outlined"
          name="confirmPassword"
          type={showPass ? 'text' : 'password'}
          error={errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            endAdornment: 
              <InputAdornment position="end">
                {showPass ?
                  <IconButton onClick={() => setShowPass(false)}>
                    <VisibilityOffIcon /> 
                  </IconButton>
                : <IconButton onClick={() => setShowPass(true)}>
                    <VisibilityIcon />
                  </IconButton>
                }
              </InputAdornment>
          }}
          inputRef={register({
            required: 'Please enter a password',
            validate: value => value === watchedPass || 'Passwords do not match'
          })}
        />
      </Box>
      
      <Box className={classes.buttonsStyle}>
        <Button 
          type="submit" 
          color="primary" 
          variant="contained"
          endIcon={<NavigateNextIcon />}
        >
          Next
        </Button>
      </Box>
    </Box>
  )
}

export default Step1;