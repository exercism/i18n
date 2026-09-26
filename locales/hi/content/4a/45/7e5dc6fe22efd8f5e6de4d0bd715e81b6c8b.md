# परिचय

वेक्टर के एलिमेंट के नाम रखे जा सकते हैं, जिससे कभी-कभी उनके साथ काम करना ज़्यादा आसान हो जाता है।

## बनाना

वेक्टर में नाम जोड़ने के तीन तरीके हैं।

1) वेक्टर बनाते समय

```R
> work_days <- c(Mon = TRUE, Tue = TRUE, Wed = TRUE, Thu = TRUE, Fri = TRUE, Sat = FALSE, Sun = FALSE)
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
```

2) `names()` को अक्षरों का वेक्टर असाइन करके

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> names(months) <- month.abb
> months
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
 31  28  31  30  31  30  31  31  30  31  30  31 
```

3) `setNames()` की मदद से

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> setNames(months, month.name)
  January  February     March     April       May      June      July    August September   October  November  December 
       31        28        31        30        31        30        31        31        30        31        30        31 
```

## हटाना

अगर नामों की ज़रूरत नहीं रही, तो उन्हें `NULL` पर सेट करके हटाया जा सकता है।

```R
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
> names(work_days) <- NULL
> work_days
[1]  TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

`unname()` फंक्शन भी यही काम करता है, और इससे आपका इरादा ज़्यादा साफ़ हो सकता है।

## नामों के साथ काम करना

`names()` फंक्शन नाम सेट करने के साथ-साथ उन्हें निकाल भी सकता है।

```R
> names(months) <- month.abb
> names(months)[1:3]
[1] "Jan" "Feb" "Mar"
```

स्थिति के इंडेक्स की जगह नाम का इस्तेमाल किया जा सकता है, और ऐसा करते समय कोटेशन लगाना ज़रूरी है।

```R
> months[c("Jul", "Aug")]
Jul Aug 
 31  31 
```

इस तरह की इंडेक्सिंग के सही तरीके से काम करने के लिए यह सुनिश्चित करना सबसे अच्छा है कि सभी नाम अलग-अलग हों और कोई नाम छूटा हुआ न हो। हालाँकि R यह ज़रूरी नहीं मानता कि नाम अलग-अलग हों।

वेक्टर के आम ऑपरेशन अब भी काम करते हैं, और जहाँ उचित हो वहाँ नाम आम तौर पर बने रहते हैं।

```R
> months[months == 30]
Apr Jun Sep Nov 
 30  30  30  30 

> sum(months)
[1] 365  # no meaningful names possible
```
