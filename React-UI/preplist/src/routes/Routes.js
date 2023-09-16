import React from "react";
import { Switch, Route, Redirect } from "react-router-dom"
import Homepage from "../homepage/Homepage";
import RecipeList from "../recipe/RecipeList";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import RecipeDetail from "../recipe/RecipeDetail";
import IngredientList from "../ingredient/IngredientList";

function Routes({ login, signup }) {
    console.debug(
        "Routes",
        "login=", typeof login,
        "register=", typeof register
    );

    return (
        <div className="pt-5">
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route exact path="/login">
                    <LoginForm login={login} />
                </Route>
                <Route exact path="/signup">
                    <SignupForm signup={signup} />
                </Route>
                <Route exact path="/recipes">
                    <RecipeList />
                </Route>
                <Route exact path="/recipes/:id">
                    <RecipeDetail />
                </Route>
                <Route exact path="/ingredients">
                    <IngredientList />
                </Route>
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default Routes;