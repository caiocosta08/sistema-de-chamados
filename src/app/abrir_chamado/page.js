"use client"

import { MainContext } from "@/contexts/MainContext"
import { tasksService } from "@/services/tasks.service"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"

const AbrirChamado = () => {

  const router = useRouter()

  const context = useContext(MainContext)

  const [newTask, setNewTask] = useState({ name: "", description: "", status: "Pendente", user_id: "" })

  const handleNavigate = () => {
    router.push('/chamados')
  }

  const handleCreateTask = async (data = { name: "", description: "", status: "", user_id: "" }) => {

    data = { ...data, user_id: context.userData._id }

    let response = await tasksService.create(data)

    if(response._id) {
      handleNavigate()
    }

  }

  return (
    <div className="container">
      <h2>Abrir Chamado</h2>
      <button className="button-login" onClick={handleNavigate}>Voltar</button>
      <input value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} className="input-email" type="text" placeholder="Digite o título do chamado" />
      <input value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} className="input-email" type="text" placeholder="Digite a descrição do chamado" />
      <button className="button-login" onClick={() => handleCreateTask(newTask)}>Confirmar</button>
    </div>
  )
}

export default AbrirChamado