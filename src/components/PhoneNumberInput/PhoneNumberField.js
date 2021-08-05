import React from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';

const PhoneNumberField = ({ onChange, name, ...rest }) => {
  return (
    <MuiPhoneNumber
      {...rest}
      name={name}
      defaultCountry="ng"
      onChange={onChange}
      onlyCountries={['ng']}
    />
  );
};

export default PhoneNumberField;
