import { SubmitHandler, useForm } from "react-hook-form";
import { MainContext } from "../../context/Contexto";
import { useContext, useEffect, useState } from "react";
import { api } from "../../api";
import useAuth from "../../Hooks/useAuth";

export interface ICobranca {
    nome: string,
    descricao: string,
    data_venc: string,
    valor: string,
    status: string,
    cliente_id: string,
    id_cob: string
}

export const ModalChargeCadastro = () => {
    const { handleGetToken } = useAuth()

    const mainContext = useContext(MainContext)

    if (!mainContext) {
        return null
    }

    const { handleChargeModal, currentClientId } = mainContext

    const fatchCobranca = async () => {
        try {
            const { data } = await api.get(`/clientDetails/${currentClientId}`, { headers: { "Authorization": "Bearer " + handleGetToken() } })

            setValue("nome", data.client.nome)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fatchCobranca()
    }, [])

    const onSubmit: SubmitHandler<ICobranca> = async (cobrancaData: ICobranca) => {
        const reqData = {
            cliente_id: currentClientId,
            status: cobrancaData.status,
            data_venc: cobrancaData.data_venc,
            descricao: cobrancaData.descricao,
            valor: cobrancaData.valor
        }
        try {

            const response = await api.post("/addCharge", { ...reqData }, { headers: { "Authorization": "Bearer " + handleGetToken() } })
            if (response.status === 201) {
                handleChargeModal()
            }
            console.log(response)


        } catch (error) {
            console.log(error)
        }
    }

    const { register, handleSubmit, setValue } = useForm<ICobranca>()

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={() => handleChargeModal()}>
                    &times;
                </button>
                <h2>Cadastro de Cliente</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome*</label>
                        <input type="text" id="nome" {...register("nome")} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descricao">Descrição*</label>
                        <input type="text" id="descricao" {...register("descricao", { required: true })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="vencimento">Vencimento*</label>
                        <input type="date" id="vencimento" {...register("data_venc", { required: true })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="valor">Valor*</label>
                        <input type="tel" id="valor"  {...register("valor", { required: true })} />
                    </div>
                    <div>
                        <label>Status*</label>
                        <div>
                            <input type="radio" id="paga" value="Paga" name="status" onClick={() => setValue("status", "Paga")} />


                            <label htmlFor="paga">Cobrança Paga</label>
                        </div>
                        <div>
                            <input type="radio" id="pendente" value="Pendente" name="status" onClick={() => setValue("status", "Pendente")} />
                            <label htmlFor="pendente">Cobrança Pendente</label>
                        </div>
                    </div>
                    <button className="cancelarBotao" onClick={() => handleChargeModal()}>
                        Cancelar
                    </button>
                    <button type="submit" >Cadastrar</button>
                </form>
            </div>
        </div>
    );
};
