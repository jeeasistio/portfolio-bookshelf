import { useState, useRef, useContext } from 'react'
import { useRouter } from 'next/router'
import AccountCircleIcon from '@icons/AccountCircle'
import MenuBookIcon from '@icons/MenuBook'
import EmailIcon from '@icons/Email'
import LibraryBooksIcon from '@icons/LibraryBooks'
import ExitToAppIcon from '@icons/ExitToApp'
import PersonAddIcon from '@icons/PersonAdd'
import PersonIcon from '@icons/Person'
import UserContext from '@contexts/UserContext'
import HideOnScroll from '@components/HideOnScroll'
import Copyright from './Copyright'
import { 
  AppBar, 
  Typography, 
  Box, 
  IconButton, 
  Toolbar,
  Popover,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Hidden,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  logoutStyle: {
    color: theme.palette.error.main
  },
  roleStyle: {
    [theme.breakpoints.up('sm')]: {
      flex: 1
    }
  },
  logoStyle: {
    flex: 1,
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center'
    }
  },
  linksStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      flex: 1
    },
    '& > *': {
      color: 'inherit'
    }
  },
  footerRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 'auto',
    padding: theme.spacing(4),
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    minHeight: '30vh'
  }
}))

const HLayout = ({ children }) => {
  
  const classes = useStyles();
  const router = useRouter();
  const { userRole, logoutFunc } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleClose = () => setMenuOpen(false);
  const handleOpen = () => setMenuOpen(true);
  const handleLogout = () => {
    logoutFunc();
    handleClose();
  }
  
  const anchorEl = useRef();
  
  const handleLogo = () => router.push('/');
  
  return (
    <>
      <HideOnScroll>
      <AppBar position="sticky">
        <Toolbar className={classes.toolbarStyle}>
          <Hidden xsDown>
            {userRole === 'librarian' && (
              <Typography variant="h6" className={classes.roleStyle}>Librarian</Typography>
            )}
            {userRole === 'reader' && (
              <Typography variant="h6" className={classes.roleStyle}>Reader</Typography>
            )}
            {userRole === 'guest' && (
              <Typography variant="h6" className={classes.roleStyle}>Guest</Typography>
            )}
          </Hidden>
          
          <Typography 
            className={classes.logoStyle} onClick={handleLogo} 
            component="h1" variant="h4"
          >
            Library
          </Typography>
          
          <Box className={classes.linksStyle}>
            <Tooltip title="Books" arrow>
              <IconButton component="a" href="/">
                <MenuBookIcon />
              </IconButton>
            </Tooltip>
            {userRole === 'librarian' && (
              <Tooltip title="Requests" arrow>
                <IconButton component="a" href="/librarian/requests">
                  <EmailIcon />
                </IconButton>
              </Tooltip>
            )}
            {userRole === 'librarian' && (
              <Tooltip title="Borrowed Books" arrow>
                <IconButton component="a" href="/librarian/borrowed">
                  <LibraryBooksIcon />
                </IconButton>
              </Tooltip>
            )}
            {userRole === 'reader' && (
              <Tooltip title="Requests" arrow>
                <IconButton component="a" href="/reader/requests">
                  <EmailIcon />
                </IconButton>
              </Tooltip>
            )}
            {userRole === 'reader' && (
              <Tooltip title="Borrowed Books" arrow>
                <IconButton component="a" href="/reader/borrowed">
                  <LibraryBooksIcon />
                </IconButton>
              </Tooltip>
            )}
            {userRole === 'guest' && (
              <>
                <IconButton ref={anchorEl} onClick={handleOpen}>
                  <AccountCircleIcon />
                </IconButton>
                <Popover 
                  open={menuOpen} onClose={handleClose}
                  anchorEl={anchorEl.current} keepMounted
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuList>
                    <MenuItem component="a" href="/auth/reader/login">
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText>Login</ListItemText>
                    </MenuItem>
                    <MenuItem component="a" href="/auth/reader/register">
                      <ListItemIcon>
                        <PersonAddIcon />
                      </ListItemIcon>
                      <ListItemText>Register</ListItemText>
                    </MenuItem>
                  </MenuList>
                </Popover>
              </>
            )}
            {userRole !== 'guest' && (
              <>
                <IconButton ref={anchorEl} onClick={handleOpen}>
                  <AccountCircleIcon />
                </IconButton>
                <Popover 
                  open={menuOpen} onClose={handleClose}
                  anchorEl={anchorEl.current} keepMounted
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuList>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon className={classes.logoutStyle}>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      <ListItemText className={classes.logoutStyle}>
                        Logout
                      </ListItemText>
                    </MenuItem>
                  </MenuList>
                </Popover>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
      {children}
    </>
  )
}

const HFLayout = ({ children }) => {
  
  const classes = useStyles();
  
  return (
    <>
      <HLayout />
        {children}
      <Box className={classes.footerRoot}>
        <Copyright />
        <Typography>Privacy and Terms</Typography>
      </Box>
    </>
  )
}

export { HLayout, HFLayout };