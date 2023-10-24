import React from 'react';
import SignInForm from 'src/component/sign-in-form/sign-in-form.component';
import WhiteLabelForm from 'src/component/white-label-form/white-label-form.component';

import './white-label-page.styles.scss';

function WhiteLabelPage() {
    return (
        <div className='white-label-page-container'>
            <WhiteLabelForm />

        </div>
    )
}

export default WhiteLabelPage;