# परिचय

ABAP एक ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग मॉडल का समर्थन करता है, जो ABAP Objects की क्लास और इंटरफ़ेस पर आधारित है।

## (फिर से) असाइनमेंट

ABAP में नामों को वैल्यू असाइन करने के कुछ मुख्य तरीके हैं - वेरिएबल या कॉन्स्टेंट इस्तेमाल करना। Exercism पर वेरिएबलो को हमेशा [स्नेक-केस][wiki-snake-case] में लिखा जाता है। इसके लिए कोई आधिकारिक गाइड नहीं है, और अलग-अलग कंपनियों और संगठनों के अपने-अपने स्टाइल गाइड होते हैं। _वेरिएबल आप जैसे चाहें वैसे लिख सकते हैं_। अभ्यास जिस तरह तैयार किए गए हैं, उसी तरह वेरिएबल लिखने का फ़ायदा यह है कि वेब इंटरफ़ेस और ज़्यादातर IDE में वे अलग तरीके से हाइलाइट होते हैं।

ABAP में वेरिएबल को [`constant`][constant] या [`data`][data] कीवर्ड की मदद से बनाया जा सकता है।

`data` इस्तेमाल करने पर एक वेरिएबल अपने जीवनकाल में अलग-अलग वैल्यू ले सकता है। उदाहरण के लिए, `my_first_variable` को [असाइनमेंट ऑपरेटर `=`][assignment] की मदद से कई बार परिभाषित और फिर से परिभाषित किया जा सकता है:

```abap
DATA my_first_variable TYPE i. " integer

my_first_variable = 1.
my_first_variable = 4711 * 3.
my_first_variable = some_complex_calculation( ).
```

`data` के उलट, `constant` से बनाए गए वेरिएबल को सिर्फ एक बार ही वैल्यू असाइन की जा सकती है। ABAP में कॉन्स्टेंट बनाने के लिए इसी का उपयोग किया जाता है।

```abap
CONSTANT my_first_constant TYPE i VALUE 10.

" Can not be re-assigned
my_first_constant = 20.
// => SyntaxError: Assignment to constant variable.
```

## क्लास और मेथड की घोषणाएँ

ABAP में कार्यक्षमता की इकाइयाँ _मेथड_ में एनकैप्सुलेट की जाती हैं, और अगर मेथड एक-दूसरे से जुड़े हों तो उन्हें आम तौर पर एक ही [क्लास][classes] में रखा जाता है। ये मेथड पैरामीटर (आर्गुमेंट) ले सकते हैं, और मेथड की परिभाषा में `returning` कीवर्ड का उपयोग करके एक वैल्यू _लौटा_ सकते हैं। मेथड को `( )` सिंटैक्स से कॉल किया जाता है।

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