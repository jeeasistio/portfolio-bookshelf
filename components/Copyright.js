import { Typography, Link } from '@material-ui/core';

const Copyright = ({ align="left" }) => {
  return (
    <Typography variant="body2" color="inherit" align={align}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        library-pink.vercel.app
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;