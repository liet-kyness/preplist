import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PrepListApi from "../api/api";

function SignupForm({ signup }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: ""
    });
    const [formErrors, setFormErrors] = useState([]);
    console.debug(
        "SignupForm",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors=", formErrors
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await PrepListApi.signup(formData);
        if (result.success) {
            history.push('/recipes');
        } else {
            setFormErrors(result.errors);
        }
    };

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    return (
        <div className="SignupForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3">Sign Up</h2>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input name="username"
                                       className="form-control"
                                       value={formData.username}
                                       onChange={handleChange}
                                       placeholder="username.."
                                />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                       name="password"
                                       className="form-control"
                                       onChange={handleChange}
                                       value={formData.password}
                                       placeholder="password.."
                                />
                            </div>
                            <div className="form-group">
                                <input name="firstName"
                                       className="form-control"
                                       value={formData.firstName}
                                       onChange={handleChange}
                                       placeholder="first name.."
                                />
                            </div>
                            <div className="form-group">
                                <input name="lastName"
                                       value={formData.lastName}
                                       className="form-control"
                                       onChange={handleChange}
                                       placeholder="last name.."
                                />
                            </div>
                            <button type="submit" onSubmit={handleSubmit} className="btn btn-primary float-right">
                                Signup
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
