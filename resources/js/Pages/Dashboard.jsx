import { Head } from "@inertiajs/react";
import { Title, Text, Paper, useMantineColorScheme } from "@mantine/core";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ auth }) {
    const { colorScheme } = useMantineColorScheme();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Title order={2} c="grey.7" fw={300}>
                    Dashboard
                </Title>
            }
        >
            <Head title="Dashboard" />

            <Paper
                w="100%"
                withBorder={colorScheme === "dark" ? true : false}
                p="md"
            >
                <Text ta="left">Welcome to your dashboard.</Text>
            </Paper>
        </AuthenticatedLayout>
    );
}
