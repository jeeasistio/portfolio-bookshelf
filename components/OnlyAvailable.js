import { FormControlLabel, Checkbox } from '@material-ui/core'

const OnlyAvailable = ({ params, setParams }) => {
  
  const handleChange = (e) => setParams(prev => ({
    ...prev, onlyAvailable: e.target.checked
  }))
  
  return (
    <FormControlLabel 
      control={
        <Checkbox checked={params.onlyAvailable} onChange={handleChange} />
      }
      label="Only Available"
    />
  )
}

export default OnlyAvailable;