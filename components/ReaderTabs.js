import { Box, Tabs, Tab, Link } from '@material-ui/core'

const ReaderTabs = ({ active }) => {
  return (
    <Box>
      <Box my={2}>
        <Tabs value={active} variant="fullWidth">
          <Tab 
            component={Link} value="requests" label="Requests"
            href={`/reader/requests`} underline="none"
         />
          <Tab 
            component={Link} value="borrowed" label="Borrowed"
            href={`/reader/borrowed`} underline="none"
         />
        </Tabs>
      </Box>
    </Box>
  )
}

export default ReaderTabs;