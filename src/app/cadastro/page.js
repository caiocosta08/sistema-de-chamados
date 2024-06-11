"use client"

import { MainContext } from "@/contexts/MainContext"
import { usersService } from "@/services/users.service"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"

const Cadastro = () => {

  const router = useRouter()
  const context = useContext(MainContext)

  const [user, setUser] = useState({
    name: '', email: '', department: '', password: '', confirmPassword: ''
  })

  const handleRegister = async (data = { name: '', email: '', department: '', password: '', confirmPassword: '' }) => {

    if (data.password !== data.confirmPassword) {
      alert('Os campos senha e confirmação de senha precisam ser iguais!')
      return false
    }

    let response = await usersService.register(data)

    if(response._id){
      context.setUserData(response)
      handleNavigate('/chamados')
    }

  }

  const handleNavigate = (route = "/") => {
    router.push(route)
  }

  return (
    <div className="container">
      <h2>Cadastro</h2>
      <button className="button-login" onClick={() => handleNavigate()}>Voltar</button>
      <input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="input-email" type="text" placeholder="Digite o seu nome" />
      <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="input-email" type="text" placeholder="Digite o seu email" />
      <input value={user.department} onChange={(e) => setUser({ ...user, department: e.target.value })} className="input-email" type="text" placeholder="Digite o seu setor" />
      <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="input-email" type="text" placeholder="Digite a sua senha" />
      <input value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} className="input-email" type="text" placeholder="Digite a confirmação da senha" />
      <button className="button-login" onClick={() => handleRegister(user)}>Confirmar Cadastro</button>
    </div>
  )
}

export default Cadastro