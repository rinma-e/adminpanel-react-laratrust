## Important

<p>For inertia to work in localhost with projects in subfolder in file <br/>

    \vendor\inertiajs\inertia-laravel\src\Response.php

in method "toResponse" this line needs to be changed from

    'url' => $request->getBaseUrl().$request->getRequestUri()

to<br/>

    'url' => $request->getBaseUrl().$request->getPathInfo()

</p>
