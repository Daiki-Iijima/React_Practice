# React_Practice

React を勉強するためのリポジトリ

## 環境構築

Docker と VSCode の Dev Container を使う

Docker はインストール済みとする

### 1. Dev Container の準備

このリポジトリをクローンする前に、新規フォルダを作成

```bash
$ mkdir react_practice_root
$ cd react_practice_root
```

その後、Dev Container 用のフォルダファイルを生成

```bash
$ mkdir .devcontainer
$ cd .devcontainer
$ touch devcontainer.json
```

`.devcontainer/devcontainer.json` に以下の内容を記述

````json
.devcontainer/devcontainer.json{
	"name": "Node.js",
	"image": "mcr.microsoft.com/devcontainers/javascript-node:0-18",
	"appPort": ["3000:3000"],
	"postCreateCommand": "yarn install",
	"customizations": {
		"vscode": { "extensions": ["esbenp.prettier-vscode"] }
	}
}
```

### 2. リポジトリのクローン

react_practice_rootに移動して、プロジェクトをクローンする

```bash
git clone https://github.com/Daiki-Iijima/React_Practice.git
```

### 3. 実行

クローンして初めて実行する場合は、以下のコマンドで必要なライブラリなどをプロジェクトに導入する必要がある

```
$ cd プロジェクト
$ npm install
```

その後、以下のコマンドで実行

```
$ npm start
```

### 参考

https://note.com/shift_tech/n/nf9c647e5264c
````
