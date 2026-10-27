# 提示

## 通用

- 实现返回 JSON 字符串的纯函数；你不需要运行 Web 服务器。

- Roc 内置了`Json.parse`和`Json.to_str`。
  给解析辅助函数的返回值加上类型标注，就能告诉`Json.parse`该按哪种记录结构来解码。

- `payload ?: Str`字段是可选的：桩代码的记录模式绑定出的`payload`要么是`Ok(text)`，要么是`Err(MissingField)`。
