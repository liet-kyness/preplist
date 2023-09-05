import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import PrepListApi from "../api/api";
import RecipeCard from "./RecipeCard"
import LoadingSpinner from "../common/Loading";
//import Recipe from "../../../../back-end/models/recipes";

function RecipeList() {
    console.debug("Recipe List");
    const [recipes, setRecipes] = useState(null);
    useEffect(function getRecipesOnMount() {
        console.debug("getRecipesOnMount");
        search();
    }, []);

    async function search(name) {
        let recipes = await PrepListApi.getRecipes(name);
        setRecipes(recipes);
    };

    if (!recipes) {
        return <LoadingSpinner />;
    };

    return (
        <div className="RecipeList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {recipes.length ? (
                <div className="RecipeList-list">
                    {recipes.map(rec => (
                        <RecipeCard
                            name={rec.name}
                            id={rec.id}
                        />
                    ))}
                </div>
            ) : (
                <p className="lead">No results found</p>
            )}
        </div>
    );
}

export default RecipeList;