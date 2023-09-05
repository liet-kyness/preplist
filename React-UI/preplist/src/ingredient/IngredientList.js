import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import PrepListApi from "../api/api";
import IngredientCardList from "./IngredientCardList";
import LoadingSpinner from "../common/Loading";

function IngredientList() {
    console.debug("Ingredient List");
    const [ingredients, setIngredients] = useState(null);

    useEffect(function getIngredientsOnMount() {
        console.debug("getIngredientsOnMount");
        search();
    }, []);

    async function search(name) {
        let ingredients = await PrepListApi.getIngredients(name);
        setIngredients(ingredients);
    };

    if (!ingredients) {
        return (
            <LoadingSpinner />
        );
    };

    return (
        <div className="IngredientList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {ingredients.length ? <IngredientCardList ingredients={ingredients} />
            : <p className="lead">No ingredients found..</p>
            }
        </div>
    );
}

export default IngredientList;