import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Icon from './icon';
import useStateRef from 'react-usestateref';

import { googlesignin, signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const { alert } = useSelector((state) => state.posts);
  const [form, setForm, formRef] = useStateRef(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [modalPassword, setModalPassword] = useState("");
  const [modalConfirmPassword, setModalConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    notify(alert?.message);
  },[alert,dispatch]);

  const handleChangePassword = (e) =>{
    setModalPassword(e.target.value);
    handleChange(e);
  } 
  const handleCHangeConfirmPassword = (e) => {
    setModalConfirmPassword(e.target.value);
    handleChange(e);
  } 
  const handleClickOpen = () => {
    setOpen(true);
  };
  const notify = (text) => toast.error(text, {
    position: "top-center",
    autoClose: 3100,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  const handleClose = () => {
      if(modalPassword === modalConfirmPassword){
        dispatch(signup(form, history));
        setOpen(false);
      }
      else{
        notify("Incorrect!!");
      }
  };
  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const googleState = { firstName: result.givenName, lastName: result.familyName, email: result.email,imageUrl:result?.imageUrl, password: "testing", confirmPassword: "testing" };
      setForm({ ...googleState});
    try {
        if(isSignup)
          handleClickOpen();
        else
        dispatch(googlesignin(formRef.current,history));
      // dispatch({ type: AUTH, data: { result, token } });

      // history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer
        position="top-center"
        autoClose={3100}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Dialog
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown="true"
        disableBackdropClick="false"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Set Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="password"
            label="Password"
            type="password"
            onChange={handleChangePassword}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            onChange={handleCHangeConfirmPassword}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId="985067557537-vivi04qvnq06tpvojuu0rmtlkapo5jm5.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                { isSignup ? 'Google Sign Up' : 'Google Sign In' }
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
