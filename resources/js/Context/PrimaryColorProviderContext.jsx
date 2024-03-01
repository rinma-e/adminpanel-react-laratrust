import { createContext, useContext } from "react";

const PrimaryColorProviderContext = createContext(null);

// Custom hook to access the color
export const useColor = () => {
    return useContext(PrimaryColorProviderContext);
};

export const PrimaryColorProvider = ({
    children,
    primaryColor,
    setPrimaryColor,
    primaryColorShade,
    setPrimaryColorShade,
}) => {
    const value = {
        primaryColor: primaryColor,
        setPrimaryColor: setPrimaryColor,
        primaryColorShade: primaryColorShade,
        setPrimaryColorShade: setPrimaryColorShade,
    };

    return (
        <PrimaryColorProviderContext.Provider value={value}>
            {children}
        </PrimaryColorProviderContext.Provider>
    );
};
