# নির্দেশনার সংযোজন

## এক্সেপশন বার্তা

কখনও কখনও [এক্সেপশন রেইজ করা](https://docs.python.org/3/tutorial/errors.html#raising-exceptions) প্রয়োজন হয়। এমনটা করলে সবসময় একটি **অর্থবহ এরর বার্তা** যোগ করা উচিত, যাতে বোঝা যায় এররটির উৎস কী। এতে আপনার কোড আরও পাঠযোগ্য হয় এবং ডিবাগ করতে অনেক সুবিধা হয়। যে ক্ষেত্রে আপনি জানেন, এররের উৎসটি একটি নির্দিষ্ট টাইপ হবে, সেখানে আপনি [বিল্ট-ইন এরর টাইপগুলোর](https://docs.python.org/3/library/exceptions.html#base-classes) একটি রেইজ করতে পারেন, তবে তবুও একটি অর্থবহ বার্তা যোগ করা উচিত।

এই নির্দিষ্ট অনুশীলনীতে, ইনপুট করা ঘরটি গ্রহণযোগ্য সীমার বাইরে গেলে [রেইজ স্টেটমেন্ট](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) দিয়ে একটি `ValueError` "থ্রো" করতে বলা হয়েছে। টেস্ট পাস হবে শুধু তখনই, যখন আপনি `exception` `raise` করবেন এবং তার সাথে একটি বার্তাও দেবেন।

বার্তাসহ একটি `ValueError` রেইজ করতে হলে, বার্তাটি `exception` টাইপের আর্গুমেন্ট হিসেবে লিখুন:

```python
# when the square value is not in the acceptable range        
raise ValueError("square must be between 1 and 64")
```
