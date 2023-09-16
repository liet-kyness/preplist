import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import PrepListApi from "../api/api";
import AllIngredientCardList from "./AllIngredientsCardsList";
import LoadingSpinner from "../common/Loading";
import NewIngredientForm from "./NewIngredientForm";

function IngredientList() {
    console.debug("Ingredient List");
    const [ingredients, setIngredients] = useState(null);

    useEffect(function getIngredientsOnMount() {
        console.debug("getIngredientsOnMount");
        search();
    }, []);

    async function search(ingredient) {
        let ingredients = await PrepListApi.getIngredients(ingredient);
        setIngredients(ingredients);
    };

    if (!ingredients) {
        return (
            <LoadingSpinner />
        );
    };

    return (
        <div className="IngredientList col-md-8 offset-md-2">
            <div>
            <SearchForm searchFor={search} />
            {ingredients.length ? <AllIngredientCardList ingredient={ingredients} />
            : <p className="lead">No ingredients found..</p>
            }
            </div>
            <div>
                <NewIngredientForm />
            </div>
        </div>
    );
}

export default IngredientList;