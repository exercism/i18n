# ملحق التعليمات

## تلميحات

عليك تنفيذ دالة `diamond` التي تطبع شكلًا ماسيًا يبدأ من `A` ويظهر فيه المحرف المعطى عند أوسع نقاطه. يمكنك استخدام التوقيع المرفق إذا لم تكن متأكدًا من الأنواع، لكن لا تدع ذلك يقيّد إبداعك:

```haskell
diamond :: Char -> Maybe [String]
```

يتعامل هذا التمرين مع بيانات نصية. ولأسباب تاريخية، فإن النوع `String` في Haskell مرادف للنوع `[Char]`، أي مصفوفة من المحارف. ولمعالجة البيانات النصية بكفاءة أكبر، يمكن استخدام النوع `Text`.

وكامتداد اختياري لهذا التمرين، يمكنك

- أن تقرأ عن [أنواع السلاسل النصية](https://haskell-lang.org/tutorial/string-types) في Haskell.
- أن تضيف `- text` إلى قائمة اعتمادياتك في package.yaml.
- أن تستورد `Data.Text` [بالطريقة التالية](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c):

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- يمكنك الآن أن تكتب مثلًا `diamond :: Char -> Maybe [Text]` وتشير إلى مُركّبات `Data.Text` مثل `T.pack`،
- أن تبحث عن التوثيق الخاص بـ [`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html)،
- يمكنك بعد ذلك استبدال كل مواضع `String` بـ `Text` في Diamond.hs:

```haskell
diamond :: Char -> Maybe [Text]
```

هذا الجزء اختياري بالكامل.
