import React from "react";
import IngredientCard from "./IngredientCard";

function IngredientCardList({ ingredient }) {
    console.debug(
        "Ingredient Card List",
         "ingredient=", ingredient
    );

    return (
        <div className="IngredientCardList">
            {ingredient.map(i => (
                <IngredientCard key={i.id}
                                id={i.id}
                                ingredient={i.ingredient}
                                amount={i.amount}
                                unit={i.unit}
                />
            ))}
        </div>
    );
}

// function AllIngredientCardList({ ingredient }) {
//     console.debug(
//         "IngredientCardsList",
//         "ingredient=", ingredient
//     );

//     return (
//         <div className="IngredientsCardsList">
//             {ingredient.map(i => (
//                 <IngredientCards key={i.id}
//                                  id={i.id}
//                                  ingredient={i.ingredient}
//                 />
//             ))}
//         </div>
//     )
// }

export default IngredientCardList;