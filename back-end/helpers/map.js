function mapData(rows) {
    const { id, name, instruction } = rows[0];
    const recipe = { id, name, instruction };

    rows.forEach((row) => {
        if (!recipe.ingredient) {
            recipe.ingredient = [];
        }
        recipe.ingrerdient.push({
            unit: {
                id: row.unit.id,
                name: row.unit.name,
            },
            amount: row.amount,
            ingredient: row.ingredient,
        });
    });

    return recipe;
};

module.exports = mapData;