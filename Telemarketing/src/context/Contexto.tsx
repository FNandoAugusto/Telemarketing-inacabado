import { createContext, ReactNode, useState } from "react";

interface IUserRegisterData {
  nome?: string;
  email?: string;
  senha?: string;
  confirmacaoSenha?: string;
}
interface IProps {
  children: ReactNode;
}
export const MainContext = createContext<{
  setUser: (userData: IUserRegisterData) => void;
  userRegisterData: IUserRegisterData | null;
  handleClientModal: () => void;
  isModalClientOpen: boolean | null;
  handleChargeModal: () => void;
  isModalChargeOpen: boolean | null;
  currentClientId: string | null;
  handleEditModal: () => void;
  isEditModalClientOpen: boolean | null;

  handleClientId: (id: string) => void;
  handleCobrancaId: (id: string) => void;
  currentCobrancaId: string | null;
} | null>(null);

export const MainProvider = ({ children }: IProps) => {
  const [userRegisterData, setUserRegisterData] =
    useState<IUserRegisterData | null>(null);

  const [isModalChargeOpen, setModalChargeOpen] = useState<boolean>(false);
  const [isModalClientOpen, setModalClientOpen] = useState<boolean>(false);
  const [isEditModalClientOpen, seteditModalClientOpen] =
    useState<boolean>(false);
  const [currentClientId, setCurrentClientId] = useState<string | null>(null);
  const [currentCobrancaId, setCurrentCobrancaId] = useState<string | null>(
    null
  );

  const setUser = (userData: IUserRegisterData) => {
    setUserRegisterData((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  };
  const handleChargeModal = () => {
    setModalChargeOpen(!isModalChargeOpen);
  };
  const handleClientModal = () => {
    setModalClientOpen(!isModalClientOpen);
  };
  const handleEditModal = () => {
    console.log(
      "Antes de abrir o modal, o token é:",
      localStorage.getItem("token")
    );
    seteditModalClientOpen(!isEditModalClientOpen);
    console.log(
      "Depois de abrir o modal, o token ainda é:",
      localStorage.getItem("token")
    );
    //não consegui resolver este erro
  };
  const handleClientId = (id: string) => {
    console.log(currentClientId);
    setCurrentClientId(id);
  };
  const handleCobrancaId = (id: string) => {
    setCurrentCobrancaId(id);
  };
  return (
    <MainContext.Provider
      value={{
        setUser,
        userRegisterData,
        isModalClientOpen,
        handleClientModal,
        isModalChargeOpen,
        handleChargeModal,
        handleClientId,
        currentClientId,
        handleCobrancaId,
        currentCobrancaId,
        handleEditModal,
        isEditModalClientOpen,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
