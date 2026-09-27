# 測試

在 macOS/Linux 上，請執行：

```sh
$ chmod +x gradlew
```

用以下指令執行測試：

```sh
$ ./gradlew test
```

> 如果你使用 Windows，請改用 `gradlew.bat`

## 略過的測試

第一個（或前幾個）測試通過後，把其他測試前面的 `@Ignore` 標註註解掉或移除，就能繼續進行。