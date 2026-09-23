# send_newsletter επαναχρησιμοποιεί συναρτήσεις

Για να αποφύγεις τον πλεονασμό κώδικα, βεβαιώσου ότι η `send_newsletter/3` καλεί τις προηγουμένως ορισμένες `open_log/1`, `close_log/1`, `read_emails/1` και `log_sent_email/2`.
