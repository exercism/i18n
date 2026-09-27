# পরিচিতি

## ইন্টারফেস

ইন্টারফেস হলো এমন একটি টাইপ, যার সদস্যগুলো মিলে পরস্পর সম্পর্কিত কিছু ফাংশনালিটি সংজ্ঞায়িত করে।
এটি একটি ক্লাসের ব্যবহারকে তার ইমপ্লিমেন্টেশন থেকে আলাদা রাখে, ফলে একই ক্লাসের একাধিক ভিন্ন ইমপ্লিমেন্টেশন তৈরি করা যায়, কিংবা ফরম্যাটিং, তুলনা বা কনভার্সনের মতো কিছু জেনেরিক আচরণ সাপোর্ট করা যায়।

একটি ইন্টারফেসের সিনট্যাক্স অনেকটা ক্লাসের মতোই, তবে পার্থক্য হলো এখানে মেথডগুলো শুধু সিগনেচার হিসেবে থাকে, কোনো বডি দেওয়া হয় না।

```java
public interface Language {
    String getLanguageName();
    String speak();
}

public class ItalianTraveller implements Language, Cloneable {

    // from Language interface
    public String getLanguageName() {
        return "Italiano";
    }

    // from Language interface
    public String speak() {
        return "Ciao mondo";
    }

    // from Cloneable interface
    public Object clone() {
        ItalianTraveller it = new ItalianTraveller();
        return it;
    }
}
```

ইন্টারফেসে সংজ্ঞায়িত সব অপারেশন যে ক্লাস ইন্টারফেসটি ইমপ্লিমেন্ট করে, তাকে অবশ্যই ইমপ্লিমেন্ট করতে হবে।

ইন্টারফেসে সাধারণত ইনস্ট্যান্স মেথড থাকে।

উপরে দেখানো `Cloneable` ছাড়াও Java Class Library-তে পাওয়া এমন একটি ইন্টারফেসের উদাহরণ হলো `Comparable<T>`।
কলেকশনে ডিফল্ট জেনেরিক সর্ট অর্ডার দরকার হলে `Comparable<T>` ইন্টারফেসটি ইমপ্লিমেন্ট করা যায়।
