# 升级

有时，我们可能需要你更新一些内容。

## Pharo 镜像

如果你需要更新 Pharo Exercism 镜像里的库，最好先确保所有进行中的练习都已提交，保存好你的镜像，然后备份 Pharo.image 和 Pharo.changes 文件。做好安全备份之后，在 Playground 中对以下所有代码求值（先选中，再按 meta-g）：

 ```smalltalk

 './pharo-local/iceberg/exercism' asFileReference deleteAll.
 './pharo-local/package-cache' asFileReference deleteAll.

 IceRepository reset.

 Metacello new
  baseline: 'Exercism';
  repository: 'github://exercism/pharo-smalltalk:main/releases/latest';
  onConflict: [ :ex | ex allow ];
  load.

 #ExercismManager asClass upgrade.
 ```

系统可能会提示你，对包 “ExercismTools” 的改动将会丢失，此时应选择 “Load”，以确保你拥有兼容版本的工具。

如果你需要升级（或降级）到某个特定的 Exercism 版本，也可以修改上面的脚本，通过改动仓库路径来指定具体的版本号，方法如下：

```smalltalk
 ...
  repository: 'github://exercism/pharo-smalltalk:<version-tag>';
 ...
 ```

其中`<versison-tag>`可以是`v0.2.3`或`master`这样的值。

加载了特定版本之后，你可能还需要重新“获取”你想继续完成的现有练习，方法是使用常规的 `Exercism | Fetch...` 菜单项。

在少数情况下（如果你一直遇到问题），你可能需要获取一份全新的 Pharo.image 文件（最简单的方法，是参照本页顶部的常规安装说明，在一个全新的目录中重新安装 Pharo）。

## Pharo 练习

有时，在你已经解出某个练习之后，也会发现它被更新了：可能加入了新测试，也可能体现了新的见解。

在这些情况下，你可以选择把练习副本升级到最新版本，这意味着你可能需要调整你提交的解答，让测试通过，然后提交新代码以供进一步审阅。

你可以通过 `Exercism | View Track Progress` 菜单来完成，它会用浏览器打开你当前 track 的进度页面。在 `Test suite` 标签页的页面底部，如果检测到有更新的练习版本，就会有一个 `Update exercise to latest version` 按钮。

如果你点击这个按钮，再点击 `Copy` 按钮（在 Download your solution 框中），就可以把这个值粘贴到 `Exercism | Fetch new exercise` 菜单的输入提示里。

_注意：从 0.2.8 版本开始，Pharo Exercism 中练习包的格式发生了变化，练习现在出现在一个名为 Exercise@<Name> 的顶层包中（而不再是名为 Exercism-<Name> 的标签包）。如果你升级了镜像，并且有旧练习仍出现在这种旧的包命名格式中，你仍然可以提交它们；但如果你同时更新了练习测试，就需要把你提交的解答里的类，移到存放新测试的 Exercise@<Name> 新包中。_
