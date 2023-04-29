import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  selectStyle: {
    width: '100%'
  }
}))

const StatusFilter = ({ params, setParams }) => {
  
  const classes = useStyles();
  
  const handleChange = (e) => setParams(prev => ({
    ...prev, status: e.target.value
  }))
  
  return (
    <FormControl className={classes.selectStyle}>
      <InputLabel id="request-status">Status</InputLabel>
      <Select 
        labelId="request-status" 
        value={params.status} onChange={handleChange}
      >
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="accepted">Accepted</MenuItem>
        <MenuItem value="rejected">Rejected</MenuItem>
      </Select>
    </FormControl>
  )
}

export default StatusFilter;