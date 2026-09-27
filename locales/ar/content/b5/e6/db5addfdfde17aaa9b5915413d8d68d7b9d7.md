# تلميحات

## 1. احسب تاريخ الذكرى بعد مرور جيجا ثانية

- الوقت العالمي هو عدد الثواني المنقضية منذ الحقبة.
- لدى Common Lisp زوج من الدوال يمكنه ترميز وقت عالمي أو فك ترميزه.
- يمكن تجميع قيم متعددة تُرجعها دالة في مصفوفة باستخدام الماكرو المناسب.
- معاملات المنطقة الزمنية في [`decode-universal-time`][hyperspec-decode-universal-time] و[`encode-universal-time`][hyperspec-encode-universla-time] اختيارية، لكنها مهمة. فما قيمها الافتراضية؟

[hyperspec-decode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_dec_un.htm#decode-universal-time
[hyperspec-encode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_encode.htm#encode-universal-time
