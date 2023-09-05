import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Homepage.css";

function Homepage() {
    const { currentUser } = useContext(UserContext);
    console.debug(
        "Homepage",
        "currentUser=", currentUser
    );
    
    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Pearl Recipes</h1>
                <p className="lead">View and update recipes here</p>
                {currentUser ? <h2>Welcome to thunderdome, {currentUser.firstName || currentUser.username}</h2>
                : ( <p>
                        <Link className="btn btn-primary font-weight-bold mr-3" to="/login">
                            LogIn
                        </Link>
                        <Link className="btn btn-primary font-weight-bold mr-3" to="/signup">
                            SignUp
                        </Link>
                    </p>
                    )};
            </div>
        </div>
    );
}

export default Homepage;
