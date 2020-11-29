import Head from 'next/head'
import { HFLayout } from '@components/Layout'
import Step1 from '@components/Register/Step1'
import Step2 from '@components/Register/Step2'
import Step3 from '@components/Register/Step3'
import { useState } from 'react'
import { 
  Container, 
  Box, 
  Stepper, 
  StepLabel, 
  Step, 
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  containerStyle: {
    padding: theme.spacing(2)
  },
  stepBox: {
    padding: theme.spacing(2),
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}))

const Register = () => {
  
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);
  const [fields, setFields] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    address: '',
    libraryPassword: ''
  })
  const steps = [
    { 
      label: 'Create Account',
      component: () => (
        <Step1 
          fields={fields}
          setFields={setFields} 
          handleNext={handleNext}
        />
      )
    },
    {
      label: 'Enter Details',
      component: () => (
        <Step2 
          fields={fields}
          setFields={setFields}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )
    },
    {
      label: 'Preview Details',
      component: () => (
        <Step3 
          fields={fields}
          setFields={setFields}
          handleBack={handleBack}
        />
      )
    }
  ];
  
  return (
    <div>
      <Head>
        <title>Register as librarian</title>
      </Head>
      
      <HFLayout>
        <Container maxWidth="lg" className={classes.containerStyle}>
        
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(step => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Box className={classes.stepBox}>
            {steps[activeStep].component()}
          </Box>
          
        </Container>
      </HFLayout>
    </div>
  )
}

export default Register;