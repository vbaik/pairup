import axios from "axios";

// const GET_SINGLE_USER = "GOT_SINGLE_USER";
const UPDATE_USER = "UPDATE_USER";

// const getSingleUser = (user) => ({
//   type: GET_SINGLE_USER,
//   user,
// });

const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

// export const getSingleUserThunk = (id) => {
//   return async (dispatch) => {
//     const { data: singleUserData } = await axios.get(`/api/users/${id}`);
//     dispatch(getSingleUser(singleUserData));
//   };
// };

export const updateUserThunk = (user) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data: updatedUserData } = await axios.put(`/api/users/`, user, {
        headers: {
          authorization: token,
        },
      });
      dispatch(updateUser(updatedUserData));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function usersReducer(state = {}, action) {
  switch (action.type) {
    // case GET_SINGLE_USER:
    //   return action.user;
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
}
