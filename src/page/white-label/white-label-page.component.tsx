import React from 'react';
import SignInForm from 'src/components/sign-in-form/sign-in-form.component';
import WhiteLabelForm from 'src/components/white-label-form/white-label-form.component';

import './white-label-page.styles.scss';

function WhiteLabelPage() {
    return (
        <div className='white-label-page-container'>
            <WhiteLabelForm />

        </div>
    )
}

export default WhiteLabelPage;