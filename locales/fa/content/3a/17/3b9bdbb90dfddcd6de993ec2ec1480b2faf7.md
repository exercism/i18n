# مقدمه

## اصطلاح‌شناسی

شما پیش‌تر در چند مفهوم، توابع C++ را استفاده کرده و نوشته‌اید.
حالا وقت آن رسیده است که فنی شویم.
قطعه‌کد زیر رایج‌ترین اصطلاح‌ها را برای مراجعه‌ی آسان نشان می‌دهد.
از آنجا که C++ به فاصله‌ها بی‌اعتناست، قالب‌بندی طوری تغییر کرده است که هر عنصر در یک خط قرار بگیرد.

```cpp
// Function declaration:
bool                                              // Return type
admin_detected(string user, string password)      // Type signature
;                                                 // Don't forget the ';' for the declaration

// Function definition:
bool                                              // Return type
admin_detected                                    // Function name
(string user, string password)                    // Parameter list
{ return user == "admin" && password == "1234"; } // Function body
```
~~~~exercism/advanced
اعلان مانند یادداشتی برای کامپایلر عمل می‌کند که تابعی با آن اسم، نوع بازگشتی و فهرست پارامترها وجود دارد.
اگر تعریف نباشد، کد کار نمی‌کند.
اعلان‌ها اختیاری‌اند و تنها وقتی لازم می‌شوند که تابع را پیش از تعریفش به کار ببرید.
اعلان‌ها می‌توانند مسائلی مانند ارجاع‌های دوری را حل کنند و می‌توان از آن‌ها برای جدا کردن واسط از پیاده‌سازی استفاده کرد.
~~~~

## قید `const`

گاهی می‌خواهید مطمئن شوید که مقادیر پس از مقداردهی اولیه قابل تغییر نیستند.
C++ از کلیدواژه‌ی `const` به عنوان قید برای ثابت‌ها استفاده می‌کند.

```cpp
const int number_of_dragon_balls{7};
number_of_dragon_balls--; // compilation error
```

~~~~exercism/note
ثابت‌ها را اغلب با قالب _UPPER_SNAKE_CASE_ می‌نویسند.
اگر قرارداد دیگری وجود نداشته باشد، توصیه می‌شود این قالب نوشتاری را برای ماکروها نگه دارید.
~~~~

اگر بخواهید یک متغیر ثابت را پس از تعیین مقدارش تغییر دهید، کد شما کامپایل نمی‌شود.
این کار به جلوگیری از تغییرهای ناخواسته کمک می‌کند و همچنین امکان‌های بهینه‌سازی را برای کامپایلر فراهم می‌کند.
برای یک انسان هم، اگر بدانید بخش‌های خاصی تحت تأثیر قرار نمی‌گیرند، استدلال درباره‌ی کد آسان‌تر است.

می‌توانید `const` را به عنوان قید برای پارامترهای تابع هم به کار ببرید.

```cpp
string guess_number(const int& secret, const int& guess) {
    if (secret < guess) return "lower.";
    if (secret > guess) return "higher.";
    return "exact!";
}
```

وقتی یک ارجاع `const` را به تابع می‌دهید، می‌توانید مطمئن باشید که بدون تغییر باقی می‌ماند.
ارجاع‌های `const` را اغلب برای اشیایی می‌بینید که کپی کردن‌شان پرهزینه است، مانند رشته‌های بلندتر.
سومین مورد استفاده از قید `const`، توابع عضو هستند که نمونه‌ی یک کلاس را تغییر نمی‌دهند.

```cpp
class Stubborn {
    public:
    Stubborn(string reply) {
        response = reply;
    }
    string answer(const string& question) const {
        if (question.length() == 0) { return ""; }
        return response;
    }
    private:
    string response{};
};
```

تابع عضو `answer` در `Stubborn` از یک ارجاع `const string&` به عنوان پارامتر استفاده می‌کند.
این کار از یک عمل کپی از شیء اصلی که به تابع داده شده جلوگیری می‌کند.

## سربارگذاری تابع

چند تابع می‌توانند اسم یکسانی داشته باشند اگر فهرست پارامترهایشان متفاوت باشد.
به این کار «سربارگذاری تابع» می‌گویند و معمولاً وقتی انجام می‌شود که این توابع کارهای بسیار مشابهی انجام دهند.

سرصفحه‌ی تابع بدون نوع بازگشتی، __امضای نوع__ تابع است.
تغییر در امضای نوع به تابعی جدید منجر می‌شود.

مثال `play_sound` شش سربارگذاری مختلف دارد تا سناریوهای گوناگون را پوشش دهد:

```cpp
// different argument types:
void play_sound(char note);         // C, D, E, ..., B
void play_sound(string solfege);    // do, re, mi, ..., ti
void play_sound(int jianpu);        // 1, 2, 3, ..., 7

// different number of arguments:
void play_sound(string solfege, double duration);

// different qualifiers:
void play_sound(vector<string>& solfege);
void play_sound(const vector<string>& solfege);
```

~~~~exercism/advanced
امضای نوع با اسم تابع، تعداد پارامترها، نوع‌شان و قیدهای‌شان تعریف می‌شود (اما نه با اسم‌هایشان).
نوع بازگشتی به‌صراحت بخشی از امضای نوع نیست و اگر دو تابع داشته باشید که فقط در نوع بازگشتی تفاوت دارند، خطاهای کامپایل خواهید گرفت.
کامپایلر شکایت می‌کند، چون مشخص نیست کدام یک از آن دو باید استفاده شود.
~~~~

## آرگومان پیش‌فرض

بعضی توابع می‌توانند بسیار طولانی شوند و بسیاری از فراخوانی‌هایشان ممکن است برای بیشتر پارامترها از مقادیر یکسانی استفاده کنند.
تکرار در آن فراخوانی‌ها را می‌توان با آرگومان‌های پیش‌فرض از میان برد.

```cpp
void record_new_horse_birth(string name, int weight, string color="brown-ish", string dam="Alruccaba", string sire="Poseidon");

record_new_horse_birth("Urban Sea", 130); // color will be brown, dam "Alruccabam", sire "Poseidon"
record_new_horse_birth("Highclere", 175, "off-white", "Fall Aspen");   // sire will be "Poseidon"
```

از آنجا که اعلان تابع اغلب پیش از تعریف خوانده می‌شود، جای بهتری برای تعیین آرگومان‌های پیش‌فرض است.
اگر یک پارامتر اعلان پیش‌فرض داشته باشد، همه‌ی پارامترهای سمت راست آن هم باید اعلان پیش‌فرض داشته باشند.
گاهی می‌توان سربارگذاری‌های پیچیده‌ی تابع را به توابع کمتری با آرگومان‌های پیش‌فرض بازآرایی کرد تا نگهداشت‌پذیری بهبود یابد.
