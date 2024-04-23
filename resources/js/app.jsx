import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { MantineProvider, createTheme } from "@mantine/core";
import {
    PrimaryColorProvider,
    useColor,
} from "./Context/PrimaryColorProviderContext";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

const theme = createTheme({
    fontFamily: "Poppins, sans-serif",
    breakpoints: {
        xxl: "102em",
    },
});

function MyApp({ App, props }) {
    const { primaryColor, primaryColorShade } = useColor();

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
                <App {...props} />
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

        root.render(
            <PrimaryColorProvider>
                <MyApp App={App} props={props} />
            </PrimaryColorProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
