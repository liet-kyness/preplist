CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    instruction TEXT
);

CREATE TABLE ingredient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE unit (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE recipe_ingredient (
    recipe_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    unit_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    CONSTRAINT fk_recipe FOREIGN KEY (recipe_id) REFERENCES Recipe(id) ON DELETE CASCADE,
    CONSTRAINT fk_ingredient FOREIGN KEY (ingredient_id) REFERENCES Ingredient(id),
    CONSTRAINT fk_unit FOREIGN KEY (unit_id) REFERENCES Unit(id)
);


