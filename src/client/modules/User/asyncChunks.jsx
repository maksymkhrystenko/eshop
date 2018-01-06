import asyncComponent from '../../common/utils/asyncComponent';

export const Profile = asyncComponent(() => import('./containers/Profile'));
export const Users = asyncComponent(() => import('./components/Users'));
export const UserEdit = asyncComponent(() => import('./containers/UserEdit'));
export const Register = asyncComponent(() => import('./containers/Register'));
export const Login = asyncComponent(() => import('./containers/Login'));
export const ForgotPassword = asyncComponent(() =>
  import('./containers/ForgotPassword')
);
export const ResetPassword = asyncComponent(() =>
  import('./containers/ResetPassword')
);
