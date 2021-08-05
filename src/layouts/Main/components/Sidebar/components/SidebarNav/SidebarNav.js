import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { useCookies } from 'react-cookie';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    // color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)'
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent'
    }
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular
    }
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2)
    }
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit'
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0)
  },
  labelIcon: {
    marginRight: theme.spacing(1)
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1
  }
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other
  } = props;

  return (
    <TreeItem
      label={(
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      )}
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  color: PropTypes.string.isRequired,
  labelIcon: PropTypes.elementType.isRequired,
  labelText: PropTypes.string.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    // padding: '0px 4px',
    // padding: theme.spacing(0, 0.1),
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  link: {
    margin: '0 .4rem 0 0 ',
    cursor: 'pointer'
  },
  logout: {
    cursor: 'pointer'
  }
}));

const SidebarNav = (props) => {
  const { pages } = props;

  const history = useHistory();
  const [, , removeCookie] = useCookies(['x-auth-token']);
  const classes = useStyles();

  const logout = () => {
    localStorage.clear();
    removeCookie(['x-auth-token']);
    history.push('/sign-in');
  };

  return (
    <>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        {pages.map((page) => (
          <NavLink
            activeClassName={classes.active}
            key={page.title}
            to={page.href}
          >
            <StyledTreeItem
              bgColor="#fff"
              labelInfo={page.beta}
              color="inherit"
              nodeId={page.title}
              labelText={page.title}
              labelIcon={page.icon}
            >

              {page.child
                && page.child.map((list) => (
                  <Link color="inherit" key={list.title} to={list.href}>
                    <StyledTreeItem
                      color="inherit"
                      nodeId={list.title}
                      labelText={list.title}
                      labelIcon={list.icon}
                      bgColor="#fff"
                      labelInfo=""
                    />
                  </Link>
                ))}
            </StyledTreeItem>
          </NavLink>
        ))}
        <StyledTreeItem
          bgColor="#fff"
          labelInfo=""
          onClick={logout}
          nodeId="logout"
          labelText="logout"
          labelIcon={Person}
          color="inherit"
        />
      </TreeView>
    </>
  );
};

SidebarNav.propTypes = {
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
