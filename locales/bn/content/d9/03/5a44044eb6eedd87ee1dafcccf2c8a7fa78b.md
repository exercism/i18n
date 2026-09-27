# নির্দেশনা

আপনার কমিউনিটি অ্যাসোসিয়েশন আপনাকে বাগানের প্লট রেজিস্ট্রেশন সামলাতে বলছে। স্টেটটি দুটি ডাইনামিক ভ্যারিয়েবলে থাকে:

- `registrations`: বর্তমানে একজন ব্যক্তির নামে বরাদ্দ থাকা `plot` টাপলগুলোর একটি ভেক্টর।
- `next-id`: পরবর্তী রেজিস্ট্রেশনের জন্য ব্যবহার করার ইন্টিজার।

`plot` টাপলে দুটি স্লট থাকে:

| স্লট            | টাইপ     |
| --------------- | -------- |
| `id`            | integer  |
| `registered-to` | string   |

## 1. বাগান খুলুন এবং এর রেজিস্ট্রেশনগুলো তালিকাভুক্ত করুন

`open-garden` ডিফাইন করুন যাতে ডাইনামিক ভ্যারিয়েবলগুলো ইনিশিয়ালাইজ হয়: `registrations`-এর জন্য একটি খালি ভেক্টর, আর `next-id`-এর জন্য `1`। এরপর `list-registrations` ডিফাইন করুন যাতে চলতি প্লটগুলোর ভেক্টর রিটার্ন করে।

```factor
open-garden
list-registrations .
! => V{ }
```

## 2. একটি প্লট রেজিস্টার করুন

`register` ডিফাইন করুন যাতে স্ট্যাক থেকে একটি নাম নেয়, পরবর্তী উপলব্ধ আইডি দিয়ে একটি নতুন `plot` তৈরি করে, সেটি `registrations` ভেক্টরে যোগ করে, `next-id` এক বাড়িয়ে দেয়, আর নতুন প্লটটি রিটার্ন করে।

```factor
open-garden
"Emma Balan" register .
! => T{ plot { id 1 } { registered-to "Emma Balan" } }

list-registrations .
! => V{ T{ plot { id 1 } { registered-to "Emma Balan" } } }
```

প্লটের আইডি অবশ্যই ইউনিক হতে হবে এবং একটি রিলিজের পরেও বাড়তে হবে। `next-id` কখনোই কোনো মান পুনরায় ব্যবহার করা উচিত নয়।

## 3. একটি প্লট রিলিজ করুন

`release` ডিফাইন করুন যাতে একটি আইডি নেয় আর `registrations` থেকে মিলে যাওয়া এন্ট্রিটি মুছে ফেলে। অজানা কোনো আইডি রিলিজ করলে কিছুই হয় না।

```factor
open-garden
"Emma" register drop
1 release
list-registrations .
! => V{ }
```

## 4. একটি রেজিস্টার করা প্লট পান

`get-registration` ডিফাইন করুন যাতে একটি আইডি নেয় এবং মিলে যাওয়া প্লটটি রিটার্ন করে, আর কোনো প্লটের সেই আইডি না থাকলে `not-found` সিম্বলটি রিটার্ন করে।

```factor
open-garden
"Emma" register drop
1 get-registration .
! => T{ plot { id 1 } { registered-to "Emma" } }

7 get-registration .
! => not-found
```

## 5. নাম দিয়ে প্লট খুঁজুন

`find-by-name` ডিফাইন করুন যাতে একটি নাম নেয় এবং ওই ব্যক্তির নামে বর্তমানে রেজিস্টার করা সব প্লটের একটি ভেক্টর রিটার্ন করে।

```factor
open-garden
"Emma" register drop
"Bob" register drop
"Emma" register drop
"Emma" find-by-name .
! => V{ T{ plot { id 1 } { registered-to "Emma" } }
        T{ plot { id 3 } { registered-to "Emma" } } }
```
