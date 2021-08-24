import { createContext } from 'react';

type MainPageContent = {
    isPostFieldActive: boolean;
    setIsPostFieldActive: (value: boolean) => void;
    isPostFieldRepDropdown: boolean;
    setIsPostFieldRepDropdown: (value: boolean) => void;
    isPostFieldEpkDropdown: boolean;
    setIsPostFieldEpkDropdown: (value: boolean) => void;
}

export const MainPageContext = createContext<MainPageContent>({
    isPostFieldActive: false,
    setIsPostFieldActive: () => {},
    isPostFieldRepDropdown: false,
    setIsPostFieldRepDropdown: () => {},
    isPostFieldEpkDropdown: false,
    setIsPostFieldEpkDropdown: () => {},
});