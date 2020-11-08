import { useContext, createContext } from "react";
import { UseCaseContainer } from "./UseCaseContainer";

export const UseCasesContext = createContext<UseCaseContainer>({} as UseCaseContainer);
export const useUseCases = () => useContext(UseCasesContext);
