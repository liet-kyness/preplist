import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PrepListApi from "../api/api";

function LoginForm({ login }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState([]);
    console.debug(
        "LoginForm",
        "login=", typeof login,
        "formData=", formData,
        "formErrors=", formErrors
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await PrepListApi.login(formData);
        if (result.success) {
            history.push('/recipes');
        } else {
            setFormErrors(result.errors);
        }
    };

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({ ...f, [name]: value}));
    };

    return (
        <div className="LoginForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3">Log In</h2>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input name="username"
                                       placeholder="username.."
                                       className="form-control"
                                       value={formData.username}
                                       onChange={handleChange}
                                       autoComplete="username"
                                       required
                                />
                            </div>
                            <div className="form-group">
                                <input name="password"
                                       value={formData.password}
                                       onChange={handleChange}
                                       className="form-control"
                                       type="password"
                                       placeholder="password.."
                                       autoComplete="current-password"
                                       required
                                />
                            </div>
                            <button className="btn btn-primary float-right" onSubmit={handleSubmit}>
                                log in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;