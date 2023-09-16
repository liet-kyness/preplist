import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PrepListApi from "../api/api";
import LoadingSpinner from "../common/Loading";
import IngredientCardList from "../ingredient/IngredientCardList";
import NewIngredientForm from "../ingredient/NewIngredientForm";

function RecipeDetail() {
    const { id } = useParams();
    console.debug(
        "RecipeDetail",
        "id=", id
    );
    const [recipe, setRecipe] = useState(null);

    useEffect(function getRecipeAndIngredients() {
        async function getRecipe() {
            setRecipe(await PrepListApi.getRecipe(id));
        };
        getRecipe();
    }, [id]);

    if (!recipe) {
        return (
            <LoadingSpinner />
        );
    };

    return (
        <div className="RecipeDetail col-md-8 offset-md-2">
            <h4>{recipe.name}</h4>
            <p>{recipe.instruction}</p>
            <IngredientCardList ingredient={recipe.ingredient} />
            <NewIngredientForm />
        </div>
    );
}

export default RecipeDetail;