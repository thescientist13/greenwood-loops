# greenwood-loops

Repo for a minimal reproduction of a recent Greenwood regression involving the CLI running multiple times.

## Setup

1. Clone the repo
1. Have Node LTS installed
1. Run `npm ci`


## Issue (`verbatimModuleSyntax`)

When running `npm run dev` the Greenwood CLI is getting invoked multiple times

```
➜  greenwood-loops git:(master) ✗ npm run dev

> greenwood-loops@1.0.0 dev
> NODE_OPTIONS='--import @greenwood/cli/register' greenwood develop

-------------------------------------------------------
Welcome to Greenwood (v0.32.0-alpha.0) ♻️
-------------------------------------------------------
Initializing project config
Initializing project workspace contexts
Generating graph of workspace files...
building from local sources...
-------------------------------------------------------
Welcome to Greenwood (v0.32.0-alpha.0) ♻️
-------------------------------------------------------
Initializing project config
Running Greenwood with the develop command.
Started local development server at http://localhost:1984
Now watching workspace directory (./src) for changes...
Initializing project workspace contexts
Generating graph of workspace files...
building from local sources...
-------------------------------------------------------
Welcome to Greenwood (v0.32.0-alpha.0) ♻️
-------------------------------------------------------
Initializing project config
Running Greenwood with the  command.

          Error: not able to detect command. try using the --help flag if 
          you're encountering issues running Greenwood.  Visit our docs for more 
          info at https://www.greenwoodjs.dev/.
```

The issue goes away if setting `"verbatimModuleSyntax": true` in _tsconfig.json_.

----

Seems to be an issue with export maps get resolved in this situation?  Currently Greenwood exports look like this

```json
{
  "exports": {
    ".": {
      "types": "./src/types/index.d.ts",
      "import": "./src/index.js"
    },
    "./register": "./src/register.js",
    "./src/*": "./src/*"
  }
}
```

The issue would go away as well if the structure would change, but then types would have to be imported as `@greenwood/cli/types` 

```json
{
  "exports": {
    ".": "./src/index.js",
    "./register": "./src/register.js",
    "./src/*": "./src/*",
    "./types": "./src/types/index.d.ts"
  }
}
```