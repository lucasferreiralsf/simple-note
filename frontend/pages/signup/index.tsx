import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
  Grid,
  Button,
  Theme,
  Typography,
  InputAdornment,
  withStyles,
  SvgIcon,
  IconButton,
} from '@material-ui/core';
import {
  MdMail,
  MdLock,
  MdPerson,
  MdVisibility,
  MdVisibilityOff,
} from 'react-icons/md';
import { makeStyles, createStyles } from '@material-ui/styles';
import useForm from 'react-hook-form';

import TextField from '../../components/TextField';
import { PaperContainer } from '../../components/PaperContainer';
import { AppState } from '../../store/ducks/rootReducer';
import { SignUpTypes, SignUpState } from '../../store/ducks/signup/types';
import { Skeleton } from '@material-ui/lab';
import { useSnackbar } from 'notistack';

const useStyle = makeStyles(({ palette, spacing, props, shape }: Theme) =>
  createStyles({
    registerContainer: {},
    googleSignUpContainer: {
      height: '12em',
    },
    buttonGoogleIcon: {
      width: 150,
      background: 'white',
    },
    googleIcon: {
      marginRight: spacing(1),
    },
    signUpTypography: {
      marginBottom: '10px',
    },
    formContainer: {
      minHeight: '22em',
      padding: '20px 0',
      backgroundColor: '#F8F8F8',
      borderBottomLeftRadius: shape.borderRadius,
      borderBottomRightRadius: shape.borderRadius,
    },
    buttonRegister: {
      margin: '20px 0 10px 0',
      width: 200,
    },
  }),
);

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const Register = props => {
  const { register, handleSubmit, setValue, watch, errors } = useForm<
    RegisterForm
  >({ mode: 'onChange' });
  const [userData, setUserData] = useState({
    showPassword: false,
  });

  const state: SignUpState = useSelector(
    (state: AppState) => state.signup,
    shallowEqual,
  );

  const { enqueueSnackbar } = useSnackbar();
  const { message }: any = state.data;
  const dispatch = useDispatch();
  const classes = useStyle(props.theme);

  useEffect(() => {
    if (message !== undefined && message.includes('A unique constraint')) {
      enqueueSnackbar('Usuário já cadastrado!', { variant: 'error'});
    }
  }, [message]);

  const handleClickShowPassword = () => {
    setUserData({ ...userData, showPassword: !userData.showPassword });
  };

  const onSubmit = async data => {
    dispatch({ type: SignUpTypes.SIGNUP_REQUEST, payload: { data } });
  };

  return (
    <PaperContainer>
      {state.loading ? (
        <div style={{ padding: '100px' }}>
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            alignItems="center"
            justify="center"
            className={classes.registerContainer}
          >
            <Grid item xs={12} className={classes.googleSignUpContainer}>
              <Grid
                container
                alignItems="center"
                justify="center"
                direction="column"
                style={{ height: 'inherit' }}
              >
                <Typography
                  variant="body1"
                  className={classes.signUpTypography}
                >
                  Sign up with
                </Typography>
                <Button
                  variant="contained"
                  color="inherit"
                  className={classes.buttonGoogleIcon}
                >
                  {/* <FaGoogle className={classes.googleIcon} /> */}
                  <SvgIcon
                    viewBox="0 0 533.5 544.3"
                    fontSize="small"
                    className={classes.googleIcon}
                  >
                    <g>
                      <path
                        style={{ fill: '#4285F4' }}
                        d="M533.5,278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1,33.8-25.7,63.7-54.4,82.7v68h87.7
		C503.9,431.2,533.5,361.2,533.5,278.4z"
                      />
                      <path
                        style={{ fill: '#34A853' }}
                        d="M272.1,544.3c73.4,0,135.3-24.1,180.4-65.7l-87.7-68c-24.4,16.6-55.9,26-92.6,26c-71,0-131.2-47.9-152.8-112.3
		H28.9v70.1C75.1,486.3,169.2,544.3,272.1,544.3z"
                      />
                      <path
                        style={{ fill: '#FBBC04' }}
                        d="M119.3,324.3c-11.4-33.8-11.4-70.4,0-104.2V150H28.9c-38.6,76.9-38.6,167.5,0,244.4L119.3,324.3z"
                      />
                      <path
                        style={{ fill: '#EA4335' }}
                        d="M272.1,107.7c38.8-0.6,76.3,14,104.4,40.8l0,0l77.7-77.7C405,24.6,339.7-0.8,272.1,0C169.2,0,75.1,58,28.9,150
		l90.4,70.1C140.8,155.6,201.1,107.7,272.1,107.7z"
                      />
                    </g>
                  </SvgIcon>
                  Google
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.formContainer}>
              <Grid
                container
                alignItems="center"
                justify="center"
                direction="column"
                style={{ minHeight: 'inherit' }}
              >
                <Typography
                  variant="body1"
                  className={classes.signUpTypography}
                >
                  Or sign up with credentials
                </Typography>
                <TextField
                  id="firstName"
                  label="Primeiro Nome"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdPerson />
                      </InputAdornment>
                    ),
                  }}
                  name="firstName"
                  errors={{
                    hasError: errors.firstName !== undefined ? true : false,
                    message:
                      errors.firstName !== undefined
                        ? errors.firstName.message
                        : false,
                  }}
                  inputRef={register({
                    minLength: {
                      value: 3,
                      message: 'Deve conter no mínimo 3 letras.',
                    },
                    required: 'Este campo é obrigatório.',
                  })}
                />
                <TextField
                  id="lastName"
                  label="Último Nome"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdPerson />
                      </InputAdornment>
                    ),
                  }}
                  name="lastName"
                  errors={{
                    hasError: errors.lastName !== undefined ? true : false,
                    message:
                      errors.lastName !== undefined
                        ? errors.lastName.message
                        : false,
                  }}
                  inputRef={register({
                    minLength: {
                      value: 3,
                      message: 'Deve conter no mínimo 3 letras.',
                    },
                    required: 'Este campo é obrigatório.',
                  })}
                />
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdMail />
                      </InputAdornment>
                    ),
                  }}
                  name="email"
                  errors={{
                    hasError: errors.email !== undefined ? true : false,
                    message:
                      errors.email !== undefined ? errors.email.message : false,
                  }}
                  inputRef={register({
                    pattern: {
                      value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                      message: 'Email inválido.',
                    },
                    required: 'Este campo é obrigatório.',
                  })}
                />
                <TextField
                  id="password"
                  label="Password"
                  type={userData.showPassword ? 'text' : 'password'}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdLock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {userData.showPassword ? (
                            <MdVisibility />
                          ) : (
                            <MdVisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  name="password"
                  errors={{
                    hasError: errors.password !== undefined ? true : false,
                    message:
                      errors.password !== undefined
                        ? errors.password.message
                        : false,
                  }}
                  inputRef={register({
                    validate: {
                      blankSpaces: value =>
                        /(^\s+|\s+)/.test(value) === true
                          ? 'Sua senha não deve conter espaços em branco'
                          : true,
                      character: value =>
                        /^([\w]){4,8}$/.test(value) === false
                          ? `Sua senha deve ter no mínimo 4 caracteres e no máximo 8. Qtd.: ${value.length}`
                          : true,
                    },
                    required: 'Este campo é obrigatório.',
                  })}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  className={classes.buttonRegister}
                >
                  Cadastrar
                </Button>
              </Grid>
            </Grid>
            {/* <Grid item xs={12}>
          </Grid> */}
          </Grid>
        </form>
      )}
    </PaperContainer>
  );
};

export default Register;
