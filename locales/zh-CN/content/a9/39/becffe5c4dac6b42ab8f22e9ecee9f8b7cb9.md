# 格式化 JSON 文件

Exercism 赛道的代码仓库里有很多 JSON 文件，其中包括：

- 赛道的`config.json`文件。
- 每个概念都有一个`.meta/config.json`和`links.json`文件。
- 每个概念练习或实践练习都有一个`.meta/config.json`文件。

如果这些文件在整个 Exercism 范围内保持一致的格式，就会更易读。因此 configlet 提供了`fmt`命令，用来把赛道的 JSON 文件重写成规范的格式。

`fmt`命令会格式化以下文件：

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## 用法

`fmt`命令会格式化练习的“meta/config.json”文件。

```
configlet [global-options] fmt [command-options]

Global options:
  -h, --help                   Show this help message and exit
      --version                Show this tool's version information and exit
  -t, --track-dir <dir>        Specify a track directory to use instead of the current directory
  -v, --verbosity <verbosity>  The verbosity of output. Allowed values: q[uiet], n[ormal], d[etailed]

Options for fmt:
  -e, --exercise <slug>        Only operate on this exercise
  -u, --update                 Prompt to write formatted files
  -y, --yes                    Auto-confirm the prompt from --update
```

只运行`configlet fmt`时，不会对赛道做任何改动，它只会检查每个概念练习和实践练习的`.meta/config.json`文件以及赛道`config.json`文件的格式。

要列出还没有格式化过的练习`.meta/config.json`文件的路径（如果至少有一个练习缺少格式化过的配置文件，就以非零退出码退出）：

```shell
configlet fmt
```

如果想要在写入格式化后的配置文件前收到提示，请加上`--update`选项（简写为`-u`）：

```shell
configlet fmt --update
```

如果要非交互地写入格式化后的配置文件，请加上`--yes`选项（简写为`-y`）：

```shell
configlet fmt --update --yes
```

如果只想处理一个练习，请使用`--exercise`选项（简写为`-e`）。
例如，要非交互地写入`prime-factors`练习的格式化配置文件：

```shell
configlet fmt -uy -e prime-factors
```

写入 JSON 文件时，`configlet fmt`会：

- 按键值对的规范顺序写入。

- 使用两个空格缩进。

- JSON 数组中的每一项、JSON 对象中的每一个键都各占一行。

- 删除可选键中取值为空的键值对。
  例如，`"source": ""`会被删除。

- 从实践练习的配置文件中删除`"test_runner": true`。
  这是一个可选键：规范规定，省略`test_runner`键就意味着取值为`true`。

- 如果 JSON 对象中有多个键名相同的键值对，只保留最后一组。

练习`.meta/config.json`文件的规范键顺序是：

```text
- authors
- [contributors]
- files
  - solution
  - test
  - exemplar           (Concept Exercises only)
  - example            (Practice Exercises only)
  - [editor]
  - [invalidator]
- [language_versions]
- [forked_from]        (Concept Exercises only)
- [icon]               (Concept Exercises only)
- [test_runner]        (Practice Exercises only)
- blurb
- [source]
- [source_url]
- [custom]
```

其中方括号表示里面的键是可选的。

注意，`configlet fmt`只处理赛道级`config.json`文件中已有的练习。
因此，如果你正在为某个赛道实现一个新练习，并且想要格式化它的`.meta/config.json`文件，请先把该练习添加到赛道级`config.json`文件中。
如果这个练习还不适合让用户看到，请把它的`status`值设为`wip`。

configlet 退出时，如果它检查到的每个配置文件都是格式化过的，退出码就是 0，否则为 1。
