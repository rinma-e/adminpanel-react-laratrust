import { AppShell, Box, Group, Paper } from "@mantine/core";

import Header from "@/Pages/Partials/Header/Header";
import { headerLinkList as links } from "@/Layouts/linkLists";
import customStyles from "./layout.module.css";

export default function AuthenticatedLayout({ user, header, children }) {
    const headerHeight = 60;

    const canAccessLink = (link) => {
        if (!link.role || link.role === "all") return true; // Link is accessible to all roles
        const linkRoles = link.role.split("|");
        return linkRoles.some((role) => user?.roles?.includes(role)) || false;
    };

    const userAccessableLinks = links.filter(canAccessLink);

    return (
        <AppShell
            header={{ height: headerHeight }}
            classNames={{
                root: customStyles.root,
                header: customStyles.header,
            }}
        >
            <AppShell.Header>
                <Header user={user} links={userAccessableLinks} />
            </AppShell.Header>

            <AppShell.Main>
                {header && (
                    <Paper
                        w="100%"
                        h={80}
                        pos="sticky"
                        top={headerHeight}
                        withBorder
                        classNames={{
                            root: customStyles.bottomBorder + " z-10",
                        }}
                    >
                        <Group
                            maw="80em"
                            h="100%"
                            mx="auto"
                            px={{ base: "xs", xs: "md", sm: "xl" }}
                            align="center"
                        >
                            {header}
                        </Group>
                    </Paper>
                )}
                <Box
                    maw="80em"
                    mt="xs"
                    mx="auto"
                    px={{ base: 0, xs: "md", sm: "xl" }}
                    justify="center"
                    align="center"
                >
                    {children}
                </Box>
            </AppShell.Main>
        </AppShell>
    );
}
