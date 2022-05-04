# asana_highlighter

Asana のソースコードをハイライトする Chrome 拡張

## 環境構築

- ライブラリインストール

  ```sh
  yarn install
  ```

- chrome 拡張をビルド

  ```sh
  yarn webpack
  ```

  `dist`フォルダにビルド結果が保存される

- 拡張機能のインストール
  - 今のところはストアに申請してないため、ソースコードを直接読み込む形式とする
  - Chrome -> 拡張機能の管理 -> 「デベロッパーモード」を ON -> パッケージ化されてない拡張機能を読み込む -> `${project-dir}/dist` を指定
