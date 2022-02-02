# nodejs-concepts

---
**IMPORTANT**

Please read this document fully (preferably using a markdown viewer) before working on this project for the first time. Later, update the file as and when you see fit.

---

## About This Project

This project is meant to illustrate the basic concepts of JavaScript and NodeJS. The primary objective is to be a refresher before an interview.

## First Time Setup for Developers
  
### Step 1: Install project packages and dependencies using `npm`

- Run `npm install` in the project root folder (where you can see a file called `package.json`). 
- Please note that any time there is change in `package.json` (due to other developers having installed/updated/uninstalled packages), all you need to do is run `npm install`.

### Step 2: Setup IDE

- Install IDE - `Visual Studio Code` (recommended IDE)

### Step 3: Run scripts (when required)

- The scripts for different purposes are defined in `package.json`. You can run them using the command `npm run <stript_name>`


## General Coding Guidelines

- Read and follow the guidelines mentioned below:

  Google JavaScript Style Guide (JavaScript specific, but can be applied to TypeScript too) - https://google.github.io/styleguide/jsguide.html

## Specific Coding Guidelines For This Project

1. All the project code files can be found in the folder `src` and the starting file is `server.js`.

2. Before committing changes, check for any stylistic errors and warnings by executing the command `npm run lint` and fix all the lint errors.
   Reason: Lint errors are not compile errors but stylistic errors based on analysis done using custom rules. Checking and fixing lint errors is the primary method for following coding standards.

3. After making changes to a file, always format the code (by pressing `ALT+SHIFT+F` if using VS Code)
   Reason: Keeps the spacings and format uniform regardless of the developer.

4. Execute the command `npm run prod` at least occassionally, if not every time before committing.
   Reason: Executing `npm run prod` would surface warnings and errors which may be silent in development compilation `npm run dev` especially since `webpack` bundling is used only in production.

5. If confused about which response code to use, follow the below convention: -
   ```
   * 1xx - INFORMATIONAL (not much used in general)
   * 2xx - SUCCESS
     200 - Ok (this is generic; use specific 2xx codes below if possible)
     201 - Resource created
     202 - Resource accepted (this means operation will be carried out asynchronously)
     204 - No content (for example: resource deleted)
   * 3xx - REDIRECT
     301 - Resource moved permanently
     302 - Resource moved temporarily
   * 4xx - CLIENT ERROR
     400 - Bad request (this is generic; use specific 4xx codes below if possible)
     401 - Authentication
     403 - Forbidden (user could be authenticated, but no permission)
     404 - Not found (resource/uri is non-existent)
   * 5xx - SERVER ERROR (nothing that Client/Caller can do about)
   ```

## Deployment

- For deployment, execute "npm run prod" and copy the contents inside `dist/prod` in the destination server. To run, execute the command `node server.bundle.js`.
