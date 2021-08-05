import { lighten } from '@material-ui/core/styles';

export const toolBarStyles = (theme) => ({
  hroot: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highligt:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
});

export const TableStyles = (theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  invoiceId: {
    textTransform: 'uppercase'
  },
  paid: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.white,
  },
  outstanding: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.white,
  },
  processing: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.white,
  },
  declined: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.white,
  },
  smallText: {
    textTransform: 'lowercase'
  }
});

export const paymentStyles = (theme) => ({
  root: {
    width: 500,
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
  },

});
