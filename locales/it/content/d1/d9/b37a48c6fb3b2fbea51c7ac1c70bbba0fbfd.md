# send_newsletter riutilizza le funzioni

Per evitare codice ridondante, assicurati che `send_newsletter/3` chiami le funzioni `open_log/1`, `close_log/1`, `read_emails/1` e `log_sent_email/2` definite in precedenza.
