# send_newsletter 重複使用函式

為了避免程式碼重複，請確保`send_newsletter/3`會呼叫先前定義的`open_log/1`、`close_log/1`、`read_emails/1`和`log_sent_email/2`。
