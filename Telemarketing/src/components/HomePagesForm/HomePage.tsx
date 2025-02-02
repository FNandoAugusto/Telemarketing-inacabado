import { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../../context/Contexto";
import { IClient } from "./ModalCadastro";
import { api } from "../../api";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ICobranca } from "./ChargeModal";

export interface ICurrentUser {
  email: string;
  nome: string;
  id: string;
}
interface ICobrancaStatus {
  charges: ICobranca[];
  quantidade: number;
  total: number;
}
interface Itypes {
  data: {
    Paga: ICobrancaStatus;
    Pendente: ICobrancaStatus;
    Vencida: ICobrancaStatus;
  };
}
interface IClientStatus {
  clientes: IClient[];
  quantidade: string;
}
interface IClientType {
  data: {
    clientesEmdia: IClientStatus;
    clientesInadimplentes: IClientStatus;
  };
}

export const HomePage = () => {
  const navigate = useNavigate();
  const mainContext = useContext(MainContext);

  const menuRef = useRef(null);

  const [cobrancaList, setCobrancaList] = useState<ICobranca[]>([]);

  const [cobrancasPagasList, setCobrancasPagasList] = useState<ICobrancaStatus>(
    {
      charges: [],
      quantidade: 0,
      total: 0,
    }
  );

  const [cobrancasVencidasList, setCobrancasVencidasList] =
    useState<ICobrancaStatus>({
      charges: [],
      quantidade: 0,
      total: 0,
    });

  const [cobrancasPrevistasList, setCobrancasPrevistasList] =
    useState<ICobrancaStatus>({
      charges: [],
      quantidade: 0,
      total: 0,
    });

  const [clientList, setClientList] = useState<IClient[]>([]);

  const [clientesEmdiaList, setClientesEmdiaList] = useState<IClientStatus>({
    clientes: [],
    quantidade: "",
  });

  const [clientesInadimplentesList, setClientesInadimplentesList] =
    useState<IClientStatus>({
      clientes: [],
      quantidade: "",
    });

  if (!mainContext) {
    return null;
  }
  const { handleClientModal, handleChargeModal, handleClientId } = mainContext;

  const { handleGetToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const { data }: Itypes = await api.get(`/dashboardCharges`, {
          headers: { Authorization: `Bearer ${handleGetToken()}` },
        });
        const response: IClientType = await api.get(`/dashboardClients`, {
          headers: { Authorization: `Bearer ${handleGetToken()}` },
        });
        setCobrancasPagasList(data.Paga);
        setCobrancasVencidasList(data.Vencida);
        setCobrancasPrevistasList(data.Pendente);
        setClientesEmdiaList(response.data.clientesEmdia);
        setClientesInadimplentesList(response.data.clientesInadimplentes);
        console.log(response);
        console.log(
          response.data.clientesEmdia,
          response.data.clientesInadimplentes
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const getNome: ICurrentUser = JSON.parse(
    localStorage.getItem("current-user")!
  );

  // const handleCloseMenu = () => {
  //     if (menuRef.current) {
  //         menuRef.current.className = menuRef.current.className = "modalUserMenu" ? "" : "modalUserMenu"
  //     }
  // }

  return (
    <article className="ContainerClients">
      <aside className="Menu">
        <button onClick={() => navigate("/Home")} className="HomeButton">
          <img src="./HomeLightIcon.svg" alt="" />
          <span className="ColorFont">Home</span>
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
          <img src="./CobrancasIcon.svg" alt="" />
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
              {/* ref={menuRef} onClick={() => handleCloseMenu()} */}
              <img className="imageSeta" src="./modalseta.svg" alt="" />
              <div className="menuModal">
                <img src="./edit.svg" alt="" />
                <p>editar</p>
              </div>
              <div className="menuModal">
                <img src="./logout.svg" alt="" />
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
          <section className="resumos">
            <div className="CobrancasPagas">
              <h3>CobrancasPagas</h3>
              <h1>{cobrancasPagasList.total.toLocaleString("pt-BR")}</h1>
            </div>
            <div className="CobrancasVencidas">
              <h3>CobrancasVencidas</h3>
              <h1>{cobrancasVencidasList.total.toLocaleString("pt-BR")}</h1>
            </div>
            <div className="CobrancasPrevistas">
              <h3>CobrancasPrevistas</h3>
              <h1>{cobrancasPrevistasList.total.toLocaleString("pt-BR")}</h1>
            </div>
          </section>

          <section className="tablesC">
            <div className="TCobrancasPagas">
              <div className="tituloTotal">
                <h4>Cobranças Pagas</h4>{" "}
                <h4 className="QPA">{cobrancasPagasList.quantidade}</h4>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>ID da Cob.</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cobrancasPagasList.charges.slice(0, 4).map((cobranca) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="TCobrancasVencidas">
              <div className="tituloTotal">
                <h4>Cobranças Pagas</h4>
                <h4 className="QVE">{cobrancasVencidasList.quantidade}</h4>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>ID da Cob.</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cobrancasVencidasList.charges
                      .slice(0, 4)
                      .map((cobranca) => (
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
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="TCobrancasPrevistas">
              <div className="tituloTotal">
                <h4>Cobranças Pagas</h4>
                <h4 className="QPR">{cobrancasPrevistasList.quantidade}</h4>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>ID da Cob.</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cobrancasPrevistasList.charges
                      .slice(0, 4)
                      .map((cobranca) => (
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
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <section className="clientsTables">
            <div className="clientesInadimplentes">
              <div className="tituloTotal">
                <h4>Clientes Inadimplentes</h4>
                <h4 className="CIN">{clientesInadimplentesList.quantidade}</h4>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>ID do Clie.</th>
                      <th>CPF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientesInadimplentesList.clientes
                      .slice(0, 4)
                      .map((client) => (
                        <tr className="listC" key={client.id}>
                          <td
                            onClick={() => {
                              handleClientId(client.id);
                              navigate("/cobrancaDetails");
                            }}
                          >
                            {client.nome}
                          </td>
                          <td>{client.id}</td>
                          <td>{client.cpf}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="clientesEmDia">
              <div className="tituloTotal">
                <h4>Clientes em Dia</h4>
                <h4 className="CEM">{clientesEmdiaList.quantidade}</h4>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>ID do Clie.</th>
                      <th>CPF</th>
                    </tr>
                  </thead>

                  <tbody>
                    {clientesEmdiaList.clientes.slice(0, 4).map((client) => (
                      <tr className="listC" key={client.id}>
                        <td
                          onClick={() => {
                            handleClientId(client.id);
                            navigate("/cobrancaDetails");
                          }}
                        >
                          {client.nome}
                        </td>
                        <td>{client.id}</td>
                        <td>{client.cpf}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </article>
  );
};
