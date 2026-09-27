# send_newsletter, 함수를 재사용해요

코드 중복을 피하려면, `send_newsletter/3` 함수가 이전에 정의한 `open_log/1`, `close_log/1`, `read_emails/1`, `log_sent_email/2`를 호출하도록 해요.
