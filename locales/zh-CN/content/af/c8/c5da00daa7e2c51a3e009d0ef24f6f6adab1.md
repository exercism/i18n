# 测试

要使用测试运行器，你需要先[安装好 Godot][installation]。

## 运行测试

[测试运行器][test runner]用于加载和测试提交的解答。
练习下载到本地时，会附带一份测试运行器的副本，以及一个调用它的 shell 脚本。

要运行练习，只需在练习目录里运行`./run_tests`脚本。

例如：

```bash
cd "$(exercism workspace)/gdscript/hello-world"
./run_tests
```

[installation]: https://exercism.org/docs/tracks/gdscript/installation
[test runner]: https://raw.githubusercontent.com/exercism/gdscript-test-runner/refs/heads/main/bin/test_runner.gd
