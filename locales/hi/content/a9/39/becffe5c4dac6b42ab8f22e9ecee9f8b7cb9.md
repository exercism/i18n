# JSON फाइलों को फॉर्मेट करना

एक Exercism ट्रैक रेपो में कई JSON फाइलें होती हैं, जैसे:

- ट्रैक की `config.json` फाइल।
- हर कॉन्सेप्ट के लिए एक `.meta/config.json` और एक `links.json` फाइल।
- हर कॉन्सेप्ट अभ्यास या प्रैक्टिस अभ्यास के लिए एक `.meta/config.json` फाइल।

अगर इन फाइलों की फॉर्मेटिंग पूरे Exercism में एक जैसी हो, तो वे पढ़ने में ज़्यादा आसान लगती हैं। इसलिए configlet में एक `fmt` कमांड है, जो किसी ट्रैक की JSON फाइलों को मानक रूप में दोबारा लिख देता है।

`fmt` कमांड इन फाइलों को फॉर्मेट करता है:

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## उपयोग

`fmt` कमांड अभ्यास की 'meta/config.json' फाइलों को फॉर्मेट करता है।

```
configlet [global-options] fmt [command-options]

Global options:
  -h, --help                   Show this help message and exit
      --version                Show this tool's version information and exit
  -t, --track-dir <dir>        Specify a track directory to use instead of the current directory
  -v, --verbosity <verbosity>  The verbosity of output. Allowed values: q[uiet], n[ormal], d[etailed]

Options for fmt:
  -e, --exercise <slug>        Only operate on this exercise
  -u, --update                 Prompt to write formatted files
  -y, --yes                    Auto-confirm the prompt from --update
```

सादा `configlet fmt` ट्रैक में कोई बदलाव नहीं करता। यह हर कॉन्सेप्ट अभ्यास और प्रैक्टिस अभ्यास की `.meta/config.json` फाइल की फॉर्मेटिंग जाँचता है, और साथ ही ट्रैक की `config.json` फाइल की भी।

उन सारे पाथ की सूची देखने के लिए जिनके लिए पहले से फॉर्मेटेड अभ्यास `.meta/config.json` फाइल नहीं है (अगर कम से कम एक अभ्यास में फॉर्मेटेड कॉन्फिग फाइल नहीं है, तो शून्य के अलावा एग्ज़िट कोड के साथ बाहर निकलता है):

```shell
configlet fmt
```

फॉर्मेटेड कॉन्फिग फाइलें लिखने का प्रॉम्प्ट पाने के लिए `--update` ऑप्शन जोड़िए (संक्षेप में `-u`):

```shell
configlet fmt --update
```

बिना कुछ पूछे फॉर्मेटेड कॉन्फिग फाइलें लिखने के लिए `--yes` ऑप्शन जोड़िए (संक्षेप में `-y`):

```shell
configlet fmt --update --yes
```

किसी एक अभ्यास पर काम करने के लिए `--exercise` ऑप्शन इस्तेमाल कीजिए (संक्षेप में `-e`)।
उदाहरण के लिए, `prime-factors` अभ्यास की फॉर्मेटेड कॉन्फिग फाइल बिना कुछ पूछे लिखने के लिए:

```shell
configlet fmt -uy -e prime-factors
```

JSON फाइलें लिखते समय `configlet fmt` ये काम करता है:

- की/वैल्यू जोड़ों को मानक क्रम में लिखता है।

- इंडेंटेशन के लिए दो स्पेस इस्तेमाल करता है।

- JSON ऐरे के हर एलिमेंट के लिए, और JSON ऑब्जेक्ट की हर की के लिए, अलग लाइन इस्तेमाल करता है।

- जो की ऑप्शनल हैं और जिनकी वैल्यू खाली है, उनके की/वैल्यू जोड़े हटा देता है।
  उदाहरण के लिए, `"source": ""` हटा दिया जाता है।

- प्रैक्टिस अभ्यास की कॉन्फिग फाइलों से `"test_runner": true` हटा देता है।
  यह एक ऑप्शनल की है। स्पेक के मुताबिक, अगर `test_runner` की नहीं दी गई हो, तो उसका मतलब वैल्यू `true` है।

- अगर किसी JSON ऑब्जेक्ट में एक ही की नाम वाले एक से ज़्यादा की/वैल्यू जोड़े हैं, तो सिर्फ अंतिम वाला ही रखता है।

किसी अभ्यास की `.meta/config.json` फाइल के लिए की का मानक क्रम यह है:

```text
- authors
- [contributors]
- files
  - solution
  - test
  - exemplar           (Concept Exercises only)
  - example            (Practice Exercises only)
  - [editor]
  - [invalidator]
- [language_versions]
- [forked_from]        (Concept Exercises only)
- [icon]               (Concept Exercises only)
- [test_runner]        (Practice Exercises only)
- blurb
- [source]
- [source_url]
- [custom]
```

जहाँ चौकोर ब्रैकेट बताते हैं कि उनके अंदर वाली की ऑप्शनल है।

ध्यान दीजिए कि `configlet fmt` सिर्फ उन्हीं अभ्यासों पर काम करता है जो ट्रैक-लेवल की `config.json` फाइल में मौजूद हैं।
इसलिए अगर आप किसी ट्रैक पर कोई नया अभ्यास बना रहे हैं और उसकी `.meta/config.json` फाइल फॉर्मेट करना चाहते हैं, तो पहले उस अभ्यास को ट्रैक-लेवल की `config.json` फाइल में जोड़िए।
अगर अभ्यास अभी उपयोगकर्ताओं के सामने लाने लायक तैयार नहीं है, तो उसकी `status` वैल्यू `wip` रखिए।

जब configlet बाहर निकलता है, तब अगर उसने जो भी कॉन्फिग फाइलें देखीं वे सब फॉर्मेटेड हैं, तो एग्ज़िट कोड 0 होता है, वरना 1।
