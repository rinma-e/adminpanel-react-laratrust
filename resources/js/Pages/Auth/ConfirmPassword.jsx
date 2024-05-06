import { useState, useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, router } from "@inertiajs/react";
import { useDisclosure } from "@mantine/hooks";
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
    PasswordInput,
} from "@mantine/core";
import { IconKey, IconArrowBackUp, IconAlertCircle } from "@tabler/icons-react";

export default function ConfirmPassword() {
    const { colorScheme } = useMantineColorScheme();
    const form = useMantineForm({
        initialValues: {
            password: "",
        },
    });

    useEffect(() => {
        return () => {
            form.reset();
        };
    }, []);

    const [processing, setProcessing] = useState(false);
    const [visible, { toggle }] = useDisclosure(false);

    const handleSubmit = (data) => {
        router.post(route("password.confirm"), data, {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onError: (err) => {
                form.setErrors({ ...err });
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <Card withBorder w={420} p="md" shadow="xs" radius="md">
                <Stack>
                    <Title
                        mx="auto"
                        my="sm"
                        size="3rem"
                        c={colorScheme === "dark" ? "dark.0" : "dark.4"}
                        ta="center"
                    >
                        Confirm Password
                    </Title>

                    <Divider size="xs" />

                    <Group wrap="nowrap" c="yellow.9">
                        <IconAlertCircle size={80} stroke={1} />
                        <Text size="sm" my="lg">
                            This is a secure area of the application. Please
                            confirm your password before continuing.
                        </Text>
                    </Group>

                    <Divider size="xs" />

                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <PasswordInput
                            label="Confirm Password"
                            withAsterisk={false}
                            visible={visible}
                            onVisibilityChange={toggle}
                            size="sm"
                            mb="lg"
                            required
                            {...form.getInputProps("password")}
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
                                leftSection={<IconKey size={16} stroke={2.5} />}
                            >
                                Confirm
                            </Button>
                        </Group>
                    </form>
                </Stack>
            </Card>
        </GuestLayout>
    );
}
