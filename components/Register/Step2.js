import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RedButton } from '@components/Buttons'
import AccountCircleIcon from '@icons/AccountCircle'
import NavigateNextIcon from '@icons/NavigateNext'
import NavigateBeforeIcon from '@icons/NavigateBefore'
import HomeIcon from '@icons/Home'
import { 
  TextField, 
  Button, 
  Typography, 
  Box,
  InputAdornment,
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
    justifyContent: 'space-between'
  },
  inputStyle: {
    flex: 1
  }
}))

const Step2 = ({ fields, setFields, handleNext, handleBack }) => {
  
  const classes = useStyles();
  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: fields
  });
  
  const nextFunc = (data) => {
    handleNext()
    setFields(prev => ({ ...prev, ...data }));
  } 
  
  return (
    <Box component="form" onSubmit={handleSubmit(nextFunc)} className={classes.formStyle}>
      <Typography className={classes.stepTitle} variant="h4" align="center">
        Let us know some details
      </Typography>
      <Box>
        <AccountCircleIcon color="primary" fontSize="large" />
        <TextField 
          className={classes.inputStyle}
          label="Full Name"
          variant="outlined"
          name="username"
          autoFocus
          error={errors.username}
          helperText={errors.username?.message}
          inputRef={register({
            required: 'Please enter a username'
          })}
        />
      </Box>
      
      <Box>
        <HomeIcon color="primary" fontSize="large" />
        <TextField 
          className={classes.inputStyle}
          label="Address"
          variant="outlined"
          name="address"
          error={errors.address}
          helperText={errors.address?.message}
          inputRef={register({
            required: 'Please enter an address'
          })}
        />
      </Box>
      
      <Box className={classes.buttonsStyle}>
        <RedButton 
          variant="contained" 
          onClick={handleBack}
          startIcon={<NavigateBeforeIcon />}
        >
          Back
        </RedButton>
        <Button 
          variant="contained" 
          color="primary" 
          type="submit"
          endIcon={<NavigateNextIcon />}
        >
          Next
        </Button>
      </Box>
    </Box>
  )
}

export default Step2;