import { v4 as uuidv4 } from 'uuid'
import { Skeleton } from '@material-ui/lab'
import { TableRow, TableCell, Typography } from '@material-ui/core'
import { isMobile } from 'react-device-detect'

const RequestsSkeleton = () => {
  return Array(isMobile ? 20 : 50).fill(0).map(request => (
    <TableRow key={uuidv4()}>
      <TableCell>
        <Typography><Skeleton /></Typography>
      </TableCell>
      <TableCell align="center">
        <Typography><Skeleton /></Typography>
      </TableCell>
      <TableCell align="center">
        <Typography><Skeleton /></Typography>
      </TableCell>
      <TableCell align="center">
        <Typography><Skeleton /></Typography>
      </TableCell>
    </TableRow>
  ))
}

export default RequestsSkeleton;