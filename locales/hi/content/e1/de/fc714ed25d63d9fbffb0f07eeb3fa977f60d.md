# डीकंपोज़िशन और मल्टीपल असाइनमेंट

डीकंपोज़िशन का मतलब है किसी कलेक्शन, जैसे `Array` या `Hash`, के एलिमेंट को अलग-अलग निकालना।
इस तरह डीकंपोज़ की गई वैल्यू को फिर उसी स्टेटमेंट में वेरिएबलो को असाइन किया जा सकता है।

[मल्टीपल असाइनमेंट][multiple assignment] एक ही स्टेटमेंट में कई वेरिएबलो को डीकंपोज़ की गई वैल्यू असाइन करने की सुविधा है।
इससे कोड ज़्यादा संक्षिप्त और पढ़ने में आसान हो जाता है, और यह उन वेरिएबलो को कॉमा से अलग करके किया जाता है, जैसे `first, second, third = [1, 2, 3]`।

स्प्लैट ऑपरेटर (`*`), और डबल स्प्लैट ऑपरेटर, (`**`), अक्सर डीकंपोज़िशन के संदर्भ में इस्तेमाल होते हैं।

~~~~exercism/caution
`*<variable_name>` और `**<variable_name>` को `*` और `**` के साथ भ्रमित नहीं करना चाहिए।
`*` और `**` का इस्तेमाल क्रमशः गुणा और घात के लिए होता है, जबकि `*<variable_name>` और `**<variable_name>` का इस्तेमाल कंपोज़िशन और डीकंपोज़िशन ऑपरेटर के रूप में होता है।
~~~~

## मल्टीपल असाइनमेंट

मल्टीपल असाइनमेंट की मदद से आप एक ही लाइन में कई वेरिएबल असाइन कर सकते हैं।
वैल्यू को अलग करने के लिए कॉमा `,` का इस्तेमाल कीजिए:

```irb
>> a, b = 1, 2
=> [1, 2]
>> a
=> 1
```

मल्टीपल असाइनमेंट किसी एक डेटा टाइप तक सीमित नहीं है:

```irb
>> x, y, z = 1, "Hello", true
=> [1, "Hello", true]
>> x
=> 1
>> y
=> 'Hello'
>> z
=> true
```

मल्टीपल असाइनमेंट का इस्तेमाल **ऐरे** के एलिमेंट आपस में बदलने के लिए किया जा सकता है।
यह तरीका [सॉर्टिंग एल्गोरिदम][sorting algorithms] में काफी आम है।
उदाहरण के लिए:

```irb
>> numbers = [1, 2]
=> [1, 2]
>> numbers[0], numbers[1] = numbers[1], numbers[0]
=> [2, 1]
>> numbers
=> [2, 1]
```

~~~~exercism/note
इसे "पैरेलल असाइनमेंट" भी कहा जाता है, और इसका इस्तेमाल एक अस्थायी वेरिएबल से बचने के लिए किया जा सकता है।
~~~~

अगर वैल्यू से ज़्यादा वेरिएबल हों, तो अतिरिक्त वेरिएबलो को `nil` असाइन किया जाएगा:

```irb
>> a, b, c = 1, 2
=> [1, 2]
>> b
=> 2
>> c
=> nil
```

## डीकंपोज़िशन

