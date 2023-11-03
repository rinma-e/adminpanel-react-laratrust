## Important

<p>For inertia to work in localhost with projects in subfolder in file <br/>

    \vendor\inertiajs\inertia-laravel\src\Response.php

in method "toResponse" this line needs to be changed from

    'url' => $request->getBaseUrl().$request->getRequestUri()

to<br/>

    'url' => $request->getBaseUrl().$request->getPathInfo()

</p>

<p>
To have https work in localhost and your project accessible to all devices conected to LAN in .env
    
1. change http to https in:<br/>
   APP_URL=https://PROJECT_NAME.test
2. add this lines   
    VITE_ASSET_HOST="PROJECT_NAME.test"<br/>
    VITE_ASSET_PORT=5173<br/>
    VITE_PRIVKEY_PATH="e:/laragon/etc/ssl/laragon.key"<br/>
    VITE_CERT_PATH="e:/laragon/etc/ssl/laragon.crt"
</p>
