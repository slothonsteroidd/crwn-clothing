import TT from "./user.tests";
export const setCurrentUser = (user) => ({
  type: TT.SET_CURRENT_USER,
  payload: user,
});
