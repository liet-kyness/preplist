import React from "react";
import "./IngredientCard.css";
//import NewIngredientForm from "./NewIngredientForm";
//import UserContext from "../auth/UserContext";

function IngredientCard({ id, ingredient, amount, unit }) {
    console.debug("Ingredient Card", id, ingredient, amount, unit);

    return (
        <div className="IngredientCard">
            <div className="">
                <h6 className="">{amount} {unit.name} {ingredient}</h6>
            </div>
        </div>
    );
}

// function AllIngredientCards ({ ingredient }) {
//     console.debug("IngredientCards",
//                 "ingreient=", ingredient);
//     return (
//         <div className="RecipeCard">
//             <div className="card-body">
//                 <h6 className="card-title">
//                 {ingredient}
//                 </h6>
//             </div>
//             <NewIngredientForm />
//         </div>
//     );
// }

export default IngredientCard;