# ইঙ্গিত

## সাধারণ

- এই অনুশীলনীর সব অংশই বিটওয়াইজ অপারেশনের উপর নির্ভর করে।
  - Exercism-এর [লার্নিং সিলেবাস][concept-bitwise-operations]-এ একটি সহজ ভূমিকা আছে।
  - Julia ম্যানুয়ালে [বিটওয়াইজ অপারেটর][ref-bitwise-operators] তালিকাভুক্ত করা আছে।
  - `Base`-এ বিট-সম্পর্কিত নানা কাজের ফাংশন আছে, যার মধ্যে [count_ones()][count_ones] ও [trailing_zeros()][trailing_zeros] অন্যতম।
- টেস্টগুলো টাইপ নিয়ে কড়াকড়ি করতে চায় না, তবে এই অনুশীলনীটি আনসাইনড বাইট নিয়ে, আর [`UInt8`][uint8] মান নিয়ে ভাবা তুলনামূলক সহজ।
  - আর্গুমেন্ট ও রিটার্ন ভ্যালু হলো `Vector{UInt8}`,
  - বিট-মাস্ক ও মধ্যবর্তী মানের জন্য `UInt8` মান কাজে লাগে।
- দশমিক সংখ্যা মনোযোগ নষ্ট করবে, তাই `UInt8` লিটারালের জন্য হেক্স (`0xFF`) বা বাইনারি (`0b11111111`) ব্যবহার করা ভালো।
  - [`bitstring()`][bitstring] ফাংশনটি ডিবাগিংয়ের সময় কাজে লাগতে পারে, কারণ এটি মানুষের পড়ার উপযোগী বাইনারি ফরম্যাটে আউটপুট দেয়।
- কাঁচা মেসেজ ৮-বিটের টুকরোর একটি ভেক্টর আকারে আসে, আর এটিকে উচ্চক্রমের বিটে ৭-বিটের টুকরোয় রূপান্তর করতে হয়, সঙ্গে LSB হিসেবে একটি প্যারিটি বিট।
  - আপনি যে বিটগুলো চান, সেগুলো আলাদা করতে `&` বা `|` দিয়ে বিট-মাস্ক ব্যবহার করুন।
  - বাম-শিফট (`<<`) ও লজিক্যাল ডান-শিফট (`>>>`) অপারেটর গুরুত্বপূর্ণ।
  - বাড়তি বিট পরের ধাপের প্রক্রিয়াকরণে নিয়ে যাওয়ার একটি উপায় পরিকল্পনা করুন।
  - ক্যারির কারণে ইনপুট বাইটগুলোকে পরস্পর থেকে স্বাধীনভাবে সামলানো কঠিন হয়ে পড়ে, তাই উচ্চক্রম ফাংশন ব্যবহারের চেষ্টার চেয়ে লুপ করা (বা হয়তো রিকার্শন) সম্ভবত সহজ।
  - এনকোড করা মেসেজ সাধারণত কাঁচা মেসেজের চেয়ে বড় (বেশি বাইট) হয়, কারণ প্রতি বাইটে একটি প্যারিটি বিট ধরতে হয়।


  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
