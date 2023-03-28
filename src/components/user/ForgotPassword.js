import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { forgotPassword, clearErrors } from '../../actions/userActions'
const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch();
    const { error, loading, message } = useSelector(state => state.forgotPassword)
    const success = (message='' ) => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const notify = (error='' ) => toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    useEffect(() => {
        if (error) {
            notify(error);
            dispatch(clearErrors());
        }
        if (message) {
            success(message)
        }
    }, [dispatch, error, message])
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email);
        dispatch(forgotPassword(formData))
    }
    return (
        <Fragment>
            <MetaData title={'Forgot Password'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Forgot Password</h1>

                        <div className="form-group">

                            <label htmlFor="email_field">Enter Email</label>

                            <input

                                type="email"

                                id="email_field"

                                className="form-control"

                                value={email}

                                onChange={(e) => setEmail(e.target.value)}

                            />

                        </div>



                        <button

                            id="forgot_password_button"

                            type="submit"

                            className="btn btn-block py-3"

                            disabled={loading ? true : false} >

                            Send Email

                    </button>



                    </form>

                </div>
            </div>
        </Fragment>
    )
}



export default ForgotPassword