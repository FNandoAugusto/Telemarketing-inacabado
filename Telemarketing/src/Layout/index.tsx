import { Outlet, useLocation } from "react-router-dom"
import "./index.module.css"
import { useEffect, useState } from "react"

export default function Layout() {

    const [descricao, setDescricao] = useState("")
    const location = useLocation()
    const currentPath = location.pathname
    const descricaoHeader = () => {
        if (currentPath === "/ClientForm") {
            setDescricao("Estou na pagin a ClientForm")
        }
    }
    useEffect(() => {
        descricaoHeader()
    }, [])
    return (
        <div className="layout">

            <Outlet />
        </div>
    )


}