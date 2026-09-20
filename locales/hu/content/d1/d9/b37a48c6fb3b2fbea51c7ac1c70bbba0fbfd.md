# A send_newsletter újrahasználja a függvényeket

A kódismétlés elkerülése érdekében győződj meg róla, hogy a `send_newsletter/3` a korábban definiált `open_log/1`, `close_log/1`, `read_emails/1` és `log_sent_email/2` függvényeket hívja meg.
