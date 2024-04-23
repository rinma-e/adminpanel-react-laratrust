import { createContext, useContext } from "react";
import { useLocalStorage } from "@mantine/hooks";

const PrimaryColorProviderContext = createContext(null);

// Custom hook to access the color
export const useColor = () => {
    return useContext(PrimaryColorProviderContext);
};

export const PrimaryColorProvider = ({ children }) => {
    const [primaryColor, setPrimaryColor, removePrimaryColor] = useLocalStorage(
        {
            key: "primary-color",
            defaultValue: "blue",
            getInitialValueInEffect: false,
        }
    );
    const [primaryColorShade, setPrimaryColorShade, removePrimaryColorShade] =
        useLocalStorage({
            key: "primary-color-shade",
            defaultValue: { light: 6, dark: 7 },
            getInitialValueInEffect: false,
        });

    const value = {
        primaryColor,
        setPrimaryColor,
        removePrimaryColor,
        primaryColorShade,
        setPrimaryColorShade,
        removePrimaryColorShade,
    };

    return (
        <PrimaryColorProviderContext.Provider value={value}>
            {children}
        </PrimaryColorProviderContext.Provider>
    );
};
