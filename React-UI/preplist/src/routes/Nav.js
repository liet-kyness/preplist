import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Nav.css";
import "../api/pearl_logo.png";

function Nav({ logout }) {
    const { currentUser } = useContext(UserContext);
    console.debug(
        "Nav",
        "currentUser=", currentUser
    );

    function loggedInNav() {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/recipes">
                        Recipes
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/ingredients">
                        Ingredients
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/" onClick={logout}>
                        LogOut
                    </NavLink>
                </li>
                <li className="nav-item ml-auto">
                    {currentUser.first_name || currentUser.username}
                </li>
            </ul>
        );
    };

    function loggedOutNav() {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/login">
                        log in
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/signup">
                        sign up
                    </NavLink>
                </li>
            </ul>
        );
    };

    return (
        <nav className="Nav navbar navbar-expand-md">
            <Link className="navbar-brand" to="/">
                Home
            </Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    );
}

export default Nav;