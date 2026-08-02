# Higgsfield で番長を動かす手順

アプリ側はもう対応済みです。**書き出したファイルを `assets/` に置いて push するだけ**で動画に切り替わります。
置いていない間は静止画（＋CSSの揺れ）のままなので、途中で止まっても画面は壊れません。

---

## 1. アップロードする画像

Higgsfield の image-to-video に、この画像をそのまま上げてください。

| 用途 | 使う画像 | 置き場所 |
|---|---|---|
| 読み込み中の画面（最優先） | `assets/mascot-stand.png`（腕組み・背景透過） | `assets/mascot-stand.mp4` |

まずはこの1本だけで十分です。動きが気に入ったら他のポーズも足します。

---

## 2. Higgsfield に入れるプロンプト（コピペ用）

```
A confident anime-style Japanese character with a black pompadour hairstyle, wearing a black gakuran jacket over a white shirt, arms crossed, a small bandage on his cheek. He breathes slowly, blinks naturally, and his hair and jacket sway very slightly. He keeps his arms crossed and stays centered in frame. Subtle idle animation only. No camera movement, no zoom, no pan. Static white background. Loopable.
```

ネガティブ側（入れられる場合）

```
camera movement, zoom, pan, walking, changing pose, uncrossing arms, morphing face, extra fingers, text, watermark, background objects
```

**設定の目安**
- 長さ **3〜4秒**（ループさせるので短くてよい）
- 動きの強さ（motion / strength）は**弱め**。強いと顔が崩れます
- 背景は**白のまま**。色や風景を足さないこと

---

## 3. 書き出しと置き方

1. **透過webmで出せる場合** → `assets/mascot-stand.webm` として保存（いちばん綺麗）
2. **mp4しか出せない場合** → **背景が白いまま**書き出して `assets/mascot-stand.mp4` として保存
   - アプリ側で `mix-blend-mode: multiply` を掛けているので、白背景は自然に消えます
   - 背景を白以外にすると四角い枠が出るので注意

置いたら push します。

```bash
cd ~/Projects/setsuyaku-banchou && git add -A && git commit -m "番長の動画を追加" && git push
```

**ファイルサイズは 2MB 以内**に収めてください。それ以上だと、読み込み中の画面なのに読み込みが遅いという本末転倒になります。

---

## 4. 触るときの注意

- 動画が再生できたときだけ `sp` に `hasVideo` が付き、CSSの上下の揺れが止まります。二重に揺れないための処理なので消さないこと。
- `poster` は必ず残すこと。動画が無い／読めないときの受け皿になっています。
- 危機カードの中の番長（`.msc`）は動かしていません。数字を読む画面で動くものが視界に入ると、金額から目が逸れるためです。動かすならスプラッシュだけにしてください。
