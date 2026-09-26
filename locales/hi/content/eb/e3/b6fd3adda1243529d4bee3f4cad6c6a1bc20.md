# संकेत

## सामान्य

- इस अभ्यास के सभी हिस्से बिटवाइज़ ऑपरेशन पर निर्भर करते हैं।
  - Exercism का [लर्निंग सिलेबस][concept-bitwise-operations] इसका आसान परिचय देता है।
  - [बिटवाइज़ ऑपरेटर][ref-bitwise-operators] Julia के मैनुअल में दिए गए हैं।
  - `Base` में बिट से जुड़े कई उपयोगी फंक्शन हैं, जिनमें [count_ones()][count_ones] और [trailing_zeros()][trailing_zeros] भी शामिल हैं।
- टेस्ट टाइप को लेकर कोई सख्त नियम नहीं बनाते, लेकिन यह अभ्यास अनसाइन्ड बाइट के बारे में है और [`UInt8`][uint8] वैल्यू के बारे में सोचना अपेक्षाकृत आसान है।
  - आर्गुमेंट और रिटर्न वैल्यू `Vector{UInt8}` होते हैं,
  - बिट-मास्क और बीच की वैल्यू के लिए `UInt8` वैल्यू उपयोगी होती हैं।
- दशमलव संख्याएँ ध्यान भटकाएँगी, इसलिए `UInt8` लिटरल के लिए हेक्स (`0xFF`) या बाइनरी (`0b11111111`) लिखना बेहतर है।
  - [`bitstring()`][bitstring] फंक्शन डीबग करते समय काम आ सकता है, क्योंकि यह बाइनरी को इंसान के पढ़ने लायक रूप में दिखाता है।
- कच्चा संदेश 8-बिट टुकड़ों के वेक्टर के रूप में आता है। इसे ऊपरी बिट्स में 7-बिट टुकड़ों में बदलना होता है और LSB के रूप में एक पैरिटी बिट भी जोड़ना होता है।
  - जिन बिट्स को अलग करना है, उनके लिए `&` या `|` के साथ बिट-मास्क इस्तेमाल कीजिए।
  - लेफ्ट-शिफ्ट (`<<`) और लॉजिकल राइट-शिफ्ट (`>>>`) ऑपरेटर ज़रूरी हैं।
  - यह सोचिए कि बचे हुए बिट्स को अगली बार प्रोसेसिंग करते समय कैसे आगे ले जाएँगे।
  - कैरी की वजह से हर इनपुट बाइट को दूसरों से अलग संभालना मुश्किल हो जाता है, इसलिए हायर-ऑर्डर फंक्शन इस्तेमाल करने की कोशिश करने से ज़्यादा आसान लूप चलाना (या शायद रिकर्शन) होगा।
  - एनकोड किया गया संदेश आम तौर पर कच्चे संदेश से लंबा (ज़्यादा बाइट का) होता है, क्योंकि हर बाइट में एक पैरिटी बिट के लिए जगह चाहिए।


  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
