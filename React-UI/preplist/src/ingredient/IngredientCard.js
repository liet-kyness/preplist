import React from "react";
import "./IngredientCard.css";
//import UserContext from "../auth/UserContext";

function IngredientCard({ id, ingredient, amount, unit }) {
    console.debug("Ingredient Card", id, ingredient, amount, unit);

    return (
        <div className="IngredientCard">
            <div className="">
                <h6 className="">{amount}{unit.name} {ingredient}</h6>
            </div>
        </div>
    );
}

export default IngredientCard;