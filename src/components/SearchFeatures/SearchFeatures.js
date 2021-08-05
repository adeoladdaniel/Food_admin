import React, { useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';
import SearchInput from '../SearchInput/SearchInput';
import { handleError } from '../../errors/HandleError';
import { FoodCrowdyApi } from '../../services/config';

const SearchFeatures = ({
  setData, data,
  selectTray, queries,
  searchList, endPoint,
  setSearched, setIsLoading
}) => {
  const createQueries = (queriesObj) => {
    const queries = Object.keys(queriesObj).map((key) => (
      queriesObj[key] === '' ? '' : `&${key}=${queriesObj[key]}`
    ));
    if (!queries.length) return '';
    const queryString = queries.filter((entry) => /\S/.test(entry))
      .map((item, i) => (i === 0 ? item.replace('&', '?') : item))
      .join('');
    return queryString;
  };

  const onSearch = (e) => {
    const { value } = e.target;
    if (!value) {
      setSearched([]);
      return;
    }
    const searchItems = data.filter((item) => (
      item[searchList[0]].toLowerCase().includes(value)
      || item[searchList[1]].toLowerCase().includes(value)
    ));
    setSearched(searchItems);
  };

  useEffect(() => {
    const queriesUrl = createQueries(queries);
    (async () => {
      setIsLoading(true);
      try {
        const res = await FoodCrowdyApi.get(`${endPoint}${queriesUrl}`);
        const { data } = res.data;
        setData(data.docs);
      } catch (error) {
        handleError(error);
      }
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endPoint, queries, setData]);

  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          {selectTray}
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
        >
          <SearchInput
            onChange={onSearch}
            placeholder="Search by title or category"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchFeatures;
