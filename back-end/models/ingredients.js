"use strict";

const db = require("../db");
const { NotFoundError, BadRequestError } = require("../expressError");

class Ingredient {
    static async addIngredients({ name }) {
        const result = await db.query(
            `INSERT INTO ingredient (name)
             VALUES ($1)
             RETURNING name`, [name]
        );
        const ingredient = result.rows[0];
        return ingredient;
    }

    static async getIngredients() {
        const res = await db.query(
            `SELECT name, id
             FROM ingredient
             ORDER BY name`,
        );

        return res.rows;
    }

    static async addIngredientToRecipe(data) {
        data.unit_id = data.unit_id.map((u) => u || null);
        const res = await db.query(
            `INSERT INTO recipe_ingredient (recipe_id, ingredient_id, unit_id, amount)
             VALUES  ($1, $2, $3, $4)`,
             [
                data.recipe_id,
                data.ingredient_id,
                data.unit_id,
                data.amount,
             ]);
        
        return res;
    }

    static async getAllUnits() {
        const res = await db.query(
            `SELECT name, id
             FROM unit
             ORDER BY name`
        );
        return res.rows;
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

module.exports = Ingredient;