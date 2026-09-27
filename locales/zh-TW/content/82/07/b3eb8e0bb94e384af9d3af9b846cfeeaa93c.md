# 操作說明附錄

## 輸出格式

`solve()` 方法預期會回傳一個物件，該物件具有以下屬性：

- `moves`：達到目標所需的桶操作次數（包含裝滿起始桶），
- `goalBucket`：達到目標水量的桶的名稱，
- `otherBucket`：另一個桶中所裝的水量。

例如：

```json
{
  "moves": 5,
  "goalBucket": "one",
  "otherBucket": 2
}
```
