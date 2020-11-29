import React from 'react';
import { Box, Typography, Fade } from '@material-ui/core';

const ErrorMsg = ({ message }) => {
  return (
    <Fade in={true}>
    <Box width={'100%'} display="flex" justifyContent="center" my={6}>
      <Typography variant="h5" color="textSecondary">{message}</Typography>
    </Box>    
    </Fade>
  )
}

export default ErrorMsg;