import { Head, Link } from "@inertiajs/react";
import {
    useMantineColorScheme,
    AppShell,
    Flex,
    Group,
    Stack,
    Card,
    Paper,
    Anchor,
    Button,
    CloseButton,
    Overlay,
    Title,
    Text,
} from "@mantine/core";
import { IconCircleCheck, IconUserPlus, IconX } from "@tabler/icons-react";

import Header from "@/Pages/Partials/Header/Header";
import { headerLinkList as links } from "@/Layouts/linkLists";
import customStyles from "@/Layouts/layout.module.css";

export default function Welcome({ auth, accountDeleted }) {
    const { user } = auth;

    const headerHeight = 60;

    const { colorScheme } = useMantineColorScheme();

    const canAccessLink = (link) => {
        if (!link.role || link.role === "all") return true; // Link is accessible to all roles
        const linkRoles = link.role.split("|");
        return linkRoles.some((role) => user?.roles?.includes(role)) || false;
    };

    const userAccessableLinks = links.filter(canAccessLink);

    const userGreeting = auth.user
        ? `Welcome ${auth.user.first_name} ${auth.user.last_name} this is Welcome page!`
        : "Welcome Guest!";

    return (
        <AppShell
            header={{ height: headerHeight }}
            classNames={{
                root: customStyles.root,
                header: customStyles.header,
            }}
            transitionDuration={500}
            transitionTimingFunction="ease"
        >
            <AppShell.Header>
                <Header user={user} links={userAccessableLinks} />
            </AppShell.Header>

            <AppShell.Navbar></AppShell.Navbar>

            <AppShell.Main>
                <Head title="Welcome" />
                <Flex
                    direction="column"
                    maw="80em"
                    mt="xs"
                    mx="auto"
                    px={{ base: 0, xs: "md", sm: "xl" }}
                    justify="center"
                    align="center"
                >
                    {accountDeleted && (
                        <Overlay>
                            <Card
                                w={400}
                                withBorder
                                shadow="sm"
                                mx="auto"
                                mt="md"
                            >
                                <Card.Section align="center" withBorder p="md">
                                    <CloseButton
                                        pos="absolute"
                                        size="lg"
                                        top={0}
                                        right={0}
                                        onClick={(e) => {
                                            e.target
                                                .closest(
                                                    ".mantine-Overlay-root"
                                                )
                                                .remove();
                                        }}
                                    />
                                    <IconCircleCheck
                                        size={100}
                                        stroke={1}
                                        color="var(--mantine-color-green-6)"
                                    />
                                    <Title order={1} fw="normal" my="md">
                                        Account deleted
                                    </Title>
                                    <Text c="dimmed" ta="center">
                                        Your account has been permanently
                                        deleted.
                                    </Text>
                                </Card.Section>
                                <Card.Section
                                    align="center"
                                    p="md"
                                    withBorder
                                    bg={
                                        colorScheme === "dark"
                                            ? "gray.8"
                                            : "gray.0"
                                    }
                                >
                                    <Stack gap="md">
                                        <Title order={3} fw={400}>
                                            We are sorry to see you leave.
                                        </Title>

                                        <Text c="dimmed" ta="center">
                                            Your are always welcome to{" "}
                                            <Anchor
                                                component={Link}
                                                href={route("register")}
                                                fw="bold"
                                            >
                                                join us
                                            </Anchor>{" "}
                                            again.
                                        </Text>

                                        <Group
                                            align="center"
                                            justify="space-between"
                                            mt="lg"
                                        >
                                            <Button
                                                variant="default"
                                                leftSection={
                                                    <IconX
                                                        size={16}
                                                        stroke={2.5}
                                                    />
                                                }
                                                onClick={(e) => {
                                                    e.target
                                                        .closest(
                                                            ".mantine-Overlay-root"
                                                        )
                                                        .remove();
                                                }}
                                            >
                                                Close
                                            </Button>

                                            <Button
                                                component={Link}
                                                href={route("register")}
                                                leftSection={
                                                    <IconUserPlus
                                                        size={16}
                                                        stroke={2.5}
                                                    />
                                                }
                                            >
                                                Sign up
                                            </Button>
                                        </Group>
                                    </Stack>
                                </Card.Section>
                            </Card>
                        </Overlay>
                    )}
                    <Paper
                        w="100%"
                        p="md"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        withBorder={colorScheme === "dark" ? true : false}
                    >
                        <Text>{userGreeting}</Text>
                    </Paper>
                </Flex>
            </AppShell.Main>
        </AppShell>
    );
}
