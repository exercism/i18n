# مقدمة

## المصطلحات

لقد استخدمت دوال C++ وكتبتها بالفعل في عدد من المفاهيم.
حان الآن وقت التعمّق تقنيًا.
يعرض مقطع الكود التالي أكثر المصطلحات شيوعًا ليسهل الرجوع إليها.
ولأن C++ يتجاهل المسافات البيضاء، غُيّر التنسيق ليضع كل عنصر في سطر واحد.

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
يعمل الإعلان كملاحظة موجّهة إلى المترجم بأن هناك دالة بهذا الاسم ونوع الإرجاع وقائمة المعاملات.
لن يعمل الكود إذا كان التعريف مفقودًا.
الإعلانات اختيارية، وتكون مطلوبة إذا استخدمت الدالة قبل تعريفها.
ويمكن للإعلانات أن تحل مشكلات مثل المراجع الدائرية، كما يمكن استخدامها لفصل الواجهة عن التنفيذ.
~~~~

## المحدِّد `const`

أحيانًا تريد التأكد من أن القيم لا يمكن تغييرها بعد تهيئتها.
يستخدم C++ الكلمة المفتاحية `const` كمحدِّد للثوابت.

```cpp
const int number_of_dragon_balls{7};
number_of_dragon_balls--; // compilation error
```

~~~~exercism/note
سترى غالبًا الثوابت مكتوبة بحالة _UPPER_SNAKE_CASE_.
ويُوصى بحفظ هذه الحالة للماكرو، إن لم توجد اصطلاحات أخرى.
~~~~

إذا حاولت تغيير متغير ثابت بعد ضبطه، فلن يُترجم كودك.
يساعد ذلك على تجنّب التغييرات غير المقصودة، لكنه يفتح أيضًا إمكانات للتحسين أمام المترجم.
وكإنسان، يصبح استنتاج سلوك الكود أسهل عليك إذا علمت أن أجزاء معينة لن تتأثر.

يمكنك أيضًا استخدام `const` كمحدِّد لمعاملات الدالة.

```cpp
string guess_number(const int& secret, const int& guess) {
    if (secret < guess) return "lower.";
    if (secret > guess) return "higher.";
    return "exact!";
}
```

عندما تمرّر مرجعًا `const` إلى الدالة، يمكنك التأكد من أنه سيُترك دون تغيير.
سترى غالبًا مراجع `const` للكائنات التي قد يكون نسخها مكلفًا، مثل السلاسل النصية الطويلة.
وهناك استخدام ثالث للمحدِّد `const`: دوال الأعضاء التي لا تغيّر نسخة الصنف.

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

تستخدم دالة العضو `answer` في الصنف `Stubborn` مرجعًا `const string&` كمعامل.
يتجنّب ذلك عملية نسخ من الكائن الأصلي الذي مُرّر إلى الدالة.

## التحميل الزائد للدوال

يمكن لعدة دوال أن تحمل الاسم نفسه إذا اختلفت قائمة المعاملات.
ويُسمى ذلك التحميل الزائد للدوال، ويُجرى عادةً عندما تؤدي هذه الدوال مهام متشابهة جدًا.

إن ترويسة الدالة دون نوع الإرجاع هي __توقيع النوع__ للدالة.
وأي تغيير في توقيع النوع ينتج دالة جديدة.

يحتوي مثال `play_sound` على ستة تحميلات مختلفة لتناسب سيناريوهات مختلفة:

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
يُحدَّد توقيع النوع باسم الدالة وعدد المعاملات وأنواعها ومحدِّداتها (وليس أسماءها).
ونوع الإرجاع ليس جزءًا من توقيع النوع بشكل صريح، وستحصل على أخطاء في الترجمة إذا كان لديك دالتان تختلفان في نوع الإرجاع فقط.
سيشكو المترجم لأنه ليس واضحًا أيّ الدالتين ينبغي استخدامها.
~~~~

## الوسائط الافتراضية

قد تصبح بعض الدوال طويلة جدًا، وقد تستخدم كثير من استدعاءاتها القيم نفسها لمعظم المعاملات.
يمكن تجنّب التكرار في تلك الاستدعاءات باستخدام الوسائط الافتراضية.

```cpp
void record_new_horse_birth(string name, int weight, string color="brown-ish", string dam="Alruccaba", string sire="Poseidon");

record_new_horse_birth("Urban Sea", 130); // color will be brown, dam "Alruccabam", sire "Poseidon"
record_new_horse_birth("Highclere", 175, "off-white", "Fall Aspen");   // sire will be "Poseidon"
```

ولأن إعلان الدالة يُقرأ غالبًا قبل تعريفها، فهو المكان الأفضل لضبط الوسائط الافتراضية.
وإذا كان لأحد المعاملات إعلان افتراضي، فيجب أن يكون لكل المعاملات الواقعة على يمينه إعلان افتراضي أيضًا.
وأحيانًا يمكن إعادة هيكلة التحميلات المعقّدة للدوال إلى عدد أقل من الدوال باستخدام الوسائط الافتراضية لتحسين قابلية الصيانة.
