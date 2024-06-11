import axios from "axios"
import { URL } from "./base.service.js"

export const usersService = {
    // Função de cadastrar um novo usuário
    register: async (data = { name: "", email: "", password: "", department: "" }) => {

        if (Object.values(data).filter(element => element === "").length > 0)
            return false

        let response = await axios.post(`${URL}/users`, data)
        response = response.data

        return response
    },
    // Função de fazer login
    login: async (data = { email: "", password: "" }) => {

        if (Object.values(data).filter(element => element === "").length > 0)
            return false

        let response = await axios.post(`${URL}/login`, data)
        response = response.data

        return response
    }
}
