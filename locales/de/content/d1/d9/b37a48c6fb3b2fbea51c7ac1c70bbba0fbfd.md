# send_newsletter verwendet Funktionen erneut

Um Redundanz im Code zu vermeiden, stelle sicher, dass `send_newsletter/3` die zuvor definierten Funktionen `open_log/1`, `close_log/1`, `read_emails/1` und `log_sent_email/2` aufruft.
