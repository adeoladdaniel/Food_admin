export const orderDetails = (theme) => ({
  root: {
    margin: theme.spacing(1)
  },
  content: {
    background: theme.palette.background.paper,
    padding: theme.spacing(0.3)
  },
  description: {
    '& >*': {
      margin: theme.spacing(1)
    }
  },
  btnOrange: {
    background: theme.palette.secondary.main,
    color: theme.palette.white
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
    color: theme.palette.secondary.main
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
    color: theme.palette.primary.main,
    fontWeight: 600
  },
  image: {
    width: '100%'
  },
  icon: {
    margin: '-.4rem 0'
  }
});
