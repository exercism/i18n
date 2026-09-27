# تنسيق ملفات JSON

يحتوي مستودع المسار في Exercism على العديد من ملفات JSON، منها:

- ملف `config.json` الخاص بالمسار.
- لكل مفهوم، ملفّا `.meta/config.json` و`links.json`.
- لكل تمرين مفاهيم أو تمرين ممارسة، ملف `.meta/config.json`.

تصبح هذه الملفات أسهل قراءة إذا كان تنسيقها موحّدًا في Exercism كلها، ولذلك يوفّر configlet أمر `fmt` لإعادة كتابة ملفات JSON في المسار بصيغة قياسية.

يُنسّق أمر `fmt` الملفات التالية:

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## الاستخدام

يُنسّق أمر `fmt` ملفات 'meta/config.json' الخاصة بالتمارين.

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

لا يُجري `configlet fmt` وحده أي تغييرات على المسار، بل يتحقق من تنسيق ملف `.meta/config.json` لكل تمرين مفاهيم وتمرين ممارسة، ومن ملف `config.json` الخاص بالمسار.

لطباعة قائمة بالمسارات التي لا يوجد لها بعد ملف `.meta/config.json` مُنسّق للتمرين (مع الخروج برمز خروج غير صفري إذا كان تمرين واحد على الأقل يفتقر إلى ملف إعدادات مُنسّق):

```shell
configlet fmt
```

لتظهر لك مطالبة بكتابة ملفات الإعدادات المُنسّقة، أضف الخيار `--update` (أو `-u` اختصارًا):

```shell
configlet fmt --update
```

لكتابة ملفات الإعدادات المُنسّقة دون تفاعل، أضف الخيار `--yes` (أو `-y` اختصارًا):

```shell
configlet fmt --update --yes
```

للعمل على تمرين واحد، استخدم الخيار `--exercise` (أو `-e` اختصارًا).
على سبيل المثال، لكتابة ملف الإعدادات المُنسّق للتمرين `prime-factors` دون تفاعل:

```shell
configlet fmt -uy -e prime-factors
```

عند كتابة ملفات JSON، يقوم `configlet fmt` بما يلي:

- يكتب أزواج المفتاح/القيمة بالترتيب القياسي.

- يستخدم مسافتين للمسافة البادئة.

- يضع كل عنصر في مصفوفة JSON وكل مفتاح في كائن JSON في سطر منفصل.

- يحذف أزواج المفتاح/القيمة للمفاتيح الاختيارية التي قيمها فارغة.
  على سبيل المثال، يُحذف `"source": ""`.

- يحذف `"test_runner": true` من ملفات إعدادات تمارين الممارسة.
  هذا المفتاح اختياري، وتقول المواصفة إن غياب المفتاح `test_runner` يعني القيمة `true`.

- عندما يحتوي كائن JSON على أكثر من زوج مفتاح/قيمة بالاسم نفسه، يُبقى على الأخير فقط.

الترتيب القياسي للمفاتيح في ملف `.meta/config.json` الخاص بالتمرين هو:

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

حيث تشير الأقواس المربعة إلى أن المفتاح الواقع بينها اختياري.

لاحظ أن `configlet fmt` لا يعمل إلا على التمارين الموجودة في ملف `config.json` على مستوى المسار.
لذلك، إذا كنت تنفّذ تمرينًا جديدًا في مسار وتريد تنسيق ملف `.meta/config.json` الخاص به، فأضف التمرين إلى ملف `config.json` على مستوى المسار أولًا.
وإذا لم يكن التمرين جاهزًا بعد ليراه المستخدمون، فاضبط قيمة `status` فيه على `wip`.

يكون رمز الخروج 0 عندما تكون كل ملفات الإعدادات التي رآها configlet مُنسّقة عند خروجه، و1 بخلاف ذلك.
