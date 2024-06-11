"use client"

import { MainContext } from "@/contexts/MainContext"
import { usersService } from "@/services/users.service"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

const Login = () => {

  const router = useRouter()

  const context = useContext(MainContext)

  const [user, setUser] = useState({ email: "", password: "" })

  const handleLogin = async (data = { email: '', password: '' }) => {

    try {

      context.setIsLoading(true)
      let response = await usersService.login(data)
      console.log(response)

      if (response._id) {
        context.setUserData(response)
        handleNavigate('/chamados')
      }

    } catch (error) {
      console.log(error)
    } finally {
      context.setIsLoading(false)
    }

  }

  const handleNavigate = (route = "/cadastro") => {
    router.push(route)
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="input-email" type="email" placeholder="Digite seu e-mail" />
      <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="input-password" type="password" placeholder="Digite sua senha" />
      <button className="button-login" onClick={() => handleLogin(user)}>ENTRAR</button>
      <button className="button-login" onClick={() => handleNavigate()}>CADASTRO</button>
      {context.isLoading && <div>Aguarde, carregando...</div>}
    </div>
  )
}

export default Login