import { forwardRef } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { Group, Stack, Text, UnstyledButton, Avatar } from "@mantine/core";

const UserButton = forwardRef(
    (
        {
            h = "100%",
            withAvatar,
            imageSrc,
            imageRadius = 9999,
            title,
            subTitle,
            menuIcon = <IconChevronDown size={16} />,
            gap = 5,
            infoGap = 3,
            infoVisibleFrom = "xs",
            infoHiddenFrom,
            ...others
        },
        ref
    ) => (
        <UnstyledButton ref={ref} h={h} {...others}>
            <Group gap={gap} wrap="nowrap" h="100%">
                {withAvatar && (
                    <Avatar
                        src={imageSrc}
                        radius={imageRadius}
                        styles={{
                            image: {
                                width: "fit-content",
                                minWidth: "fit-content",
                                height: "100%",
                                objectFit: "cover",
                            },
                        }}
                    />
                )}

                <Stack
                    gap={infoGap}
                    visibleFrom={infoVisibleFrom}
                    hiddenFrom={infoHiddenFrom}
                >
                    <Text size="sm" fw={500} className="whitespace-nowrap">
                        {title}
                    </Text>

                    <Text c="dimmed" size="xs" className="whitespace-nowrap">
                        {subTitle}
                    </Text>
                </Stack>

                {menuIcon}
            </Group>
        </UnstyledButton>
    )
);

export default UserButton;
