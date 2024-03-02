import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import ThemeSwitcherButton from "@/Components/ThemeSwitcherButton";
import PrimaryColorChangerButton from "@/Components/PrimaryColorChangerButton";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
    useMantineTheme,
    AppShell,
    Burger,
    Group,
    Button,
    Anchor,
    Stack,
    rem,
    Drawer,
} from "@mantine/core";
import customStyles from "../../css/moduls/appShell.module.css";

export default function Welcome({ auth }) {
    const [opened, { open, close, toggle: toggleDrawer }] = useDisclosure();

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
    }, [isXs, close]);

    return (
        <>
            <Head title="Welcome" />

            <AppShell
                header={{ height: 60 }}
                padding="md"
                classNames={{
                    root: customStyles.root,
                    header: customStyles.header,
                }}
            >
                <AppShell.Header>
                    <Group
                        w="100%"
                        h="100%"
                        px={{
                            base: "xs",
                            sm: "xl",
                            md: rem(50),
                            lg: rem(100),
                            xl: rem(200),
                        }}
                    >
                        <>
                            <Anchor href={route("home")}>
                                <ApplicationLogo className="w-8 h-8 text-gray-500 fill-current" />
                            </Anchor>
                            {auth.user ? (
                                <>
                                    <Anchor href={route("dashboard")}>
                                        Dashboard
                                    </Anchor>

                                    <PrimaryColorChangerButton ml="auto" />

                                    <ThemeSwitcherButton />
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="default"
                                        component="a"
                                        href={route("login")}
                                        visibleFrom="xs"
                                        ml="auto"
                                    >
                                        Log in
                                    </Button>

                                    <Button
                                        component="a"
                                        href={route("register")}
                                        visibleFrom="xs"
                                    >
                                        Sign up
                                    </Button>

                                    <Burger
                                        opened={opened}
                                        onClick={toggleDrawer}
                                        hiddenFrom="xs"
                                        size="sm"
                                        ml="auto"
                                    />
                                </>
                            )}
                        </>
                    </Group>
                </AppShell.Header>

                <AppShell.Navbar>
                    <Drawer
                        opened={opened}
                        onClose={close}
                        title="Authentication"
                        position="right"
                        size={rem(250)}
                        classNames={{
                            inner: customStyles.drawer_margin_top,
                            overlay: customStyles.drawer_margin_top,
                        }}
                        withCloseButton={false}
                        overlayProps={{ opacity: 0.5 }}
                        hiddenFrom="xs"
                    >
                        <Stack>
                            <Button
                                variant="default"
                                component="a"
                                href={route("login")}
                            >
                                Log in
                            </Button>
                            <Button component="a" href={route("register")}>
                                Sign up
                            </Button>
                        </Stack>
                    </Drawer>
                </AppShell.Navbar>

                <AppShell.Main
                    px={{
                        base: "xs",
                        sm: "xl",
                        md: rem(50),
                        lg: rem(100),
                        xl: rem(200),
                    }}
                >
                    <>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Cumque deleniti natus error sit nulla a, ut nam.
                        Consequuntur est totam, odit magni fuga ipsum natus nemo
                        assumenda pariatur odio animi.
                    </>
                </AppShell.Main>
            </AppShell>
        </>
    );
}
