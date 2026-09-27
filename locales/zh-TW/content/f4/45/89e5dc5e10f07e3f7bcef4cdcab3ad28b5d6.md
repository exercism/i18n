# 無重要檔案變更工作流

當一個會動到練習的軌道 PR 被合併時，會觸發系統重新測試學生解答中所有最新發佈的疊代。
對於熱門的練習來說，這是成本極高的操作（極端的例子：Python Hello World 就跑了 70,000 次測試！）。

這個工作流會檢查 PR 裡的變更是否會觸發重新測試解答，如果會，就加上一則留言，說明直接合併這個 PR 的風險。
它同時也會說明如何在不要重新測試解答的情況下合併 PR。

想了解更多，請參閱[避免觸發不必要的測試執行](https://exercism.org/docs/building/tracks#h-avoiding-triggering-unnecessary-test-runs)文件。

## 來源

這個工作流定義在`.github/workflows/no-important-files-changed.yml`檔案中。
