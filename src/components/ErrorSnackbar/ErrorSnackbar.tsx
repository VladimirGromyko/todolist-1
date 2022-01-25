import * as React from 'react';
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/store";
import {setAppErrorAC} from "../../app/app-reducer";
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import Stack from "@mui/material/Stack";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const dispatch = useDispatch()
    let isError = useAppSelector<string | null>(state => state.app.isError)
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
    }

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={isError !== null}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {isError}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