Ruby में **ऐरे**/**हैश** के एलिमेंट को अलग-अलग वेरिएबलो में [डीकंपोज़ करना][decompose] संभव है।
चूँकि **ऐरे** में वैल्यू इंडेक्स के क्रम में आती हैं, इसलिए वे भी उसी क्रम में वेरिएबलो में अनपैक की जाती हैं:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

अगर कुछ वैल्यू की ज़रूरत नहीं है, तो आप `_` इस्तेमाल करके बता सकते हैं कि वह "इकट्ठा की गई, पर इस्तेमाल नहीं हुई":

```irb
>> fruits = ["apple", "banana", "cherry"]
>> _, _, z = fruits
>> z
=> "cherry"
```

### गहरा डीकंपोज़िशन

**ऐरे** के अंदर मौजूद **ऐरे** (_जिसे नेस्टेड ऐरे भी कहते हैं_) से वैल्यू डीकंपोज़ करके असाइन करना उसी तरह काम करता है जैसे उथला डीकंपोज़िशन करता है, लेकिन इसमें वैल्यू का संदर्भ या स्थान साफ़ करने के लिए [सीमांकित डीकंपोज़िशन एक्सप्रेशन (`()`)][delimited decomposition expression] की ज़रूरत होती है:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> (a, b), (c, d) = fruits_vegetables
>> a
=> "apple"
>> d
=> "potato"
```

आप किसी नेस्टेड **ऐरे** का बस एक हिस्सा भी गहराई से अनपैक कर सकते हैं:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> a, (c, d) = fruits_vegetables
>> a
=> ["apple", "banana"]
>> c
=> "carrot"
```

अगर डीकंपोज़िशन में वेरिएबलो की जगह गलत हो या वैल्यू की संख्या गलत हो, तो आपको **सिंटैक्स एरर** मिलेगी:

```ruby
fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]

(a, b), (d) = fruits_vegetables
# syntax error, unexpected '=', expecting '.' or &. or :: or '['

((a, b), (d)) = fruits_vegetables
# syntax error, unexpected ')', expecting '.' or &. or :: or '['
```

यहाँ खुद प्रयोग करके देखिए, और आप पाएँगे कि पहला पैटर्न ही तय करता है, दाईं ओर की उपलब्ध वैल्यू नहीं।
सिंटैक्स एरर का डेटा स्ट्रक्चर से कोई संबंध नहीं है।

### सिंगल स्प्लैट ऑपरेटर (`*`) से ऐरे का डीकंपोज़िशन

**ऐरे** का [डीकंपोज़िशन][decompose] करते समय आप "बची हुई" वैल्यू पकड़ने के लिए स्प्लैट ऑपरेटर (`*`) इस्तेमाल कर सकते हैं।
यह **ऐरे** को स्लाइस करने से ज़्यादा साफ़ है (_जो कुछ स्थितियों में कम पढ़ने योग्य होता है_)।
उदाहरण के लिए, हम पहला एलिमेंट निकाल सकते हैं और फिर बाकी वैल्यू को पहले एलिमेंट के बिना एक नए **ऐरे** में असाइन कर सकते हैं:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *last = fruits
>> x
=> "apple"
>> last
=> ["banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

हम **ऐरे** की शुरुआत और अंत की वैल्यू भी निकाल सकते हैं और बीच की सारी वैल्यू को एक साथ समूहित कर सकते हैं:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *middle, y, z = fruits
>> y
=> "melon"
>> middle
=> ["banana", "cherry", "orange", "kiwi"]
```

हम `*` का इस्तेमाल गहरे डीकंपोज़िशन में भी कर सकते हैं:

```irb
>> fruits_vegetables = [["apple", "banana", "melon"], ["carrot", "potato", "tomato"]]
>> (a, *rest), b = fruits_vegetables
>> a
=> "apple"
>> rest
=> ["banana", "melon"]
```

### `Hash` का डीकंपोज़िशन

**हैश** का डीकंपोज़िशन **ऐरे** के डीकंपोज़िशन से थोड़ा अलग है।
किसी **हैश** को अनपैक करने के लिए पहले उसे **ऐरे** में बदलना ज़रूरी है।
ऐसा न करने पर डीकंपोज़िशन नहीं होगा:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory
>> x
=> {:apple=>6, :banana=>2, :cherry=>3}
>> y
=> nil
```

`Hash` को **ऐरे** में बदलने के लिए आप `to_a` मेथड इस्तेमाल कर सकते हैं:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> fruits_inventory.to_a
=> [[:apple, 6], [:banana, 2], [:cherry, 3]]
>> x, y, z = fruits_inventory.to_a
>> x
=> [:apple, 6]
```

अगर आप की को अनपैक करना चाहते हैं, तो `keys` मेथड इस्तेमाल कर सकते हैं:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.keys
>> x
=> :apple
```

अगर आप वैल्यू को अनपैक करना चाहते हैं, तो `values` मेथड इस्तेमाल कर सकते हैं:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.values
>> x
=> 6
```

## कंपोज़िशन

कंपोज़िशन का मतलब है कई वैल्यू को एक **ऐरे** में इकट्ठा करके एक वेरिएबल को असाइन करना।
यह तब काम आता है जब आप वैल्यू को _डीकंपोज़_ करना, उनमें बदलाव करना, और फिर नतीजों को _कंपोज़_ करके वापस एक वेरिएबल में रखना चाहते हैं।
इससे 2 या अधिक **ऐरे**/**हैश** पर मर्ज करना भी संभव हो जाता है।

