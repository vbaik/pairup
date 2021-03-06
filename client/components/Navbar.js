import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

//+++ style +++
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Tooltip, Typography } from "@mui/material";
// import { ThemeProvider } from "@mui/material/styles";

// import theme from "./style/Theme";

// const settings = ["Profile", "Logout"];

const Navbar = ({ handleClick, isLoggedIn, userImg }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "none",
          fontFamily: "Nunito",
          // display: "flex",
          // justifyContent: "center",
        }}
        elevation={0}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/">
            <Box
              component="img"
              sx={{
                height: 64,
                flexGrow: 5,
              }}
              alt="PairUp"
              src="/Logo.png"
            />
          </Link>
          <Link to="/">
            <Typography
              color="primary"
              variant="h5"
              sx={{ letterSpacing: 5, m: 1, fontWeight: "bold" }}
            >
              Pair<span className="main-title-span">Up</span>
            </Typography>
          </Link>

          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}

              <Link to="/home">
                <Button>Find Your Partner</Button>
              </Link>
              <a href="#" onClick={handleClick}>
                <Button>Logout</Button>
              </a>
              <Tooltip title="Edit Profile">
                <Link to="/users/profile">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar
                      alt="Remy Sharp"
                      src={userImg}
                      sx={{ width: 60, height: 60 }}
                    />
                  </IconButton>
                </Link>
              </Tooltip>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userImg: state.auth.imageURL,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
