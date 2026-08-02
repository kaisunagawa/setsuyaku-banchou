# せつやく番長（スマホ版フロント）

資金のピンチは、俺が止める。

このリポジトリは **画面だけ** です。計算とデータは Google スプレッドシート側（`shushi-tracker`）にあります。

```
[ GitHub Pages ]  index.html （この画面）
        │  POST（Content-Type: text/plain → CORSプリフライトを避ける）
        ▼
[ GAS Webアプリ ]  doPost → apiHandle_ → apiStats_
        │
        ▼
[ スプレッドシート ]  取引明細・設定・入金予定
```

## 使い方

初回だけ合言葉つきで開きます。以降は端末が覚えます。

```
https://<ドメイン>/?k=<合言葉>
```

## ローカルで確認する

```bash
python3 -m http.server 4700 --directory ~/Projects/setsuyaku-banchou
```

## 公開する

1. GitHub にリポジトリを作る（名前に個人名は入れない）
2. `git remote add origin <URL> && git push -u origin main`
3. Settings → Pages → Source: `main` / root
4. 独自ドメインを使う場合は Settings → Pages → Custom domain に入力（`CNAME` ファイルが自動で作られる）

## 触るときの注意

- **金額データは絶対にキャッシュしない。** `sw.js` は `script.google` へのリクエストを素通しにしている。画面の枠だけキャッシュする。
- **この画面で計算しない。** 表示だけ。数字を変えたいときは GAS 側（`apiStats_`）を直す。そうしないと税理士パック・試算表と数字がズレる。
- `@media` の中で `.sect{display:block !important}` を書かないこと。危機カードのグリッドを潰した（実際に潰れた）。
- GAS 側の `?api=` は既存の HTML 版と並行して動いている。HTML 版を消さないこと。

## まだやっていないこと

- ログイン認証（今は合言葉のみ。金額が出る画面が公開ホストに載っている）
- 更新処理（1〜2分かかる）の進捗表示
