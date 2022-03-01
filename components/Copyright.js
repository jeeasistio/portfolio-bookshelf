import { Typography, Link } from '@material-ui/core';

const Copyright = ({ align="left" }) => {
  return (
    <Typography variant="body2" color="inherit" align={align}>
      {'© '}
      {new Date().getFullYear()}
      {' '}
      <Link color="inherit" href="/">
        Bookshelf
      </Link>
    </Typography>
  );
}

export default Copyright;