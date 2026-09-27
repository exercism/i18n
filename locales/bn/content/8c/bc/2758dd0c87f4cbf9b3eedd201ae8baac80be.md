# ইঙ্গিত

## সাধারণ

- অফিসিয়াল [স্ট্রিং টাইপ ডকুমেন্টেশন][string-type-documentation]-এ স্ট্রিং সম্পর্কে পড়ুন।
- স্ট্রিং-এর উপর বিল্ট-ইন অপারেশনগুলো জানতে [উপলব্ধ _স্ট্রিং ফাংশনগুলো_][string-functions] দেখে নিন।

## 1. নামের প্রথম অক্ষরটি বের করুন

- একটি স্ট্রিং থেকে প্রথম ক্যারেক্টারটি পেতে একটি [বিল্ট-ইন ফাংশন][string-substr] আছে।
- একটি স্ট্রিং থেকে শুরু, শেষ, কিংবা শুরু ও শেষের হোয়াইটস্পেস মুছে ফেলার জন্য একাধিক [বিল্ট-ইন ফাংশন][string-trim] আছে।

## 2. প্রথম অক্ষরটিকে ইনিশিয়াল হিসেবে সাজান

- একটি স্ট্রিং-এর সব ক্যারেক্টারকে তাদের আপারকেস রূপে রূপান্তর করার জন্য একটি [বিল্ট-ইন ফাংশন][string-upcase] আছে।
- দুটি স্ট্রিং জোড়া লাগানোর জন্য একটি [অপারেটর][concat-operator] আছে।

## 3. পুরো নামটি প্রথম নাম ও পদবিতে ভাগ করুন

- অন্য একটি স্ট্রিং দিয়ে একটি স্ট্রিং ভাগ করার একটি [বিল্ট-ইন ফাংশন][string-explode] আছে।
- অ্যারেতে প্যাটার্ন ম্যাচিং করে অ্যারের প্রথম কয়েকটি এলিমেন্ট ভ্যারিয়েবলে অ্যাসাইন করা যায়।

## 4. ইনিশিয়ালগুলো হৃদয়ের ভেতরে বসান

- একটি স্ট্রিং-এর ভেতরে [ভ্যারিয়েবল এক্সপ্যান্ড][string-variables] করার একটি বিশেষ সিনট্যাক্স আছে।
- নিউলাইন এস্কেপ না করেই [মাল্টিলাইন স্ট্রিং][heredoc-syntax] লেখার একটি বিশেষ সিনট্যাক্স আছে।

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
