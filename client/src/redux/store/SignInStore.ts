import { connect, ConnectedProps } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { rootState } from '..';

/** Types */
import { UserLogin } from '../user/types';

/** Components */
import SignIn from '../../components/views/authenticate/signIn/SignIn';

/** Actions */
import { userLogin } from '../user/thunk';

const mapDispatchToProps = (
  dispatch: ThunkDispatch<rootState, void, Action>,
) => ({
  login: (user: UserLogin): void => dispatch(userLogin(user)),
});

/** Connect props to component. */
const connector = connect(null, mapDispatchToProps);
const SignInStore = connector(SignIn);

/** Take Props of component. */
export type PropsAuth = ConnectedProps<typeof connector>;

/** Export components. */
export { SignInStore };
