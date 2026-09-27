# مقدمة

## الواجهات

الواجهة نوع يحتوي على أعضاء تُعرّف مجموعة من الوظائف المترابطة. وهي تفصل استخدامات الصنف عن التنفيذ، ما يتيح تنفيذات مختلفة متعددة أو دعم سلوك عام مثل التنسيق أو المقارنة أو التحويل.

تتشابه صياغة الواجهة مع صياغة الصنف، إلا أن الطرق تظهر كتوقيع فقط، ولا يُقدَّم لها جسم.

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

يجب على الصنف المُنفِّذ أن ينفّذ كل العمليات التي تُعرّفها الواجهة.

تحتوي الواجهات عادةً على طرق النسخة.

ومن أمثلة الواجهات الموجودة في مكتبة أصناف Java، إلى جانب `Cloneable` الموضحة أعلاه، الواجهة `Comparable<T>`.
يمكن تنفيذ الواجهة `Comparable<T>` حين يُطلب ترتيب عام افتراضي في المجموعات.
