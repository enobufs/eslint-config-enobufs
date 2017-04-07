# eslint-config-enobufs
ESLint shareable config for enobufs' projects.

## Installation

### Install from package.json
Add folling to your `package.json`:

```js
{
    "scripts": {
        "lint": "eslint ."
    },
    "devDependencies": {
        "eslint": "^3.19.0",
        "eslint-config-enobufs": "git+ssh://git@github.com:enobufs/eslint-config-enobufs.git"
    },
    "eslintConfig": {
        "extends": "enobufs"
    }
}
```

Optionally, you can add local rules inside the `eslintConfig` section like this:

```js
    "eslintConfig": {
        "rules": {
            "no-console": 0
        },
        "extends": "enobufs"
    }
```

### Extend eslint-config-enobufs in your .eslintrc
You may want to use ESLint at locations where package.json with eslintConfig is not present. In this case, you can install `eslint-config-enobufs` globally, then modify your `$HOME/.eslintrc` like following:

* Installing eslint-config-enobufs globally:

```
$ npm install -g git+ssh://git@github.com:enobufs/eslint-config-enobufs.git
```

* Modify your `$HOME/.eslintrc`:

```js
{
    "extends": "enobufs"
}
```

> You may also like to create `.eslintrc` in each project root so that it can apply project specific rules, or use specific versions of eslint and eslint-config-enobufs installed for your project.

## Usage

To run eslint:

```
$ npm run lint
```

## Note
* ESLint v3.0.0 or greater is RECOMMENDED.

