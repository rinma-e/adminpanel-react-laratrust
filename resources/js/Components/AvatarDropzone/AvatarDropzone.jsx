import React, { useState, useCallback } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
    useMantineTheme,
    Avatar,
    Stack,
    Text,
    LoadingOverlay,
    ActionIcon,
    Tooltip,
    Overlay,
} from "@mantine/core";
import {
    IconUpload,
    IconX,
    IconTrash,
    IconArrowBackUp,
} from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export function AvatarDropzone({ form, name, ...props }) {
    const theme = useMantineTheme();

    // avatart from database: url or undefined
    const [avatarDB] = useState(form.values[name]);

    // set initial value to database avatar
    const [previewUrl, setPreviewUrl] = useState(avatarDB || null);

    // show/hide LoadingOverlay
    const [loadingPreview, { open: showLoading, close: hideLoading }] =
        useDisclosure(false);

    const [avatarOpacity, setAvatarOpacity] = useState(1);

    const handleDrop = useCallback((acceptedFiles, event) => {
        showLoading();
        const url = URL.createObjectURL(acceptedFiles[0]);
        form.setFieldValue(name, acceptedFiles[0]);

        const timeout = setTimeout(() => {
            setPreviewUrl(url);
            hideLoading();
            setAvatarOpacity(1);
            clearTimeout(timeout);
        }, 300);
    });

    const handleRemove = useCallback(() => {
        if (previewUrl) {
            showLoading();
            form.setFieldValue(name, null);

            URL.revokeObjectURL(previewUrl);
            const timeout = setTimeout(() => {
                setPreviewUrl(null);
                hideLoading();
                clearTimeout(timeout);
            }, 300);
        }
    }, [previewUrl, form, name]);

    const handleReset = useCallback(() => {
        if (previewUrl !== avatarDB) {
            showLoading();
            form.setFieldValue(name, avatarDB);

            const timeout = setTimeout(() => {
                hideLoading();
                URL.revokeObjectURL(previewUrl);
                setPreviewUrl(avatarDB || null);
                clearTimeout(timeout);
            }, 300);
        }
    }, [previewUrl, form, name]);

    return (
        <Stack w="fit-content" pos="relative">
            <Dropzone
                name={name}
                multiple={false}
                w={props.size ? props.size : props.w}
                h={props.size ? props.size : props.h}
                accept={props.accept || IMAGE_MIME_TYPE}
                p={props.p || 0}
                onDrop={handleDrop}
                onDragEnter={() => setAvatarOpacity(0)}
                onFileDialogOpen={showLoading}
                onFileDialogCancel={hideLoading}
                radius={props.radius || "100%"}
                // loading={loadingPreview} // makes problem when opening file dialog window (bloks on loading state) when onFileDialogOpen is used. to resolve use custom loading overlay
                classNames={{
                    inner: "w-full h-full flex justify-center items-center",
                }}
                {...props}
            >
                <Dropzone.Accept style={{ pointerEvents: "none" }}>
                    <Overlay
                        color="#fff"
                        blur={4}
                        zIndex={1}
                        radius={props.radius || "100%"}
                        center={true}
                        backgroundOpacity={0.7}
                        children={
                            <IconUpload
                                style={{
                                    width: "60%",
                                    height: "60%",
                                    color: "var(--mantine-color-blue-6)",
                                    zIndex: 2,
                                }}
                                stroke={1.5}
                            />
                        }
                    />
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <Overlay
                        color="red"
                        blur={4}
                        zIndex={1}
                        radius={props.radius || "100%"}
                        center={true}
                        children={
                            <IconX
                                style={{
                                    width: "60%",
                                    height: "60%",
                                    color: "var(--mantine-color-red-6)",
                                    zIndex: 2,
                                }}
                                stroke={1.5}
                            />
                        }
                    />
                </Dropzone.Reject>
                <LoadingOverlay
                    visible={loadingPreview}
                    overlayProps={{
                        radius: props.radius || "100%",
                        blur: 4,
                    }}
                    transitionProps={{
                        duration: 300,
                        exitDuration: 1000,
                    }}
                />
                <Avatar
                    pos="absolute"
                    top={0}
                    right={0}
                    radius={props.radius}
                    src={previewUrl}
                    styles={{
                        root: {
                            opacity: avatarOpacity,
                            zIndex: 0,
                        },
                    }}
                    className={!loadingPreview && "fade-in"}
                    alt="User avatar"
                    w="100%"
                    h="100%"
                />
            </Dropzone>
            {(avatarDB || previewUrl) && previewUrl === avatarDB && (
                <ActionIcon
                    pos="absolute"
                    top={0}
                    right={0}
                    variant="outline"
                    color={theme.colors.red[6]}
                    radius="lg"
                    aria-label="Remove avatar"
                    style={{ transform: "translateX(50%)" }}
                    onClick={handleRemove}
                >
                    <Tooltip label="Remove avatar">
                        <IconTrash
                            style={{ width: "70%", height: "70%" }}
                            stroke={2.0}
                        />
                    </Tooltip>
                </ActionIcon>
            )}
            {(avatarDB || previewUrl) && previewUrl !== avatarDB && (
                <ActionIcon
                    pos="absolute"
                    top={0}
                    right={0}
                    variant="outline"
                    color={theme.colors.orange[4]}
                    radius="lg"
                    aria-label="Reset avatar"
                    style={{ transform: "translateX(50%)" }}
                    onClick={handleReset}
                >
                    <Tooltip label="Reset avatar">
                        <IconArrowBackUp
                            style={{ width: "70%", height: "70%" }}
                            stroke={2.5}
                        />
                    </Tooltip>
                </ActionIcon>
            )}
            {props.error && (
                <Text
                    w={props.size ? props.size : props.w}
                    size="xs"
                    c="red"
                    ta="center"
                >
                    {props.error}
                </Text>
            )}
        </Stack>
    );
}

export default AvatarDropzone;
