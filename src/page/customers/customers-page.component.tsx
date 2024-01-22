import { PageLink } from 'src/models/page/page-link';
import { CustomerService } from 'src/services/customer.service';
import React, { useEffect } from 'react';

import './customers-page.styles.scss';

function CustomersPage() {
    const customerService = new CustomerService();
    useEffect(() => {
        customerService.getCustomers((new PageLink(10))).subscribe(x => {
            console.log(x)
        })
    }, [])
    return (
        <div className='customerspage'>
            'customer'
        </div>
    )
}

export default CustomersPage;