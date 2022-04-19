# noodele について

node と noodle が掛かってます。

node.js に限定したクソコードの投稿掲示板サイトです。

express,
postgres,
ts


```sh
$ npx prisma migrate dev

$ npx prisma db seed
```

.env
```
APP_URL="http://localhost:3000"
CRYPT_KEY=
FROM_EMAIL_ADDRESS=
FROM_EMAIL_PASSWORD=
```

CRYPT_KEY ... ユーザーパスワードの暗号化に用いるキー

FROM_EMAIL_ADDRESS ... 仮登録メールの送信元メールアドレス

FROM_EMAIL_PASSWORD ... 仮登録メールの送信元アドレスを今回はGmailにしているので、googleアカウントのパスワードを設定

また、googleアカウントの設定を変更し、外部アプリからのログインを可能にしておくこと

//　エラーコード535が返る
