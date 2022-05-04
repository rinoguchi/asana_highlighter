# asana_highlighter

Asana のソースコードブロックを highlight.js でハイライトするだけの Chrome 拡張

## 環境構築と動作確認

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
  - Chrome -> 拡張機能の管理 -> 「デベロッパーモード」を ON -> パッケージ化されてない拡張機能を読み込む -> `${project-dir}/dist` を指定

