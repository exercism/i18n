# `send_newsletter` повторно використовує функції

Щоб уникнути дублювання коду, переконайтеся, що `send_newsletter/3` викликає раніше визначені `open_log/1`, `close_log/1`, `read_emails/1` та `log_sent_email/2`.
