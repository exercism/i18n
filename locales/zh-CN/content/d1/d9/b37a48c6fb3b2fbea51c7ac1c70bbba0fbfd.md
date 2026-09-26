# send_newsletter 复用函数

为了避免代码冗余，请确保`send_newsletter/3`调用前面定义好的`open_log/1`、`close_log/1`、`read_emails/1`和`log_sent_email/2`。
