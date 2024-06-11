import axios from "axios"
import { URL } from "./base.service.js"

export const tasksService = {
    // Função de listar todos os chamados do sistema
    getTasks: async () => {

        let response = await axios.get(`${URL}/tasks`)
        response = response.data

        return response
    },
    // Função de listar chamados do usuário
    getTasksByUserId: async (user_id = "") => {

        if (user_id === "")
            return false

        let response = await axios.get(`${URL}/tasks_by_user_id/${user_id}`)
        response = response.data

        return response
    },
    // Função de atualizar um chamado
    updateTask: async (data = { status: "", _id: "" }) => {

        if (Object.values(data).filter(element => element === "").length > 0)
            return false

        let response = await axios.put(`${URL}/tasks/${data._id}`, { status: data.status })
        response = response.data

        return response
    },
    // Função de criar um novo chamado
    create: async (data = { name: "", description: "", status: "", user_id: "" }) => {

        if (Object.values(data).filter(element => element === "").length > 0)
            return false

        let response = await axios.post(`${URL}/tasks`, data)
        response = response.data

        return response
    },
}
