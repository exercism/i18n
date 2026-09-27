# مقدمة

## Access Behaviour

يستخدم Elixir ما يُعرف بـ _Behaviours_ في الكود لتوفير واجهات عامة مشتركة، مع تسهيل تطبيقات محددة لكل وحدة تنفّذ هذا السلوك. ومن الأمثلة الشائعة على ذلك _Access Behaviour_.

يوفر _Access Behaviour_ واجهة مشتركة لاسترجاع البيانات من بنية بيانات تعتمد على المفاتيح. وهو مُنفَّذ للخرائط وقوائم الكلمات المفتاحية، لكن لنلقِ نظرة على استخدامه مع الخرائط لنكوّن فكرة عنه. يحدد _Access Behaviour_ أنه عندما تكون لديك خريطة، يمكنك أن تتبعها بـ _الأقواس المربعة_ ثم تستخدم المفتاح لاسترجاع القيمة المرتبطة به.

```elixir
# Suppose we have these two maps defined (note the difference in the key type)
my_map = %{key: "my value"}
your_map = %{"key" => "your value"}

# Obtain the value using the Access Behaviour
my_map[:key] == "my value"
your_map[:key] == nil
your_map["key"] == "your value"
```

إذا لم يكن المفتاح موجودًا في بنية البيانات، فسيكون الناتج `nil`. وقد يكون هذا مصدرًا لسلوك غير مقصود، لأنه لا يرفع خطأً. لاحظ أن `nil` نفسه ينفّذ Access Behaviour ويُرجع دائمًا `nil` لأي مفتاح.
