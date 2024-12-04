import React, { useState } from 'react';
import EmptyVoucher from './EmptyVoucher';

const Voucher: React.FC = () => {

    const [listVouchers, setListVouchers] = useState([])
    return (
        <EmptyVoucher />
    );
};

export default Voucher;
