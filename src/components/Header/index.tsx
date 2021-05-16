import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import History from '@material-ui/icons/HistoryOutlined'
import Home from '@material-ui/icons/HomeOutlined'

import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250
  },
  listLink: {
    color: theme.palette.text.primary,
    '& .MuiListItemIcon-root': {
      color: theme.palette.text.primary
    }
  },
  listLinkSelected: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.primary.dark,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.dark,
    }
  }
}))

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = (drawerToggle: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && (
      (event as React.KeyboardEvent).key === 'Tab' ||
      (event as React.KeyboardEvent).key === 'Shift'
    )) {
      return
    }

    setIsOpen(drawerToggle)
  }

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(true)}
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            WaQuestions
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        <div
          role='presentation'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List className={classes.list}>
            <ListItem
              component={NavLink}
              exact
              to='/'
              className={classes.listLink}
              activeClassName={classes.listLinkSelected}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
            <ListItem
              component={NavLink}
              to='/attempts'
              className={classes.listLink}
              activeClassName={classes.listLinkSelected}
            >
              <ListItemIcon>
                <History />
              </ListItemIcon>
              <ListItemText>Last Attempts</ListItemText>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div >
  );
}

export default Header