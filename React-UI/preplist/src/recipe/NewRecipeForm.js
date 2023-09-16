import React, { useState } from "react";
import PrepListApi from "../api/api";
import { useHistory } from "react-router-dom";

function NewRecipeForm({ recipe }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: "",
        instruction: "",
        
    });
    const [formErrors, setFormErrors] = useState([]);
    console.debug(
        "NewRecipeForm",
        "formData=", formData,
        "formErrors=", formErrors
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await PrepListApi.newRecipe(formData);
        if (!result) {
            setFormErrors(result);
        } else {
            console.log(recipe);
            history.push("/recipes");
        }
    };

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    return (
        <div className="NewRecipeForm">
            <div className="container col-md-6 offset-md-3">
                <h3 className="mb-3">New Recipe</h3>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input name="name"
                                       value={formData.name}
                                       className="form-control"
                                       onChange={handleChange}
                                       placeholder="recipe name.."
                                />
                            </div>
                            <div className="form-group">
                                <input name="instruction"
                                       type="textarea"
                                       value={formData.instruction}
                                       onChange={handleChange}
                                       className="form-control"
                                       placeholder="instructions"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary float-right" onSubmit={handleSubmit}>
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewRecipeForm;