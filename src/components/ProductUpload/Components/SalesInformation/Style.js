export default (theme) => ({
  root: {},
  cardDetails: {
    position: 'relative',
    width: '80%'
  },
  TextField: {
    margin: theme.spacing(1)
  },
  list: {
    position: 'absolute',
    background: '#fff',
    width: 'auto',
    margin: '3rem '
  },
  fees: {
    fontWeight: '500'
    // fontSize: '1.3rem'
  },
  unitBlock: {
    margin: theme.spacing(0, 1)
  },
  unit: {
    fontSize: '1.2rem',
    fontWeight: 600
  },
  unitBox: {
    margin: theme.spacing(0, 1),
    border: theme.palette.background.default
  },
  button: {
    margin: theme.spacing(1, 0),
  }
});
