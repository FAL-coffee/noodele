# noodeleについて

nodeとnoodleが掛かってます。

node.jsに限定したクソコードの投稿掲示板サイトです。

express,
postgres,
ts

コンテナの設定に問題があり、データの永続化が出来ていないため、コンテナ起動時にマイグレートを行う必要あり
```sh
$ npx prisma migrate dev
```
