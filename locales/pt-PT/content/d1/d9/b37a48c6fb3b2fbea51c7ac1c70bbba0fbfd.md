# send_newsletter reutiliza funções

Para evitar redundância de código, certifica-te de que `send_newsletter/3` chama as funções previamente definidas `open_log/1`, `close_log/1`, `read_emails/1` e `log_sent_email/2`.
