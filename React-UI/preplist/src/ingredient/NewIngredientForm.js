import React, { useState } from "react";
import PrepListApi from "../api/api";

function NewIngredientForm({ ingredient }) {
    const [formData, setFormData] = useState({
        name: ""
    });

    const [formErrors, setFormErrors] = useState([]);
    console.debug(
        "NewIngredientForm",
        "ingredient=", ingredient,
        "formErrors=", formErrors
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await PrepListApi.newIngredient(formData);
        let newIngredient = evt.target;
        if (!result) setFormErrors(result);
        console.log(result);
        console.log(newIngredient);
        alert("Added.")  
    };

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value}));
    };

    return (
        <div className="NewIngredientForm">
            <div className="container col-md-6 offset-md-3">
                <h2 className="mb-3">New Ingredient</h2>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input name="name"
                                       value={formData.name}
                                       onChange={handleChange}
                                       className="form-control"
                                       placeholder="ingredient..."
                                />
                            </div>
                            <button type="submit" onSubmit={handleSubmit} className="btn btn-primary float-right">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewIngredientForm;