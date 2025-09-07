import GetUserInfo from './get-user-info';

const name = 'Auth';

const reducer = {
  getUserInfo: new GetUserInfo(name),
};

export default reducer;
