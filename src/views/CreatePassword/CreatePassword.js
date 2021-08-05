import React from 'react';
import CustomModal from '../../components/custommodal/CustomModal';
import Form from './Form/Form';

const CreatePassword = ({ location }) => {
  return (
    <CustomModal
      modalTitle="Create Password"
      noBottomButton
      open
    >
      <Form location={location} />
    </CustomModal>
  );
};

export default CreatePassword;
