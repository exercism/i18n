1.  [PEP 8][pep-8]-এ বর্ণিত কনভেনশনগুলোর সঙ্গে পরিচিত হোন।
    এগুলো যদিও "আইন" নয়, তবুও Python প্রকল্পেই এগুলোই ব্যবহৃত মান, এবং বেশিরভাগ কোডিং পরিস্থিতিতে এগুলো দারুণ ভিত্তি।
2.  [PEP 20 (অর্থাৎ "The Zen of Python")][pep-20]-এ বর্ণিত ধারণাগুলো পড়ুন এবং ভেবে দেখুন।
    PEP 8-এর মতো এগুলোও "আইন" নয়, তবে আরও পরিষ্কার ও উন্নত Python কোড লেখার জন্য এগুলো দৃঢ় নির্দেশক নীতি।
3.  কমেন্টের চেয়ে পরিষ্কার ও সহজে অনুসরণযোগ্য কোডকে প্রাধান্য দিন। তবে স্পষ্টতার জন্য প্রয়োজন হলে অবশ্যই কমেন্ট করুন।
4.  আপনার কোড পরিষ্কার করতে টাইপ হিন্ট ব্যবহারের কথা ভাবুন।
    টাইপ হিন্টের [ডকুমেন্টেশন][type-hint-docs] এবং [কেন আপনি টাইপ হিন্ট নাও করতে চাইতে পারেন][type-hint-nos] ঘেঁটে দেখুন।
5.  [PEP 257][pep-257]-এ বর্ণিত ডকস্ট্রিং নির্দেশিকা অনুসরণ করার চেষ্টা করুন।
    ভালো ডকুমেন্টেশন গুরুত্বপূর্ণ।
6.  [ম্যাজিক নাম্বার][magic-numbers] এড়িয়ে চলুন।
7.  যে লুপে ইনডেক্স ও এলিমেন্ট দুটোই দরকার, সেখানে [`range(len())`][range-docs]-এর চেয়ে [`enumerate()`][enumerate-docs] বেছে নিন।
8.  যে লুপ কোনো ডেটা স্ট্রাকচারে যোগ করে, তার চেয়ে [কম্প্রিহেনশন][comprehensions] ও [জেনারেটর এক্সপ্রেশন][generators] বেছে নিন।
    তবে [কম্প্রিহেনশন বেশি ব্যবহার করবেন না][comprehension-overuse]।
9.  কয়েকটির বেশি সাবস্ট্রিং জোড়া লাগানোর সময় বা লুপে কনক্যাটেনেট করার সময়, স্ট্রিং কনক্যাটেনেশনের অন্য পদ্ধতির চেয়ে [`str.join()`][join] বেছে নিন।
10.  Python-এর সমৃদ্ধ [বিল্ট-ইন ফাংশন][built-in-functions] এবং [স্ট্যান্ডার্ড লাইব্রেরি][standard-lib]-এর সঙ্গে পরিচিত হোন।
     এক ঝলক দেখতে এবং কিছু মজার বিষয় জানতে [এখানে][standard-lib-overview] যান।

[built-in-functions]: https://docs.python.org/3/library/functions.html
[comprehension-overuse]: https://treyhunner.com/2019/03/abusing-and-overusing-list-comprehensions-in-python/
[comprehensions]: https://treyhunner.com/2015/12/python-list-comprehensions-now-in-color/
[enumerate-docs]: https://docs.python.org/3/library/functions.html#enumerate
[generators]: https://www.pythonmorsels.com/how-write-generator-expression/
[join]: https://docs.python.org/3/library/stdtypes.html#str.join
[magic-numbers]: https://en.wikipedia.org/wiki/Magic_number_(programming)
[pep-20]: https://peps.python.org/pep-0020/
[pep-257]: https://peps.python.org/pep-0257/
[pep-8]: https://peps.python.org/pep-0008/
[range-docs]: https://docs.python.org/3/library/functions.html#func-range
[standard-lib-overview]: https://docs.python.org/3/tutorial/stdlib.html
[standard-lib]: https://docs.python.org/3/library/index.html
[type-hint-docs]: https://typing.python.org/en/latest/index.html
[type-hint-nos]: https://typing.python.org/en/latest/guides/typing_anti_pitch.html
