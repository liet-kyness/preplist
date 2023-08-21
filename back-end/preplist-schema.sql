CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE recipe (
    recipe_id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    intruction TEXT
);

CREATE TABLE ingredient (
    ingredient_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- CREATE TABLE recipe_ingredient (
--     recipe_id INTEGER REFERENCES recipe (recipe_id),
--     ingredient_id INTEGER REFERENCES ingredient (ingredient_id),
--     amount INTEGER NOT NULL,
--     unit VARCHAR(8) NOT NULL,
--     PRIMARY KEY(recipe_id, ingredient_id)
-- );

