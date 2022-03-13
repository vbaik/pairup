import axios from "axios";

// const GET_LOGGEDIN_USER = "GET_LOGGEDIN_USER";
const GET_ALL_USERS = "GET_ALL_USERS";
const GET_PARTNERS = "GET_PARTNERS";
const GET_STATS = "GET_STATS";
// const UPDATE_USER = "UPDATE_USER";

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

// const updateUser = (user) => {
//   return {
//     type: UPDATE_USER,
//     user,
//   };
// };

const getStats = (stats) => {
  return {
    type: GET_STATS,
    stats,
  };
};

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

export const fetchUserStatsThunk = () => {
  return async (dispatch) => {
    try {
      const { data: stats } = await axios.get("api/users/stats");
      dispatch(getStats(stats));
    } catch (err) {
      console.log(err);
    }
  };
};

// export const updateUserThunk = (user) => {
//   return async (dispatch) => {
//     try {
//       const token = window.localStorage.getItem("token");
//       console.log("redux user ---->>>", user);
//       const { data: updatedUserData } = await axios.put(
//         "/api/users/profile",
//         user,
//         {
//           headers: {
//             authorization: token,
//           },
//         }
//       );
//       dispatch(updateUser(updatedUserData));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

const initialState = [];

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PARTNERS:
      return action.partners;
    case GET_ALL_USERS:
      return action.users;
    case GET_STATS:
      return action.stats;
    // case UPDATE_USER:
    //   return action.user;
    default:
      return state;
  }
}
