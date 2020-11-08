import { useUseCases } from "../UseCasesContext";

export const useListProducts = () => useUseCases().listProducts;
