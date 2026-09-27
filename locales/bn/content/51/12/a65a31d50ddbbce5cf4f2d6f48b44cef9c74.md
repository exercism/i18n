# ভূমিকা

ABAP এমন একটি অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং মডেল সাপোর্ট করে, যা ABAP Objects-এর ক্লাস ও ইন্টারফেসের উপর ভিত্তি করে তৈরি।

## (পুনরায়) অ্যাসাইনমেন্ট

ABAP-তে নামের সাথে মান অ্যাসাইন করার কয়েকটি প্রধান উপায় আছে: ভ্যারিয়েবল বা কনস্ট্যান্ট ব্যবহার করে। Exercism-এ ভ্যারিয়েবল সবসময় [snake-case][wiki-snake-case] আকারে লেখা হয়। অনুসরণ করার মতো কোনো অফিসিয়াল গাইড নেই, আর বিভিন্ন কোম্পানি ও প্রতিষ্ঠানের স্টাইল গাইডও ভিন্ন ভিন্ন। _ভ্যারিয়েবল আপনি নিজের ইচ্ছেমতো যেভাবেই চান লিখতে পারেন_। অনুশীলনীগুলো যেভাবে তৈরি করা হয়েছে সেভাবে ভ্যারিয়েবল লিখলে সুবিধা হলো, ওয়েব ইন্টারফেস ও বেশিরভাগ IDE-তে সেগুলো আলাদাভাবে হাইলাইট হয়ে থাকবে।

ABAP-তে [`constant`][constant] বা [`data`][data] কিওয়ার্ড ব্যবহার করে ভ্যারিয়েবল ডিফাইন করা যায়।

`data` ব্যবহার করলে একটি ভ্যারিয়েবল তার পুরো জীবনকালে ভিন্ন ভিন্ন মান রেফার করতে পারে। যেমন, [অ্যাসাইনমেন্ট অপারেটর `=`][assignment] ব্যবহার করে `my_first_variable`-কে অনেকবার ডিফাইন ও রিডিফাইন করা যায়:

```abap
DATA my_first_variable TYPE i. " integer

my_first_variable = 1.
my_first_variable = 4711 * 3.
my_first_variable = some_complex_calculation( ).
```

`data`-র বিপরীতে, `constant` দিয়ে ডিফাইন করা ভ্যারিয়েবলে কেবল একবারই অ্যাসাইন করা যায়। ABAP-তে কনস্ট্যান্ট ডিফাইন করতে এটাই ব্যবহার করা হয়।

```abap
CONSTANT my_first_constant TYPE i VALUE 10.

" Can not be re-assigned
my_first_constant = 20.
// => SyntaxError: Assignment to constant variable.
```

## ক্লাস ও মেথড ডিক্লারেশন

ABAP-তে কার্যকারিতার এককগুলো _মেথডে_ এনক্যাপসুলেট করা হয়, আর একসাথে সম্পর্কিত মেথডগুলো সাধারণত একই [ক্লাসে][classes] একত্র করা হয়। এই মেথডগুলো প্যারামিটার (আর্গুমেন্ট) নিতে পারে, আর মেথড ডেফিনিশনে `returning` কিওয়ার্ড ব্যবহার করে একটি মান _রিটার্ন_ করতে পারে। মেথডগুলো `( )` সিনট্যাক্স ব্যবহার করে কল করা হয়।

```abap
CLASS my_class DEFINITION.

  PUBLIC SECTION.

    METHODS add
      IMPORTING
        num1          TYPE i
        num2          TYPE i
      RETURNING
        VALUE(result) TYPE i.

ENDCLASS.

CLASS my_class IMPLEMENTATION.

  METHOD add.
    result = num1 + num2.
  ENDMETHOD.

ENDCLASS.

add( num1 = 1 num2 = 3 ).
// => 4
```

[constant]: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm?file=abapconstants.htm
[data]: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm?file=abapdata.htm
[assignment]: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm?file=abenequals_operator.htm
[classes]: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm?file=abapclass.htm
[methods]: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm?file=abapmethods_functional.htm