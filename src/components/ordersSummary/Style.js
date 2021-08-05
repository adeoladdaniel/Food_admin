export const orderHistoryStyle = (theme) => ({
  card: {
    height: '100%',
  },
  root: {
    padding: theme.spacing(2, 1)
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  total: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 45,
    width: 45
  },
  delivery: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    height: 45,
    width: 45
  },
  productPrice: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white,
    height: 45,
    width: 45
  },
  totalOrder: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    height: 45,
    width: 45
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  }
});
