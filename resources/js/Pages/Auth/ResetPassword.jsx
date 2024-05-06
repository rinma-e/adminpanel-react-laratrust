import { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import { useDisclosure } from "@mantine/hooks";
import { useForm as useMantineForm } from "@mantine/form";
import {
    useMantineColorScheme,
    Title,
    Divider,
    TextInput,
    Button,
    PasswordInput,
    Group,
    Stack,
    Card,
    Center,
} from "@mantine/core";
import { IconArrowBackUp, IconLock, IconRefresh } from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";

import GuestLayout from "@/Layouts/GuestLayout";
import { PasswordWithRequirements } from "@/Components";
import { validationSchema } from "./validationSchema";

export default function ResetPassword({ token, email }) {
    const { colorScheme } = useMantineColorScheme();
    const form = useMantineForm({
        initialValues: {
            token: token,
            email: email,
            password: "",
            password_confirmation: "",
        },

        validate: zodResolver(validationSchema),
    });

    const [visible, { toggle }] = useDisclosure(false);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (data) => {
        router.post(route("password.store"), data, {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onError: (err) => {
                // set server side errors in form
                form.setErrors({ ...err });
            },
        });
    };

    useEffect(() => {
        return () => {
            form.setFieldValue("password", "");
            form.setFieldValue("password_confirmation", "");
        };
    }, []);

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <Card withBorder w={420} p="md" shadow="xs" radius="md">
                <Stack>
                    <Title
                        mx="auto"
                        my="sm"
                        size="3rem"
                        c={colorScheme === "dark" ? "dark.0" : "dark.4"}
                        ta="center"
                    >
                        Reset Password
                    </Title>

                    <Divider size="xs" />

                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <TextInput
                            label="Email"
                            name="email"
                            autoComplete="email"
                            mb="lg"
                            size="sm"
                            withAsterisk={false}
                            required
                            {...form.getInputProps("email")}
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
                            {...form.getInputProps("password_confirmation")}
                        />

                        <Group justify="space-between">
                            <Button
                                variant="outline"
                                leftSection={
                                    <IconArrowBackUp size={16} stroke={2.5} />
                                }
                                onClick={() =>
                                    window.history.length > 1
                                        ? window.history.back()
                                        : (window.location.href = "/")
                                }
                            >
                                Home
                            </Button>

                            <Button
                                type="submit"
                                disabled={processing}
                                pl={18}
                                leftSection={
                                    <Center pr={8}>
                                        <IconRefresh
                                            size={24}
                                            stroke={1.5}
                                            className="absolute"
                                        />
                                        <IconLock size={10} stroke={2.5} />
                                    </Center>
                                }
                            >
                                Reset Password
                            </Button>
                        </Group>
                    </form>
                </Stack>
            </Card>
        </GuestLayout>
    );
}
