# 說明

Elena 是報紙工廠的新任品質經理。
她才剛加入公司，便決定檢視工廠裡的一些流程，看看有什麼可以改善的地方。
她發現技術人員做了許多手動的品質檢查。她看到自動化的大好機會，於是請你這位自由接案的開發者開發一套軟體來監控部分機器。

## 1. 檢查房間的濕度

你的第一個任務是寫一套軟體來監控生產室的濕度。公司的軟體上已經連接了一個感測器，會定期回傳房間的濕度百分比。

你需要在軟體中實作一個函式，當濕度百分比過高時拋出錯誤。
如果濕度在可接受的範圍內，就會新增一筆 Info 日誌。
這個函式應該命名為 `humiditycheck`，並接受濕度百分比作為引數。

如果百分比超過 70%，你應該以 ErrorException 中止（確切的訊息不重要，但必須包含測得的濕度值）。
否則，新增一筆 Info 日誌，訊息為 `"humidity level check passed: h%"`，其中 `h` 是濕度百分比。

```julia-repl
julia> humiditycheck(60)
[ Info: humidity level check passed: 60%
```

```julia-repl
julia> humiditycheck(100)
ERROR: humidity check failed: 100%
```

## 2. 檢查是否過熱

Elena 對你的第一項任務非常滿意，並請你負責監控機器的溫度。
在和技術人員 Greg 聊天時，你得知如果機器的溫度超過 500°C，技術人員就會開始擔心過熱。

這台機器裝有一個感測器，用來測量它的內部溫度。
你要知道，這個感測器非常敏感，經常會壞掉。
這種情況下，技術人員就需要更換它。

你的工作是實作一個函式 `temperaturecheck`，它接受溫度作為引數，並在一切正常時新增一筆日誌，或是在感測器故障或機器開始過熱時拋出錯誤。
由於你之後需要根據錯誤做出不同的反應，因此你需要一套機制來區分這兩種錯誤。

- 如果感測器故障，溫度會是 `nothing`。
  這種情況下，你應該以 `ArgumentError` 中止（訊息不重要）。
- 當感測器正常運作時，如果溫度超過 500°C，你應該拋出一個包含測得溫度的 `DomainError`。
- 否則，一切正常，所以新增一筆 Info 日誌，訊息為 `"temperature check passed: t °C"`，其中 `t` 是溫度。

```julia-repl
julia> temperaturecheck(nothing)
ERROR: ArgumentError: sensor is broken

julia> temperaturecheck(800)
ERROR: DomainError with 800:
"overheating detected"

julia> temperaturecheck(500)
[ Info: temperature check passed: 500 °C
```

## 3. 定義自訂錯誤

在下一個任務中，你需要定義一個更通用、能涵蓋所有情況的錯誤。
實作細節不重要，只要它是一個錯誤，且名稱是 `MachineError` 即可。
你可以自由加入你覺得有幫助的欄位和訊息。

## 4. 監控機器

現在你的機器可以偵測錯誤，而且你也有了自訂的機器錯誤，接著就來新增一個包裝函式，用來回報一切運作的情況吧。
除了回傳前面幾個函式的日誌之外，這個包裝函式還需要根據發生的任何一種（或多種）失敗類型來新增日誌。

- 檢查濕度和溫度。
- 如果濕度檢查拋出 `ErrorException`，應該新增一筆 Error 日誌，訊息為 `"humidity level check failed: h%"`，其中 `h` 是濕度百分比。
- 如果溫度檢查拋出 `ArgumentError`，應該新增一筆 Warn 日誌，訊息為 `"sensor is broken"`。
- 如果溫度檢查拋出 `DomainError`，應該新增一筆 Error 日誌，訊息為 `"overheating detected: t °C"`，其中 `t` 是溫度。
- 如果其中一項或兩項檢查失敗，應該在新增日誌之後拋出單一個 `MachineError`。
- 如果一切正常，只會新增 `humiditycheck` 和 `temperaturecheck` 的日誌。

實作一個函式 `machinemonitor()`，接受濕度和溫度作為引數。

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
