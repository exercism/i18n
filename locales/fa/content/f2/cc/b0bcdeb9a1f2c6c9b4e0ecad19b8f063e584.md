# مقدمه

## روش‌های بیشتر برشماری

در «برشماری»، با روش‌های برشماری `count`، `any?`، `select`، `all` و `map` آشنا شدید.
در ادامه مروری بر آن‌ها داریم، به‌همراه چند مورد اضافه:

```ruby
fibonacci = [0, 1, 1, 2, 3, 5, 8, 13]

fibonacci.count  { |number| number == 1 }   #=> 2
fibonacci.any?   { |number| number > 20 }   #=> false
fibonacci.none?  { |number| number > 20 }   #=> true
fibonacci.select { |number| number.odd? }   #=> [1, 1, 3, 5, 13]
fibonacci.all?   { |number| number < 20 }   #=> true
fibonacci.map    { |number| number * 2  }   #=> [0, 2, 2, 4, 6, 10, 16, 26]
fibonacci.select { |number| number >= 5 }   #=> [5, 8, 13]
fibonacci.find   { |number| number >= 5 }   #=> 5

# Some methods work with or without a block
fibonacci.sum  #=> 33
fibonacci.sum { |number| number * number }  #=> 273

# There are also methods to help with nested arrays:
animals = [ ['cat', 'bob'], ['horse', 'caris'], ['mouse', 'arya'] ]
animals.flatten  #=> ["cat", "bob", "horse", "caris", "mouse", "arya"]
```

## برشماری هش‌ها

برشماری اشیای `Hash` دقیقاً مانند برشماری اشیای `Array` است، فقط با این تفاوت که بلوک دو آرگومان دریافت می‌کند: کلید و مقدار:

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.each { |animal, name| ... }
```

اگر فقط به یکی از آن دو مقدار نیاز دارید، می‌توانید از نماد ویژه‌ی `_` استفاده کنید تا نشان دهید که به مقدار دیگر نیازی نیست.
این کار هم کد را برای برنامه‌نویس شفاف‌تر می‌کند و هم یک بهینه‌سازی عملکرد است.

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.map { |_, name| name }  #=> ["bob, "caris", "arya"]
```

## برشماری تودرتو

می‌توانید درون بلوک‌های تودرتو هم برشماری کنید و روش‌ها را به‌صورت زنجیره‌ای پشت سر هم بچینید.
برای مثال، اگر آرایه‌ای از هش‌های حیوانات داشته باشیم و بخواهیم حیوانات با اسم‌های کوتاه را استخراج کنیم، ممکن است بخواهیم کاری شبیه به این انجام دهیم:

```ruby
pets = [
  { animal: "cats", names: ["bob", "fred", "sandra"] },
  { animal: "horses", names: ["caris", "black beard", "speedy"] },
  { animal: "mice", names: ["arya", "jerry"] }
]

pets.map { |pet|
  pet[:names].select { |name| name.length <= 5 }
}.flatten.sort
#=> ["arya", "bob", "caris", "fred", "jerry"]
```
