import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useForm as useMantineForm } from "@mantine/form";
import {
    useMantineTheme,
    Text,
    Button,
    Group,
    Stack,
    PasswordInput,
    Modal,
    Title,
    CloseButton,
} from "@mantine/core";
import { IconAlertTriangle, IconTrash } from "@tabler/icons-react";

import { useColor } from "@/Context/PrimaryColorProviderContext";

export default function DeleteUserForm({ activeTab }) {
    const { removePrimaryColor, removePrimaryColorShade } = useColor();

    const form = useMantineForm({
        initialValues: {
            password: "",
            _method: "delete",
        },
    });

    const [visible, { toggle }] = useDisclosure(false);
    const [disableSubmitButton, setDisableSubmitButton] = useState(true);
    const [opened, { open, close }] = useDisclosure(false);

    // read xs value from mantine theme
    const theme = useMantineTheme();
    const xsBreakpoint = theme.breakpoints.xs;

    // check if screen is xs
    const isXs = useMediaQuery(`(min-width: ${xsBreakpoint})`);

    const closeModal = () => {
        close();

        form.reset();
    };

    // check did data change from initial values on every value change and set disable submit button to true or false
    useEffect(() => {
        form.isDirty() // if data to change from initial values isDirty is true
            ? setDisableSubmitButton(false)
            : setDisableSubmitButton(true);
    }, [form.values]); // make sure to run it on every value change

    const handleDeleteAccount = (data) => {
        // send active tab in data
        data["activeTab"] = activeTab;

        router.post(route("profile.destroy"), data, {
            preserveScroll: true,
            preserveState: (page) => Object.keys(page.props.errors).length,
            onProgress: () => setDisableSubmitButton(true),
            onSuccess: () => {
                closeModal();
                removePrimaryColor();
                removePrimaryColorShade();
            },
            onFinish: () => setDisableSubmitButton(true),
            onError: (err) => {
                // set server side errors in form
                form.setErrors({ ...err });
            },
        });
    };

    return (
        <Stack>
            <Title order={3} ta="left">
                Delete Account
            </Title>

            <Text c="red.6" size="sm" ta="justify" fw={500}>
                Once your account is deleted, all of its resources and data will
                be permanently deleted. Before deleting your account, please
                download any data or information that you wish to retain.
            </Text>

            <Group justify="flex-end">
                <Button
                    color="red.6"
                    leftSection={<IconTrash size={16} stroke={2.5} />}
                    onClick={open}
                >
                    Delete Account
                </Button>
            </Group>

            <Modal
                padding="lg"
                centered={isXs ? true : false}
                withCloseButton={false}
                opened={opened}
                onClose={closeModal}
            >
                <form onSubmit={form.onSubmit(handleDeleteAccount)}>
                    <Stack>
                        <Group
                            align="flex-start"
                            justify="center"
                            gap={0}
                            pos="relative"
                            mb={-10}
                        >
                            <IconAlertTriangle
                                size={120}
                                stroke={1.5}
                                color={"var(--mantine-color-red-6)"}
                            />

                            <CloseButton
                                onClick={closeModal}
                                pos="absolute"
                                right={0}
                            />
                        </Group>

                        <Title order={2} ta="center" fw="semibold" mb={10}>
                            Are you sure you want to delete your account?
                        </Title>

                        <Text ta="center" px="lg">
                            Once your account is deleted, all of its resources
                            and data will be permanently deleted.
                        </Text>

                        <Text c="dimmed" size="sm" ta="center" px="lg">
                            Please enter your password to confirm you would like
                            to permanently delete your account.
                        </Text>

                        <Stack px="lg" justify="center">
                            <PasswordInput
                                label="Password"
                                withAsterisk={false}
                                visible={visible}
                                onVisibilityChange={toggle}
                                size="sm"
                                required
                                {...form.getInputProps("password")}
                            />

                            <Group justify="space-around">
                                <Button variant="default" onClick={closeModal}>
                                    NO, don't delete it
                                </Button>

                                <Button
                                    type="submit"
                                    color="red.6"
                                    disabled={disableSubmitButton}
                                    leftSection={
                                        <IconTrash size={16} stroke={2.5} />
                                    }
                                >
                                    Delete Account
                                </Button>
                            </Group>
                        </Stack>
                    </Stack>
                </form>
            </Modal>
        </Stack>
    );
}
