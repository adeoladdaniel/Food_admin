import { makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import CustomizableTable from '../../../../components/CustomTable/CustomTable';
import LoadingCenter from '../../../../components/LoadingCenter/LoadingCenter';
import useGetQuery from '../../../../hooks/api/useGetQuery';
import { BASE_URL } from '../../../../services/config';
import AddUser from './AddUser/AddUser';
import useUserTable from './UsersTable/hooks/useUsersTable';

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

const UsersList = () => {
  const classes = useStyles();
  const { data: response, refetch, isLoading } = useGetQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/users',
    queryKey: 'users',
  });

  const { productHeader } = useUserTable({ refetch });
  const [data, setData] = useState(useMemo(() => [], []));
  const [skipPageReset] = useState(false);

  useEffect(() => {
    setData(response);
  }, [response]);

  return (
    <div className={classes.root}>
      <AddUser refetch={refetch} />
      <Paper>
        {isLoading ? <LoadingCenter /> : (
          <CustomizableTable
            setData={setData}
            data={data?.data || []}
            columns={productHeader}
            skipPageReset={skipPageReset}
          />
        )}
      </Paper>
    </div>
  );
};

export default UsersList;
