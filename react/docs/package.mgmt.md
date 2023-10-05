
* [Local vs global vs not-installed packages](#local-vs-global-vs-not-installed-packages)
* [Use the latest version of package with `npx`](#use-the-latest-version-of-package-with-npx)
* [List global packages](#list-global-packages)
* [List the local packages](#list-the-local-packages)
* [Install package in a dev mode](#install-package-in-a-dev-mode)
* [Install the packages in a new `node_modules` folder](#install-the-packages-in-a-new-nodemodules-folder)
* [Uninstall the package](#uninstall-the-package)
* [Package version](#package-version-in-packagejson)
* [Find all not-used packages](#find-all-not-used-packages)
* [Remove the packages that are no longer listed in `package.json` file](#remove-the-packages-that-are-no-longer-listed-in-packagejson-file)
* [Show outdated packages according to your `package.json` version rules](#show-outdated-packages-according-to-your-packagejson-version-rules)
* [Check dependencies to the latest version (not only according to your `package.json` version rules)](#check-dependencies-to-the-latest-version-not-only-according-to-your-packagejson-version-rules)
* [Update versions compatible with your `package.json`](#update-versions-compatible-with-your-packagejson)
* [Updating Versions to Specific Versions](#updating-versions-to-specific-versions)
* [Update all packages to the latest version in `package.json` file](#update-all-packages-to-the-latest-version-in-packagejson-file)
* [Update packages interactively with `npm-check`](#update-packages-interactively-with-npm-check)
* [Incrementally update dependencies that don't break your tests](#incrementally-update-dependencies-that-dont-break-your-tests)
* todo 1
* [Purpose of `package-lock.json` file](#purpose-of-package-lockjson-file)

### Local vs global vs not-installed packages

* **local packages** are installed in the directory where you run `npm install <package-name>`, 
   and they are put in the `node_modules` folder under this directory.
  Such packages are used by your application. The application depends on those packages.
* **global packages** are all put in a single place in your system (exactly where depends on your setup), 
   regardless of where you run `npm install -g <package-name>`
   Such packages are not used by the application directly, but can be used to create such application, 
   for instance `create-react-app`.
   Other examples of global packages are those, that help to analyze dependencies, like: 
  * `npm-check-update`
  * `npm-check`
  * `depcheck`
* alternatively to global installation, you could use [`npx`](https://www.npmjs.com/package/npx)
   It allows to download and run packages. You could run them as: `npx <package-name>`.
  This helps to avoid the conflict that occurs 
  when one version of a package in your project isn't compatible with the one in another project. 
  So you can manage different projects without worrying about incompatibility of one with the other.

### Use the latest version of package with `npx`

```bash
npx <package>@latest
```

It might be useful to clean also cache:
```bash
npm cache clean --force
npx clear-npx-cache
```

### List global packages

```bash
npm list -g --depth 0
```

### List the local packages

```bash
npm list
```
or:
```bash
npm list --depth=0 
```
`depth=0` flag restricts the search to top level packages.

### Install package in a dev mode

`npm install --save-dev ${package}` or `npm i -D ${package}`

Example of installation of `npm-run-all`:
`npm install npm-run-all --save-dev`

### Install the packages in a new `node_modules` folder

```bash
rm -rf node_modules
npm install
```

### Uninstall the package

```bash
npm uninstall <package-name>
```
The `uninstall` command removes the package from 
* `node_modules` folder
* and within the `package.json` file removes it from
  * `dependencies`
  * `devDependencies`
  * `optionalDependencies`
  * `peerDependencies`

To keep the package within the `package.json` file, run with `--no-save`:

```bash
npm uninstall --no-save <package-name>
```

### Package version in `package.json`

Given a version number MAJOR.MINOR.PATCH, increment the:

* MAJOR version when you make incompatible API changes
* MINOR version when you add functionality in a backward compatible manner
* PATCH version when you make backward compatible bug fixes

1. exact version

    `"webpack": "4.6.0"`

    This `4.6.0` version and this version only should be installed

2. any higher patch revisions can be updated, with `~`

    `"webpack-hot-middleware": "~2.22.1"`

    This version and any higher patch revisions in the `2.22.X` version range can be installed. 

    For example, `2.22.2`, `2.22.3`, but not `2.23.1` or `2.22.0`.

3. any higher minor and patch revisions can be updated, with `^`

    `"webpack-cli": "^2.1.2"`
    
    This version and any higher minor and patch revisions in the `2.1.X` version range can be installed. 
    
    For example, `2.1.3`, `2.3.10`, but not 2.1.1.

4. any version with wildcard

    `"jquery": "*"`

    `*`, `x`, or `X` are used as wildcards in specifying versions. Valid formats are `*`, `1.*`, `1.*.*`, etc.

### Find all not-used packages

```bash
npx depcheck
```
or:
```bash
npx depcheck --detailed
```

### Remove the packages that are no longer listed in `package.json` file

After manual removal of not-used packages from `package.json`, run:
```bash
npm prune
```

### Checks for security vulnerabilities

```bash
npm audit
```

### Show outdated packages according to your `package.json` version rules

```bash
npm outdated
```

Shows which packages can be updated according to your `package.json` version rules.
This is why some packages don't show updates even though newer packages are available.

### Check dependencies to the latest version (not only according to your `package.json` version rules)

1. [`npm-check-updates`](https://www.npmjs.com/package/npm-check-updates)
   a tool for updating all dependencies to the latest versions in your project. 

    **Be careful as this will update the major versions as well. You might have some breaking changes to fix.**

    Run:
    ```bash
    npx npm-check-updates
    ```
   
   Or alternatively install `npm-check-updates` tool globally:
   ```bash
   npm i -g npm-check-updates
   ```
   or update it if you've installed it previously:
   ```bash
   npm update -g npm-check-updates
   ```
   
   display all possible updates, run:
   ```bash
   ncu
   ```

2. [`npm-check`](https://www.npmjs.com/package/npm-check)
   gives more information about the version changes available

    ```bash
    npx npm-check
    ```
    
   Or install globally:
   ```bash
   npm i -g npm-check
   ```
   or update it if you've installed it previously:
   ```bash
   npm update -g npm-check
   ```

   display all possible updates, run:
   ```bash
   npm-check
   ```

### Update versions compatible with your `package.json`

```bash
npm update
```

`npm update` can be run against a specific package

### Updating Versions to Specific Versions

Use `npm install` instead of `npm update`:
```bash
npm install package@version
```
update to the latest version:
```bash
npm install react@latest
```

### Update all packages to the latest version in `package.json` file

Note: you could run `ncu` in interactive mode with `ncu --interactive`, or `ncu -i`

Running `ncu -u` will update all packages to the latest version in `package.json` file. 
Run `npm install` after it finishes to install the dependencies.

```bash
ncu -u
npm install
```

To ignore certain packages when checking for updates, run with `-x` or `--reject` flag:
```bash
ncu -u -x mobx,query-string
npm install
```

### Update packages interactively with `npm-check`

```bash
npm-check -u
```

Note: you could run `npm-check-updates` in interactive mode with `ncu --interactive`, or `ncu -i`

### Incrementally update dependencies that don't break your tests

Run:
```bash
ncu --doctor -u
```

The general flow of `--doctor` mode is the following:
1. Runs npm install and npm test to make sure everything is passing before upgrading anything 
2. Runs ncu -u to upgrade ALL of the dependencies and installs those upgrades 
3. Runs npm test again to see if they pass. If the tests pass, then exit 
4. If the tests fail, then restore the package.json file 
5. Then start again, but for each dependency, install an upgrade and re-run the tests 
6. If a breaking upgrade is found, save the partially upgraded package.json to the version that worked


### todo 1

To have a place where to write down the dependencies that shouldn't be updated anymore, the above command can be added to the scripts inside package.json like this:

{
"name": "my-project",
"scripts": {
"update": "ncu -u -x mobx,query-string"
}
}
Always remember to update through npm run update

### Purpose of `package-lock.json` file

Any changes to the `node_modules` tree or `package.json` will automatically generate a `package-lock.json` file.


### todo 2

Determining which global packages need updating
npm outdated -g --depth=0
Check global packages:
ncu -g

To automatically update all global packages to the 'Latest' version:

npx npm-check --global --update-all
or
npm update -g

### todo 3


245 packages are looking for funding
run `npm fund` for details

8 vulnerabilities (2 moderate, 6 high)

To address all issues (including breaking changes), run:
npm audit fix --force

Run `npm audit` for details.


###

npm version <update_type> and others
https://www.npmjs.cn/getting-started/publishing-npm-packages/

###