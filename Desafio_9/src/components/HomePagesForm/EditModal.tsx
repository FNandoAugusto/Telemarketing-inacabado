import { SubmitHandler, useForm } from "react-hook-form";
import { MainContext } from "../../context/Contexto";
import { useContext, useEffect, useState } from "react";
import { api } from "../../api";
import useAuth from "../../Hooks/useAuth";

export interface ICobranca {
  nome: string;
  descricao: string;
  data_venc: string;
  valor: string;
  status: string;
  cliente_id: string;
  id_cob: string;
}
export interface IClient {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: string;
  complemento: string;
  cep: string;
  bairro: string;
  cidade: string;
  usuario_id: number;
  status: string;
  uf: string;
}

export const ModalEditClient = () => {
  const { handleGetToken } = useAuth();

  const { register, handleSubmit, setValue, reset } = useForm<IClient>();

  const mainContext = useContext(MainContext);

  if (!mainContext) {
    return null;
  }

  const { handleChargeModal, currentClientId, handleEditModal } = mainContext;

  const fatchCobranca = async () => {
    try {
      const { data } = await api.get(
        `/clientDetails/${currentClientId}`,

        {
          headers: { Authorization: "Bearer " + handleGetToken() },
        }
      );
      console.log(data);
      reset(data.client);
      setValue("nome", data.client.nome);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fatchCobranca();
  }, []);

  const onSubmit: SubmitHandler<IClient> = async (clientData: IClient) => {
    const reqData = {
      id: clientData.id,
      nome: clientData.nome,
      email: clientData.email,
      cpf: clientData.cpf,
      telefone: clientData.telefone,
      endereco: clientData.endereco,
      complemento: clientData.complemento,
      cep: clientData.cep,
      bairro: clientData.bairro,
      cidade: clientData.cidade,
      // usuario_id: clientData.usuario_id,
      // status: clientData.status,
      uf: clientData.uf,
    };
    try {
      const response = await api.put(
        `/updateClient/${currentClientId}`,
        { ...reqData },
        { headers: { Authorization: "Bearer " + handleGetToken() } }
      );
      if (response.status === 200) {
        handleEditModal();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={() => handleEditModal()}>
          &times;
        </button>
        <h2>Editar Cliente</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              {...register("nome", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="CPF">CPF</label>
            <input
              type="text"
              id="cpf"
              {...register("cpf", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              {...register("telefone", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endereço">Endereço</label>
            <input
              type="text"
              id="endereco"
              {...register("endereco", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Complemento">Complemento</label>
            <input
              type="text"
              id="complemento"
              {...register("complemento", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="CEP">CEP</label>
            <input
              type="text"
              id="cep"
              {...register("cep", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Bairro">Bairro</label>
            <input
              type="text"
              id="bairro"
              {...register("bairro", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Cidade">Cidade</label>
            <input
              type="text"
              id="cidade"
              {...register("cidade", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="UF">UF</label>
            <input
              type="text"
              id="uf"
              {...register("uf", { required: true })}
            />
          </div>
          <button className="cancelarBotao" onClick={() => handleEditModal()}>
            Cancelar
          </button>
          <button type="submit">Aplicar</button>
        </form>
      </div>
    </div>
  );
};
