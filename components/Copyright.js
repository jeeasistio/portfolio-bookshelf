import { Typography, Link } from '@material-ui/core';

const Copyright = ({ align="left" }) => {
  return (
    <Typography variant="body2" color="inherit" align={align}>
      {'© '}
      {new Date().getFullYear()}
      {' '}
      <Link color="inherit" href="#">
        library-pink.vercel.app
      </Link>
    </Typography>
  );
}

export default Copyright;