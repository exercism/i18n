# संकेत

## सामान्य

- स्ट्रिंग के बारे में आधिकारिक [स्ट्रिंग टाइप डॉक्युमेंटेशन][string-type-documentation] में पढ़िए।
- स्ट्रिंग पर उपलब्ध बिल्ट-इन ऑपरेशन जानने के लिए [उपलब्ध _स्ट्रिंग फंक्शन_][string-functions] देखिए।

## 1. नाम का पहला अक्षर निकालिए

- स्ट्रिंग से पहला अक्षर निकालने के लिए एक [बिल्ट-इन फंक्शन][string-substr] है।
- स्ट्रिंग से आगे, पीछे, या आगे और पीछे दोनों तरफ के खाली स्थान हटाने के लिए कई [बिल्ट-इन फंक्शन][string-trim] हैं।

## 2. पहले अक्षर को इनिशियल में बदलिए

- स्ट्रिंग के सारे अक्षरों को उनके बड़े अक्षरों वाले रूप में बदलने के लिए एक [बिल्ट-इन फंक्शन][string-upcase] है।
- दो स्ट्रिंग जोड़ने वाला एक [ऑपरेटर][concat-operator] है।

## 3. पूरे नाम को पहले नाम और अंतिम नाम में बाँटिए

- एक [बिल्ट-इन फंक्शन][string-explode] है जो एक स्ट्रिंग को दूसरी स्ट्रिंग के आधार पर बाँटता है।
- ऐरे पर पैटर्न मैचिंग करके ऐरे के पहले कुछ एलिमेंट वेरिएबलो को असाइन किए जा सकते हैं।

## 4. इनिशियल को दिल के अंदर रखिए

- स्ट्रिंग के अंदर [वेरिएबल][string-variables] फैलाने के लिए एक खास सिंटैक्स है।
- नई लाइनों को एस्केप किए बिना [मल्टीलाइन स्ट्रिंग][heredoc-syntax] लिखने के लिए एक खास सिंटैक्स है।

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
