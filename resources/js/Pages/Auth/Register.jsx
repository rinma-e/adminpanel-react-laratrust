import { useState, useEffect } from "react";
import { Head, router, Link } from "@inertiajs/react";
import { useDisclosure } from "@mantine/hooks";
import { useForm as useMantineForm } from "@mantine/form";
import {
    useMantineColorScheme,
    Text,
    Title,
    Divider,
    TextInput,
    Button,
    Anchor,
    PasswordInput,
    Group,
    Stack,
    Card,
    Grid,
} from "@mantine/core";
import {
    IconUserPlus,
    IconArrowBackUp,
    IconEqual,
    IconEqualNot,
} from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";

import GuestLayout from "@/Layouts/GuestLayout";
import { AvatarDropzone } from "@/Components";
import { PasswordWithRequirements } from "@/Components";
import { validationSchema } from "./validationSchema";

export default function Register() {
    const { colorScheme } = useMantineColorScheme();

    const form = useMantineForm({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
            avatar: null,
        },

        validate: zodResolver(validationSchema),
    });

    const [visible, { toggle }] = useDisclosure(false);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (data) => {
        router.post(route("register"), data, {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onError: (err) => {
                // set server side errors in form
                form.setErrors({ ...err });
            },
        });
    };

    useEffect(() => {
        if (!form.values.password) {
            form.setFieldValue("password_confirmation", "");
        }
    }, [form.values.password]);

    return (
        <GuestLayout>
            <Head title="Register" />

            <Card withBorder w={520} p="md" shadow="xs" radius="md">
                <Stack>
                    <Title
                        mx="auto"
                        my="sm"
                        size="3rem"
                        c={colorScheme === "dark" ? "dark.0" : "dark.4"}
                    >
                        Sign up
                    </Title>

                    <Divider size="xs" />

                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Grid gutter="xl" justify="center">
                            <Grid.Col
                                span={{ base: 12, xs: "content" }}
                                align="center"
                            >
                                <AvatarDropzone
                                    form={form}
                                    name="avatar"
                                    size={120}
                                    {...form.getInputProps("avatar")}
                                />
                            </Grid.Col>

                            <Grid.Col span="auto">
                                <TextInput
                                    label="First Name"
                                    name="first_name"
                                    autoComplete="given-name"
                                    mb="md"
                                    size="sm"
                                    withAsterisk={false}
                                    required
                                    {...form.getInputProps("first_name")}
                                />

                                <TextInput
                                    label="Last Name"
                                    name="last_name"
                                    autoComplete="family-name"
                                    mb="md"
                                    size="sm"
                                    withAsterisk={false}
                                    required
                                    {...form.getInputProps("last_name")}
                                />

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

                                <PasswordWithRequirements
                                    label="Password"
                                    name="password"
                                    withAsterisk={false}
                                    visible={visible}
                                    onVisibilityChange={toggle}
                                    size="sm"
                                    mb="md"
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
                                    mb="xl"
                                    required
                                    disabled={!form.values.password}
                                    {...form.getInputProps(
                                        "password_confirmation"
                                    )}
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
                                            <IconUserPlus
                                                size={16}
                                                stroke={2.5}
                                            />
                                        }
                                    >
                                        Sign up
                                    </Button>
                                </Group>
                            </Grid.Col>
                        </Grid>
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
                        <Text size="sm">Already have an account?</Text>

                        <Anchor
                            component={Link}
                            href={route("login")}
                            size="sm"
                            fw={700}
                        >
                            Log in here
                        </Anchor>
                    </Group>
                </Card.Section>
            </Card>
        </GuestLayout>
    );
}
