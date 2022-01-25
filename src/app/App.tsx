import React, {useCallback, useEffect} from 'react'
import './App.css';
import {AppRootStateType, useAppSelector} from './store';
import {RequestStatusType} from "./app-reducer";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";


import Toolbar from '@mui/material/Toolbar';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// import LinearProgress from "@material-ui/core/LinearProgress";
import AppBar from "@material-ui/core/AppBar";
import Box from "@mui/material/Box";
import {Menu} from "@material-ui/icons";
import {Navigate, Route, Routes} from 'react-router-dom';
import {initializeAppTC, logoutTC} from "../features/Login/authReducer";
import {useDispatch, useSelector} from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';


function App() {

    const dispatch = useDispatch()
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const logoutHandler = useCallback( () => {
        dispatch(logoutTC())
    },[dispatch])

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {

        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>

    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
                </Toolbar>
                <Box sx={{width: '100%'}}>
                    {status === "loading" && <LinearProgress color="error"/>}
                </Box>
            </AppBar>
            {/*{status === "loading" && <div className="linePreloader"></div>}*/}
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/> {/*demo={demo}/>*/}
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1 style={{textAlign: "center"}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App;
