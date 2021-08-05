import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';

import {
  AccountBalanceWalletOutlined as WalletIcon,
  SupervisorAccountSharp as ProfileIcon,
} from '@material-ui/icons';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { statusColors } from '../../../../../../utils/AccountStatus';
import { StatusBullet } from '../../../../../../components';
import FundWallet from '../../FundWallet/FundWallet';
import Permission from '../../Permission/Permission';

const useStyles = makeStyles((theme) => {
  return {
    menuItem: {
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  };
});

function ActionMenu({ row, refetch }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openW, setOpenW] = React.useState(false);
  const [openP, setOpenP] = React.useState(false);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFundWallet = () => setOpenW(!openW);
  const handlePermission = () => setOpenP(!openP);

  return (
    <div>
      <FundWallet
        edit={openW}
        setEdit={setOpenW}
        refetch={refetch}
        data={row.original}
      />
      <Permission
        edit={openP}
        setEdit={setOpenP}
        refetch={refetch}
        data={row.original}
      />
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem className={classes.menuItem} onClick={handleFundWallet}>
          <WalletIcon color="primary" />
          Wallet system
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handlePermission}>
          <ProfileIcon color="primary" />
          User Permission
        </MenuItem>
      </Menu>
    </div>
  );
}

const useUserTable = ({ refetch }) => {
  const productHeader = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber'
    },
    {
      Header: 'Location',
      accessor: 'location'
    },
    {
      Header: 'Status',
      Cell: ({ row }) => (
        <>
          {row?.original?.accountStatus}
          <StatusBullet
            color={statusColors[row?.original?.accountStatus]}
            size="sm"
          />
        </>
      )
    },
    {
      Header: 'Verified',
      Cell: ({ row }) => (
        <>
          {row?.original?.isVerified ? 'YES' : 'NO'}
          <StatusBullet
            color={statusColors[row?.original?.isVerified ? 'confirmed' : 'processing']}
            size="sm"
          />
        </>
      )
    },
    {
      Header: 'Reg. Date',
      Cell: ({ row }) => (
        <>
          {moment(row?.original?.createdAt).format('LLL')}
        </>
      )
    },
    {
      Header: 'Actions',
      Cell: (props) => (
        <ActionMenu {...props} refetch={refetch} />
      )
    },
  ], [refetch]);
  return {
    productHeader
  };
};

useUserTable.propTypes = {
  props: PropTypes.object,
  refetch: PropTypes.func.isRequired
};

export default useUserTable;
