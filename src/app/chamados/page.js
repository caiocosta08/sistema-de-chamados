"use client"
import { useRouter } from "next/navigation"
import "./styles.css"
import { useContext, useEffect, useState } from "react"
import { tasksService } from "@/services/tasks.service"
import { MainContext } from "@/contexts/MainContext"

const Chamados = () => {
    const router = useRouter()

    const context = useContext(MainContext)

    const handleLogout = () => {
        router.push('/')
    }

    const handleNavigate = (route) => {
        router.push(route)
    }

    const [tasks, setTasks] = useState([])

    const [selectedStatus, setSelectedStatus] = useState("Todos")

    const handleGetTasksByUserId = async (user_id = "") => {
        let response = await tasksService.getTasksByUserId(user_id);
        console.log(response)
        if (response.length >= 0) {
            setTasks(response)
        }
    }

    const handleGetTasks = async () => {
        let response = await tasksService.getTasks();
        console.log(response)
        if (response.length >= 0) {
            setTasks(response)
        }
    }

    const reloadTasks = async () => {
        context.setIsLoading(true)
        setTasks([])
        if (context.userData.department === "TI") {
            await handleGetTasks()
        } else {
            await handleGetTasksByUserId(context.userData._id)
        }
        context.setIsLoading(false)
    }

    const handleUpdateTask = async (_id = "", status = "") => {
        let response = await tasksService.updateTask({ _id, status })

        if (response._id) {
            await reloadTasks()
        }
    }

    useEffect(() => {

        reloadTasks()

    }, [])

    return (
        <div className="container">

            <div className="table-chamados">
                <div className="row">
                    <h1 style={{ flex: 1, textAlign: 'center', margin: '16px 0px' }} >Chamados</h1>
                </div>
                <div className="row">
                    <div style={{ flex: 1 }} className="button-primary" onClick={() => handleNavigate('/meus_dados')}>Meus Dados</div>
                    <div style={{ flex: 1 }} className="button-primary" onClick={() => handleNavigate('/abrir_chamado')}>Abrir Chamado</div>
                    <div style={{ flex: 1 }} className="button-secondary" onClick={reloadTasks}>Atualizar Chamados</div>
                    <div style={{ flex: 1 }} className="button-secondary" onClick={() => handleNavigate('/')}>Sair</div>
                </div>
                <div className="row">
                    <div className={selectedStatus === "Todos" ? "button-primary" : "button-secondary"} onClick={() => setSelectedStatus('Todos')}>Todos</div>
                    <div className={selectedStatus === "Pendente" ? "button-primary" : "button-secondary"} onClick={() => setSelectedStatus('Pendente')}>Pendentes</div>
                    <div className={selectedStatus === "Concluído" ? "button-primary" : "button-secondary"} onClick={() => setSelectedStatus('Concluído')}>Concluídos</div>
                    <div className={selectedStatus === "Cancelado" ? "button-primary" : "button-secondary"} onClick={() => setSelectedStatus('Cancelado')}>Cancelados</div>
                </div>
                {/* CABEÇALHO DA TABELA */}
                <div className="row">
                    <div className="cel-head">Chamado</div>
                    <div className="cel-head">Status</div>
                    {context.userData.department === "TI" && <div className="cel-head">Concluir</div>}
                    <div className="cel-head">Cancelar</div>
                </div>
                {/* CORPO DA TABELA */}

                {context.isLoading && <div className="cel">Aguarde, carregando...</div>}

                {tasks.map((task, index) => {
                    if (task.status === selectedStatus || selectedStatus === "Todos") return (
                        <div key={index} className="row">
                            <div className="cel">{task.name}</div>
                            <div className="cel">{task.status}</div>
                            {context.userData.department === "TI" && <div className="cel"><div onClick={() => handleUpdateTask(task._id, "Concluído")} className="button-primary">CONCLUIR</div></div>}
                            <div className="cel"><div onClick={() => handleUpdateTask(task._id, "Cancelado")} className="button-secondary">CANCELAR</div></div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Chamados