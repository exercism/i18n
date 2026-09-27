# নির্দেশনা

আমাদের ফুটবল ক্লাব [exercise:csharp/football-match-reports]() লিগগুলোতে দ্রুত এগিয়ে চলছে, আর এবার আপনাকে আরও কিছু কাজ করার আমন্ত্রণ জানানো হয়েছে, এবার সিকিউরিটি পাস ছাপার সিস্টেম নিয়ে।

ব্যাকরুম কর্মীদের ক্লাস হায়ারার্কি নিম্নরূপ

```
TeamSupport (interface)
├ Chairman
├ Manager
└ Staff (abstract)
    ├ Physio
    ├ OffensiveCoach
    ├ GoalKeepingCoach
    └ Security
        ├ SecurityJunior
        ├ SecurityIntern
        └ PoliceLiaison
```

এই হায়ারার্কির একটি সম্পূর্ণ ইমপ্লিমেন্টেশন অনুশীলনীর সোর্স কোডের অংশ হিসেবে দেওয়া আছে।

সিকিউরিটি পাস মেকারে পাঠানো সব ডেটা যাচাই করা হয়েছে এবং তা যে null নয়, তার নিশ্চয়তা দেওয়া আছে।

## 1. সাপোর্ট টিমের কোনো সদস্য স্টাফ সদস্য হলে তার ডিসপ্লে নাম পাওয়া

অনুগ্রহ করে `SecurityPassMaker.GetDisplayName()` মেথডটি ইমপ্লিমেন্ট করুন। এটি `Staff` থেকে উদ্ভূত সব ক্লাসের ইনস্ট্যান্সের `Title` ফিল্ডের মান রিটার্ন করবে, অন্যথায় "Too Important for a Security Pass" রিটার্ন করবে।

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. সিকিউরিটি টিমের ডিসপ্লে নাম কাস্টমাইজ করা

অনুগ্রহ করে `SecurityPassMaker.GetDisplayName()` মেথডটি পরিবর্তন করুন। এটি টাস্ক 1-এর মতোই আচরণ করবে, তবে স্টাফ সদস্যটি সিকিউরিটি টিমের সদস্য হলে (অর্থাৎ `Security` টাইপের বা তার কোনো ডেরিভেটিভ হলে) টাইটেলের পরে " Priority Personnel" লেখাটি দেখানো হবে।

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Physio());
// => "The Physio"
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior Priority Personnel"
```

## 3. শুধু প্রধান সিকিউরিটি টিম সদস্যদেরই প্রায়োরিটি পার্সোনেল হিসেবে চিহ্নিত করা

অনুগ্রহ করে `SecurityPassMaker.GetDisplayName()` মেথডটি পরিবর্তন করুন। এটি টাস্ক 2-এর মতোই আচরণ করবে, তবে `SecurityJunior`, `SecurityIntern` এবং `PoliceLiaison` টাইপের ইনস্ট্যান্সের ক্ষেত্রে " Priority Personnel" লেখাটি দেখানো হবে না।

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
