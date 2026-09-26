# send_newsletter reutiliza funciones

Para evitar la redundancia de código, asegúrate de que `send_newsletter/3` llame a las funciones ya definidas `open_log/1`, `close_log/1`, `read_emails/1` y `log_sent_email/2`.
