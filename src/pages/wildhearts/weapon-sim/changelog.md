---
layout: ../../../layouts/MdLayout.astro
title: WILD HEARTS 武器シミュレータ 更新履歴とロードマップ
description: WILD HEARTS 武器シミュレータ 更新履歴とロードマップ
---
[WILD HEARTS 武器シミュレータに戻る](./)

# 更新履歴とロードマップ
## 更新履歴

### v1.0.4(2023-04-18)
- 槌と変形棍のデータ不備によるバグの修正
- 必要素材合計表示の改善

※ データ不備についてフィードバックでご報告いただきました、ありがとうございます！
※ 必要素材合計表示はTwitterでのご意見を一部反映しました、ありがとうございます！

### v1.0.3(2023-04-09)
- 叢雲武器のデータを追加
- 限界突破情報の投稿ページへのリンクを追加

### v1.0.2(2023-04-04)
- 現在のプレビュー表示対象をわかりやすく見せるスタイルの追加

### v1.0.1(2023-04-03)
- 技能フィルタで検索状態が残り続けてしまう問題を修正
- 強化継承URLで初期状態ではURLを生成しないように修正
- 軽微なデータ修正

### v1.0.0(2023-04-01)
- 固有技能、継承技能を探す機能を追加
- 使い方とFAQを追加
- 必要だと思った機能を全て実装できたので正式版（v1）としてリリース！

技能を探す方法をはじめ、全般的にUIはこれで満足！という出来ではありません。
ですが、機能という面では必要最小限と考えていたレベルに達したのでv1にしました。

使いやすいものにしていきたいと考えているので、是非フィードバックお待ちしています。

### v0.4.0(2023-04-01)
- 全ての技能の説明に正式に対応
- 武器データの軽微な修正

### v0.3.1(2023-03-30)
- 傘のデータを追加
- 全般的に軽微なデータ修正

全ての武器データの入力が完了!

### v0.3.0(2023-03-29)
- 槌のデータを追加
- 2023-03-27パッチで追加された強化経路を追加
- ピンを刺して特定の場所を目立たせる機能を実装

### v0.2.0(2023-03-27)
- 変形棍のデータを追加
- 強化継承状態をURLで保存する機能を実装
  - Tweetで共有する機能も実装（ボタンを押してもすぐにはtweetされず、確認画面が開きます）

### v0.1.3(2023-03-25)
- 表示幅のスタイルの調整（小さいデバイスでも見やすくなりました）
- 一部の場所で正しく強化経路を辿れないバグを修正
- タッチデバイスで強化を戻せないバグを修正
- 試験的にツールチップによる技能説明表示を実装
（防具の技能データを流用しているため、防具にない技能の説明は表示されません）

### v0.1.2(2023-03-25)
- 飛燕刀のデータを追加
- 大筒のデータを追加

※ 大筒のデータ入力は「るら」さんにご協力いただきました！
この場を借りて厚く熱く御礼申し上げます。感謝！

### v0.1.1(2023-03-25)
- 刀のデータを追加、修正
  - カグツチ武器を追加
  - 一部、間違っていたものや表記が正しくないものを修正
- 武器種:弓 に対応
- プレビューや強化画面で現在のものと比較して数値に色をつけました
- 属性も色をつけました

### v0.1.0(2023-03-23)
- スマートフォンなどのタッチデバイスでの操作に対応
- 画面の小さいデバイスに対応

手元のデバイスで試すには限界があるので、動かなかったらフィードバックいただけると助かります。
また、スペースとの兼ね合いで操作説明が出せず直感的じゃない部分もあるかもしれません、
使い勝手に関するフィードバックもいただけると嬉しいです。

### v0.0.1(2023-03-23)
- 最小限の機能をまず「からくり刀」のみでリリース
  - できること
    - 現在の武器を表示（ドラッグで移動可能）
    - 各強化先のプレビュー（マウスホバー）
    - 強化継承画面の再現
    - 強化、継承（クリック）
    - 強化戻し
    - 総必要素材の算出
  - できないこと
    - スマホなどのタッチデバイスでの操作
    - 画面の小さい端末での表示

これから機能追加とともに、他の武器種対応も順次やっていきます。

## ロードマップ（TODO）
### 対応武器種
- ✔️ からくり刀
- ✔️ 野太刀
- ✔️ 弓
- ✔️ 槌
- ✔️ 傘
- ✔️ 大筒
- ✔️ 飛燕刀
- ✔️ 変形棍

### 機能など
- ✔️ 現在の武器と比較してプレビューの数値を色づけ
- ✔️ 特定の能力をもった強化を見つけやすくする機能
- ✔️ 特定の箇所にピンを刺しておく機能
- ✔️ URLで強化状態を保存、復元
- ✔️ タッチデバイス対応
- ✔️ 画面の小さい端末の対応
- ✔️ 技能の説明をポップアップ表示

[WILD HEARTS 武器シミュレータに戻る](./)
