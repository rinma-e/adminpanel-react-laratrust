import { useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
import { useForm as useMantineForm } from "@mantine/form";
import {
    Title,
    Text,
    Divider,
    Button,
    Group,
    Stack,
    Card,
    useMantineColorScheme,
} from "@mantine/core";
import { IconMail, IconLogout2 } from "@tabler/icons-react";

import GuestLayout from "@/Layouts/GuestLayout";

export default function VerifyEmail({ status }) {
    const { colorScheme } = useMantineColorScheme();
    const form = useMantineForm({});

    const [processing, setProcessing] = useState(false);

    const handleSubmit = (data) => {
        router.post(route("verification.send"), data, {
            onProgress: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onError: (err) => {
                console.log(err);
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            {status === "verification-link-sent" && (
                <Text c="green.6" align="center" my="md">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </Text>
            )}

            <Card withBorder w={420} p="md" shadow="xs" radius="md">
                <Stack>
                    <Title
                        mx="auto"
                        my="sm"
                        size="3rem"
                        c={colorScheme === "dark" ? "dark.0" : "dark.4"}
                        ta="center"
                    >
                        Email Verification
                    </Title>

                    <Divider size="xs" />

                    <Text align="center" size="sm" my="lg">
                        Thanks for signing up! Before getting started, could you
                        verify your email address by clicking on the link we
                        just emailed to you? If you didn't receive the email, we
                        will gladly send you another.
                    </Text>

                    <Divider size="xs" />

                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Group justify="center">
                            <Button
                                variant="outline"
                                component={Link}
                                href={route("logout")}
                                leftSection={
                                    <IconLogout2 size={16} stroke={2.5} />
                                }
                                className="[@media(max-width:400px)]:order-last"
                            >
                                Log out
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                leftSection={
                                    <IconMail size={16} stroke={2.5} />
                                }
                            >
                                Resend Verification Email
                            </Button>
                        </Group>
                    </form>
                </Stack>
            </Card>
        </GuestLayout>
    );
}
