import React from "react";
import "./IngredientCard.css";
//import UserContext from "../auth/UserContext";

function IngredientCard(name) {
    console.debug("Ingredient Card");

    return (
        <div className="IngredientCard card">
            <div className="card-body">
                <h6 className="card-title">{name}</h6>
            </div>
        </div>
    );
}

export default IngredientCard;