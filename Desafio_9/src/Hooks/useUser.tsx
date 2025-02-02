import { useState } from "react";

type TUser = {
    id: number
    email: string
    nome: string
}

export default function useUser() {

    const [currenteUser, setCurrentUser] = useState<TUser>(localStorage.getItem("current-user") ? JSON.parse(localStorage.getItem("current-user")!) : null)

    function handleInsertUser(user: TUser) {
        localStorage.setItem("current-user", JSON.stringify(user))
        setCurrentUser(user)
    }
    return {
        handleInsertUser, currenteUser
    }
} 