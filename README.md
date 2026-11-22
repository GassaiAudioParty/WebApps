# WebApps

GitHub Pages で公開するWebアプリ置き場。

## Chord Sketch（`chord-sketch/`）

コード進行とドラムをスケッチして試聴するツール。オフラインで動くPWA。

- 公開URL: `https://<アカウント>.github.io/<リポジトリ名>/chord-sketch/`
- iPad: Safariで開き、共有 →「ホーム画面に追加」。一度開けばオフラインでも起動する。
- 更新: `chord-sketch/index.html` を差し替えてpushするだけ（オンラインで開いた時に新しい版を取り込む）。
  ファイルを増やしたときだけ `sw.js` の `VERSION` と `FILES` を更新する。

| ファイル | 役割 |
|---|---|
| `index.html` | アプリ本体 |
| `manifest.webmanifest` | アプリ名・アイコン・全画面表示の設定 |
| `sw.js` | オフライン用（サービスワーカー） |
| `icons/` | ホーム画面のアイコン |

設計書とテストは claude.ai のプロジェクト「リトルスタジオインブラウザ」にある（`DESIGN.md`, `claude/chord-sketch-tests.mjs`）。
