import {
    useState,
    useCallback,
    useMemo,
    forwardRef,
    useRef,
    useEffect,
} from "react";
import { IconColorPicker } from "@tabler/icons-react";
import {
    useMantineColorScheme,
    useMantineTheme,
    ColorSwatch,
    Popover,
    UnstyledButton,
    CheckIcon,
    SimpleGrid,
    Tooltip,
    ScrollArea,
} from "@mantine/core";
import { useColor } from "@/Context/PrimaryColorProviderContext";

const PrimaryColorChanger = forwardRef((props, ref) => {
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
                                    <CheckIcon size={10} />
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
                                <CheckIcon size={10} />
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

    const onCloseHandler = useCallback(() => {
        if (typeof props.onClose === "function") {
            props.onClose(); // Call the passed onClose function
        }
        setOpened(false);
    });

    const simpleGridRef = useRef();
    const [distanceFromTop, setDistanceFromTop] = useState(0);
    const [scrollAreaHeight, setScrollAreaHeight] = useState("100vh");

    useEffect(() => {
        const updateDistanceFromTop = () => {
            if (simpleGridRef.current) {
                // Get the distance from the top
                const rect = simpleGridRef.current.getBoundingClientRect();
                setDistanceFromTop(rect.top);

                // Calculate and set the ScrollArea height
                setScrollAreaHeight(
                    `calc(100vh - ${distanceFromTop}px - 120px)`
                );
            }
        };

        // Update the distance when the component mounts
        updateDistanceFromTop();

        // Update the distance on window resize and scroll events
        window.addEventListener("resize", updateDistanceFromTop);
        window.addEventListener("scroll", updateDistanceFromTop);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener("resize", updateDistanceFromTop);
            window.removeEventListener("scroll", updateDistanceFromTop);
        };
    });

    return (
        <Popover
            {...props}
            opened={opened}
            onClose={onCloseHandler}
            position="bottom-end"
            withArrow
        >
            <Popover.Target>
                <ColorSwatch
                    ref={ref}
                    component="button"
                    type="button"
                    color={
                        theme.colors[primaryColor][
                            primaryColorShade[colorScheme]
                        ]
                    }
                    onClick={() => setOpened((o) => !o)}
                    size={22}
                    style={{ display: "block", cursor: "pointer" }}
                >
                    <IconColorPicker
                        ref={simpleGridRef}
                        size={14}
                        color="#fff"
                    />
                </ColorSwatch>
            </Popover.Target>
            <Popover.Dropdown>
                <ScrollArea.Autosize type="auto" mah={scrollAreaHeight}>
                    <SimpleGrid cols={10} gap="xs">
                        {swatches}
                    </SimpleGrid>
                </ScrollArea.Autosize>
            </Popover.Dropdown>
        </Popover>
    );
});

export default PrimaryColorChanger;
