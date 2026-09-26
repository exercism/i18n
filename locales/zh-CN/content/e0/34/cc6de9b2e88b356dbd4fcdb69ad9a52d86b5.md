# 说明附录

## 项目结构

* `src`里放着你为这个练习写的解答
* `spec`里放着这个练习要运行的测试

## 运行测试

如果你在正确的目录下（也就是包含`src`和`spec`的那个目录），就可以通过运行`crystal spec`来运行这个练习的测试：

```bash
$ pwd
/Users/johndoe/Code/exercism/crystal/hello-world

$ ls
GETTING_STARTED.md README.md          spec               src

$ crystal spec
```

这会运行`spec`目录下的所有测试文件。

在每个测试文件里，除了第一个测试，其余测试都被跳过了。

一旦有一个测试通过，你就可以把下一个测试的`pending`改成`it`，取消它的跳过状态。

## 提交你的解答

提交解答时，请务必提交`src`目录下的源文件：

```bash
$ exercism submit src/hello_world.cr
```
