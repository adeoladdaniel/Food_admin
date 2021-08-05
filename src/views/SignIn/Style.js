export default (theme) => {
  return {
    img: {
      margin: theme.spacing(4, 'auto'),
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexFlow: 'column nowrap'
    },
    btn: {
      margin: theme.spacing(1, 0)
    },
    textField: {
      margin: theme.spacing(1, 0)
    },
    paper: {
      margin: theme.spacing(12, 0, 0, 0),
      padding: theme.spacing(3, 3, 3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  };
};
