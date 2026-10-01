# تست‌ها

برای استفاده از تست‌رانر، به [نصب صحیح Godot][installation] نیاز دارید.

## اجرای تست‌ها

از [تست‌رانر][test runner] برای بارگذاری و تست راه‌حل‌ها استفاده می‌شود.
وقتی یک تمرین را به‌صورت محلی دانلود می‌کنید، نسخه‌ای از تست‌رانر همراه با یک اسکریپت شل برای اجرای آن نیز در کنارش قرار دارد.

برای اجرای تمرین، کافی است اسکریپت `./run_tests` را در پوشه‌ی تمرین اجرا کنید.

برای مثال،

```bash
cd "$(exercism workspace)/gdscript/hello-world"
./run_tests
```

[installation]: https://exercism.org/docs/tracks/gdscript/installation
[test runner]: https://raw.githubusercontent.com/exercism/gdscript-test-runner/refs/heads/main/bin/test_runner.gd
