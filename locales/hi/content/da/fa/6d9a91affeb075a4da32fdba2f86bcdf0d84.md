# परिचय

पिछले एक कॉन्सेप्ट में बताया गया था कि स्थानीय लेबल और फंक्शन दोनों ही एक सेक्शन में रखे गए सिर्फ एड्रेस होते हैं। उस सेक्शन में निष्पादन योग्य कोड होता है, जैसे `section .text` में।

वास्तव में, फंक्शनों के साथ भी किसी भी मेमोरी एड्रेस की तरह ही काम किया जा सकता है। यानी उन्हें रजिस्टर में लोड किया जा सकता है, एक जगह से दूसरी जगह भेजा जा सकता है और मेमोरी में संग्रहीत किया जा सकता है। मेमोरी या रजिस्टर में संग्रहीत फंक्शन पर निष्पादन स्थानांतरित करने के लिए `call` या `jmp` का उपयोग करना भी संभव है:

```x86asm
section .text
sum_op:
    lea rax, [rdi + rsi] ; loads the sum rdi + rsi into rax
    ret

apply_sum:
    lea rax, [rel sum_op]
    jmp rax   ; tail call
```

जो फंक्शन एड्रेस किसी वैल्यू की तरह एक जगह से दूसरी जगह भेजा जाता है, उसे **थंक** कहा जाता है। असेंबली में थंक **हायर-ऑर्डर प्रोग्रामिंग** का एक बुनियादी हिस्सा हैं: ऐसा कोड जो दूसरे कोड पर काम करता है।

## डेटा के रूप में कोड

फंक्शन एड्रेस को मेमोरी में संग्रहीत करके बाद में निकाला भी जा सकता है:

```x86asm
section .bss
    cached_fn resq 1

section .text
save_op:
    mov qword [rel cached_fn], rdi
    ret

apply_op:
    ; arguments are already set up according to the ABI
    jmp qword [rel cached_fn] ; tail call
```

`save_op` को जो फंक्शन एड्रेस मिलता है, उसे `cached_fn` में लिख देता है। `save_op` के लौटने के बाद भी यह वैल्यू बनी रहती है, इसलिए बाद में `apply_op` को कॉल करने पर वह उसी एड्रेस पर टेल-जंप करता है जो सबसे बाद में संग्रहीत किया गया था। इससे यह संभव हो जाता है कि रनटाइम पर `apply_op` किस फंक्शन को कॉल करता है, यह बदला जा सके।

## डिस्पैच टेबल

फंक्शन एड्रेस को ऐरे में संग्रहीत करने से यह संभव हो जाता है कि किसी इंडेक्स के आधार पर अलग-अलग फंक्शन चुने जा सकें, जो रनटाइम की शर्त पर निर्भर हो सकता है। इसे **डिस्पैच टेबल** कहा जाता है:

```x86asm
section .data
    dispatch_table dq add_op, sub_op, mul_op

section .text
dispatch:
    ; this function takes two arguments in rdi and rsi, and an index in rdx
    ; it then applies the function corresponding to the index in rdx to the arguments
    lea rax, [rel dispatch_table]
    jmp qword [rax + 8*rdx]   ; tail-call the function address for the index
```

## स्टेटफुल थंक

जो थंक कॉल के बीच में किसी स्थायी मेमोरी को पढ़ता या बदलता है, उसका व्यवहार इस बात पर निर्भर कर सकता है कि उससे पहले क्या हुआ था। उसका परिणाम केवल उसके आर्गुमेंट पर ही निर्भर न होकर और चीज़ों पर भी निर्भर हो सकता है।

उदाहरण के लिए, एक _काउंटर_ जो एक फंक्शन लेता है और उसे मौजूदा काउंट के साथ कॉल करता है, और हर बार काउंट को बढ़ा देता है:

```x86asm
section .data
    count dq 0

section .text
tick:
    mov rax, rdi               ; saves the function address
    mov rdi, [rel count]       ; loads the current count as the function's argument
    inc qword [rel count]      ; advances the count
    jmp rax                    ; tail-calls the function
```

`tick` दिए गए फंक्शन को मौजूदा काउंट को आर्गुमेंट बनाकर कॉल करता है, फिर काउंट को बढ़ा देता है। तो पहली बार `tick(square)` कॉल करने पर `square(0)` कॉल होता है, अगली बार `tick(square)` कॉल करने पर `square(1)`, उसके बाद `square(2)`, और इसी तरह।

एक और उदाहरण _विलंबित गणना_ का है:

```x86asm
section .bss
    captured_fn resq 1
    argument resq 1

section .text
delay:
    mov qword [rel captured_fn], rdi ; saves the function
    mov qword [rel argument], rsi    ; saves the argument
    lea rax, [rel invoke]            ; returns the `invoke` function
    ret

invoke:
    mov rdi, qword [rel argument]    ; loads the saved argument into `rdi`
    jmp qword [rel captured_fn]      ; tail-calls the saved function
```

`delay` एक फंक्शन और एक वैल्यू लेता है, उन्हें संग्रहीत करता है, और `invoke` लौटाता है। जब `invoke` को कॉल किया जाता है, तो वह संग्रहीत किए गए आर्गुमेंट के साथ कैप्चर किए गए फंक्शन को चलाता है।

हायर-लेवल भाषाओं में आम कई पैटर्न, जैसे कॉलबैक, वर्चुअल मेथड, जनरेटर, करीइंग, फंक्शन कंपोज़िशन और कई अन्य, स्थायी स्थिति के साथ जोड़े गए थंक पर ही आधारित हैं।
