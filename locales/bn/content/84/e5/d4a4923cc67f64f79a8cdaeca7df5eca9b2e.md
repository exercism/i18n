# নির্দেশনা সংযোজন

## DSL-এর বর্ণনা

এই DSL-এ একটি গ্রাফ হলো `Graph` টাইপের একটি অবজেক্ট। এটি এক বা একাধিক টাপলের একটি `list` নেয়, যেগুলো বর্ণনা করে:

+ অ্যাট্রিবিউট
+ `Nodes`
+ `Edges`

`Node` ও `Edge`-এর ইমপ্লিমেন্টেশন `dot_dsl.py`-তে দেওয়া আছে।

DSL-এর প্রত্যাশিত ডিজাইন এবং প্রত্যাশিত এরর টাইপ ও মেসেজ সম্পর্কে আরও বিস্তারিত জানতে `dot_dsl_test.py`-এর টেস্ট কেসগুলো দেখুন।


## এক্সসেপশন মেসেজ

কখনও কখনও [একটি এক্সসেপশন রেইজ করা](https://docs.python.org/3/tutorial/errors.html#raising-exceptions) প্রয়োজন হয়। এটি করলে সবসময় একটি **অর্থপূর্ণ এরর মেসেজ** দিতে হবে, যাতে বোঝা যায় এররটির উৎস কী। এতে আপনার কোড আরও পাঠযোগ্য হয় এবং Debug করতে অনেক সাহায্য করে। যে সব ক্ষেত্রে আপনি জানেন এররটির উৎস একটি নির্দিষ্ট টাইপ হবে, সেখানে আপনি [বিল্ট-ইন এরর টাইপগুলোর](https://docs.python.org/3/library/exceptions.html#base-classes) একটি রেইজ করতে পারেন, তবে তবুও একটি অর্থপূর্ণ মেসেজ দিতে হবে।

এই নির্দিষ্ট অনুশীলনীতে `Graph` ভুল গঠনের হলে একটি `TypeError` "থ্রো" করতে, আর `Edge`, `Node` বা `attribute` ভুল গঠনের হলে একটি `ValueError` দিতে [raise স্টেটমেন্ট](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) ব্যবহার করতে হবে। টেস্ট পাস হবে কেবল তখনই, যখন আপনি `exception` `raise` করবেন এবং তার সঙ্গে একটি মেসেজও দেবেন।

মেসেজসহ একটি এরর রেইজ করতে, মেসেজটি `exception` টাইপের আর্গুমেন্ট হিসেবে লিখুন:

```python
# Graph is malformed
raise TypeError("Graph data malformed")

# Edge has incorrect values
raise ValueError("EDGE malformed")
```
