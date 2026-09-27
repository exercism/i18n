# ভূমিকা

আগের একটি ধারণায় বলা হয়েছিল যে লোকাল লেবেল আর ফাংশন, দুটোই আসলে এক্সিকিউটেবল কোড থাকে এমন একটি সেকশনের অ্যাড্রেসমাত্র, যেমন `section .text`.

আসলে যেকোনো মেমরি অ্যাড্রেসের মতোই ফাংশনও একইভাবে ব্যবহার করা যায়, অর্থাৎ ফাংশনকে রেজিস্টারে লোড করা যায়, এক জায়গা থেকে আরেক জায়গায় পাঠানো যায় এবং মেমরিতে সংরক্ষণ করা যায়। রেজিস্টার বা মেমরিতে সংরক্ষিত কোনো ফাংশনে এক্সিকিউশন সরিয়ে নিতে `call` বা `jmp` ব্যবহার করাও সম্ভব:

```x86asm
section .text
sum_op:
    lea rax, [rdi + rsi] ; loads the sum rdi + rsi into rax
    ret

apply_sum:
    lea rax, [rel sum_op]
    jmp rax   ; tail call
```

মান হিসেবে এক জায়গা থেকে আরেক জায়গায় পাঠানো ফাংশন অ্যাড্রেসকে বলা হয় **থাঙ্ক**। অ্যাসেম্বলিতে **হায়ার-অর্ডার প্রোগ্রামিং**-এর একটি গাঠনিক উপাদান হলো থাঙ্ক: অর্থাৎ এমন কোড, যা অন্য কোড নিয়ে কাজ করে।

## ডেটা হিসেবে কোড

ফাংশনের অ্যাড্রেসও মেমরিতে সংরক্ষণ করে পরে আবার বের করে আনা যায়:

```x86asm
section .bss
    cached_fn resq 1

section .text
save_op:
    mov qword [rel cached_fn], rdi
    ret

apply_op:
    ; arguments are already set up according to the ABI
    jmp qword [rel cached_fn] ; tail call
```

`save_op` যে ফাংশন অ্যাড্রেসটি পায়, সেটি `cached_fn` ভ্যারিয়েবলে লিখে রাখে। `save_op` রিটার্ন করার পরেও মানটি থেকে যায়, তাই পরে `apply_op` ফাংশনে যতবারই কল করা হোক না কেন, সেটি সবশেষে সংরক্ষিত অ্যাড্রেসেই টেইল-জাম্প করে। এতে রানটাইমে `apply_op` কোন ফাংশন কল করবে তা বদলানো সম্ভব হয়।

## ডিসপ্যাচ টেবিল

ফাংশনের অ্যাড্রেস একটি অ্যারেতে সংরক্ষণ করলে কোনো ইনডেক্স অনুযায়ী ভিন্ন ভিন্ন ফাংশন বেছে নেওয়া সম্ভব হয়, যেই ইনডেক্স হয়তো রানটাইমের কোনো শর্তের উপর নির্ভর করে। একেই বলা হয় **ডিসপ্যাচ টেবিল**:

```x86asm
section .data
    dispatch_table dq add_op, sub_op, mul_op

section .text
dispatch:
    ; this function takes two arguments in rdi and rsi, and an index in rdx
    ; it then applies the function corresponding to the index in rdx to the arguments
    lea rax, [rel dispatch_table]
    jmp qword [rax + 8*rdx]   ; tail-call the function address for the index
```

## স্টেটফুল থাঙ্ক

যে থাঙ্ক কলের মাঝে কোনো স্থায়ী মেমরি পড়ে বা পরিবর্তন করে, তার আচরণ আগে কী ঘটেছে তার উপর নির্ভর করে ভিন্ন হতে পারে। তার ফলাফল শুধু আর্গুমেন্টের উপর নয়, আরও কিছুর উপর নির্ভর করতে পারে।

যেমন একটি _কাউন্টার_, যা একটি ফাংশন নেয় এবং বর্তমান কাউন্ট দিয়ে সেটি কল করে, আর প্রতিবার কাউন্ট বাড়িয়ে দেয়:

```x86asm
section .data
    count dq 0

section .text
tick:
    mov rax, rdi               ; saves the function address
    mov rdi, [rel count]       ; loads the current count as the function's argument
    inc qword [rel count]      ; advances the count
    jmp rax                    ; tail-calls the function
```

`tick` প্রদত্ত ফাংশনটিকে বর্তমান কাউন্ট আর্গুমেন্ট হিসেবে দিয়ে কল করে, তারপর কাউন্ট বাড়ায়। তাই প্রথমবার `tick(square)` কল করলে `square(0)` কল হয়, পরেরবার `tick(square)` কল করলে `square(1)`, তারপর `square(2)`, এভাবেই চলতে থাকে।

আরেকটি উদাহরণ হতে পারে একটি _বিলম্বিত গণনা_:

```x86asm
section .bss
    captured_fn resq 1
    argument resq 1

section .text
delay:
    mov qword [rel captured_fn], rdi ; saves the function
    mov qword [rel argument], rsi    ; saves the argument
    lea rax, [rel invoke]            ; returns the `invoke` function
    ret

invoke:
    mov rdi, qword [rel argument]    ; loads the saved argument into `rdi`
    jmp qword [rel captured_fn]      ; tail-calls the saved function
```

`delay` একটি ফাংশন আর একটি মান নেয়, সেগুলো সংরক্ষণ করে, এবং `invoke` রিটার্ন করে। `invoke` কল করা হলে এটি সংরক্ষিত আর্গুমেন্ট দিয়ে ক্যাপচার করা ফাংশনটি রান করে।

হায়ার-লেভেল ভাষাগুলোতে কমন অনেক প্যাটার্ন, যেমন কলব্যাক, ভার্চুয়াল মেথড, জেনারেটর, কারিং, ফাংশন কম্পোজিশন আরও কত কী, সবই স্থায়ী স্টেটের সাথে জোড়া লাগানো থাঙ্কের উপর দাঁড়িয়ে আছে।
