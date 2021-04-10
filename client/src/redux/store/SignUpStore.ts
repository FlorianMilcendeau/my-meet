import { connect, ConnectedProps } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { rootState } from '..';

/** Types */
import { UserRegister } from '../user/types';

/** Components */
import SignUp from '../../components/views/authenticate/SignUp/SignUp';

/** Actions */
import { userRegister } from '../user/thunk';

const mapDispatchToProps = (
  dispatch: ThunkDispatch<rootState, void, Action>,
) => ({
  register: (user: UserRegister): void => dispatch(userRegister(user)),
});

/** Connect props to component. */
const connector = connect(null, mapDispatchToProps);
const SignUpStore = connector(SignUp);

/** Take Props of component. */
export type PropsAuth = ConnectedProps<typeof connector>;

/** Export components. */
export { SignUpStore };
