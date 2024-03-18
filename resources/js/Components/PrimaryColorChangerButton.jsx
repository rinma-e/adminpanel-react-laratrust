import { useState, useCallback, useMemo } from "react";
import { IconColorPicker } from "@tabler/icons-react";
import {
    useMantineColorScheme,
    useMantineTheme,
    ColorSwatch,
    Popover,
    UnstyledButton,
    CheckIcon,
    rem,
    SimpleGrid,
    Tooltip,
} from "@mantine/core";
import { useColor } from "@/Context/PrimaryColorProviderContext";

export default function PrimaryColorChanger({ ...props }) {
    const [opened, setOpened] = useState(false);
    const { colorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();
    const {
        primaryColor,
        setPrimaryColor,
        primaryColorShade,
        setPrimaryColorShade,
    } = useColor();

    const handleClick = useCallback(
        (color, shade) => {
            setPrimaryColor(color);
            setPrimaryColorShade({
                light: shade,
                dark: shade + 1 > 9 ? 9 : shade + 1,
            });
            setOpened(false);
        },
        [setPrimaryColor, setPrimaryColorShade]
    );

    const swatches = useMemo(() => {
        return Object.keys(theme.colors).flatMap((color) => {
            const shades = theme.colors[color];
            return shades.map((shade, i) => {
                const isDefaultShade = i === 6;
                return isDefaultShade ? (
                    <Tooltip
                        label="Default Color Shade"
                        withArrow
                        key={`tooltip-${color}-${i}`}
                    >
                        <ColorSwatch
                            key={`${color}-${i}`}
                            component={UnstyledButton}
                            color={shade}
                            onClick={() => handleClick(color, i)}
                        >
                            {theme.primaryColor === color &&
                                theme.primaryShade.light === i && (
                                    <CheckIcon width={10} />
                                )}
                        </ColorSwatch>
                    </Tooltip>
                ) : (
                    <ColorSwatch
                        key={`${color}-${i}`}
                        component={UnstyledButton}
                        color={shade}
                        onClick={() => handleClick(color, i)}
                    >
                        {theme.primaryColor === color &&
                            theme.primaryShade.light === i && (
                                <CheckIcon width={10} />
                            )}
                    </ColorSwatch>
                );
            });
        });
    }, [
        theme.colors,
        theme.primaryColor,
        theme.primaryShade.light,
        handleClick,
    ]);

    return (
        <Popover
            {...props}
            opened={opened}
            onClose={() => setOpened(false)}
            position="bottom-end"
            withArrow
        >
            <Popover.Target>
                <ColorSwatch
                    component="button"
                    type="button"
                    color={
                        theme.colors[primaryColor][
                            primaryColorShade[colorScheme]
                        ]
                    }
                    onClick={() => setOpened(true)}
                    size={22}
                    style={{ display: "block", cursor: "pointer" }}
                >
                    <IconColorPicker
                        style={{ width: rem(14), height: rem(14) }}
                        color="#fff"
                    />
                </ColorSwatch>
            </Popover.Target>
            <Popover.Dropdown>
                <SimpleGrid cols={10} gap="xs">
                    {swatches}
                </SimpleGrid>
            </Popover.Dropdown>
        </Popover>
    );
}
