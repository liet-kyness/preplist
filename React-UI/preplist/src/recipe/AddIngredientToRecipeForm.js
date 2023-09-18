import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import PrepListApi from "../api/api";



function AddIngredientToRecipe() {
    const recId = useParams();
    const recipeId = recId.id;
    const [ingredients, setIngredients] = useState([]);
    const [ingredientId, setIngredientId] = useState(null);
    const [units, setUnits] = useState([]);
    const [unitId, setUnitId] = useState(null);
    const [amount, setAmount] = useState("");
    const history = useHistory();

    const [formData, setFormData] = useState({
        recipeId: "",
        ingredientId: "",
        unitId: "",
        amount: ""
    });

    useEffect(() => {
        function setRecipeIdOnMount() {
            setFormData(data => ({ ...data, recipeId: parseInt(recipeId) }));
        };
        setRecipeIdOnMount();
    }, []);

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
        setFormData(data => ({ ...data, ingredientId: parseInt(inputIngredient) }));
        console.log("inputIngredient=", inputIngredient);
    };

    function handleUnitChange(e) {
        const inputUnit = e.target.value;
        setUnitId(inputUnit);
        setFormData(data => ({ ...data, unitId: parseInt(inputUnit) }));
        console.log("inputUnit=", inputUnit);
    };

    function handleAmountChange(e) {
        const inputAmount = e.target.value;
        setAmount(inputAmount);
        setFormData(data => ({ ...data, amount: parseInt(inputAmount) }))
        console.log("inputAmount=", inputAmount);
    }
    function handleSubmit(e) {
        e.preventDefault();
        console.log("formdataarray=", formData);
        submitToApi();
        history.go(0);

    }
    async function submitToApi() {
        let result = await PrepListApi.addIngredientToRecipe(formData);
        console.log("result=", result)
    }

    // function handleFormChange(e) {
    //     e.preventDefault();
    //     setFormData({ recipeId, ingredientId, unitId, amount });
    //     console.log("FormChangeData=", formData);
    // }
    
    console.log("recipeId=", recipeId);
    console.log("ingredientId=", ingredientId);
    console.log("unitId=", unitId);
    console.log("amount=", amount);
    console.log("formData=", formData)

    // function handleChange(e) {
    //     const { name, value } = e.target;
    //     console.log("target=", e.target,
    //                 "name=", e.target.name);
    //     setFormData(({ [name]: value }));
    // }
    
    

    return (
        <div className="addIngredientsToRecipe">
            <div className="container col-md-6 offset-md-3">
                <h3 className="mb-3">Add ingredient</h3>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <select onChange={handleIngredientChange}>
                                    {ingredients.map(i => (
                                        <option name="ingredientId" key={i.id} id={i.id} value={i.id}>{i.name}</option>
                                    ))}
                                </select>
                                <select onChange={handleUnitChange}>
                                    {units.map(u => (
                                        <option name="unitId" key={u.id} id={u.id} value={u.id}>{u.name}</option>
                                    ))}
                                </select>
                                <input type="text"
                                       name="amount"
                                       id={amount} 
                                       value={amount} 
                                       placeholder="amount.."
                                       onChange={handleAmountChange} />
                            </div>
                            <button type="submit">Add</button>
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