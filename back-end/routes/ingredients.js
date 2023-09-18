"use strict";

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
//const { ensureLoggedIn } = require("../middleware/auth");
const Ingredient = require("../models/ingredients");
const ingredientNewSchema = require("../schemas/ingredientNew.json");


const router = new express.Router();

router.post("/new", async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, ingredientNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const newIngredient = await Ingredient.addIngredients({ ...req.body });
        return res.status(201).json({ newIngredient });
    } catch (err) {
        return next(err);
    }
});

router.get("/", async (req, res, next) => {
    const q = req.query;
    try {
        const ingredient = await Ingredient.getIngredients(q);
        return res.json({ ingredient });
    } catch(err) {
        return next(err);
    }
});

router.get("/units", async(req, res, next) => {
    const q = req.query;
    try {
        const unit = await Ingredient.getAllUnits(q);
        return res.json({ unit });
    } catch (err) {
        return next(err);
    }
});


router.get("/:id", async (req, res, next) => {
    try {
        const ingredient = await Ingredient.getIngredients(req.params.id);
        return res.json({ ingredient });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;