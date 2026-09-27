# Atualização

De vez em quando, podemos precisar que atualizes algo.

## Pharo Image

Se precisares de atualizar as bibliotecas da tua imagem do Pharo Exercism, o melhor é garantir que já submeteste os exercícios que tens em curso, que guardaste a tua imagem e que fizeste uma cópia de segurança dos ficheiros Pharo.image e Pharo.changes. Depois de teres uma cópia de segurança fiável, avalia (seleciona e prime meta-g) todo o código seguinte num Playground:

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

Pode aparecer-te um aviso sobre a perda de alterações no pacote "ExercismTools", e deves escolher "Load" para garantir que tens uma versão compatível das ferramentas.

Se alguma vez precisares de atualizar (ou reverter) para uma versão específica do Exercism, também podes modificar o script acima para indicar um número de versão concreto, alterando o caminho do repositório da seguinte forma:

```smalltalk
 ...
  repository: 'github://exercism/pharo-smalltalk:<version-tag>';
 ...
 ```

Em que `<versison-tag>` pode ser algo como: `v0.2.3` ou `master`

Depois de teres carregado uma versão específica, podes também precisar de "voltar a obter" os exercícios existentes em que queres continuar a trabalhar, usando o item de menu habitual `Exercism | Fetch...`.

Em situações raras (e se continuares a ter problemas), podes precisar de obter um ficheiro Pharo.image novo (a forma mais fácil é reinstalar o Pharo num diretório novo, seguindo as instruções de instalação habituais no início desta página).

## Exercícios de Pharo

Por vezes, também podes descobrir que um exercício foi atualizado para acrescentar novos testes ou para refletir novas ideias, depois de já o teres resolvido.

Nesses casos, podes optar por atualizar a tua cópia do exercício para a versão mais recente. Isso significa que podes ter de ajustar a tua solução para que os testes passem, e depois podes submeter o teu novo código para nova revisão.

Podes fazer isto através do menu `Exercism | View Track Progress`, que abre o navegador web na página do progresso atual do teu percurso. No separador `Test suite`, no fundo da página, há um botão `Update exercise to latest version` se tiver sido detetada uma versão mais recente do exercício.

Se clicares neste botão e clicares no botão `Copy` (na caixa Download your solution), podes depois colar esse valor no campo do menu `Exercism | Fetch new exercise`.

_NOTA: a partir da versão 0.2.8, o formato dos pacotes de exercícios no Pharo Exercism foi alterado, de modo que os exercícios aparecem num pacote de nível superior com o nome: Exercise@<Name> (em vez de um pacote de etiquetas chamado Exercism-<Name>). Se atualizares a tua imagem e tiveres exercícios antigos que aparecem nesse formato de nomenclatura anterior, ainda os podes submeter, mas se também atualizares o teste do exercício, terás de mover as tuas classes de solução para o novo pacote Exercise@<Name>, onde o novo teste foi guardado._
