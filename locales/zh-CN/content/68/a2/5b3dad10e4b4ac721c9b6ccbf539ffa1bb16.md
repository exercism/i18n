# 测试

在 MacOS/Linux 上，请运行：

```sh
$ chmod +x gradlew
```

用以下命令执行测试：

```sh
$ ./gradlew test
```

> 如果你用的是 Windows，请使用 `gradlew.bat`

## 跳过的测试

第一个（或前几个）测试通过后，把其他测试前面的 `@Ignore` 注解注释掉或删除，再继续。