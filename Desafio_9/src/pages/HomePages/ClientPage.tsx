import { useContext } from "react";
import { ModalClientCadastro } from "../../components/HomePagesForm/ModalCadastro";
import { ModalChargeCadastro } from "../../components/HomePagesForm/ChargeModal";
import { MainContext } from "../../context/Contexto";
import { ClientPage } from "../../components/HomePagesForm/ClientPage";
import "./ClientPage.module.css"
export default function Client() {

    const mainContext = useContext(MainContext)

    if (!mainContext) {
        return null
    }

    const { isModalClientOpen, isModalChargeOpen } = mainContext

    return (
        <div className="background">

            <ClientPage />
            {isModalClientOpen && <ModalClientCadastro />}
            {isModalChargeOpen && <ModalChargeCadastro />}

        </div>

    )

}