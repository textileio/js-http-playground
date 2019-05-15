JS-HTTP-Client Playground
-------------------------

The playground provides a set of useful examples for you to use the `@textile/js-http-client` library. To make use of these examples, we recommend downloading and running the source code in [VSCode](https://code.visualstudio.com/). 

## Setup

Clone this repository.

```bash
git clone git@github.com:textileio/js-http-playground.git
cd js-http-playground
```

Install the dependencies,

```bash
yarn
```

Finally, open the project in VSCode.

## Explore

Examples are broken out in the folder called, `recipes`. For example, if you want to explore `Contact Search`, in VSCode open the file found at, `recipes/Contacts/index.test.ts`. 

Inside that file is a test that runs live code from `@textile/js-http-client` against your locally running Textile peer. If you haven't already, setup your local Textile peer. You can run your peer through either the Desktop application or from the command-line daemon. 

[Desktop instructions](https://docs.textile.io/install/desktop/)

[Daemon instructions](https://docs.textile.io/install/the-daemon/)

## Run an example

Using VSCode, you can run any example in the recipes very easily. 

1. Navigate to the index file for the example you'd like to run and double-click it within VSCode (e.g. open `recipes/Contacts/index.test.ts`)
2. In the lefthand menu, select `Debug` (the crossed out bug icon)
3. In the upper-left, there is a drop menu beside a green play button. Choose `Current File`.
4. Click the green play button to see the series of examples in the file execute sequentially.

![VSCode](https://raw.githubusercontent.com/textileio/js-http-playground/master/assets/vscode.gif)

