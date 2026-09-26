# `send_newsletter`での関数の再利用

コードの重複を避けるために、`send_newsletter/3`が、すでに定義した`open_log/1`、`close_log/1`、`read_emails/1`、`log_sent_email/2`を呼び出すようにしてください。
