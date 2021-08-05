import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useGetQuery from '../../../hooks/api/useGetQuery';
import { BASE_URL } from '../../../services/config';
import SupplyInfo from './SupplyInfo';
import Platforms from './Platforms';
import VariantsList from './VariantsList';
import MoreDetails from './MoreDetails';
import ActionsPanel from './ActionsPanel';
import LoadingCenter from '../../../components/LoadingCenter/LoadingCenter';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    margin: theme.spacing(2, 'auto'),
    '& > *': {
      margin: theme.spacing(1, 0)
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
  listItem: {
    '&:nth-child(1n+1)': {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.pxToRem(17),
    },
    '& > *': {
      margin: theme.spacing(0.4)
    }
  }
}));

const DetailsPage = (props) => {
  const classes = useStyles();
  const { match: { params } } = props;
  const { data: res, isLoading } = useGetQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: `/products/${params?.id}`,
    queryKey: `/products-pageID/${params?.id}`,
  });

  return (
    <div>
      <div className={classes.root}>
        {isLoading ? <LoadingCenter /> : (
          <>
            <ActionsPanel
              classes={classes}
              data={res?.data}
            />
            <MoreDetails
              classes={classes}
              data={res?.data}
            />
            <SupplyInfo
              classes={classes}
              data={res?.data}
            />
            <Platforms
              classes={classes}
              data={res?.data}
            />
            <VariantsList
              classes={classes}
              variants={res?.data?.variants}
            />
            <img
              src={res?.data?.image[0]}
              alt=""
              height="300"
            />
          </>
        )}

      </div>
    </div>
  );
};

export default DetailsPage;
