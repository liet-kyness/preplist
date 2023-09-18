import React, { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";
import PrepListApi from "../api/api";



function AddIngredientToRecipe() {
    const [ingredients, setIngredients] = useState([]);

    useEffect(function populateIngredientsOnMount() {
        console.debug("populateIngredientsOnMount");
        search();
    }, []);
    console.log("ingredients=", ingredients);

    async function search(ingredient) {
        let ingredients = await PrepListApi.getIngredients(ingredient);
        setIngredients(ingredients);
    };

    // function handleChange(e) {
    //     e.preventDefault()
    //     setIngredientId(e.target.value);
    //     console.log(ingredientId);
    // };
    

    return (
        <div className="addIngredientsToRecipe">
            <div className="container col-md-6 offset-md-3">
                <h3 className="mb-3">Add ingredient</h3>
                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <select>
                                    {ingredients.map(i => (
                                        <option>{i.name}</option>
                                    ))}
                                </select>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default AddIngredientToRecipe;


// useEffect(function getIngredientsAndUnits() {
//     async function getIngredients() {
//     setIngredients(await PrepListApi.getIngredients(ingredients));
//     };
//     getIngredients();
// }, []);