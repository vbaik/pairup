import axios from "axios";

// const GET_LOGGEDIN_USER = "GET_LOGGEDIN_USER";
const GET_ALL_USERS = "GET_ALL_USERS";
const GET_PARTNERS = "GET_PARTNERS";

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

const getPartners = (partners) => {
  return {
    type: GET_PARTNERS,
    partners,
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
      const token = window.localStorage.getItem("token");
      if (token) {
        const { data } = await axios.get("/api/users", {
          headers: {
            authorization: token,
          },
        });
        console.log("data ??????? ", data);
        dispatch(getAllUsers(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const fetchPotentialPartnersThunk = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data: partners } = await axios.get("/api/users/partners", {
        headers: {
          authorization: token,
        },
      });
      dispatch(getPartners(partners));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PARTNERS:
      return action.partners;
    case GET_ALL_USERS:
      return action.users;
    default:
      return state;
  }
}