### स्प्लैट ऑपरेटर (`*`) से ऐरे का कंपोज़िशन

**ऐरे** का कंपोज़िशन स्प्लैट ऑपरेटर (`*`) की मदद से किया जा सकता है।
यह सारी वैल्यू को एक **ऐरे** में पैक कर देता है।

```irb
>> fruits = ["apple", "banana", "cherry"]
>> more_fruits = ["orange", "kiwi", "melon", "mango"]

# fruits and more_fruits are unpacked and then their elements are packed into combined_fruits
>> combined_fruits = *fruits, *more_fruits

>> combined_fruits
=> ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

### डबल स्प्लैट ऑपरेटर (`**`) से हैश का कंपोज़िशन

हैश का कंपोज़िशन डबल स्प्लैट ऑपरेटर (`**`) की मदद से किया जाता है।
यह एक हैश के सारे **की**/**वैल्यू** जोड़े को दूसरे हैश में पैक कर देता है, या दो हैश को आपस में जोड़ देता है।

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> more_fruits_inventory = {orange: 4, kiwi: 1, melon: 2, mango: 3}

# fruits_inventory and more_fruits_inventory are unpacked into key-values pairs and combined.
>> combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}

# then the pairs are packed into combined_fruits_inventory
>> combined_fruits_inventory
=> {:apple=>6, :banana=>2, :cherry=>3, :orange=>4, :kiwi=>1, :melon=>2, :mango=>3}
```

## मेथड के साथ स्प्लैट ऑपरेटर (`*`) और डबल स्प्लैट ऑपरेटर (`**`) का उपयोग

### मेथड पैरामीटर के साथ कंपोज़िशन

जब आप ऐसा मेथड बनाते हैं जो किसी भी संख्या में आर्गुमेंट लेता है, तो मेथड बनाते समय आप [`*arguments`][arguments] या [`**keyword_arguments`][keyword arguments] इस्तेमाल कर सकते हैं।
`*arguments` का इस्तेमाल किसी भी संख्या में पोज़िशनल (गैर-कीवर्ड) आर्गुमेंट पैक करने के लिए होता है, और
`**keyword_arguments` का इस्तेमाल किसी भी संख्या में कीवर्ड आर्गुमेंट पैक करने के लिए होता है।

`*arguments` का उपयोग:

```irb
# This method is defined to take any number of positional arguments
# (Using the single line form of the definition of a method.)

>> def my_method(*arguments)= arguments

# Arguments given to the method are packed into an array

>> my_method(1, 2, 3)
=> [1, 2, 3]

>> my_method("Hello")
=> ["Hello"]

>> my_method(1, 2, 3, "Hello", "Mars")
=> [1, 2, 3, "Hello", "Mars"]
```

`**keyword_arguments` का उपयोग:

```irb
# This method is defined to take any number of keyword arguments

>> def my_method(**keyword_arguments)= keyword_arguments

# Arguments given to the method are packed into a dictionary

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

अगर बनाए गए मेथड में कीवर्ड आर्गुमेंट के लिए कोई पैरामीटर तय नहीं है (`**keyword_arguments` या `<key_word>: <value>`) तो कीवर्ड आर्गुमेंट एक हैश में पैक होकर अंतिम पैरामीटर को असाइन कर दिए जाएँगे।

```irb
>> def my_method(a)= a

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

