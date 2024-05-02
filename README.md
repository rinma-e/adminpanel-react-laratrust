# Laravel breeze:react with Mantine components

## About

Laravel's breeze:react package rewritten with [Mantine](https://mantine.dev/) components and some additional features added:

-   user roles and permissions with [Laratrust](https://laratrust.santigarcor.me/). Super admin role applied via gates so no need to have any permissions assignet to it in Laratrust,
-   added avatar support for users,
-   mantine theme primary color change support,
-   dark/light switch,
-   admin panel for managing roles, permissions and users.

## Usage

### Installation

1. Clone this repo,
2. Run `composer init`,
3. Run `npm install`.

### Running development server

To start development server run:

    npm run dev

### Building assets

To build assets run:

    npm run build

### Previewing production

To see your project with built assets don't run dev server, but depending on your enviroment:

1. just open your browser and navigate to your project folder
2. or run `artisan serve`

Project is served with static assets so you can preview production project in localhost.

### Testing features that require email verifications

For testing that require email verifications in `.env` file make below changes:

    MAIL_MAILER=log
    MAIL_HOST=127.0.0.1
    MAIL_PORT=2525

This will send all emails to `log` file located in:

    storage/logs/laravel.log

Scroll at bottom of the file and find email. In email body find verification link which You can copy/past in browser.

## Important

### Inertia in environments with projects in subfolder

For inertia to work in environments with projects in subfolder (shared hosts, XAMP, Laragon,...) in file:

    \vendor\inertiajs\inertia-laravel\src\Response.php

in method `toResponse` this line needs to be changed from

    'url' => $request->getBaseUrl().$request->getRequestUri()

to<br/>

    'url' => $request->getBaseUrl().$request->getPathInfo()

### HTTPS and virtual hosts

To have https and virtual hosts work chanage/add this lines to laravels `.env` file :

1.  change http to https folowed by virtual host name in:

        APP_URL=https://PROJECT_NAME.test

2.  add this lines at bottom of `.env` file:

        VITE_ASSET_HOST="PROJECT_NAME.test"
        VITE_ASSET_PORT=5173
        VITE_PRIVKEY_PATH="path_to_key_file"
        VITE_CERT_PATH="path_to_crt_file"

    In parameters `VITE_PRIVKEY_PATH` and `VITE_CERT_PATH` put path to your key and certification files (self-sigend or other).</br>
    Example: I am using Laragon as development envirement which has it's own self-signed cerificate, so parametes are:

        VITE_PRIVKEY_PATH="e:/laragon/etc/ssl/laragon.key"
        VITE_CERT_PATH="e:/laragon/etc/ssl/laragon.crt"

In `vite.config.js` file add this lines:

    import { loadEnv } from "vite";
    import fs from "fs";
    const env = loadEnv("all", process.cwd());

Add this to `defineConfig` object:

    server: {
        host: true,
        port: env.VITE_ASSET_PORT,
        strictPort: true,
        hmr: {
            host: env.VITE_ASSET_HOST,
            port: env.VITE_ASSET_PORT,
        },
        https: {
            key: fs.readFileSync(env.VITE_PRIVKEY_PATH, "utf8"),
            cert: fs.readFileSync(env.VITE_CERT_PATH, "utf8"),
        },
        cors: true,
    }

## To-do

-   [x] Add Laratrust package.
-   [x] Add roles and permissions to Laratrust via laratrust seeder.
-   [x] Add Mantine components package.
-   [x] Add Mantine theme provider to app.jsx.
-   [x] Change default project font to Poppins.
-   [x] Configure Mantine and Tailwind to work together.
-   [x] Create primary color changer functionality for Mantine theme.
-   [x] Create dark/light switch component that changes dark/light mode.
-   [x] Add Zod validation schema for client side validation of forms.
-   [x] Rewrite breeze:react package with Mantine components:
    -   [x] Guest Layout,
    -   [x] Authentication Layout,
    -   [x] Welcome page,
    -   [x] Registration page,
    -   [x] Login page,
    -   [x] Forgot password page,
    -   [x] Password reset page,
    -   [x] Confirm password page,
    -   [x] Verify email page,
    -   [x] Edit profile page,
    -   [x] Dashbord.
-   [x] Create User store request and customize error messages.
-   [x] Create Password update request and customize error messages.
-   [x] Create validation shema for client side validation of forms.
-   [x] Create component to show password requirement fulfilment list (PassworWithRequirements).
-   [x] Add user avatar support to backend:
    -   [x] update User model,
    -   [x] update UserStoreRequest,
    -   [x] update RegisterUserController,
    -   [x] update ProfileController,
    -   [x] update ProfileUpdateRequest.
-   [x] Create input component for user avatar that will also show preview before upload (AvatarDropzone).
-   [x] Add AvatarDropzone to registration and profile edit pages.
-   [x] Add avatar support on UserButton component
-   [x] Add bundle compression plugin to Vite.
-   [x] Add 'super-admin' role that has all permissions via laravel gates (in this way 'super-admin' has all permissions without need to add them all in Laratrust).
-   [x] Add roles and permissions to user array returned from User model.
-   [x] Store links in to separate central file for easier access and modification.
-   [x] Add role to links array so links could be shown/hidden based on roles (no role parameter defined or 'role:all' will show link to every user)
-   [ ] Create Admin panel for managing:
    -   [ ] users,
    -   [ ] roles,
    -   [ ] permissions.
-   [ ] Create pacage from this project.
