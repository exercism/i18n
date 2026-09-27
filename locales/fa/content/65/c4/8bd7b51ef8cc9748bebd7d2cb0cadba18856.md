# مقدمه

## Access Behaviour

الیکسیر از `Behaviour`ها استفاده می‌کند تا رابط‌های عمومیِ مشترکی فراهم کند و در همان حال به هر ماژولی که آن‌ها را پیاده‌سازی می‌کند امکان دهد پیاده‌سازی اختصاصی خودش را داشته باشد. یکی از نمونه‌های رایج این کار، `Access Behaviour` است.

`Access Behaviour` یک رابط مشترک برای بازیابی داده از یک ساختار داده‌ی مبتنی بر کلید فراهم می‌کند. `Access Behaviour` برای `map`ها و `keyword list`ها پیاده‌سازی شده است، اما بیایید کاربردش را برای `map`ها ببینیم تا با آن آشنا شوید. `Access Behaviour` مشخص می‌کند که وقتی یک `map` دارید، می‌توانید بعد از آن «کروشه» بگذارید و سپس با استفاده از کلید، مقدار مرتبط با آن کلید را بازیابی کنید.

```elixir
# Suppose we have these two maps defined (note the difference in the key type)
my_map = %{key: "my value"}
your_map = %{"key" => "your value"}

# Obtain the value using the Access Behaviour
my_map[:key] == "my value"
your_map[:key] == nil
your_map["key"] == "your value"
```

اگر کلید در ساختار داده وجود نداشته باشد، `nil` برگردانده می‌شود. این می‌تواند باعث بروز رفتارهای ناخواسته شود، چون خطایی ایجاد نمی‌کند. توجه کنید که خود `nil` هم `Access Behaviour` را پیاده‌سازی می‌کند و برای هر کلیدی همیشه `nil` را برمی‌گرداند.
