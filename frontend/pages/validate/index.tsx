import {
  Grid,
  Typography,
  InputAdornment,
  Button,
  Theme,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useForm from 'react-hook-form';
import { makeStyles, createStyles } from '@material-ui/styles';
import Link from 'next/link';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { PaperContainer } from '../../components/PaperContainer';
import TextField from '../../components/TextField';
import { AppState } from '../../store/ducks/rootReducer';
import {
  SignUpTypes,
  SignUpState,
  SignUpErrorTypes,
} from '../../store/ducks/signup/types';

const useStyle = makeStyles(({ palette, spacing, props, shape }: Theme) =>
  createStyles({
    textFieldCodigo: {
      // textAlign: 'center'
    },
    googleSignInContainer: {
      height: '12em',
    },
    buttonGoogleIcon: {
      width: 150,
      background: 'white',
    },
    googleIcon: {
      marginRight: spacing(1),
    },
    signInTypography: {
      marginBottom: '10px',
      padding: '10px'
    },
    formContainer: {
      minHeight: '22em',
      backgroundColor: '#F8F8F8',
      borderBottomLeftRadius: shape.borderRadius,
      borderBottomRightRadius: shape.borderRadius,
    },
    buttonEntrar: {
      margin: '20px 0 10px 0',
      width: 200,
    },
  }),
);

const Validate = props => {
  const router = useRouter();
  const { code, email } = router.query;
  const { register, handleSubmit, setValue, watch, errors } = useForm({
    mode: 'onChange',
  });

  const classes = useStyle(props);
  const emailValidatedState: SignUpState = useSelector(
    (state: AppState) => state.signup,
    shallowEqual,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    validate();
  }, []);

  const validate = async () => {
    if (!emailValidatedState.data.emailIsVerified && code !== undefined) {
      console.log('code: ', code);
      dispatch({
        type: SignUpTypes.VALIDATE_EMAIL_REQUEST,
        payload: { code, email },
      });
    }
  };

  const onSubmit = data => {
    dispatch({
      type: SignUpTypes.VALIDATE_EMAIL_REQUEST,
      payload: { code: data.code, email },
    });
  };

  return (
    <PaperContainer>
      {emailValidatedState.loading ? (
        <div style={{ padding: '100px' }}>
          <Skeleton height={60} />
          <Skeleton width="60%" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container alignItems="center" justify="center">
            {emailValidatedState.data !== undefined &&
            (emailValidatedState.data.emailIsVerified ||
              (emailValidatedState.error &&
                emailValidatedState.errorType ===
                  SignUpErrorTypes.EMAIL_ALREADY_VALIDATED)) ? (
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
                    className={classes.signInTypography}
                  >
                    {emailValidatedState.error
                      ? 'Seu email já está confirmado, clique no botão abaixo para entrar.'
                      : 'Email confirmado com sucesso.'}
                  </Typography>

                  <Link href="/signin">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.buttonEntrar}
                    >
                      Entrar
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            ) : (
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
                    className={classes.signInTypography}
                  >
                    {emailValidatedState.error &&
                    emailValidatedState.errorType ===
                      SignUpErrorTypes.TOKEN_EXPIRED
                      ? 'Este número expirou, foi enviado um novo código para seu email.'
                      : 'Foi enviado um código para seu email, clique no link enviado ou informe o código abaixo:'}
                  </Typography>
                  <TextField
                    id="code"
                    variant="outlined"
                    inputProps={{
                      maxLength: 6,
                    }}
                    name="code"
                    errors={{
                      hasError: errors.code !== undefined ? true : false,
                      message:
                        errors.code !== undefined ? errors.code.message : false,
                    }}
                    inputRef={register({
                      minLength: {
                        value: 6,
                        message: 'O código deve conter 6 dígitos.',
                      },
                      maxLength: {
                        value: 6,
                        message: 'O código deve conter 6 dígitos.',
                      },
                      required: 'Este campo é obrigatório.',
                    })}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    className={classes.buttonEntrar}
                  >
                    Validar
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </form>
      )}
    </PaperContainer>
  );
};

// Validate.getInitialProps = (ctx) => {

// }

export default Validate;
