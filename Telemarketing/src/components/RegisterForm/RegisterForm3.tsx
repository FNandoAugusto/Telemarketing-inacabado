import { useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./RegisterForm3.module.css"
type input = {
    nome: string
    email: string
}
export const Register3 = () => {

    const { register, reset, handleSubmit } = useForm<input>()

    const navigate = useNavigate()


    const onSubmit = async (data: input) => {

        try {
            navigate("/login")

        } catch (error) {
            console.log(error)
        }
    }
    const [form, setform] = useState({ nome: '', email: '', senha: '', confirmacaoSenha: '' })
    if (form.nome.length > 126) {
        console.log("Seu nome precisa conter menos de 127 caracteres ")
    }
    if (form.email.length > 256) {
        console.log("Seu nome precisa conter menos de 127 caracteres ")
    }
    if (form.senha.length > 30) {
        console.log("Sua senha precisa conter menos de 31 caracteres ")
    }
    if (form.senha !== form.confirmacaoSenha) {
        console.log("A senha está diferente ")
    }

    return (
        <div className="ContainerRegister">
            <div className="FlowC">
                <img src="./Flow3.png" alt="Fluxo" />
            </div>
            <div className="main">
                <div className="FormC">

                    <div className="form">
                        <form className='for.container' onSubmit={handleSubmit(onSubmit)}>
                            <div className="imgFinal">
                                <img src="./cadFinalizado.png" alt="" />
                            </div>
                            <button className="submitButton" type="submit">Ir para Login</button>




                        </form>

                    </div>

                </div>
                <div className="flow2">
                    <img src="./Flow33.png" alt="" />
                </div>
            </div>
        </div>
    )

}