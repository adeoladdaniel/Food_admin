export const Styles = (theme) => ({
  root: {},
  grid: {
    '& > *': {
      margin: theme.spacing(1.1, 0)
    }
  },
  button: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1)
  }
});
