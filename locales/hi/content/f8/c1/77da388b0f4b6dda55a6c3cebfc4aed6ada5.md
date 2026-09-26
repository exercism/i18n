# निर्देश

आप कॉर्पोरेट जासूसी के खिलाफ लड़ने वाली एक टास्क फोर्स का हिस्सा हैं। Shady Company X में आपका एक गुप्त मुखबिर है, और आपको शक है कि यह कंपनी अपने प्रतिस्पर्धियों से राज़ चुरा रही है।

आपकी मुखबिर Agent Ex एक Elixir डेवलपर हैं। वह अपने कोड में गुप्त संदेश एन्कोड करती हैं।

उसके गुप्त संदेश डिकोड करने के लिए:

- सभी फंक्शन (पब्लिक और प्राइवेट) उसी क्रम में लीजिए जिस क्रम में वे बनाए गए हैं।
- हर फंक्शन के नाम से पहले `n` अक्षर लीजिए, जहाँ `n` उस फंक्शन की आर्टी है।

## 1. कोड को डेटा में बदलिए

`TopSecret.to_ast/1` फंक्शन बनाइए। इसे Elixir कोड वाली एक स्ट्रिंग लेनी चाहिए और उसका AST लौटाना चाहिए।

```elixir
TopSecret.to_ast("div(4, 3)")
# => {:div, [line: 1], [4, 3]}
```

## 2. एक ही AST नोड को पार्स कीजिए

`TopSecret.decode_secret_message_part/2` फंक्शन बनाइए। इसे एक AST नोड और गुप्त संदेश के लिए एक एक्युमुलेटर (ऐरे) लेना चाहिए। इसे एक टपल लौटाना चाहिए, जिसमें पहला एलिमेंट वही AST नोड हो (बिना बदला हुआ) और दूसरा एलिमेंट एक्युमुलेटर हो।

अगर AST नोड का ऑपरेशन किसी फंक्शन को बनाना है (`def` या `defp`), तो फंक्शन के नाम को (स्ट्रिंग में बदलकर) एक्युमुलेटर के आगे जोड़ दीजिए। अगर ऑपरेशन कुछ और है, तो एक्युमुलेटर को बिना बदले लौटा दीजिए।

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b, c), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["cat", "day"]}

ast_node = TopSecret.to_ast("10 + 3")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["day"]}
```

इस फंक्शन को पूरे AST की जाँच के लिए कोई रिकर्सिव कॉल करने की ज़रूरत नहीं है, सिर्फ दिए गए नोड की। आखिरी चरण में हम बिल्ट-इन टूल की मदद से पूरे AST को एक-एक करके देखेंगे।

## 3. फंक्शन की परिभाषा से गुप्त संदेश का हिस्सा डिकोड कीजिए

`TopSecret.decode_secret_message_part/2` फंक्शन को आगे बढ़ाइए। अगर AST नोड का ऑपरेशन किसी फंक्शन को बनाना है, तो पूरा फंक्शन नाम न लौटाइए। इसके बजाय फंक्शन की आर्टी देखिए। फिर नाम से सिर्फ पहले `n` अक्षर लौटाइए, जहाँ `n` आर्टी है।

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}

ast_node = TopSecret.to_ast("defp cat(), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["", "day"]}
```

## 4. गार्ड वाले फंक्शन के लिए डिकोडिंग ठीक कीजिए

`TopSecret.decode_secret_message_part/2` फंक्शन को आगे बढ़ाइए। ध्यान रखिए कि जिन फंक्शन परिभाषाओं में गार्ड इस्तेमाल होते हैं, उनका नाम और आर्टी सही-सही पहचाने जाएँ।

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b) when is_nil(a), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}
```

## 5. पूरा गुप्त संदेश डिकोड कीजिए

`TopSecret.decode_secret_message/1` फंक्शन बनाइए। इसे Elixir कोड वाली एक स्ट्रिंग लेनी चाहिए और कोड में मिली सभी फंक्शन परिभाषाओं से डिकोड किए गए गुप्त संदेश को एक स्ट्रिंग के रूप में लौटाना चाहिए। पिछले चरणों में बनाए गए फंक्शन दोबारा इस्तेमाल कीजिए।

```elixir
code = """
defmodule MyCalendar do
  def busy?(date, time) do
    Date.day_of_week(date) != 7 and
      time.hour in 10..16
  end

  def yesterday?(date) do
    Date.diff(Date.utc_today, date)
  end
end
"""

TopSecret.decode_secret_message(code)
# => "buy"
```
