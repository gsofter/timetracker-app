# Adding Modules with FullStack Pro Kit

In this guide, we explain how you can add new modules with FullStack-pro Kit.

## Table of Contents

* [Add New Modules](#installing-and-importing-dependencies)


## Add New Modules

Adding new modules, usually goes under `packages-modules` folder. For example to create counter module, you create

1. From root directory, create following folders by running the commands (in unix).
    ```
    mkdir -p packages-modules/counter/browser/src
    mkdir -p packages-modules/counter/servers/src

    touch packages-modules/counter/browser/src/package.json
    touch packages-modules/counter/servers/src/package.json
    ```

2. Copy following files from the existing modules,

    From one of the existing moudles, copy the following files into the new module. Make sure the browser's module are copied from another existing browsers location and similarly for server's module.

    - webpack.config.js
    - tsconfig.json


3. Copy the content of the package.json for both browser and server from the existing modules and change the `name` in the package.json to the specific name of the module you want to create. Please make sure to keep the namespace of the module uniform, if the existing module have `@admin-layout`, your new browser module's `package.json` name would be `@admin-layout/counter-browser`, similarly for server module will have `@admin-layout/counter-server`.

    ```json
    {
        "name": "@admin-layout/counter-module-browser",
        "version": "0.0.1",
        .....
        "publishConfig": {
            "access": "public"
        },
        .....

        "dependencies": {
            "@sample-stack/platform-browser": "link:../../../packages/sample-platform/browser",
        },
        "peerDependencies": {
            "@common-stack/client-react": ">=0.0.229",
            "@common-stack/core": ">=0.0.229",
            "antd": "^3.26.4"
        }
    }
    ```
    Add any additional dependencies that this module needed.

4. Then, to use the new module add to `servers` and main `package.json`

    a. In root `package.json` file add the new module where you have existing modules
    ```json
    "dependencies": {
        .....
        "@sample-stack/counter-module-browser": "link:packages-modules/counter/browser",
        "@sample-stack/counter-module-server": "link:packages-modules/counter/server",
        ....
    }
    ``` 
    b. In frontend server `servers/frontend-server` add the browser module with relative path.
    ```json
    "dependencies": {
        .....
        "@sample-stack/counter-module-browser": "link:../../packages-modules/counter/browser",
    }
    ```
    c. In backend servers `servers/backend-server` add the server module with relative path.
    ```json
    "dependencies": {
        ....
        "@sample-stack/counter-module-server": "link:../../packages-modules/counter/server",
        ....
    }
    ```

Notes:

- You may have to rerun `yarn watch` to pickup new modules