`*arguments` और `**keyword_arguments` एक साथ भी इस्तेमाल किए जा सकते हैं:

```ruby
def my_method(*arguments, **keyword_arguments)
  p arguments.sum
  for (key, value) in keyword_arguments.to_a
    p key.to_s + " = " + value.to_s
  end
end


my_method(1, 2, 3, a: 1, b: 2, c: 3)
6
"a = 1"
"b = 2"
"c = 3"
```

आप खास पोज़िशनल आर्गुमेंट की अनुमति देने के लिए `*arguments` से पहले और बाद में भी आर्गुमेंट लिख सकते हैं।
यह उसी तरह काम करता है जैसे किसी ऐरे का डीकंपोज़िशन करता है।

~~~~exercism/caution
आर्गुमेंट एक खास क्रम में होने चाहिए:

`def my_method(<positional_arguments>, *arguments, <positional_arguments>, <keyword_arguments>, **keyword_arguments)`

अगर आप इस क्रम का पालन नहीं करते, तो आपको एरर मिलेगी।
~~~~

```ruby
def my_method(a, b, *arguments)
  p a
  p b
  p arguments
end

my_method(1, 2, 3, 4, 5)
1
2
[3, 4, 5]
```

आप `*arguments` से पहले और बाद में पोज़िशनल आर्गुमेंट लिख सकते हैं:

```irb
>> def my_method(a, *middle, b)= middle

>> my_method(1, 2, 3, 4, 5)
=> [2, 3, 4]
```

आप पोज़िशनल आर्गुमेंट, \*arguments, कीवर्ड आर्गुमेंट और \*\*keyword_arguments को भी एक साथ जोड़ सकते हैं:

```irb
>> def my_method(first, *many, last, a:, **keyword_arguments)
     p first
     p many
     p last
     p a
     p keyword_arguments
     end

>> my_method(1, 2, 3, 4, 5, a: 6, b: 7, c: 8)
1
[2, 3, 4]
5
6
{:b => 7, :c => 8}
```

गलत क्रम में आर्गुमेंट लिखने पर आपको एरर मिलेगी:

```ruby
def my_method(a:, **keyword_arguments, first, *arguments, last)
  arguments
end

my_method(1, 2, 3, 4, a: 5)

syntax error, unexpected local variable or method, expecting & or '&'
... my_method(a:, **keyword_arguments, first, *arguments, last)
```

### मेथड कॉल में डीकंपोज़िशन

आप आर्गुमेंट के **ऐरे** को मेथड कॉल में अनपैक करने के लिए स्प्लैट ऑपरेटर (`*`) इस्तेमाल कर सकते हैं:

```ruby
def my_method(a, b, c)
  p c
  p b
  p a
end

numbers = [1, 2, 3]
my_method(*numbers)
3
2
1
```

आप आर्गुमेंट के **हैश** को मेथड कॉल में अनपैक करने के लिए डबल स्प्लैट ऑपरेटर (`**`) भी इस्तेमाल कर सकते हैं:

```ruby
def my_method(a:, b:, c:)
  p c
  p b
  p a
end

numbers = {a: 1, b: 2, c: 3}
my_method(**numbers)
3
2
1
```

[arguments]: https://docs.ruby-lang.org/en/master/syntax/methods_rdoc.html#label-Array-2FHash+Argument
[keyword arguments]: https://docs.ruby-lang.org/en/master/syntax/methods_rdoc.html#label-Keyword+Arguments
[multiple assignment]: https://docs.ruby-lang.org/en/master/syntax/assignment_rdoc.html#label-Multiple+Assignment
[sorting algorithms]: https://en.wikipedia.org/wiki/Sorting_algorithm
[decompose]: https://docs.ruby-lang.org/en/master/syntax/assignment_rdoc.html#label-Array+Decomposition
[delimited decomposition expression]: https://riptutorial.com/ruby/example/8798/decomposition
