"use strict";

const db = require("../db");
const { mapRowsToNestedData } = require("../helpers/map");
const { NotFoundError, BadRequestError } = require("../expressError");

class Recipe {

    // Recipe Stuff //
    
    
    static async getAll() {
        const result = await db.query(
            `SELECT name, instruction
             FROM recipe
             ORDER BY name`
        );
        return result.rows;
    }

    static async createRecipe(data) {
        const result = await db.query(
            `INSERT INTO recipe (name, instruction)
             VALUES ($1, $2)
             RETURNING id, name, instruction`,
             [data.name,
             data.instruction,
             ]);
        let recipe = result.rows[0];

        return recipe;
    }

    static async getRecipe(id) {
        const recipeRes = await db.query(
            `SELECT recipe.*,
            recipe_ingredient.amount,
            unit.name AS unit_name,
            unit.id AS unit_id,
            ingredient.name AS ingredient
            FROM recipe
            LEFT JOIN recipe_ingredient ON recipe.id = recipe_ingredient.recipe_id
            LEFT JOIN ingredient ON ingredient.id = recipe_ingredient.ingredient_id
            LEFT JOIN unit ON unit.id = unit_id
            WHERE recipe.id = $1`, [id]
        );
        return mapRowsToNestedData(recipeRes.rows);
    }

    //Ingredient Stuff //
    
    static async addIngredients(ingredient) {
        const ingredients = ingredient.map((i) => i.toLowerCase());
        const res = await db.query(
            `INSERT INTO ingredient (name)
             VALUE = $1`, [ingredients]
        );
        return res;
    }

    static async getIngredients(name) {
        const res = await db.query(
            `SELECT *
             FROM ingredient
             WHERE name = ANY($1::text[])`,
             [name],
        );

        return res;
    }

    static async addIngredientToRecipe(data) {
        data.unit_id = data.unit_id.map((u) => u || null);
        const res = await db.query(
            `INSET INTO recipe_ingredient (recipe_id, ingredient_id, unit_id, amount)
             VALUES = $1, $2, $3, $4`,
             [
                data.recipe_id,
                data.ingredient_id,
                data.unit_id,
                data.amount,
             ]);
        
        return res;
    }


}

module.exports = Recipe;