import { useState } from "react";
import { IconX, IconCheck } from "@tabler/icons-react";
import { PasswordInput, Progress, Text, Popover, Box } from "@mantine/core";

function PasswordRequirements({ meets, label }) {
    return (
        <Text
            c={meets ? "teal" : "red"}
            style={{ display: "flex", alignItems: "center" }}
            mt={7}
            size="sm"
        >
            {meets ? <IconCheck size={14} /> : <IconX size={14} />}{" "}
            <Box component="span" ml={10}>
                {label}
            </Box>
        </Text>
    );
}

const requirements = [
    { re: /[0-9]/, label: "one number" },
    { re: /[a-z]/, label: "one lowercase letter" },
    { re: /[A-Z]/, label: "one uppercase letter" },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "one special symbol" },
];

function getStrength(password, pass_length) {
    let multiplier = password.length >= pass_length ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export function PasswordWithRequirements({
    name,
    value,
    onChange,
    onFocus,
    onBlur,
    error,
    minPasswordLength,
    progressBar,
    ...props
}) {
    const [popoverOpened, setPopoverOpened] = useState(false);

    const checks = requirements.map((requirement, index) => (
        <PasswordRequirements
            key={index}
            label={requirement.label}
            meets={requirement.re.test(value)}
        />
    ));

    const strength = getStrength(value, minPasswordLength);
    const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

    return (
        <Popover
            opened={popoverOpened}
            position="bottom-start"
            shadow="sm"
            // width="target"
            transitionProps={{ transition: "pop" }}
        >
            <Popover.Target>
                <div
                    onFocusCapture={() => setPopoverOpened(true)}
                    onBlurCapture={() => setPopoverOpened(false)}
                >
                    <PasswordInput
                        {...props}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        error={error}
                    />
                </div>
            </Popover.Target>
            <Popover.Dropdown>
                {progressBar && (
                    <Progress color={color} value={strength} size={5} mb="xs" />
                )}
                <Text size="sm">Password must include at least:</Text>
                <PasswordRequirements
                    label={
                        minPasswordLength +
                        " characters (you have " +
                        value.length +
                        ")"
                    }
                    meets={value.length >= minPasswordLength}
                />
                {checks}
            </Popover.Dropdown>
        </Popover>
    );
}

export default PasswordWithRequirements;
