# Atualização

De vez em quando, pode ser que você precise atualizar alguma coisa.

## Imagem do Pharo

Se você precisar atualizar as bibliotecas da sua imagem do Pharo Exercism, o melhor é garantir que você já enviou todos os exercícios em andamento, salvou sua imagem e fez backup dos arquivos Pharo.image e Pharo.changes. Depois de ter um backup seguro, avalie (selecione e pressione meta-g) todo o código a seguir em um Playground:

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

Pode ser que apareça um aviso sobre a perda de alterações no pacote "ExercismTools", e você deve escolher "Load" para garantir que tem uma versão compatível das ferramentas.

Se em algum momento você precisar atualizar (ou reverter) para uma versão específica do Exercism, também pode modificar o script acima para especificar um número de versão em particular, mudando o caminho do repositório assim:

```smalltalk
 ...
  repository: 'github://exercism/pharo-smalltalk:<version-tag>';
 ...
 ```

Onde `<versison-tag>` pode ser algo como: `v0.2.3` ou `master`

Depois de carregar uma versão específica, talvez você também precise "buscar novamente" os exercícios existentes com os quais quer continuar trabalhando, usando o item de menu `Exercism | Fetch...`.

Em situações raras (e se os problemas continuarem), talvez você precise obter um arquivo Pharo.image novo (o jeito mais fácil é reinstalar o Pharo em um diretório novo, seguindo as instruções de instalação habituais no topo desta página).

## Exercícios do Pharo

Às vezes você também pode descobrir que um exercício foi atualizado para adicionar novos testes ou refletir novas ideias, depois de já tê-lo resolvido.

Nesses casos, você pode optar por atualizar sua cópia do exercício para a versão mais recente. Isso significa que talvez você precise ajustar sua solução para que os testes passem, e depois pode enviar seu novo código para uma revisão mais detalhada.

Você pode fazer isso usando o menu `Exercism | View Track Progress`, que abre um navegador com o seu progresso na track. Na aba `Test suite`, no fim da página, há um botão `Update exercise to latest version` se uma versão mais nova do exercício tiver sido detectada.

Se você clicar nesse botão e clicar no botão `Copy` (na caixa Download your solution), pode colar esse valor no campo do menu `Exercism | Fetch new exercise`.

_OBSERVAÇÃO: a partir da versão 0.2.8, o formato dos pacotes de exercícios do Pharo Exercism mudou, de modo que os exercícios aparecem em um pacote de nível superior chamado Exercise@<Name> (em vez de um pacote de tag chamado Exercism-<Name>). Se você atualizar sua imagem e tiver exercícios antigos que aparecem nesse formato de nome de pacote anterior, você ainda pode enviá-los, mas se também atualizar o teste do exercício, precisará mover suas classes de solução para o novo pacote Exercise@<Name>, onde o novo teste foi armazenado._
