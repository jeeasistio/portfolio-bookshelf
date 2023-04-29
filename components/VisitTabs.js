import { Box, Tabs, Tab, Link } from '@material-ui/core'

const VisitTabs = ({ active, personId }) => {
  return (
    <Box>
      <Box my={2}>
        <Tabs value={active}variant="fullWidth">
          <Tab 
            component={Link} value="requests" label="Requests"
            href={`/librarian/visit/requests/${personId}`} underline="none"
         />
          <Tab 
            component={Link} value="borrowed" label="Borrowed"
            href={`/librarian/visit/borrowed/${personId}`} underline="none"
         />
        </Tabs>
      </Box>
    </Box>
  )
}

export default VisitTabs;