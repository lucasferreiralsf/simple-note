import { all, takeLatest} from 'redux-saga/effects';
import { AuthTypes } from './auth/types';
import { signIn } from './auth/sagas';
import { SignUpTypes } from './signup/types';
import { validateEmail, signUp } from './signup/sagas';

export default function* rootSaga() {
    return yield all([
        takeLatest(AuthTypes.SIGNIN_REQUEST, signIn),
        takeLatest(SignUpTypes.SIGNUP_REQUEST, signUp),
        takeLatest(SignUpTypes.VALIDATE_EMAIL_REQUEST, validateEmail),
    ])
}