# welcome이 IO.puts로 끝나요

`welcome/0` 함수는 `:ok`를 명시적으로 반환하지 말고, `IO.puts`가 반환하는 값(실제로 그 값은 `:ok`예요)을 암묵적으로 반환해야 해요.
