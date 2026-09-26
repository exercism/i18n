# 重要文件未变更工作流

当一个涉及练习的学习轨道 PR 被合并时，会触发学生解答*所有*最新已发布迭代的重新测试。
对于热门的练习来说，这是一项*非常*昂贵的操作（作为极端情况，Python 的 Hello World 要运行 70,000 次测试！）。

这个工作流会检查 PR 中的改动是否会触发解答的重新测试；如果会，它会添加一条评论，说明*按原样*合并 PR 的风险。
评论里还会说明如何在不重新测试解答的情况下合并 PR。

更多信息，请查看[避免触发不必要的测试运行](https://exercism.org/docs/building/tracks#h-avoiding-triggering-unnecessary-test-runs)文档。

## 来源

该工作流定义在`.github/workflows/no-important-files-changed.yml`文件中。
