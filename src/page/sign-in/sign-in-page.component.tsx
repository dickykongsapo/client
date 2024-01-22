import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './sign-in-page.styles.scss';

function LogInPage() {
    console.log('login')
    return (
        <div className='sign-in-page-container'>
            <SignInForm />
        </div>
    );
};

export default LogInPage;