import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { MantineProvider, createTheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { PrimaryColorProvider } from "./Context/PrimaryColorProviderContext";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

const theme = createTheme({
    fontFamily: "Poppins, sans-serif",
});

function MyApp({ el, App, props }) {
    const [primaryColor, setPrimaryColor] = useLocalStorage({
        key: "primary-color",
        defaultValue: "blue",
        getInitialValueInEffect: false,
    });
    const [primaryColorShade, setPrimaryColorShade] = useLocalStorage({
        key: "primary-color-shade",
        defaultValue: { light: 6, dark: 7 },
        getInitialValueInEffect: false,
    });
    return (
        <StrictMode>
            <MantineProvider
                theme={{
                    ...theme,
                    primaryColor: primaryColor,
                    primaryShade: primaryColorShade,
                }}
                withNormalizeCSS
                withGlobalStyles
            >
                <PrimaryColorProvider
                    primaryColor={primaryColor}
                    setPrimaryColor={setPrimaryColor}
                    primaryColorShade={primaryColorShade}
                    setPrimaryColorShade={setPrimaryColorShade}
                >
                    <App {...props} />
                </PrimaryColorProvider>
            </MantineProvider>
        </StrictMode>
    );
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<MyApp el={el} App={App} props={props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
