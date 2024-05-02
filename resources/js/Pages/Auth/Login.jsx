import { useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
import { useDisclosure } from "@mantine/hooks";
import { useForm as useMantineForm } from "@mantine/form";
import {
    Title,
    Text,
    Divider,
    TextInput,
    Button,
    Anchor,
    Checkbox,
    PasswordInput,
    Group,
    Stack,
    Card,
    useMantineColorScheme,
    Notification,
} from "@mantine/core";
import {
    IconLogin2,
    IconArrowBackUp,
    IconInfoCircle,
} from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";

import GuestLayout from "@/Layouts/GuestLayout";
import { validationSchema } from "./validationSchema";

export default function Login({ status, canResetPassword }) {
    const { colorScheme } = useMantineColorScheme();

    const form = useMantineForm({
        initialValues: {
            email: "",
            password: "",
            remember: false,
        },

        validate: zodResolver(validationSchema),
    });

    const [visible, { toggle }] = useDisclosure(false);
    const [processing, setProcessing] = useState(false);
    const [credentialsError, setCredentialsError] = useState(false);

    const handleSubmit = (data) => {
        router.post(route("login"), data, {
            onProgress: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onError: (err) => {
                form.setErrors({ ...err });
                if (err.credentials) {
                    setCredentialsError(err.credentials);
                }
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <Stack w={420}>
                {!status && (
                    <Notification
                        icon={
                            <IconInfoCircle color="var(--mantine-color-green-6)" />
                        }
                        color="transparent"
                        withBorder
                        onClose={(e) =>
                            (e.target.closest(
                                ".mantine-Notification-root"
                            ).style.display = "none")
                        }
                        mt={{ base: "xl", xs: 0 }}
                        styles={{
                            root: { boxShadow: "var(--mantine-shadow-xs)" },
                        }}
                    >
                        <Text c="green.6" size="sm" fw={500}>
                            {status}aaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        </Text>
                    </Notification>
                )}

                <Card withBorder p="md" shadow="xs" radius="md">
                    <Stack>
                        <Title
                            mx="auto"
                            my="sm"
                            size="3rem"
                            c={colorScheme === "dark" ? "dark.0" : "dark.4"}
                        >
                            Log in
                        </Title>

                        <Divider size="xs" />

                        <form onSubmit={form.onSubmit(handleSubmit)}>
                            {credentialsError && (
                                <Text
                                    c="red.6"
                                    size="sm"
                                    fw={500}
                                    align="center"
                                    my="sm"
                                >
                                    {credentialsError}
                                </Text>
                            )}

                            <TextInput
                                label="Email"
                                name="email"
                                autoComplete="email"
                                mb="md"
                                size="sm"
                                withAsterisk={false}
                                required
                                {...form.getInputProps("email")}
                            />

                            <PasswordInput
                                label={
                                    <Group
                                        justify="space-between"
                                        wrap="nowrap"
                                    >
                                        Password
                                        {canResetPassword && (
                                            <Anchor
                                                component={Link}
                                                href={route("password.request")}
                                                size="xs"
                                            >
                                                Forgot password?
                                            </Anchor>
                                        )}
                                    </Group>
                                }
                                labelProps={{ display: "block" }}
                                withAsterisk={false}
                                visible={visible}
                                onVisibilityChange={toggle}
                                size="sm"
                                mb="lg"
                                required
                                {...form.getInputProps("password")}
                            />

                            <Checkbox
                                label="Remember me"
                                fw="500"
                                mb="xl"
                                {...form.getInputProps("remember", {
                                    type: "checkbox",
                                })}
                            />

                            <Group justify="space-between">
                                <Button
                                    variant="outline"
                                    leftSection={
                                        <IconArrowBackUp
                                            size={16}
                                            stroke={2.5}
                                        />
                                    }
                                    onClick={() =>
                                        window.history.length > 1
                                            ? window.history.back()
                                            : (window.location.href = "/")
                                    }
                                >
                                    Go Back
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    leftSection={
                                        <IconLogin2 size={16} stroke={2.5} />
                                    }
                                >
                                    Log in
                                </Button>
                            </Group>
                        </form>
                    </Stack>

                    <Card.Section
                        withBorder
                        mt="md"
                        bg={colorScheme === "dark" ? "gray.8" : "gray.0"}
                    >
                        <Group
                            w="full"
                            p="lg"
                            align="center"
                            justify="center"
                            gap="xs"
                        >
                            <Text size="sm">Don't have an account?</Text>

                            <Anchor
                                component={Link}
                                href={route("register")}
                                size="sm"
                                fw={700}
                            >
                                Sign up here
                            </Anchor>
                        </Group>
                    </Card.Section>
                </Card>
            </Stack>
        </GuestLayout>
    );
}
