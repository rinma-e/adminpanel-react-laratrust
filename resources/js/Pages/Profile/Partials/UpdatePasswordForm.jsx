import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { useDisclosure } from "@mantine/hooks";
import { useForm as useMantineForm } from "@mantine/form";
import {
    Text,
    Button,
    PasswordInput,
    Group,
    Stack,
    Grid,
    Notification,
    rem,
} from "@mantine/core";
import {
    IconDeviceFloppy,
    IconLockCog,
    IconEqual,
    IconEqualNot,
    IconInfoCircle,
} from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";

import { PasswordWithRequirements } from "@/Components";
import { validationSchema } from "@/Pages/Auth/validationSchema";

export default function UpdatePasswordForm({ activeTab, status }) {
    const [visible, { toggle }] = useDisclosure(false);
    const [disableSubmitButton, setDisableSubmitButton] = useState(true);

    const form = useMantineForm({
        initialValues: {
            current_password: "",
            password: "",
            password_confirmation: "",
        },

        validate: zodResolver(validationSchema),
    });

    // check did data change from initial values on every value change and set disable submit button to true or false
    useEffect(() => {
        form.isDirty() // if data to change from initial values isDirty is true
            ? setDisableSubmitButton(false)
            : setDisableSubmitButton(true);
    }, [form.values]); // make sure to run it on every value change

    useEffect(() => {
        if (!form.values.password) {
            form.setFieldValue("password_confirmation", "");
        }
    }, [form.values.password]);

    const handleSubmitPassword = (data) => {
        // send active tab in data
        data["activeTab"] = activeTab;

        router.put(route("password.update"), data, {
            preserveScroll: true,
            preserveState: (page) => Object.keys(page.props.errors).length,
            onProgress: () => setDisableSubmitButton(true),
            onSuccess: () => {
                form.reset();
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
            {status === "password-updated" && (
                <Notification
                    icon={
                        <IconInfoCircle color="var(--mantine-color-green-light-color)" />
                    }
                    color="transparent"
                    withBorder
                    onClose={(e) =>
                        (e.target.closest(
                            ".mantine-Notification-root"
                        ).style.display = "none")
                    }
                    mb="lg"
                >
                    <Text size="sm" c="var(--mantine-color-green-light-color)">
                        Password has been successfully updated.
                    </Text>
                </Notification>
            )}
            <form onSubmit={form.onSubmit(handleSubmitPassword)}>
                <Grid gutter={rem(40)}>
                    <Grid.Col
                        span={{ base: 12, xs: "content" }}
                        align="center"
                        mx="auto"
                    >
                        <IconLockCog
                            size={100}
                            stroke={0.5}
                            color={"var(--mantine-color-dimmed)"}
                            style={{
                                marginLeft: rem(-15),
                                marginTop: rem(-10),
                            }}
                        />
                    </Grid.Col>

                    <Grid.Col
                        span={{ base: 12, xs: "auto" }}
                        miw={{ base: rem(240), xs: rem(100) }}
                        mx="auto"
                        pl={{ xs: 0 }}
                        align="left"
                    >
                        <PasswordInput
                            label="Current Password"
                            withAsterisk={false}
                            visible={visible}
                            onVisibilityChange={toggle}
                            size="sm"
                            mb="lg"
                            required
                            {...form.getInputProps("current_password")}
                        />

                        <PasswordWithRequirements
                            label="Password"
                            name="password"
                            withAsterisk={false}
                            visible={visible}
                            onVisibilityChange={toggle}
                            size="sm"
                            mb="lg"
                            required
                            minPasswordLength={8}
                            progressBar={false}
                            {...form.getInputProps("password")}
                        />

                        <PasswordInput
                            label="Confirm Password"
                            withAsterisk={false}
                            visible={visible}
                            onVisibilityChange={toggle}
                            size="sm"
                            mb="lg"
                            required
                            disabled={!form.values.password}
                            {...form.getInputProps("password_confirmation")}
                            leftSection={
                                form.values.password_confirmation &&
                                (form.values.password_confirmation ===
                                form.values.password ? (
                                    <IconEqual
                                        size={16}
                                        stroke={2}
                                        color="var(--mantine-color-green-7)"
                                    />
                                ) : (
                                    <IconEqualNot
                                        size={16}
                                        stroke={2}
                                        color="var(--mantine-color-red-7)"
                                    />
                                ))
                            }
                        />

                        <Group justify="flex-end">
                            <Button
                                type="submit"
                                disabled={disableSubmitButton}
                                leftSection={
                                    <IconDeviceFloppy size={16} stroke={2.5} />
                                }
                            >
                                Save
                            </Button>
                        </Group>
                    </Grid.Col>
                </Grid>
            </form>
        </Stack>
    );
}
