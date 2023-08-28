INSERT INTO ingredient (name)
VALUES ('garlic'), ('shallot'), ('onion'), ('water'), 
       ('salt'), ('pepper'), ('cream'), ('white wine'),
       ('carrot'), ('celery'), ('yellow onion'), ('fennel'), ('butter'),
       ('flour'), ('sugar'), ('lemon juice'), ('lobster base'),
       ('beef base'), ('green pepper'), ('red pepper'),
       ('andouille'), ('plum tomatoes'), ('blackening spice'),
       ('pickled ginger'), ('honey'), ('xanthan gum'),
       ('apple pectin'), ('blended oil'), ('whole eggs'), 
       ('egg yolks'), ('brown sugar'), ('mushroom'),
       ('sun-dried tomatoes'), ('roasted tomatoes'), 
       ('roasted red peppers'), ('napa cabbage'), ('red onion'),
       ('basil'), ('thyme'), ('rosemary'), ('sherry'), ('red wine'), ('almonds'),
       ('red wine vinegar'), ('apple cider vinegar');

INSERT INTO recipe (name, instruction)
VALUES ('She-Crab Soup',
        'Saute mirepoix in oil until soft. Melt butter, whisk in flour. Whisk in liquid ingredients and seasonings. Simmer until thick. Buzz and strain'
       ),
       ('Cabernet Demi-Glace',
        'Saute mirepoix in oil until soft, developing color on the vegetables. Melt butter, whisk in flour. Toast the roux for ~30s and add red wine, water, beef base, thyme, bay leaf, and whole black pepper. Gently reduce for 3-4 hours until liquid takes on a sauce-like consistency and evenly coats the back of a spoon. Strain and cool.'),
       ('Romesco',
        'Strain tomaotes and roasted red peppers, rinsing any excess oil off. Combine with almonds, sugar, vinegar, salt, and black pepper. Add xanthan gum, buzz until smooth.'),
       ('Ginger Vinagrette',
        'In a blender, add ginger, honey, and xanthan gum. Buzz until smooth. With blender at high speed, SLOWLY add oil to emulsify.');

INSERT INTO unit (name)
VALUES ('tsp'), ('oz'), ('qt'), ('gal'), ('#10 can'), ('ea'), ('stalks');

INSERT INTO recipe_ingredient (recipe_id, ingredient_id, unit_id, amount)
VALUES (1, 3, 6, 2), (1, 9, 6, 4), (1, 10, 7, 6);

