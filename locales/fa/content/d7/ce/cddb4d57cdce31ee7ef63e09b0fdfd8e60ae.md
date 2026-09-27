# مقدمه

## رابط

«رابط» یک نوع است که اعضایی دارد که گروهی از قابلیت‌های مرتبط را تعریف می‌کنند. این کار فاصله‌ی بین استفاده از یک کلاس و پیاده‌سازی آن را ایجاد می‌کند و امکان چندین پیاده‌سازی متفاوت یا پشتیبانی از رفتار عمومی مانند قالب‌بندی، مقایسه یا تبدیل را فراهم می‌کند.

نحوه‌ی نگارش رابط مشابه کلاس است، با این تفاوت که متدها فقط به صورت امضا ظاهر می‌شوند و بدنه‌ی آن‌ها ارائه نمی‌شود.

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

کلاس پیاده‌ساز باید همه‌ی عملیات تعریف‌شده در رابط را پیاده‌سازی کند.

رابط‌ها معمولاً شامل متدهای نمونه هستند.

نمونه‌ای از رابط در کتابخانه‌ی کلاس‌های Java، علاوه بر `Cloneable` که در بالا نشان داده شد، `Comparable<T>` است.
رابط `Comparable<T>` را می‌توان در جایی پیاده‌سازی کرد که به یک ترتیب مرتب‌سازی عمومی پیش‌فرض در مجموعه‌ها نیاز باشد.
