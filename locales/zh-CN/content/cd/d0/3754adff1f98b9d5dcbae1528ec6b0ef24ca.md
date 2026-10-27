# 提示

## 通用

- 用`match`区分`Closed`和`Open(balance)`。

- 操作会返回一个更新后的账户，而不会修改传入的账户。更新成功时用`Ok(updated_account)`，操作被拒绝时用`Err(...)`。
