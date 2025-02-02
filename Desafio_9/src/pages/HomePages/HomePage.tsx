import { useContext } from "react";
import { ModalClientCadastro } from "../../components/HomePagesForm/ModalCadastro";
import { ModalChargeCadastro } from "../../components/HomePagesForm/ChargeModal";
import { MainContext } from "../../context/Contexto";
import { HomePage } from "../../components/HomePagesForm/HomePage";

export default function Home() {

    const mainContext = useContext(MainContext)

    if (!mainContext) {
        return null
    }

    const { isModalClientOpen, isModalChargeOpen } = mainContext

    return (
        <div className="background">

            <HomePage />
            {isModalClientOpen && <ModalClientCadastro />}
            {isModalChargeOpen && <ModalChargeCadastro />}

        </div>

    )

}