export default (theme) => {
  return {
    root: {
      margin: theme.spacing(15, 'auto'),
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexFlow: 'column nowrap'
    },
    checkMail: {
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexFlow: 'column nowrap'
    },

    btn: {
      margin: theme.spacing(1, 0)
    },
    paper: {
      position: 'absolute',
      top: '25%',
      alignItems: 'center',
      margin: theme.spacing(2, 1),
      [theme.breakpoints.up('md')]: {
        width: '30%',
        margin: theme.spacing(2, 1)
      }
    }
  };
};
