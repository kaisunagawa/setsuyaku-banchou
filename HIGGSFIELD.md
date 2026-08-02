# 番長のアニメーション（Higgsfield）

読み込み中の画面で動いている番長は、Higgsfield で作った動画です。
このMCPはClaude Codeから直接呼べるので、作り直しもこの場でできます。

## いま入っているもの

| ファイル | 中身 |
|---|---|
| `assets/mascot-body.png` | 全身の番長（Higgsfield `nano_banana_pro` で生成） |
| `assets/mascot-body.mp4` | 上の画像を `seedance1_5` で4秒アニメ化したもの |

動画が読めないときは `mascot-body.png` がそのまま出るので、動画を消しても画面は壊れません。

## 作り直すときの手順

1. `media_upload` → curl で PUT → `media_confirm`
2. `generate_video` に `start_image` として渡す
3. できた mp4 を `avconvert -s in.mp4 -o out.m4v -p Preset640x480` で圧縮（ffmpegはこのMacに無い）
4. `assets/mascot-body.mp4` として置いて push

## 使ったプロンプト

**全身画像（nano_banana_pro・参照画像あり・3:4）**

```
Full body illustration of the same anime-style Japanese character shown in the reference image, keeping his exact face, black pompadour hairstyle, small yellow bandage on his left cheek, black gakuran school jacket with gold buttons, white shirt, and gold chain necklace. Show him standing upright from head to feet, arms crossed confidently, wearing black trousers and black shoes. The ENTIRE body must be inside the frame with clear empty margin above his head and below his feet. Nothing is cropped or cut off at any edge. Flat vector sticker style with a clean white outline, thick black linework, exactly matching the reference art style. Plain pure white background, no shadow, no props, no text.
```

**アニメ化（seedance1_5・480p・4秒・音なし）**

```
The full-body anime-style character stands still, arms crossed, feet planted. He breathes slowly, blinks a couple of times, and his hair and jacket sway very slightly. Subtle idle animation only. His whole body from head to shoes stays fully inside the frame at all times, with empty margin above his head and below his feet. He does not uncross his arms, does not walk, does not change pose. Locked-off static shot, no camera movement, no zoom, no pan, no cropping. Plain pure white background stays completely white and empty.
```

## 踏んだ地雷

- **見切れた素材を渡さない。** ブランドのポーズシートは全部「胸から上」で、そのまま渡すと切れたまま動く。必ず全身が枠の内側に収まった画像を作ってから渡すこと。ぼかしや下辺のマスクで誤魔化さない。
- **プロンプトに「全身が枠内・切れない」を明記する。** 書かないと寄る。
- **動きは弱く。** 強いと顔が崩れる。ポーズ変更・カメラ移動を明示的に禁止する。
- **背景は白のまま。** 表示側で白を消して合成している。
- **合成は `mix-blend-mode:darken` を `.spStage` に掛ける。**
  `multiply` だと動画の白地（純白ではなく薄いグレー）が四角い箱に見える。
  また、子要素側に掛けると `.spStage` の中だけで合成されて背景の緑の波と混ざらない。
- **サイズは 2MB 以内。** 読み込み中の画面が重いのは本末転倒。
- 危機カードの中の番長は動かしていない。数字を読む画面で横が動くと金額から目が逸れるため。

## 費用

無料プランのクレジットから消費します（2026-08-02 時点）。

- 画像 `nano_banana_pro` 1k：2.0
- 動画 `seedance1_5` 480p/4秒：2.4（720pだと4.8）

`get_cost: true` を付けると、生成せずに費用だけ確認できます。
