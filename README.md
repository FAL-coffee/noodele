# noodele について

node と noodle が掛かってます。

node.js に限定したクソコードの投稿掲示板サイトです。

express,
postgres,
ts

コンテナの設定に問題があり、データの永続化が出来ていないため、コンテナ起動後にマイグレートを行う必要あり

```sh
$ npx prisma migrate dev

$ npx prisma db seed
```
