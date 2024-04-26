import { Head } from "@inertiajs/react";
import { useMantineColorScheme, Title, Text, Paper } from "@mantine/core";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AdminPanel({ auth }) {
    const { colorScheme } = useMantineColorScheme();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Title order={2} c="grey.7" fw={300}>
                    Admin Panel
                </Title>
            }
        >
            <Head title="Admin Panel" />

            <Paper
                w="100%"
                withBorder={colorScheme === "dark" ? true : false}
                p="md"
            >
                <Text ta="left">Welcome to admin panel.</Text>
            </Paper>
        </AuthenticatedLayout>
    );
}
