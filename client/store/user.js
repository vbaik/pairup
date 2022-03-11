import axios from "axios";

// const GET_LOGGEDIN_USER = "GET_LOGGEDIN_USER";
const GET_ALL_USERS = "GET_ALL_USERS";

// const getLoggedInUser = (user) => {
//   return {
//     type: GET_LOGGEDIN_USER,
//     user,
//   };
// };

const getAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users,
  };
};

// export const fetchLoggedInUserThunk = (userId) => {
//   return async (dispatch) => {
//     try {
//       const { data: user } = await axios.get(`/api/user/${userId}`);
//       dispatch(getLoggedInUser(user));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

export const fetchAllUsersThunk = () => {
  return async (dispatch) => {
    try {
      const { data: users } = await axios.get("/api/users");
      dispatch(getAllUsers(users));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    // case GET_LOGGEDIN_USER:
    //   return action.user;
    case GET_ALL_USERS:
      return action.users;
    default:
      return state;
  }
}
