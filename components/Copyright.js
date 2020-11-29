import { Typography, Link } from '@material-ui/core';

const Copyright = ({ align="left" }) => {
  return (
    <Typography variant="body2" color="inhreit" align={align}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        library.co
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;