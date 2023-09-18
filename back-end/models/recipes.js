"use strict";

const db = require("../db");
const { NotFoundError, BadRequestError } = require("../expressError");

class Recipe {

    // Recipe Stuff //
    
    
    static async getAll() {
        const result = await db.query(
            `SELECT id, name, instruction
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
            `SELECT recipe.name, recipe.instruction,
            recipe_ingredient.amount,
            unit.name AS unit_name,
            unit.id AS unit_id,
            ingredient.name AS ingredient
            FROM recipe
            LEFT JOIN recipe_ingredient ON recipe.id = recipe_ingredient.recipe_id
            LEFT JOIN ingredient ON ingredient.id = recipe_ingredient.ingredient_id
            LEFT JOIN unit ON unit.id = unit_id
            WHERE recipe.id = $1`, [id],
        );
        return mapData(recipeRes.rows);
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

    // static async getIngredients() {
    //     const res = await db.query(
    //         `SELECT name, id
    //         FROM ingredient
    //         ORDER BY name`
    //     );
    //     return res.rows;
    // };
    
    
    static async getIngredients(name) {
        const res = await db.query(
            `SELECT * FROM ingredient
             WHERE name = ANY($1::text[])`,
             [name]
        );

        return res.rows;
    };


    static async getAllUnits() {
        const res = await db.query(
            `SELECT id, name
            FROM unit`
        );

        return res.rows;
    };

    static async addIngredientToRecipe(recipeId, ingredientId, unitId, amount) {
        data.unit_id = data.unit_id.map((u) => u || null);
        const res = await db.query(
            `INSERT INTO recipe_ingredient (recipe_id, ingredient_id, unit_id, amount)
             SELECT * FROM UNNEST ($1::int[], $2::int[], $3::int[], $4::int[])`,
             [
                recipeId, ingredientId, unitId, amount
             ]);
        
        return res;
    }
}

//function to add ingredients to a recipe

function mapData(rows) {
    const { id, name, instruction } = rows[0];
    const recipe = { id, name, instruction };

    rows.forEach((row) => {
        if (!recipe.ingredient) {
            recipe.ingredient = [];
        }
        recipe.ingredient.push({
            unit: {
                id: row.unit_id,
                name: row.unit_name,
            },
            amount: row.amount,
            ingredient: row.ingredient,
        });
    });

    return recipe;
};

module.exports = Recipe;