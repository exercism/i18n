# 說明

**注意：這個練習已棄用。**

更多背景請參考 [https://github.com/exercism/problem-specifications/issues/80](https://github.com/exercism/problem-specifications/issues/80) 的討論。

---

為一個計算行數、字母數和字元數的工具設計一套測試套件。

這是一個特別的練習。你不是要寫出能搭配現有測試套件的程式碼，而是要自己定義測試套件。為了幫助你，這裡提供了幾種受測程式碼的變化版本，你的測試套件至少應該能偵測出它們的問題（或沒有問題）喔。

受測系統的功能是計算所提供字串中的行數、字母數和總字元數。做法是你重複執行「add string」操作，傳入字串，之後再呼叫「lines」、「letters」和「characters」函式取得總計。
