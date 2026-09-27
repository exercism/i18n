# 格式化 JSON 檔案

Exercism 學習軌道的儲存庫裡有許多 JSON 檔案，包括：

- 學習軌道的`config.json`檔案。
- 每個概念都有一個`.meta/config.json`和一個`links.json`檔案。
- 每個概念練習或實作練習都有一個`.meta/config.json`檔案。

如果這些檔案在整個 Exercism 上都有統一的格式，會更容易閱讀，所以 configlet 提供了`fmt`指令，用來把學習軌道的 JSON 檔案改寫成標準格式。

`fmt`指令會格式化下列檔案：

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## 用法

`fmt`指令會格式化練習的`meta/config.json`檔案。

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

直接執行`configlet fmt`不會變更學習軌道，而是檢查每個概念練習與實作練習的`.meta/config.json`檔案，以及學習軌道的`config.json`檔案，格式是否正確。

如果要列出尚未有格式化練習`.meta/config.json`檔案的路徑（只要有一個練習缺少格式化的設定檔，就會以非零的結束代碼結束）：

```shell
configlet fmt
```

如果希望程式詢問你是否要寫入格式化後的設定檔，請加上`--update`選項（簡寫為`-u`）：

```shell
configlet fmt --update
```

如果要以非互動的方式寫入格式化後的設定檔，請加上`--yes`選項（簡寫為`-y`）：

```shell
configlet fmt --update --yes
```

如果只想處理單一練習，請使用`--exercise`選項（簡寫為`-e`）。
舉例來說，要以非互動的方式寫入`prime-factors`練習的格式化設定檔：

```shell
configlet fmt -uy -e prime-factors
```

寫入 JSON 檔案時，`configlet fmt`會：

- 以標準順序寫入鍵值對。

- 使用兩個空白做為縮排。

- JSON 陣列中的每個項目，以及 JSON 物件中的每個鍵，都各佔一行。

- 移除選填且值為空的鍵值對。
  例如，`"source": ""`會被移除。

- 從實作練習的設定檔中移除`"test_runner": true`。
  這是選填的鍵，規格中說省略`test_runner`鍵就代表值為`true`。

- 當某個 JSON 物件裡有超過一組同名的鍵值對時，只保留最後一組。

練習`.meta/config.json`檔案的標準鍵順序如下：

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

其中方括號表示括住的鍵是選填的。

請注意，`configlet fmt`只會處理已列在學習軌道層級`config.json`檔案中的練習。
因此，如果你正在某個學習軌道上實作新的練習，並且想格式化它的`.meta/config.json`檔案，請先把這個練習加入學習軌道層級的`config.json`檔案。
如果這個練習還沒準備好要開放給使用者，請把它的`status`值設為`wip`。

當 configlet 結束時，如果所有檢查到的設定檔都已格式化，結束代碼就是 0，否則為 1。
