import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import ThemeSwitcherButton from "@/Components/ThemeSwitcherButton";
import { Center, Box, Affix } from "@mantine/core";

export default function Guest({ children }) {
    return (
        <Center mih={"100vh"} bg="var(--mantine-color-gray-light)">
            <Affix
                position={{ top: 20, right: 20 }}
                className="keep-transition"
            >
                <ThemeSwitcherButton />
            </Affix>
            {children}
        </Center>
    );
}
