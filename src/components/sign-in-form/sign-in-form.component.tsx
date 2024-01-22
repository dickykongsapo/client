import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import { Button } from '@mui/material';
import './sign-in-form.styles.scss';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';
import { ToastContainer, toast } from 'react-toastify';
import ThemedButton from '../button/button.component';
// import { useDispatch } from 'react-redux';
const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const [errorMessage, setErrorMessage] = useState('')
    const notify = (message: string) => toast.warn(message);

    // const dispatch = useDispatch();
    let navigate = useNavigate();
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };
    const authService = new AuthService();

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            // authService.test1().then(res => console.log(res.data));
            await authService.login({ username: email, password: password }).subscribe(
                res => {
                    resetFormFields();
                },
                err => {
                    console.log(err)
                    notify(err.response.data.message)
                }
            )


            // authService.login({ username: email, password: password })
            //     .then(res => {
            //         authService.setUserFromJwtToken(res.data.token, res.data.refreshToken, true)

            //         resetFormFields();
            //         navigate('/home');
            //     }
            //     ).catch(err => {

            //         switch (err.code) {
            //             case 'auth/wrong-password':
            //                 alert('incorrect password for email');
            //                 break;
            //             case 'auth/user-not-found':
            //                 alert('no user associated with this email');
            //                 break;
            //             default:
            //                 console.log(err);
            //         }
            //         console.log(err)
            //     })

            // authService.login({ username: email, password: password }).subscribe(x => {
            //     console.log(x)
            // })
            // const { user } = await signInAuthUserWithEmailAndPassword(
            //     email,
            //     password
            // );
            // if (user) {

            //     try {
            //         apis.getOrder(user.uid).then(cartItems => {
            //             dispatch(setCartItems(cartItems.data.cartItems))
            //         })

            //     }
            //     catch (error) {
            //         throw new Error(error);

            //     }

            // }

            // setCurrentUser(user);
        } catch (error: any) {
        }
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    const handleReset = (event: any) => {
        setFormFields(defaultFormFields)
    }


    return (
        <div className='sign-in-container'>
            <form onSubmit={handleSubmit} onReset={handleReset}>

                {/* <button onClick={notify}>Notify!</button> */}

                <FormInput
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <div className='buttons-container'>
                    <ThemedButton type='submit' word='Sign In' />
                    <ThemedButton type='reset' word='Reset' />
                    {/* <Button type='submit'>Sign In</Button> */}
                </div>
            </form>
        </div>
    );
};

export default SignInForm;