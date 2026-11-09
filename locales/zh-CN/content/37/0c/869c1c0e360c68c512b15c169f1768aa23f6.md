# 说明

Elena 是一家报纸工厂的新任质量经理。
她刚加入公司，便决定检查工厂里的一些流程，看看有哪些地方可以改进。
她发现技术人员要手工完成大量质量检查。她看到了自动化的好机会，于是请身为自由开发者的你开发一套软件，用来监控部分机器。

## 1. 检查房间的湿度

你的第一个任务是写一套软件，监控生产车间的湿度。公司软件上已经连接了一个传感器，它会定期返回车间的湿度百分比。

你需要在软件中实现一个函数，当湿度百分比过高时抛出错误。
如果湿度在可接受范围内，就添加一条 Info 日志。
这个函数应命名为`humiditycheck`，并以湿度百分比作为实参。

如果百分比超过 70%，你应该以 ErrorException 中止（具体消息内容不重要，但必须包含测得的湿度数值）。
否则，添加一条 Info 日志，消息为`"humidity level check passed: h%"`，其中`h`是湿度百分比。

```julia-repl
julia> humiditycheck(60)
[ Info: humidity level check passed: 60%
```

```julia-repl
julia> humiditycheck(100)
ERROR: humidity check failed: 100%
```

## 2. 检查过热

Elena 对你的第一个任务非常满意，于是请你负责监控机器的温度。在和技术人员 Greg 聊天时，你得知如果机器的温度超过 500°C，技术人员就会开始担心过热。

机器上装有一个测量其内部温度的传感器。你要知道，这个传感器非常敏感，经常损坏。这种情况下，技术人员就得更换它。

你的任务是实现一个函数`temperaturecheck`，它接受温度作为实参：一切正常时添加一条日志，传感器损坏或机器开始过热时抛出错误。考虑到你之后需要根据错误类型做出不同的反应，你需要一种机制来区分这两类错误。

- 如果传感器损坏，温度会是`nothing`。这种情况下，你应该以`ArgumentError`中止（消息内容不重要）。
- 传感器正常工作时，如果温度超过 500°C，你应该抛出包含测得温度的`DomainError`。
- 否则一切正常，添加一条 Info 日志，消息为`"temperature check passed: t °C"`，其中`t`是温度。

```julia-repl
julia> temperaturecheck(nothing)
ERROR: ArgumentError: sensor is broken

julia> temperaturecheck(800)
ERROR: DomainError with 800:
"overheating detected"

julia> temperaturecheck(500)
[ Info: temperature check passed: 500 °C
```

## 3. 定义自定义错误

对于下一个任务，你需要定义一个更通用的、能包罗所有情况的错误。除了它是一个错误、且名称为`MachineError`之外，实现细节并不重要。你可以随意添加自己觉得有用的字段和消息。

## 4. 监控机器

现在机器已经能检测错误，你也有了自定义的机器错误，接下来要添加一个包装函数，用于报告各项的运行情况。除了返回前面那些函数产生的日志，这个包装函数还需要根据出现的失败类型添加日志。

- 检查湿度和温度。
- 如果湿度检查抛出`ErrorException`，应添加一条 Error 日志，消息为`"humidity level check failed: h%"`，其中`h`是湿度百分比。
- 如果温度检查抛出`ArgumentError`，应添加一条 Warn 日志，消息为`"sensor is broken"`。
- 如果温度检查抛出`DomainError`，应添加一条 Error 日志，消息为`"overheating detected: t °C"`，其中`t`是温度。
- 如果两项检查中有一项或两项失败，应在添加日志后抛出单个`MachineError`。
- 如果一切正常，只会添加`humiditycheck`和`temperaturecheck`产生的日志。

实现一个函数`machinemonitor()`，接受湿度和温度作为实参。

```julia-repl
julia> machinemonitor(42, 450)
[ Info: humidity level check passed: 42%
[ Info: temperature check passed: 450 °C

julia> machinemonitor(42, 550)
[ Info: humidity level check passed: 42%
┌ Error: overheating detected: 550 °C
└ @ Main # output truncated

Error: MachineError

julia> machinemonitor(82, 521)
┌ Error: humidity level check failed: 82%
└ @ Main # output truncated
┌ Error: overheating detected: 521 °C
└ @ Main # output truncated

Error: MachineError

julia> machinemonitor(42, nothing)
[ Info: humidity level check passed: 42%
┌ Warning: sensor is broken
└ @ Main # output truncated

Error: MachineError
```
