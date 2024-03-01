import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { MantineProvider, createTheme } from "@mantine/core";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

const theme = createTheme({
    fontFamily: "Poppins, sans-serif",
});

function MyApp({ el, App, props }) {
    return (
        <StrictMode>
            <MantineProvider theme={theme}>
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

        root.render(<MyApp el={el} App={App} props={props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
