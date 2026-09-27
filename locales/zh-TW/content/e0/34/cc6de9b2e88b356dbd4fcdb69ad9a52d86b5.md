# 說明補充

## 專案結構

* `src` 包含你為這個練習寫的解答
* `spec` 包含要為這個練習執行的測試

## 執行測試

如果你在正確的目錄下（也就是包含`src`和`spec`的那個目錄），就可以執行`crystal spec`來跑這個練習的測試：

```bash
$ pwd
/Users/johndoe/Code/exercism/crystal/hello-world

$ ls
GETTING_STARTED.md README.md          spec               src

$ crystal spec
```

這會執行`spec`目錄裡所有的測試檔案。

在每個測試檔案中，除了第一個測試之外，其餘的測試都已被跳過。

一旦你讓某個測試通過，就可以把`pending`改成`it`，取消跳過下一個測試。

## 提交你的解答

提交解答時，請務必一併提交`src`目錄裡的原始碼檔案：

```bash
$ exercism submit src/hello_world.cr
```
