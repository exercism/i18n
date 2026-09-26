# संकेत

## सामान्य

- `entry` मेथड से एंट्री निकालने पर, उसे डीरेफरेंस करने के बाद उसी जगह बदला जा सकता है।

- `or_insert` [मेथड](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert) उस स्थिति में दी गई वैल्यू डालता है जब एंट्री खाली हो, और एंट्री में मौजूद वैल्यू का म्यूटेबल रेफरेंस लौटाता है।

```rust
*counter.entry(key).or_insert(0) += 1;
```

- `or_default` [मेथड](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default) यह सुनिश्चित करता है कि एंट्री में कोई वैल्यू हो: अगर एंट्री खाली हो तो वह डिफॉल्ट वैल्यू डाल देता है, और एंट्री में मौजूद वैल्यू का म्यूटेबल रेफरेंस लौटाता है।

```rust
*counter.entry(key).or_default() += 1;
```
