import React, { useContext } from "react";
import "./ModalCadastro.module.css";
import { MainContext } from "../../context/Contexto";
import { api } from "../../api";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";

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

export const ModalClientCadastro: React.FC = () => {
  const mainContext = useContext(MainContext);

  if (!mainContext) {
    return null;
  }

  const { handleClientModal } = mainContext;

  const { register, handleSubmit } = useForm<IClient>();

  const { handleGetToken } = useAuth();

  const onSubmit: SubmitHandler<IClient> = async (clienteData: IClient) => {
    try {
      const { data } = await api.post(
        "/registerClient",
        { ...clienteData },
        { headers: { Authorization: "Bearer " + handleGetToken() } }
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={() => handleClientModal()}>
          &times;
        </button>
        <h2>Cadastro de Cliente</h2>
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
          <button className="cancelarBotao" onClick={() => handleClientModal()}>
            Cancelar
          </button>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};
