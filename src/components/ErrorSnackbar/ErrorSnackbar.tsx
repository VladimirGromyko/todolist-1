import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@mui/lab/Alert'
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/store";
import {setAppErrorAC} from "../../app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref,) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {

    const dispatch= useDispatch()
    let isError = useAppSelector<string | null>(state => state.app.isError)
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
    }

    return (
        <Snackbar open={isError !== null}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        >
            <Alert onClose={handleClose}
                   severity="error"
                   sx={{width: '100%'}}
            >
                {isError}
            </Alert>
        </Snackbar>
    )
}
