import { Action } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { rootState } from '..';
import ProtectedRoute from '../../components/routes/ProtectedRoute';
import { verifyToken } from '../user/thunk';

const mapDispatchToProps = (
    dispatch: ThunkDispatch<rootState, void, Action>,
) => ({
    verifyToken: (): void => dispatch(verifyToken()),
});

const connector = connect(null, mapDispatchToProps);

const ProtectedRouteStore = connector(ProtectedRoute);

export type ProtectedRouteProps = ConnectedProps<typeof connector>;

export { ProtectedRouteStore };
