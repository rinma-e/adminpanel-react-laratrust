import { useEffect } from "react";
import {
    useMantineColorScheme,
    useMantineTheme,
    Switch,
    rem,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export default function ThemeSwitcherButton({
    size,
    color,
    onLabel,
    offLabel,
    ...props
}) {
    const iconSizes = {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 20,
        xl: 26,
    };

    size = size && size in iconSizes ? size : "md";
    color = color ? color : "dark.4";
    const theme = useMantineTheme();
    const { colorScheme, setColorScheme } = useMantineColorScheme({
        keepTransitions: true,
    });

    const sunIcon = (
        <IconSun
            size={iconSizes[size]}
            stroke={2.5}
            color={theme.colors.yellow[4]}
        />
    );

    const moonIcon = (
        <IconMoonStars
            size={iconSizes[size]}
            stroke={2}
            color={theme.colors.blue[6]}
        />
    );

    useEffect(() => {
        setColorScheme(colorScheme);
    }, [colorScheme]);

    // disable transitions when color scheme changes on all elements,
    // except elements that have "keep-transition" class (only on that element),
    // or to elements that have "keep-transition-children" class that will also keep transitions on all element children
    function disableTransition() {
        const style = document.createElement("style");
        style.innerHTML =
            "*:not(.keep-transition, .keep-transition-children, .keep-transition-children *), *:not(.keep-transition, .keep-transition-children, .keep-transition-children *)::before, *:not(.keep-transition, .keep-transition-children, .keep-transition-children *)::after {transition: none !important;}";
        style.setAttribute("data-mantine-disable-transition", "true");
        document.head.appendChild(style);
        const clear = () =>
            document
                .querySelectorAll("[data-mantine-disable-transition]")
                .forEach((element) => element.remove());
        return clear;
    }

    const handleClick = () => {
        setColorScheme(colorScheme === "light" ? "dark" : "light");
        const clearStylesTag = disableTransition();
        const clearStyles = window.setTimeout(() => {
            clearStylesTag();
            window.clearTimeout(clearStyles);
        }, 10);
    };

    return (
        <Switch
            checked={colorScheme === "dark"}
            size={size}
            color={color}
            onLabel={onLabel ?? sunIcon}
            offLabel={offLabel ?? moonIcon}
            onClick={() => handleClick()}
            className="keep-transition-children"
            {...props}
        />
    );
}
