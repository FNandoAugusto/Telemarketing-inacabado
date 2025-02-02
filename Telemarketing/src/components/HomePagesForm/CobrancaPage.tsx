import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/Contexto";
import { IClient } from "./ModalCadastro";
import { api } from "../../api";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./CobrancaPage.Module.css";

interface ICurrentUser {
  email: string;
  nome: string;
  id: string;
}
interface ICobranca {
  id_cob: string;
  valor: string;
  status: string;
  nome: string;
  id: string;
  descricao: string;
  data_venc: string;
  usuario_id: string;
}

export const CobrancaList = () => {
  const navigate = useNavigate();
  const mainContext = useContext(MainContext);

  const [cobrancaList, setCobrancaList] = useState<ICobranca[]>([]);

  if (!mainContext) {
    return null;
  }

  const { handleClientModal, handleChargeModal, handleClientId } = mainContext;
  const { handleGetToken } = useAuth();

  useEffect(() => {
    const loadCharges = async () => {
      try {
        const response = await api.get(`/allCharges`, {
          headers: { Authorization: `Bearer ${handleGetToken()}` },
        });

        console.log(response.data);
        setCobrancaList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadCharges();
  }, []);
  const getNome: ICurrentUser = JSON.parse(
    localStorage.getItem("current-user")!
  );

  const logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };
  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/deleteCharge/${id}`, {
        headers: { Authorization: `Bearer ${handleGetToken()}` },
      });

      console.log(response.data);
      window.location.replace("/cobrancas");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <article className="ContainerClients">
      <aside className="Menu">
        <button onClick={() => navigate("/Home")} className="HomeButton">
          <img src="./HomeIcon.svg" alt="" />
          <span>Home</span>
        </button>
        <button onClick={() => navigate("/clients")} className="ClienteButton">
          <img src="/ClientsIcon.svg" alt="" />
          <span>Clientes</span>
        </button>
        <button
          onClick={() => {
            navigate("/cobrancas");
          }}
          className="CobrançasButton"
        >
          <img src="./cobIcon.svg" alt="" />
          <span className="ColorFont">Cobranças</span>
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
                <img onClick={() => logout} src="./logout.svg" alt="" />
                <p>sair</p>
              </div>
            </div>
            <p className="CircleName">{getNome.nome.slice(0, 1)}</p>
            <div>
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
                <button
                  className="NCliente"
                  onClick={() => handleClientModal()}
                >
                  Adicionar Cliente
                </button>
                <button className="FilterButton">
                  <img src="./Filter.svg" alt="" />
                </button>
                <div className="ContainerSearch">
                  <input name="search" className="search"></input>
                  <img src="./Search.svg" alt="" />
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cobrancaList.map((cobranca) => (
                  <tr className="listC" key={cobranca.id_cob}>
                    <td
                      onClick={() => {
                        handleClientId(cobranca.id_cob);
                        navigate("/cobrancaDetails");
                      }}
                    >
                      {cobranca.nome}
                    </td>
                    <td>{cobranca.id_cob}</td>
                    <td>{cobranca.valor}</td>
                    <td>{cobranca.data_venc}</td>
                    <td>{cobranca.status}</td>
                    <td>{cobranca.descricao}</td>
                    <td>
                      <div className="tools">
                        <div className="tool">
                          <img src="./edit.svg" alt="" />
                          <span>editar</span>
                        </div>
                        <div className="tool">
                          <img
                            onClick={() => handleDelete(cobranca.id_cob)}
                            src="bin.svg"
                            alt=""
                          />
                          <span>excluir</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </article>
  );
};
