import { useState } from 'react'
import { RedButton, GreenButton } from '@components/Buttons'
import { Alert } from '@material-ui/lab'
import NavigateBeforeIcon from '@icons/NavigateBefore'
import HowToRegIcon from '@icons/HowToReg'
import PersonAddIcon from '@icons/PersonAdd'
import axios from 'axios'
import { 
  Box, 
  Typography, 
  Card, 
  List, 
  ListItem,
  Button,
  Link,
  TextField,
  makeStyles
} from '@material-ui/core'

const fieldNames = [
  { name: 'Email', prop: 'email' },
  { name: 'Full Name', prop: 'username' },
  { name: 'Address', prop: 'address' }
];

const useStyles = makeStyles(theme => ({
  cardStyle: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    '& > div > svg': {
      marginRight: theme.spacing(1)
    }
  },
  stepTitle: {
    marginBottom: theme.spacing(4)
  },
  buttonsStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4)
  },
  loginButton: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  alertStyle: {
    marginTop: theme.spacing(2)
  },
  listItemStyle: {
    display: 'flex', 
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  libraryPass: {
    margin: theme.spacing(4, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  fieldStyle: {
    fontWeight: theme.typography.fontWeightBold
  }
}))

const Step3 = ({ fields, handleBack, setFields, librarian }) => {
  
  const classes = useStyles();
  const [status, setStatus] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ status: 'info', message: 'Processing...' })
    axios.post(
      librarian ? '/api/auth/librarian/register' : '/api/auth/reader/register', 
      fields
    )
      .then(res => setStatus({ status: 'success', message: res.data.msg }))
      .catch(err => setStatus({ status: 'error', message: err.response.data.msg }))
  }
  
  const handleChange = (e) => {
    setFields(prev => ({ ...prev, libraryPassword: e.target.value }));
  }
  
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography className={classes.stepTitle} variant="h4" align="center">
        Preview Details
      </Typography>
      
      {status.status && (
        <Alert severity={status.status}>
          {status.message}
        </Alert>
      )}
    
      <Card className={classes.cardStyle}>
        <List>
          {fieldNames.map( ({name, prop}, index) => (
            <ListItem 
              className={classes.listItemStyle}
              key={index} 
              divider={index !== fieldNames.length - 1}
            >
              <Typography 
                className={classes.fieldStyle} 
                variant="subtitle"
              >
                {name}
              </Typography>
              <Typography>{fields[prop]}</Typography>
            </ListItem>
          ))}
        </List>
      </Card>
      
      {librarian && (
        <Box className={classes.libraryPass}>
          <Typography paragraph align="center" variant="subtitle2">
            Please enter the library password to register.
          </Typography>
          <TextField 
            label="Library Password"
            type="password"
            variant="outlined"
            onChange={handleChange}
          />
        </Box>
      )}
      
      {status.status === 'success' ?
        <Box className={classes.loginButton}>
          <GreenButton
            variant="contained" 
            color="primary" 
            href={librarian ? "/auth/librarian/login" : "/auth/reader/login"}
            endIcon={<HowToRegIcon />}
          >
            Login Now
          </GreenButton>
        </Box>
      : <Box className={classes.buttonsStyle}>
          <RedButton 
            disabled={status.status === 'info'} 
            onClick={handleBack}
            variant="contained" 
            startIcon={<NavigateBeforeIcon />}
          >
            Back
          </RedButton>
          <Button 
            disabled={status.status === 'info'}
            type="submit"
            variant="contained" 
            color="primary"
            endIcon={<PersonAddIcon />}
          >
            Register
          </Button>
        </Box>
      }
    </Box>
  )
}

export default Step3;