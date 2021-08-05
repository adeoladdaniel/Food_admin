import React from 'react';
import {
  Button,
  makeStyles
} from '@material-ui/core/';
import { Alert } from '@material-ui/lab';
import UserStatus from './UserStatus';
import UserPermission from './UserPermission';
import UserRoles from './UserRoles';
import useAccount from './hooks/useAccount';
import { permissions } from '../../../../../utils/AccountStatus';
import CustomModal from '../../../../../components/custommodal/CustomModal';
import { userStyles } from './Styles';

const useStyles = makeStyles((theme) => (userStyles(theme)));

const Permission = ({
  data, edit, setEdit, refetch
}) => {
  const classes = useStyles();
  const {
    accountPermission, open,
    accountStatus, roles,
    handleRoles, setOpen,
    handleAccountStatus, handleClose,
    handlePermission, error,
    handleAccountActions, loading
  } = useAccount({ data, refetch });

  return (
    <div>
      <CustomModal
        addCloseIcon
        modalTitle="User Permission"
        setOpen={setEdit}
        open={edit}
        noBottomButton
      >
        <div className={classes.root}>
          {error && (
            <Alert
              severity="error"
            >
              {error}
            </Alert>
          )}
          <UserStatus
            open={open}
            data={data}
            setOpen={setOpen}
            classes={classes}
            handleClose={handleClose}
            accountStatus={accountStatus}
            handleAccountStatus={handleAccountStatus}
          />
          <UserPermission
            open={open}
            classes={classes}
            setOpen={setOpen}
            handleClose={handleClose}
            permissions={permissions}
            handlePermission={handlePermission}
            accountPermission={accountPermission}
          />
          <UserRoles
            roles={roles}
            classes={classes}
            handleRoles={handleRoles}
          />
          <Button
            fullWidth
            color="primary"
            type="submit"
            variant="contained"
            disabled={loading}
            className={classes.block}
            onClick={handleAccountActions}
          >
            Submit
          </Button>
        </div>

      </CustomModal>
    </div>
  );
};

export default Permission;
