import React from "react";
import AllIngredientCards from "./AllIngredientCards";

function AllIngredientCardList({ ingredient }) {
    console.debug(
        "IngredientCardsList",
        "ingredient=", ingredient
    );

    return (
        <div className="IngredientsCardsList">
            <div>
            {ingredient.map(i => (
                <AllIngredientCards key={i.id}
                                 id={i.id}
                                 name={i.name}
                />
            ))}
            </div>
        </div>
    )
}

export default AllIngredientCardList;