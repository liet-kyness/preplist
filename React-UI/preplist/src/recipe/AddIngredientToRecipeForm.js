import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrepListApi from "../api/api";



function AddIngredientToRecipe() {
    const recId = useParams();
    const recipeId = recId.id;
    const [ingredients, setIngredients] = useState([]);
    const [ingredientId, setIngredientId] = useState(null);
    const [units, setUnits] = useState([]);
    const [unitId, setUnitId] = useState(null);

    useEffect(function populateIngredientsOnMount() {
        console.debug("populateIngredientsOnMount");
        searchIngredients();
    }, []);
    console.log("ingredients=", ingredients);

    useEffect(function populateUnitsOnMount() {
        console.debug("populateUnitsOnMount");
        searchUnits();
    }, []);

    async function searchUnits(unit) {
        let units = await PrepListApi.getUnits(unit);
        setUnits(units);
    };

    async function searchIngredients(ingredient) {
        let ingredients = await PrepListApi.getIngredients(ingredient);
        setIngredients(ingredients);
    };

    function handleIngredientChange(e) {
        const inputIngredient = e.target.value;
        setIngredientId(inputIngredient);
        console.log("inputIngredient=", inputIngredient);
    };

    function handleUnitChange(e) {
        const inputUnit = e.target.value;
        setUnitId(inputUnit);
        console.log("inputUnit=", inputUnit);
    };
    
    console.log("recipeId=", recipeId);
    console.log("ingredientId=", ingredientId);
    console.log("unitId=", unitId);
    

    return (
        <div className="addIngredientsToRecipe">
            <div className="container col-md-6 offset-md-3">
                <h3 className="mb-3">Add ingredient</h3>
                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <select onChange={handleIngredientChange}>
                                    {ingredients.map(i => (
                                        <option key={i.id} id={i.id} value={i.id}>{i.name}</option>
                                    ))}
                                </select>
                                <select onChange={handleUnitChange}>
                                    {units.map(u => (
                                        <option key={u.id} id={u.id} value={u.id}>{u.name}</option>
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