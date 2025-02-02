import { useContext, useEffect, useState } from "react"
import { MainContext } from "../../context/Contexto"
import { IClient } from "./ModalCadastro"
import { api } from "../../api"
import useAuth from "../../Hooks/useAuth"
import { useNavigate } from "react-router-dom"
import "./ClientPage.module.css"
export interface ICurrentUser {
    email: string
    nome: string
    id: string
}


export const ClientPage = () => {

    const navigate = useNavigate()
    const mainContext = useContext(MainContext)

    const [clientList, setClientList] = useState<IClient[]>([])

    if (!mainContext) {
        return null
    }

    const { handleClientModal, handleChargeModal, handleClientId } = mainContext
    const { handleGetToken } = useAuth()

    useEffect(() => {
        (async () => {
            try {
                const response = await api.get(`/consultClient`, { headers: { "Authorization": `Bearer ${handleGetToken()}` } })

                setClientList(response.data)

            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    const getNome: ICurrentUser = JSON.parse(localStorage.getItem("current-user")!)

    const logout = () => {
        localStorage.removeItem("token")
        window.location.replace("/login")

    }
    return (
        <article className="ContainerClients">
            <aside className="Menu">
                <button onClick={() => navigate("/Home")} className="HomeButton"><img src="./HomeIcon.svg" alt="" />
                    <span>Home</span>
                </button>
                <button className="ClienteButton"><img src="/ClientsMenu.svg" alt="" />
                    <span className="ColorFont">Clientes</span>
                </button>
                <button onClick={() => { navigate("/cobrancas") }} className="CobrançasButton"><img src="./CobrancasIcon.svg" alt="" />
                    <span>Cobranças</span>
                </button>
            </aside>
            <div className="div-column">
                <header className="headerClient">
                    <div className="fluxo">
                        <p>Clientes</p>
                    </div>
                    <div className="userMenu">
                        <div className="modalUserMenu">
                            <img className="imageSeta" src="./modalseta.svg" alt="" />
                            <div className="menuModal">
                                <img src="./edit.svg" alt="" />
                                <p>editar</p>
                            </div>
                            <div className="menuModal">
                                <img onClick={() => logout()} src="./logout.svg" alt="" />
                                <p>sair</p>
                            </div>
                        </div>
                        <p className="CircleName">{getNome.nome.slice(0, 1)}</p>
                        <div >
                            <p>{getNome.nome}</p>
                            <img src="./seta.svg" alt="" />
                        </div>
                    </div>

                </header>
                <main className="main">
                    <div className="mainC">

                        <div className="PageSettings">
                            <div className="ContainerHotbar">

                                <img src="ClientsIconDark.svg" alt="" />
                                <h2>Clientes</h2>
                            </div>
                            <div>
                                <button className="NCliente" onClick={() => handleClientModal()}>Adicionar Cliente</button>
                                <button className="FilterButton"><img src="./Filter.svg" alt="" /></button>
                                <div className="ContainerSearch">
                                    <input name="search" className="search"></input><img src="./Search.svg" alt="" />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="ContainerTable">
                        <table>
                            <thead>
                                <tr className="ListHead">
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>E-mail</th>
                                    <th>Telefone</th>
                                    <th>Status</th>
                                    <th>Nova Transação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    clientList.map(client => (
                                        <tr className="listC" key={client.id}>


                                            <td onClick={() => {
                                                handleClientId(client.id)
                                                navigate("/clientDetails")
                                            }}>{client.nome}</td>
                                            <td>{client.cpf}</td>
                                            <td>{client.email}</td>
                                            <td>{client.telefone}</td>
                                            <td>{client.status}</td>
                                            <td className="botaoCobranca" onClick={() => {
                                                handleClientId(client.id)
                                                handleChargeModal()

                                            }
                                            }><img src="./CobrancaIcon.svg" alt="" />
                                                <span>cobrança</span>
                                            </td>



                                        </tr>
                                    ))

                                }

                            </tbody>

                        </table>

                    </div>
                </main >
            </div>
        </article >

    )
}
