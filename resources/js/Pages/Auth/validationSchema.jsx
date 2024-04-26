import { z } from "zod";

// password validation tests
const MIN_LENGTH = 8;
const PASSWORD_VALIDATION = {
    TEST: {
        MIN_LEN: (value) => value.length >= MIN_LENGTH,
        SPECIAL_CHAR: (value) =>
            /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(value),
        LOWERCASE: (value) => /[a-z]/.test(value),
        UPPERCASE: (value) => /[A-Z]/.test(value),
        NUMBER: (value) => /.*[0-9].*/.test(value),
    },
    MSG: {
        MIN_LEN: `Password must have at least ${MIN_LENGTH} characters`,
        SPECIAL_CHAR: "Password must contain at least one special character",
        LOWERCASE: "Password must contain at least one lowercase letter",
        UPPERCASE: "Password must contain at least one uppercase letter",
        NUMBER: "Password must contain at least one number",
        MATCH: "Password must match",
    },
};

// image validation tests
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
];

const ACCEPTED_IMAGE_SIZE_MB = 2;
const ACCEPTED_IMAGE_SIZE_KB = ACCEPTED_IMAGE_SIZE_MB * 1024 * 1024; // 2MB
const IMAGE_VALIDATION = {
    TEST: {
        MIME_TYPE: (file) => {
            return ACCEPTED_IMAGE_TYPES.includes(file?.type);
        },
        MAX_SIZE: (file) => file?.size <= ACCEPTED_IMAGE_SIZE_KB,
    },
    MSG: {
        MIME_TYPE: `Invalid file type. Accepted types: ${ACCEPTED_IMAGE_TYPES.join(
            ", "
        )}`,
        MAX_SIZE: `Image file size must be less than ${ACCEPTED_IMAGE_SIZE_MB}MB`,
    },
};

export const validationSchema = z
    .object({
        first_name: z
            .string()
            .min(2, { message: "Name should have at least 2 letters" })
            .max(255, { message: "Name should have at most 255 letters" })
            .optional(),
        last_name: z
            .string()
            .min(2, { message: "Name should have at least 2 letters" })
            .max(255, { message: "Name should have at most 255 letters" })
            .optional(),
        email: z
            .string()
            .min(1, { message: "Email is required" })
            .email({ message: "Entered email is not valid" })
            .optional(),
        password: z.string().optional(),
        password_confirmation: z.string().optional(),
        avatar: z.any().optional(),
    })
    .superRefine(({ password, password_confirmation, avatar }, ctx) => {
        // perform all the tests from the PASSWORD_VALIDATION object
        if (password && password_confirmation) {
            for (const field in PASSWORD_VALIDATION.TEST) {
                // if one of the tests fails create an issue with the error message
                if (!PASSWORD_VALIDATION.TEST[field](password)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: PASSWORD_VALIDATION.MSG[field],
                        path: ["password"],
                        fatal: true,
                    });

                    // stop the validation if current tests fails
                    return z.NEVER;
                }
            }

            if (password !== password_confirmation) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: PASSWORD_VALIDATION.MSG.MATCH,
                    path: ["password_confirmation"],
                    fatal: true,
                });

                // stop the validation if current tests fails
                return z.NEVER;
            }
        }

        // perform all the tests from the IMAGE_VALIDATION object
        if (avatar && typeof avatar === "object") {
            for (const field in IMAGE_VALIDATION.TEST) {
                // if one of the tests fails create an issue with the error message
                if (!IMAGE_VALIDATION.TEST[field](avatar)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: IMAGE_VALIDATION.MSG[field],
                        path: ["avatar"],
                        fatal: true,
                    });

                    // stop the validation if current tests fails
                    return z.NEVER;
                }
            }
        }
    });
