"use strict";

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Recipe = require("../models/recipes");
const recipeNewSchema = require("../schemas/recipeNew.json");
const recipeUpdateSchema = require("../schemas/recipeUpdate.json");
const recipeSearchSchema = require("../schemas/recipeSearch.json");

const router = new express.Router();

router.post("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, recipeNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const recipe = await Recipe.createRecipe(req.body);
        return res.status(201).json({ recipe });
    } catch (err) {
        return next(err);
    }
});

router.get("/", async (req, res, next) => {
    const q = req.query;
    try {
        const validator = jsonschema.validate(q, recipeSearchSchema);
        if (validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const recipe = await Recipe.getAll(q);
        return res.json({ recipe });
    } catch (err) {
        return next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const recipe = await Recipe.getRecipe(req.params.id);
        return res.json({ recipe });
    } catch (err) {
        return next(err);
    }
});

// router.patch("/:id", ensureLoggedIn, async (req, res, next) => {
//     try {
//         const validator = jsonschema.validate(req.body, recipeUpdateSchema);
//         if (!validator.valid) {
//             const errs = validator.errors.map(e => e.stack);
//             throw new BadRequestError(errs);
//         }
//         const recipe = await Recipe.
//     }
// })

// router.delete("/:id", ensureLoggedIn, (req, res, next) => {

// })

module.exports = router;