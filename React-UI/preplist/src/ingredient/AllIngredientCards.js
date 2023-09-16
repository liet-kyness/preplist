import React from "react";

function AllIngredientCards ({ id, name }) {
    console.debug("IngredientCards",
                "name=", name,
                "id=", id);
    return (
        <div className="RecipeCard">
            <div className="card-body">
                <h6 className="card-title">
                {name}
                </h6>
            </div>
        </div>
    );
}

export default AllIngredientCards;