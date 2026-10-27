# 提示

## 一般

- 使用 `match` 來區分 `Closed` 和 `Open(balance)`。

- 操作會回傳更新後的帳戶，而不是去修改傳入的帳戶。成功更新時回傳 `Ok(updated_account)`，操作被拒絕時則回傳 `Err(...)`。
