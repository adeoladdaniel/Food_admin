import palette from '../../../../theme/palette';

export const productsDataStyles = (theme) => ({
  root: {
    margin: theme.spacing(1)
  },
  content: {
    background: theme.palette.background.paper,
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1)
    // width: '95%'
  },
  description: {
    '& >*': {
      margin: theme.spacing(1)
    }
  },
  btnOrange: {
    background: palette.secondary.main,
    color: palette.white
  },
  details: {
    '& > *': {
      margin: theme.spacing(2, 0)
    }
  },
  price: {
    fontWeight: 600,
    fontSize: '1.2rem '
  },
  priceTitle: {
    color: palette.secondary.main
  },
  buyBtn: {
    margin: theme.spacing(1, 0)
  },
  chip: {
    margin: theme.spacing(1),
    color: '#333'
  },
  slots: {
    fontSize: '1rem',
    margin: theme.spacing(2, 0)
  },
  slotNum: {
    color: palette.primary.main,
    fontWeight: 600
  },
  image: {
    width: '100%'
  },
  icon: {
    margin: '-.4rem 0'
  }
});
