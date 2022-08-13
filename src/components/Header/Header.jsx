import React from "react";
import { Link, NavLink } from "react-router-dom";

import Logo from "../../assets/laurel-crown_39050.ico";
import CartIcon from "./../Cart-icon/CartIcon";

import { useSelector } from "react-redux";
import { useContext } from "react";
import { signOutUser } from "../../utils/firebase";
import CartDropdown from "./../Cart-dropdown/CartDropdown";
import { CartContext } from "../../contexts/CartContext";

import "./header.scss";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  // const { currentUser } = useContext(UserContext);
  const { isHidden, setIsHidden } = useContext(CartContext);

  const onActiveLink = (isActive) => ({
    textDecoration: isActive ? "underline" : "",
  });
  const onUserSignOutHandler = async () => {
    await signOutUser();
  };

  return (
    <div className="header-container">
      <Link to="/" className="app-name-container">
        <div className="logo-container">
          <img src={Logo} alt="logo" />
        </div>
        <span>Crown-clothing</span>
      </Link>
      <nav className="header-navigation">
        <NavLink style={({ isActive }) => onActiveLink(isActive)} to="/shop">
          shop
        </NavLink>
        {currentUser ? (
          <span
            onClick={onUserSignOutHandler}
            style={{
              textTransform: "uppercase",
              color: "#fff",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Logout
          </span>
        ) : (
          <NavLink
            style={({ isActive }) => onActiveLink(isActive)}
            to="/sign-in"
          >
            Login
          </NavLink>
        )}
        <CartIcon setIsHidden={setIsHidden} isHidden={isHidden} />
      </nav>
      {isHidden ? null : <CartDropdown />}
    </div>
  );
};

export default Header;
