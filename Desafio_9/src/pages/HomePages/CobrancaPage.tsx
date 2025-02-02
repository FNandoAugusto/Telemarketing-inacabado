import { useContext } from "react";
import { ModalClientCadastro } from "../../components/HomePagesForm/ModalCadastro";
import { ModalChargeCadastro } from "../../components/HomePagesForm/ChargeModal";
import { MainContext } from "../../context/Contexto";
import { CobrancaList } from "../../components/HomePagesForm/CobrancaPage";

export default function CobrancaPage() {

    const mainContext = useContext(MainContext)

    if (!mainContext) {
        return null
    }

    const { isModalClientOpen, isModalChargeOpen } = mainContext

    return (
        <div className="background">

            <CobrancaList />
            {isModalClientOpen && <ModalClientCadastro />}
            {isModalChargeOpen && <ModalChargeCadastro />}

        </div>

    )

}