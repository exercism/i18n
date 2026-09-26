# निर्देश

हमारा फुटबॉल क्लब [exercise:csharp/football-match-reports]() लीग में लगातार आगे बढ़ रहा है, और आपको एक बार फिर कुछ काम करने का मौका दिया गया है, इस बार सिक्योरिटी पास प्रिंट करने की प्रणाली पर।

सहायक स्टाफ का क्लास पदानुक्रम इस प्रकार है

```
TeamSupport (interface)
├ Chairman
├ Manager
└ Staff (abstract)
    ├ Physio
    ├ OffensiveCoach
    ├ GoalKeepingCoach
    └ Security
        ├ SecurityJunior
        ├ SecurityIntern
        └ PoliceLiaison
```

इस पदानुक्रम का पूरा कार्यान्वयन अभ्यास के सोर्स कोड के हिस्से के रूप में दिया गया है।

सिक्योरिटी पास बनाने वाले को दिया गया सारा डेटा जाँच लिया गया है और वह null नहीं होगा, इसकी गारंटी है।

## 1. सहायक टीम के किसी सदस्य का डिस्प्ले नाम पाइए, अगर वह स्टाफ सदस्य हो

कृपया `SecurityPassMaker.GetDisplayName()` मेथड लागू कीजिए। इसे `Staff` से बनी सभी क्लासों के इंस्टेंस के `Title` फील्ड की वैल्यू लौटानी चाहिए, और बाकी मामलों में "Too Important for a Security Pass" लौटाना चाहिए।

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. सिक्योरिटी टीम का डिस्प्ले नाम अनुकूलित कीजिए

कृपया `SecurityPassMaker.GetDisplayName()` मेथड में बदलाव कीजिए। इसे टास्क 1 की तरह ही काम करना चाहिए। फर्क सिर्फ इतना है कि अगर स्टाफ सदस्य सिक्योरिटी टीम का हिस्सा हो (यानी उसका टाइप `Security` हो या उससे बनी कोई क्लास), तो टाइटल के बाद " Priority Personnel" टेक्स्ट दिखना चाहिए।

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Physio());
// => "The Physio"
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior Priority Personnel"
```

## 3. सिर्फ प्रमुख सिक्योरिटी टीम सदस्यों को ही प्रायोरिटी पर्सनल मानिए

कृपया `SecurityPassMaker.GetDisplayName()` मेथड में बदलाव कीजिए। इसे टास्क 2 की तरह ही काम करना चाहिए। फर्क सिर्फ इतना है कि `SecurityJunior`, `SecurityIntern` और `PoliceLiaison` टाइप के इंस्टेंस के लिए " Priority Personnel" टेक्स्ट नहीं दिखना चाहिए।

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
