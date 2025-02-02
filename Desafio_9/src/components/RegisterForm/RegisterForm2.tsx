import { SubmitHandler, useForm } from "react-hook-form"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import "./RegisterForm.module.css"
import { MainContext } from "../../context/Contexto"
import { api } from "../../api"
type input = {
    senha: string
    confirmacaoSenha: string
}
export const Register2 = () => {

    const userContext = useContext(MainContext)

    if (!userContext) {
        return null
    }

    const { setUser, userRegisterData } = userContext

    const { register, handleSubmit } = useForm<input>()

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<input> = async (data) => {
        if (data.senha != data.confirmacaoSenha) {
            return alert("As senhas precisam ser iguais")
        }
        try {
            const response = await api.post("/signup", userRegisterData)
            setUser(response.data)

            navigate("/register3")

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="ContainerRegister">
            <div className="FlowC">
                <img src="./Flow1.png" alt="Fluxo" />
            </div>
            <div className="main">
                <div className="FormC">
                    <h2>Adicione seus dados</h2>
                    <div className="form">
                        <form className='for.container' onSubmit={handleSubmit(onSubmit)}>
                            <div className="inputs">
                                <div>
                                    <input {...register("senha", { required: true })} className="input1" placeholder="senha" />
                                </div>
                                <div>
                                    <input {...register("confirmacaoSenha", { required: true })} className="input2" placeholder="Confirmação de senha" />
                                </div>
                            </div>
                            <button className="submitButton" type="submit">Continuar</button>




                        </form>

                    </div>
                    <h3>já possui uma conta? faça seu <a href="/login">Login</a></h3>

                </div>
                <div className="flow2">
                    <img src="./Flow11.png" alt="" />
                </div>
            </div>
        </div>
    )

}