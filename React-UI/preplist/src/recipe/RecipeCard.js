import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

function RecipeCard({ name, id }) {
    console.debug("RecipeCard", name);

    return (
        <Link className="RecipeCard" to={`/recipes/${id}`}>
            <div className="card-body">
                <h6 className="card-title">
                    {name}
                </h6>
            </div>
        </Link>
    );
}

export default RecipeCard;