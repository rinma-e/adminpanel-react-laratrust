import { Affix, Flex } from "@mantine/core";

import { ThemeSwitcherButton } from "@/Components";

export default function Guest({ children }) {
    return (
        <Flex
            miw={300}
            mih="100vh"
            justify="center"
            align={{ base: "flex-start", xs: "center" }}
            bg="var(--mantine-color-gray-light)"
        >
            <Affix
                position={{ top: 20, right: 20 }}
                className="keep-transition"
            >
                <ThemeSwitcherButton />
            </Affix>
            {children}
        </Flex>
    );
}
