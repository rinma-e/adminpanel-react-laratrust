import { useState } from "react";
import { Link } from "@inertiajs/react";
import { useMantineTheme, Group, Menu, Tooltip } from "@mantine/core";
import {
    IconLogout,
    IconHeart,
    IconStar,
    IconMessage,
    IconSettings,
} from "@tabler/icons-react";

import { UserButton, PrimaryColorChangerButton } from "@/Components";

export function UserMenu({ user, ...props }) {
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [primaryColorPickerOpened, setPrimaryColorPickerOpened] =
        useState(false);
    const theme = useMantineTheme();
    const iconOptions = {
        size: 16,
        stroke: 1.5,
    };

    return (
        <Menu
            opened={userMenuOpened}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            closeOnClickOutside={primaryColorPickerOpened ? false : true}
            withinPortal
            {...props}
        >
            <Menu.Target>
                <UserButton
                    withAvatar
                    imageSrc={user.avatar_url}
                    title={user.first_name + " " + user.last_name}
                    subTitle={user.email}
                    opened={userMenuOpened.toString()}
                    py={12.5}
                />
            </Menu.Target>
            <Menu.Dropdown>
                <Group justify="flex-end" px="xs" py={3}>
                    <Tooltip label="Pick themes primary color">
                        <PrimaryColorChangerButton
                            onOpen={() => setPrimaryColorPickerOpened(true)}
                            onClose={() => setPrimaryColorPickerOpened(false)}
                            onChange={() => setPrimaryColorPickerOpened(false)}
                        />
                    </Tooltip>
                </Group>

                <Menu.Divider />

                <Menu.Item
                    leftSection={
                        <IconHeart
                            {...iconOptions}
                            color={theme.colors.red[6]}
                        />
                    }
                >
                    Liked posts
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconStar
                            {...iconOptions}
                            color={theme.colors.yellow[6]}
                        />
                    }
                >
                    Saved posts
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconMessage
                            {...iconOptions}
                            color={theme.colors.blue[6]}
                        />
                    }
                >
                    Your comments
                </Menu.Item>

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                    component={Link}
                    href={route("profile.edit")}
                    leftSection={<IconSettings {...iconOptions} />}
                >
                    Profile
                </Menu.Item>
                <Menu.Item
                    component={Link}
                    href={route("logout")}
                    method="post"
                    as="button"
                    leftSection={<IconLogout {...iconOptions} />}
                >
                    Log Out
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export default UserMenu;
