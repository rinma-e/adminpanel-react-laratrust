import { useState, useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { useForm as useMantineForm } from "@mantine/form";
import {
    Text,
    TextInput,
    Button,
    Anchor,
    Group,
    Stack,
    Grid,
    Notification,
    rem,
} from "@mantine/core";
import {
    IconDeviceFloppy,
    IconAlertTriangle,
    IconInfoCircle,
    IconUserCog,
} from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";

import { validationSchema } from "@/Pages/Auth/validationSchema";

export default function UpdateProfileInformation({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const [disableSubmitButton, setDisableSubmitButton] = useState(true);

    const emailVerified = mustVerifyEmail && user.email_verified_at === null;

    const form = useMantineForm({
        initialValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        },
        initialErrors: {
            email: emailVerified ? "Your email address is unverified" : null,
        },

        validate: zodResolver(validationSchema),
    });

    // check did data change from initial values on every value change and set disable submit button to true or false
    useEffect(() => {
        form.isDirty() // if data to change from initial values isDirty is true
            ? setDisableSubmitButton(false)
            : setDisableSubmitButton(true);
    }, [form.values]); // make sure to run it on every value change

    const handleSubmit = (data) => {
        // send avatar only if it is an object (file object if picture is selected or null object if user remove existing picture)
        typeof data.avatar !== "object" && delete data.avatar;

        router.post(route("profile.update"), data, {
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
            {emailVerified && status !== "verification-link-sent" && (
                <Notification
                    icon={<IconAlertTriangle color="orange" />}
                    color="transparent"
                    withBorder
                    withCloseButton={false}
                    mb="lg"
                >
                    <Text size="sm">Your email address is unverified</Text>
                    <Anchor
                        component={Link}
                        href={route("verification.send")}
                        size="sm"
                        method="post"
                        as="button"
                        mt="xs"
                        ta="left"
                        fw={500}
                    >
                        Click here to re-send the verification email.
                    </Anchor>
                </Notification>
            )}

            {emailVerified && status === "verification-link-sent" && (
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
                    mb="lg"
                >
                    <Text c="var(--mantine-color-green-6)" size="sm">
                        A new verification link has been sent to your email
                        address.
                    </Text>
                </Notification>
            )}

            {status === "profile-updated" && (
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
                    mb="lg"
                >
                    <Text c="var(--mantine-color-green-6)" size="sm">
                        Profile has been successfully updated.
                    </Text>
                </Notification>
            )}

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Grid gutter={rem(20)} mx="auto">
                    <Grid.Col
                        span={{ base: 12, xs: "content" }}
                        align="center"
                        mx="auto"
                    >
                        <IconUserCog
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
                        miw={rem(180)}
                        mx="auto"
                        align="left"
                    >
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
                            mb="xl"
                            size="sm"
                            withAsterisk={false}
                            required
                            disabled={emailVerified ? true : false}
                            {...form.getInputProps("email")}
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
