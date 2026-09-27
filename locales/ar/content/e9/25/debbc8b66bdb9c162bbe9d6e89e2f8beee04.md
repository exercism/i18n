# الجمل الشرطية

```sather
   if score >= 5 then
      return "Recalled";
   else
      return "Thank you";
   end;
```

يجب أن يكون السؤال الواقع بين `if` و`then` من النوع `BOOL`. ولن يقبل Sather عددًا في هذا الموضع، لذا لا وجود لعادة على غرار C في معاملة الصفر على أنه خطأ.

## البنية

```sather
   if first_question then
      ...
   elsif second_question then
      ...
   elsif third_question then
      ...
   else
      ...
   end;
```

تُطرح الأسئلة من الأعلى إلى الأسفل، وأول سؤال تكون إجابته صحيحة هو الفائز. ويُتخطّى كل ما يليه دون أن يُطرح أصلًا. ولهذا يجب أن يتدرّج التسلسل من الاختبار الأكثر تحديدًا إلى الأقل: فوضع `score >= 5` فوق `score >= 8` يعني أن الثاني لن يصل إليه التنفيذ أبدًا.

استخدام `else` اختياري، ويمكن تكرار `elsif` بقدر الحاجة.

## الجمل الشرطية عبارات، لا قيم

لا يُنتج `if` قيمة بنفسه، لذا فهذا ليس كودًا صالحًا في Sather:

```sather
   -- wrong
   grade := if score > 5 then "pass" else "fail" end;
```

إما أن تُرجع قيمة من داخل كل فرع، وإما أن تُسند قيمة إلى متغير داخل كل فرع.

## متى لا تستخدمها

الروتين الذي يجيب عن سؤال ينبغي أن يُرجع السؤال نفسه:

```sather
   -- say this
   old_enough(age : INT) : BOOL is
      return age >= 13;
   end;

   -- not this
   old_enough(age : INT) : BOOL is
      if age >= 13 then return true; else return false; end;
   end;
```

لا تقول النسخة الثانية شيئًا لا تقوله الأولى، لكن بثلاثة أضعاف طولها.

## التداخل

يمكن لـ `if` أن تحتوي `if` أخرى. وغالبًا لا حاجة لذلك: فسؤالان يجب أن يتحققا معًا يمكن جمعهما بـ `and` بدلًا من ذلك، وهذا أسهل في القراءة.

```sather
   if score >= 8 and sings then
      return "Lead";
   end;
```
