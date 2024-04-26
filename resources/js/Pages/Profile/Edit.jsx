import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { useMediaQuery } from "@mantine/hooks";
import { Title, Text, Tabs, Tooltip, useMantineTheme } from "@mantine/core";
import { IconSettings, IconUser, IconLock } from "@tabler/icons-react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import customStyles from "./edit.module.css";

export default function Edit({ auth, mustVerifyEmail, status, activeTab }) {
    const [currentTab, setCurrentTab] = useState(activeTab || "info");
    const iconOptions = {
        size: 18,
        stroke: 1,
    };
    const [isLoaded, setIsLoaded] = useState(false);

    // read xs value from mantine theme
    const theme = useMantineTheme();
    const xsBreakpoint = theme.breakpoints.xs;

    // check if screen is xs
    const isXs = useMediaQuery(`(min-width: ${xsBreakpoint})`);

    useEffect(() => {
        // Set isLoaded to true after the media query has been evaluated
        setIsLoaded(true);
    }, [isXs]);

    // to remove Tab flicker on first render we will render it only when useMediaQuery is finished evaluating
    if (!isLoaded) {
        return null;
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Title order={2} c="grey.7" fw={300}>
                    Profile
                </Title>
            }
        >
            <Head title="Profile" />

            <Tabs
                variant="outline"
                defaultValue={currentTab}
                align="stretch"
                justify="center"
                orientation={isXs ? "vertical" : "horizontal"}
                classNames={{
                    list: customStyles.tabsList,
                    tab: !isXs ? customStyles.tab : customStyles.tab_vertical,
                    panel: customStyles.tabPanel,
                }}
                w="100%"
                maw={{ base: 300, xs: 600 }}
                mx="auto"
            >
                <Tabs.List justify={isXs ? "" : "left"}>
                    <Tabs.Tab
                        value="info"
                        leftSection={
                            <Tooltip label="User information" hiddenFrom="xs">
                                <IconUser {...iconOptions} />
                            </Tooltip>
                        }
                        styles={{ tabSection: { marginRight: 0 } }}
                        onClick={() => setCurrentTab("info")}
                    >
                        {
                            <Text size="sm" visibleFrom="xs" pl="xs">
                                User information
                            </Text>
                        }
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="password"
                        leftSection={
                            <Tooltip label="Change password" hiddenFrom="xs">
                                <IconLock {...iconOptions} />
                            </Tooltip>
                        }
                        styles={{ tabSection: { marginRight: 0 } }}
                        onClick={() => setCurrentTab("password")}
                    >
                        {
                            <Text size="sm" visibleFrom="xs" pl="xs">
                                Change password
                            </Text>
                        }
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="settings"
                        leftSection={
                            <Tooltip label="Account settings" hiddenFrom="xs">
                                <IconSettings {...iconOptions} />
                            </Tooltip>
                        }
                        styles={{ tabSection: { marginRight: 0 } }}
                        onClick={() => setCurrentTab("settings")}
                    >
                        {
                            <Text size="sm" visibleFrom="xs" pl="xs">
                                Account settings
                            </Text>
                        }
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel
                    value="info"
                    styles={{
                        panel: {
                            borderTopLeftRadius:
                                currentTab === "info" ? 0 : undefined,
                        },
                    }}
                >
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </Tabs.Panel>

                <Tabs.Panel value="password">
                    <UpdatePasswordForm
                        status={status}
                        activeTab={currentTab}
                    />
                </Tabs.Panel>

                <Tabs.Panel value="settings">
                    <DeleteUserForm activeTab={currentTab} />
                </Tabs.Panel>
            </Tabs>
        </AuthenticatedLayout>
    );
}
