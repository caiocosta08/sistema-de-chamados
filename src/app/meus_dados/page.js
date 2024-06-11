"use client"
import { MainContext } from "@/contexts/MainContext"
import { useRouter } from "next/navigation"
import { useContext } from "react"

const MeusDados = () => {
    const router = useRouter()
    
    const context = useContext(MainContext)

    const handleNavigate = () => {
        router.push('/chamados')
    }

    return (
        <div className="container">
            <h1>Meus Dados</h1>
            <h3>Nome: {context.userData.name}</h3>
            <h3>E-mail: {context.userData.email}</h3>
            <h3>Setor: {context.userData.department}</h3>
            <button onClick={handleNavigate}>Voltar</button>
        </div>
    )
}

export default MeusDados