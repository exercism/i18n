# دستور شرطی

```sather
   if score >= 5 then
      return "Recalled";
   else
      return "Thank you";
   end;
```

شرط بین `if` و `then` باید یک `BOOL` باشد. Sather عددی را آنجا نمی‌پذیرد، پس عادت سبک C برای در نظر گرفتن صفر به عنوان «غلط» وجود ندارد.

## ساختار

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

شرط‌ها از بالا به پایین بررسی می‌شوند و اولین شرطی که پاسخش «درست» باشد برنده است. همه‌ی موارد پایین‌تر بدون اینکه بررسی شوند رد می‌شوند. به همین دلیل یک زنجیره باید از خاص‌ترین آزمون به عام‌ترین پیش برود: قرار دادن `score >= 5` بالای `score >= 8` یعنی هرگز به دومی نمی‌رسیم.

`else` اختیاری است. `elsif` را می‌توان هر چند بار که لازم است تکرار کرد.

## دستور شرطی یک دستور است، نه یک مقدار

`if` خودش مقداری تولید نمی‌کند، بنابراین این کد Sather نیست:

```sather
   -- wrong
   grade := if score > 5 then "pass" else "fail" end;
```

یا از داخل هر شاخه `return` کنید، یا داخل هر شاخه به یک متغیر مقدار بدهید.

## چه زمانی از دستور شرطی استفاده نکنیم

تابعی که به یک شرط پاسخ می‌دهد باید همان شرط را برگرداند:

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

دومی هیچ چیزی بیش از اولی نمی‌گوید، در حالی که سه برابر طولانی‌تر است.

## تودرتو

یک `if` می‌تواند `if` دیگری را در خود جای دهد. اغلب نیازی به این کار نیست: دو شرطی که هر دو باید برقرار باشند را می‌توان به‌جای آن با `and` ترکیب کرد، که خواناتر است.

```sather
   if score >= 8 and sings then
      return "Lead";
   end;
```
