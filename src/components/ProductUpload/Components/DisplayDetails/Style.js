export default (theme) => ({
  button: {
    margin: theme.spacing(1)
  },
  image: {
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  variant: {
    height: 35,
    width: 80,
    borderRadius: theme.spacing(0.5),
    margin: theme.spacing(0.5),
    background: theme.palette.background.default,
    border: `0.5px solid ${theme.palette.text.secondary}`,
  },
  textWrapper: {
    margin: theme.spacing(0.8, 'auto')
  },
  TextField: {
    margin: theme.spacing(0.2, 0.6)
  },
  variantsBox: {
    marginTop: theme.spacing(1.2),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    minWidth: 400,
    background: theme.palette.background.default,
  },
  formFoot: {
    display: 'flex',
    justifyContent: 'space-between',
    '& >*': {
      margin: theme.spacing(0.3, 1),
    }
  }
});
