import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/Contexto";
import { IClient } from "./ModalCadastro";
import { api } from "../../api";
import useAuth from "../../Hooks/useAuth";
import { ICobranca } from "./ChargeModal";
import "./ClientCobrancaPage.module.css";
import { useNavigate } from "react-router-dom";

interface ICurrentUser {
  email: string;
  nome: string;
  id: string;
}

export const ClientPageDetails = () => {
  const [clientData, setClientData] = useState<IClient>({
    id: "",
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    endereco: "",
    complemento: "",
    cep: "",
    bairro: "",
    cidade: "",
    usuario_id: 0,
    status: "",
    uf: "",
  });

  const [cobrancaList, setCobrancaData] = useState<ICobranca[]>([]);

  const getNome: ICurrentUser = JSON.parse(
    localStorage.getItem("current-user")!
  );

  const navigate = useNavigate();
  const mainContext = useContext(MainContext);

  if (!mainContext) {
    return null;
  }

  const {
    currentClientId,
    currentCobrancaId,
    handleCobrancaId,
    handleChargeModal,
    handleEditModal,
  } = mainContext;
  const { handleGetToken } = useAuth();
  useEffect(() => {
    (async () => {
      try {
        const response: any = await api.get(
          `/clientDetails/${currentClientId}`,
          { headers: { Authorization: `Bearer ${handleGetToken()}` } }
        );
        setClientData(response.data.client);
        setCobrancaData(response.data.charges);
        return response;
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };
  return (
    <div className="ContainerGeral">
      <article className="ContainerClients">
        <aside className="Menu">
          <button onClick={() => navigate("/Home")} className="HomeButton">
            <img src="./HomeIcon.svg" alt="" />
            <span>Home</span>
          </button>
          <button
            onClick={() => navigate("/clients")}
            className="ClienteButton"
          >
            <img src="/ClientsMenu.svg" alt="" />
            <span className="ColorFont">Clientes</span>
          </button>
          <button
            onClick={() => {
              navigate("/cobrancas");
            }}
            className="CobrançasButton"
          >
            <img src="./CobrancasIcon.svg" alt="" />
            <span>Cobranças</span>
          </button>
        </aside>
        <div className="ContainerConteudo">
          <header>
            <div className="fluxo">
              <p className="FC">Clientes </p>
              <p className="FN">{">"}</p>
              <p className="FD">Detalhe do cliente</p>
            </div>
            <div className="userMenu">
              <div className="modalUserMenu">
                <img
                  onClick={() => {}}
                  className="imageSeta"
                  src="./modalseta.svg"
                  alt=""
                />
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
              <div>
                <p>{getNome.nome}</p>
                <img src="./seta.svg" alt="" />
              </div>
            </div>
          </header>
          <div className="containerClientData">
            <div className="nomeCliente">
              <img src="ClientsIcon.svg" alt="" /> <h1>{clientData.nome}</h1>
            </div>
            <div className="tituloBotao">
              <h2>dados do cliente</h2>
              <button className="botaoeditar" onClick={() => handleEditModal()}>
                <img src="./greenEdit.svg" alt="" />
                editar cliente
              </button>
            </div>
            <div>
              <div className="clientData1">
                <div>
                  <h3>E-mail</h3>
                  {clientData.email}
                </div>
                <div>
                  <h3>Telefone</h3>
                  {clientData.telefone}
                </div>
                <div>
                  <h3>CPF</h3>
                  {clientData.cpf}
                </div>
              </div>
              <div className="clientData2">
                <div>
                  <h3>Endereço</h3>
                  {clientData.endereco}
                </div>
                <div>
                  <h3>Bairro</h3>
                  {clientData.bairro}
                </div>
                <div>
                  <h3>Complemento</h3>
                  {clientData.complemento}
                </div>
                <div>
                  <h3>CEP</h3>
                  {clientData.cep}
                </div>
                <div>
                  <h3>Cidade</h3>
                  {clientData.cidade}
                </div>
                <div>
                  <h3>UF</h3>
                  {clientData.uf}
                </div>
              </div>
            </div>
          </div>
          <main className="main">
            <div className="PageSettings">
              <div>
                <h2>cobranças do cliente</h2>
              </div>
              <div>
                <button
                  className="NCobranca"
                  onClick={() => handleChargeModal()}
                >
                  + Nova Cobrança
                </button>
              </div>
            </div>
            <div className="chargeTable">
              <table>
                <thead>
                  <tr>
                    <th>id Cob</th>
                    <th>Data de Venc.</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Descrição</th>
                    <th>Tools</th>
                  </tr>
                </thead>
                <tbody>
                  {cobrancaList.map((cobranca) => (
                    <tr key={cobranca.id_cob}>
                      <td>{cobranca.id_cob}</td>
                      <td>{cobranca.data_venc}</td>
                      <td>{cobranca.valor}</td>
                      <td>{cobranca.descricao}</td>
                      <td>{cobranca.status}</td>
                      <td>
                        <div className="tools">
                          <div className="tool">
                            <img src="./edit.svg" alt="" />
                            <span>editar</span>
                          </div>
                          <div className="tool">
                            <img src="bin.svg" alt="" />
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
    </div>
  );
};
