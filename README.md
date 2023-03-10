# Kin Wallet

The Kin Wallet is a web application that allows users to manage their legacy multi-sig Kin accounts. The wallet enables you to sign a multi-sig transaction for an account that was created before the standard SPL derivation path was set.

You don't need to use this tool unless you have an account that was created before the standard derivation path was set. If you are unsure, please contact the Kin Foundation.

<img src="https://user-images.githubusercontent.com/623790/224407254-840c4281-8a87-408c-80c7-6388553b2e8a.png" width="400">

## Quick Start

The project is built using [Vue 3](https://v3.vuejs.org/) and [Vite](https://vitejs.dev/). To get started, clone the repository and install the dependencies.

### Install Dependencies

```bash
npm install
```

### Run the App

```bash
npm run dev
```

### Build the App

```bash
npm run build
```

### Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
