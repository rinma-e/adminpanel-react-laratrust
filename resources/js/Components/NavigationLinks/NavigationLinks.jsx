import React from "react";
import { Link } from "@inertiajs/react";
import { NavLink } from "@mantine/core";

const NavigationLinks = ({ links, linkClass }) =>
    links.map((link, index) => (
        <NavLink
            component={route().current(link.link) ? "div" : Link}
            href={route(link.link)}
            w="auto"
            h="100%"
            label={link.label}
            key={index}
            noWrap
            className={linkClass}
            classNames={{ label: "text-lg" }}
            variant="subtle"
            data-active={route().current(link.link)}
        />
    ));

export default NavigationLinks;
