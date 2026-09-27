# 升級

有時候，我們可能需要你更新一些東西。

## Pharo 映像檔

如果你需要更新 Pharo Exercism 映像檔裡的函式庫，最好先確認所有進行中的練習都已提交、儲存你的映像檔，然後備份`Pharo.image`和`Pharo.changes`檔案。完成安全的備份後，在 Playground 中執行（選取後按 meta-g）以下所有程式碼：

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

系統可能會提示你將失去套件「ExercismTools」的變更，這時你應該選擇「Load」，以確保擁有相容的工具版本。

如果你需要升級（或降級）到某個特定的 Exercism 版本，也可以修改上面的腳本，透過變更 repository 路徑來指定版本編號，如下所示：

```smalltalk
 ...
  repository: 'github://exercism/pharo-smalltalk:<version-tag>';
 ...
 ```

其中`<versison-tag>`可以是像`v0.2.3`或`master`這樣的版本標籤。

載入特定版本後，你可能還需要透過一般的`Exercism | Fetch...`選單項目，重新抓取任何你想繼續進行的現有練習。

在少數情況下（如果你一直遇到問題），你可能需要取得全新的`Pharo.image`檔案（最簡單的方法是在全新的目錄中重新安裝 Pharo，並依照本頁最上方的安裝說明操作）。

## Pharo 練習

有時候，你可能會發現某個練習在你解完之後才更新，新增了測試或反映了新的見解。

在這些情況下，你可以選擇把自己的練習更新到最新版本，這表示你可能需要調整你的解法讓測試通過，然後就能提交新的程式碼，接受進一步的審查。

你可以使用`Exercism | View Track Progress`選單來做到這一點，它會開啟網頁瀏覽器，顯示你目前的學習軌道進度。在`Test suite`分頁的頁面底部，如果有偵測到更新的練習版本，就會出現`Update exercise to latest version`按鈕。

如果你點擊這個按鈕，再點擊`Copy`按鈕（位於 Download your solution 方框中），就能把這個值貼到`Exercism | Fetch new exercise`選單提示中。

_注意：從 0.2.8 版開始，Pharo Exercism 中練習套件的格式已經改變，練習會出現在名為 Exercise@<Name> 的頂層套件中（而不是名為 Exercism-<Name> 的標籤套件）。如果你升級映像檔，而舊練習是以先前的套件命名格式出現，你仍然可以提交它們，但如果你同時更新了練習測試，就需要把解法類別移到存放新測試的 Exercise@<Name> 新套件中。_
