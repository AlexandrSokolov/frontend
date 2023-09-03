### Update/or install `nvm`, `node`, `npm`

##### `nvm` - [node version manager](https://github.com/nvm-sh/nvm)

* Find the currently available versions: [Releases](https://github.com/nvm-sh/nvm/releases)
* Install or update, for instance for `v0.39.2` version:
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
  source ~/.profile
  source ~/.bashrc
  ```
  **Note:** For update you should not remove the previous version. The script overwrites the existing one.

  The script clones `nvm` repository to `~/.nvm`, and attempts to add the source lines from the snippet below
  to the correct profile file (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).

  Nvm installation path variable: `export NVM_DIR="$HOME/.nvm"`
* Check the installed/updated version:
  ```bash
  nvm --version
  ```
  Output: `0.39.2`

##### `node` installation/update

* Make sure you did not install `nodejs` globally:
  ```bash
  sudo apt-get remove --purge nodejs
  ```
* List of node versions:
  * only LTS versions:
  ```bash
  nvm ls-remote | grep -i "latest lts"
  ```
  * all available versions:
  ```bash 
  nvm ls-remote
  ```
* List of installed versions:
  ```bash
  nvm ls
  ```
  Output:
  ```bash
         v12.20.2
  ->     v18.12.1
         v18.17.1
  ```
* Install new specific version:
  ```bash
  nvm install v18.17.1
  ```
  Note: this version is becoming a default one only for the current bash session!
* Switch to one of the previously installed versions:
  ```bash
  nvm use v18.17.1
  ```
* Set permanently default version:
  ```bash
  nvm alias default v18.17.1
  ```
  Note: without this alias, each time after restart or in a new terminal session the previous default version is used
* Uninstall specific version:
  ```bash
  nvm uninstall v12.20.2
  ```
* Check `node` version:
  ```bash
  node --version 
  ```

##### `npm` - node package manager

Note: you should avoid manual installation of `npm`.
`npm` gets updated/installed during `nvm` installation/update.
Its version must be aligned with version of `node`.

[Node and npm version compatibility](https://nodejs.org/en/download/releases/)

Check `npm` version:
```bash
npm --version
```

##### Check installed versions of `node`, `npm`, `npx`, `yarn`, and `pnpm`
```bash
npm install check-node-version
npx check-node-version --print
```

### Install React Dev Tools

[React Developer Tools Chrome extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

