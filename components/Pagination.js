import { IconButton, Box, Typography } from '@material-ui/core'
import NavigateNextIcon from '@icons/NavigateNext'
import NavigateBeforeIcon from '@icons/NavigateBefore'

const Pagination = ({ params, setParams, perPage, data }) => {
  
  const handleNext = () => setParams(prev => ({...prev, page: prev.page + 1}));
  const handlePrev = () => setParams(prev => ({...prev, page: prev.page - 1}));
  
  return (
    <Box 
      display="flex" justifyContent="center" 
      alignItems="center" my={4}
    >
      <IconButton 
        onClick={handlePrev} color="secondary" 
        disabled={params.page === 1}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <Typography color="primary" variant="h6">{params.page}</Typography>
      <IconButton 
        onClick={handleNext} color="secondary"
        disabled={data?.length !== +perPage}
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  )
}

export default Pagination;