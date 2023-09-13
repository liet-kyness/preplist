import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class PrepListApi {
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${PrepListApi.token}` };
        const params = (method === "get") ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };

    static async getRecipes(name) {
        let res = await this.request("recipes", { name });
        return res.recipe;
    };

    static async getRecipe(id) {
        let res = await this.request(`recipes/${id}`);
        console.log(res);
        return res.recipe;
    };

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    };

    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    };

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    };

    static async getIngredients(name) {
        let res = await this.request("ingredients", { name });
        return res.name;
    };

    static async newRecipe(data) {
        let res = await this.request(`recipes/new`, data, "post");
        return res;
    };

    static async newIngredient(data) {
        let res = await this.request(`ingredients/new`, data, "post");
        return res.name;
    }
};

export default PrepListApi;