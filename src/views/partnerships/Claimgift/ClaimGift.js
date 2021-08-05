import React, { useEffect, useState } from 'react';
import {
  TextField,
  makeStyles
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { handleError } from '../../../errors/HandleError';
import EmptyList from '../../../components/EmptyList/EmptyList';
import AddGift from './AddGift';
import GiftTable from './Table';
import { useQuery } from '../../../hooks/useQuery';
import CustomizedProgressBars from '../../../components/ProgressBar/ProgressBar';
import { BASE_URL } from '../../../services/config';
import useGetQuery from '../../../hooks/api/useGetQuery';
import useMutationQuery from '../../../hooks/api/useMutationQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  },
  TextField: {
    margin: theme.spacing(1, 0)
  }
}));

const giftType = [
  { name: 'visible products', value: '1' },
  { name: 'hidden products', value: '0' }
];

const defaultValues = {
  name: '',
  qty: '',
  tagName: '',
  cooperativeId: '',
  unit: ''
};

const apiKey = process.env.REACT_APP_COOPERATIVE_API_KEY;

const ClaimGift = ({ history, location }) => {
  const classes = useStyles();
  const page = useQuery(location).get('page-view');
  const coopId = useQuery(location).get('cooperativeId');
  const [change, setChange] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState(defaultValues);
  const [imageUrl, setImageUrl] = useState({ files: '' });
  const [productType, setProductType] = useState(1);
  const coop = useSelector((state) => state.cooperatives.coops);
  const { data: res, isLoading, refetch } = useGetQuery({
    baseUrl: BASE_URL.COOPERATIVE,
    endpoint: `/gift?api_key=${apiKey}&visibility=${productType}&cooperativeId=${coopId || coop[0]._id}`,
    queryKey: '/gift',
  });

  const { mutate, isLoading: loading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE,
    endpoint: `/gift?api_key=${apiKey}&cooperativeId=${values?.cooperativeId}`,
  });

  useEffect(() => {
    if (res?.data.length) {
      setData(res.data);
    }
  }, [res?.data]);

  const updateImage = (fileItems) => {
    setImageUrl({
      files: fileItems[0]
    });
  };

  const onError = (error) => {
    const { message } = handleError(error);
    setError(message);
  };

  const onSuccess = (res) => {
    toast.success(res.data.message, {
      toastId: 'custom-id'
    });
    refetch();
    setOpen(false);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const uploadProduct = async (e) => {
    e.preventDefault();
    setChange(!change);
    const {
      name, qty,
      tagName,
      unit
    } = values;
    const formData = new FormData();
    formData.append('image', imageUrl.files.file);
    formData.append('name', name);
    formData.append('qty', Number(qty));
    formData.append('tagName', tagName);
    formData.append('unit', unit);
    mutate(formData, { onSuccess, onError });
  };

  return (
    <div className={classes.root}>
      {(loading || isLoading) && <CustomizedProgressBars />}
      {coop && coop.length ? (
        <>
          <div>
            <AddGift
              error={error}
              coop={coop}
              handleChange={handleChange}
              loading={loading}
              updateImage={updateImage}
              uploadProduct={uploadProduct}
              open={open}
              setOpen={setOpen}
            />
          </div>
          <div>
            <TextField
              id="product-category"
              select
              required
              size="small"
              onChange={(e) => {
                setProductType(e.target.value);
                refetch();
              }}
              name="state"
              className={classes.TextField}
              variant="outlined"
              SelectProps={{
                native: true
              }}
            >
              <option value="">Select type</option>
              {giftType.map((option) => (
                <option
                  key={option.name}
                  value={option.value}
                >
                  {option.name}
                </option>
              ))}
            </TextField>
            <TextField
              id="cooperative-id"
              select
              required
              value={values.cooperativeId || ''}
              size="small"
              onChange={async (e) => {
                setValues({ cooperativeId: e.target.value });
                history.push(`?page-view=${page}&cooperativeId=${e.target.value}`);
                refetch();
              }}
              name="state"
              className={classes.TextField}
              variant="outlined"
              SelectProps={{
                native: true
              }}
            >
              <option value="">Select type</option>
              {coop.map((option) => (
                <option
                  key={option.name}
                  value={option._id}
                >
                  {option.name}
                </option>
              ))}
            </TextField>
            <GiftTable
              data={data}
            />
          </div>
        </>
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default ClaimGift;
