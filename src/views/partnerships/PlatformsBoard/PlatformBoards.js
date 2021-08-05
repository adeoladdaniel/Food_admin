import React, { useEffect, useMemo, useState } from 'react';
import { Button, makeStyles, Paper } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import CustomizableTable from '../../../components/CustomTable/CustomTable';
import LoadingCenter from '../../../components/LoadingCenter/LoadingCenter';
import useGetQuery from '../../../hooks/api/useGetQuery';
import AddPlatform from './AddPlatform.js/AddPlatform';
import usePlatform from './hooks/usePlatform';
import { BASE_URL } from '../../../services/config';
import { toggler } from '../../../redux/reducers/slicers/cooperatives';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '96%',
    margin: theme.spacing(0.5, 'auto'),
  },
  Paper: {
    backgroundColor: theme.palette.background.paper,
  },
  addBtn: {
    margin: theme.spacing(1, 'auto'),
  },
}));

const PlatformBoard = () => {
  const classes = useStyles();
  const { data: response, refetch, isLoading } = useGetQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/platform',
    queryKey: 'platforms-all',
  });

  const { PlatformHeader } = usePlatform({ refetch });
  const [data, setData] = useState(useMemo(() => [], []));
  const [skipPageReset] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => dispatch(toggler());

  const ActionButton = (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={handleOpen}
      endIcon={<AddIcon />}
    >
      Add Platforms
    </Button>
  );

  useEffect(() => {
    if (response?.data) {
      setData(response?.data);
    }
  }, [data?.data, response]);

  return (
    <div className={classes.root}>
      <Paper>
        <AddPlatform
          setOpen={handleOpen}
          refetch={refetch}
          actionButton={ActionButton}
        />
        {isLoading ? <LoadingCenter /> : (
          <CustomizableTable
            setData={setData}
            data={data}
            columns={PlatformHeader}
            skipPageReset={skipPageReset}
          />
        )}
      </Paper>
    </div>
  );
};

export default PlatformBoard;
