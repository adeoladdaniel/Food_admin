import React from 'react';
import Settlement from '../../components/settlement/Settlement';

const CoopEastSettlements = (props) => {
  return (
    <div>
      <Settlement
        isPaid
        {...props}
      />
    </div>
  );
};

export default CoopEastSettlements;
