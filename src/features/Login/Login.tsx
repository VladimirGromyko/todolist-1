import React from 'react'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {useFormik} from "formik";
import {loginTC} from "./authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Navigate} from 'react-router-dom'
import {LoginParamsType} from "../../api/auth-api";
import {Omit} from "@material-ui/core";


// Video 16,  time 3:44:00

// type FormikErrorType = {
//     email?: string
//     password?: string
//     rememberMe?: boolean
// }


export const Login = () => {
    let dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: Partial<Omit<LoginParamsType, 'captcha'>> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 4) {
                errors.password = 'Must be 4 characters or more';
            }
            return errors;
        },
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            dispatch(loginTC(values))
            formik.resetForm();
        },
    });
    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent="center">
        <Grid item xs={4}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target='_blank'
                           rel="noreferrer"
                        >here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>

                <form onSubmit={formik.handleSubmit}>
                    <FormGroup >
                        <TextField
                            label="Email"
                            margin="normal"
                            type="email"
                            // name="email"
                            // onChange={formik.handleChange}
                            // value={formik.values.email}
                            // onBlur={formik.handleBlur}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email && formik.touched.email &&
                        <div style={{color: "red"}}>
                            {formik.errors.email}
                        </div>}
                        <TextField
                            label="Password"
                            type="password"
                            margin="normal"
                            autoComplete="off"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password && formik.touched.password &&
                        <div style={{color: "red"}}>
                            {formik.errors.password}
                        </div>}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox {...formik.getFieldProps('rememberMe')}/>}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}
