import { useEffect } from "react";
import { Link } from "@inertiajs/react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
    useMantineTheme,
    Burger,
    Group,
    Anchor,
    Stack,
    Drawer,
    Button,
} from "@mantine/core";
import { IconUserPlus, IconLogin2 } from "@tabler/icons-react";

import {
    ApplicationLogo,
    ThemeSwitcherButton,
    NavigationLinks,
    UserMenu,
} from "@/Components";
import customStyles from "./header.module.css";

export default function Header({ user, links }) {
    const [opened, { close, toggle: toggleDrawer }] = useDisclosure();

    // read xs value from mantine theme
    const theme = useMantineTheme();
    const xsBreakpoint = theme.breakpoints.xs;

    // check if screen is xs
    const isXs = useMediaQuery(`(min-width: ${xsBreakpoint})`);

    // if screen is xs close the drawer
    useEffect(() => {
        if (isXs) {
            close();
        }
    }, [isXs]);

    const authButtons = (
        <>
            <Button
                variant="default"
                component={Link}
                href={route("login")}
                leftSection={<IconLogin2 size={16} stroke={2} />}
            >
                Log in
            </Button>

            <Button
                component={Link}
                href={route("register")}
                leftSection={<IconUserPlus size={16} stroke={2.5} />}
            >
                Sign up
            </Button>
        </>
    );

    return (
        <Group
            maw="80em"
            h="100%"
            mx="auto"
            px={{ base: "xs", xs: "md", sm: "xl" }}
            align="center"
            wrap="nowrap"
        >
            <Anchor component={Link} href={route("home")} mr={15} h="100%">
                <ApplicationLogo
                    w={35}
                    h={"100%"}
                    c={theme.primaryColor}
                    className="fill-current"
                />
            </Anchor>

            {user && isXs && (
                <Group gap={0} h="100%" wrap="nowrap">
                    <NavigationLinks
                        links={links}
                        linkClass={customStyles.mainLink}
                    />
                </Group>
            )}

            <ThemeSwitcherButton ml="auto" />

            {user && (
                <UserMenu
                    user={user}
                    width={200}
                    withArrow
                    arrowSize={10}
                    offset={0}
                />
            )}

            {!user && isXs && authButtons}

            {!isXs && (
                <>
                    <Burger opened={opened} onClick={toggleDrawer} size="sm" />
                    <Drawer
                        opened={opened}
                        onClose={close}
                        position="right"
                        size={user ? "fit-content" : 200}
                        styles={{
                            inner: {
                                marginTop: "var(--app-shell-header-height)",
                            },
                            overlay: {
                                marginTop: "var(--app-shell-header-height)",
                            },
                        }}
                        withCloseButton={false}
                        overlayProps={{ opacity: 0.5 }}
                    >
                        {user ? (
                            <Stack gap={0}>
                                <NavigationLinks
                                    links={links}
                                    linkClass={customStyles.mainLinkDrawer}
                                />
                            </Stack>
                        ) : (
                            <Stack>{authButtons}</Stack>
                        )}
                    </Drawer>
                </>
            )}
        </Group>
    );
}
