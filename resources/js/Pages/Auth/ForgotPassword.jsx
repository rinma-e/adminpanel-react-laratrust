import { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, router } from "@inertiajs/react";
import { useForm as useMantineForm } from "@mantine/form";
import {
    Title,
    Text,
    Divider,
    TextInput,
    Button,
    Group,
    Stack,
    Card,
    useMantineColorScheme,
    Notification,
} from "@mantine/core";
import { IconMail, IconArrowBackUp, IconInfoCircle } from "@tabler/icons-react";

export default function ForgotPassword({ status }) {
    const { colorScheme } = useMantineColorScheme();
    const form = useMantineForm({
        initialValues: {
            email: "",
        },
    });

    const [processing, setProcessing] = useState(false);

    const handleSubmit = (data) => {
        router.post(route("password.email"), data, {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onError: (err) => {
                form.setErrors({ ...err });
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <Stack w={420}>
                {status && (
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
                            {status}
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
                            ta="center"
                        >
                            Forgot Password
                        </Title>

                        <Divider size="xs" />

                        <Text align="center" size="sm">
                            Forgot your password? No problem. Just let us know
                            your email address and we will email you a password
                            reset link that will allow you to choose a new one.
                        </Text>

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
                                    Home
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    leftSection={
                                        <IconMail size={16} stroke={2.5} />
                                    }
                                >
                                    Email Password Reset Link
                                </Button>
                            </Group>
                        </form>
                    </Stack>
                </Card>
            </Stack>
        </GuestLayout>
    );
}
