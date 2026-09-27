# مقدمة

النوع `Maybe` هو الحل الذي تقدّمه لغة Elm للقيم الاختيارية.
لذلك يظهر في توقيعات الأنواع لعدد كبير من دوال Elm الأساسية، وفهمه أمر بالغ الأهمية.
ويُعرَّف النوع `Maybe` كما يلي:

```elm
type Maybe a = Nothing | Just a
```

يُعرف هذا باسم تعريف «النوع المخصص» في مصطلحات Elm.
وهو يشير إلى أن قيمة من هذا النوع إما أن تكون `Nothing` أو أن تكون `Just` لشيء من النوع `a`.
ويتم إنشاء قيمة `Maybe` عبر أحد المُنشئين `Nothing` و`Just`.
وتُقرأ محتويات `Maybe` عبر مطابقة الأنماط.

```elm
matthieu : Maybe String
matthieu = Just "Matthieu"

anon : Maybe String
anon = Nothing

sayHello : Maybe String -> String
sayHello maybeName =
    case maybeName of
        Nothing -> "Hello, World!"
        Just someName -> "Hello, " ++ someName ++ "!"

sayHello matthieu
    --> "Hello, Matthieu!"

sayHello anon
    --> "Hello, World!"
```

توجد أيضًا عدد من الدوال المفيدة في وحدة `Maybe` للتعامل مع قيم `Maybe`.

```elm
sayHelloAgain : Maybe String -> String
sayHelloAgain name = "Hello, " ++ Maybe.withDefault "World" name ++ "!"

capitalizeName : Maybe String -> Maybe String
capitalizeName name = Maybe.map String.toUpper name

capitalizeName matthieu
    --> Just "MATTHIEU"

capitalizeName anon
    --> Nothing
```
