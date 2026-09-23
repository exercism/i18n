# Instructions

Tu fais partie d'un groupe de travail qui lutte contre l'espionnage industriel. Tu as une informatrice secrète chez Shady Company X, que tu soupçonnes de voler les secrets de ses concurrents.

Ton informatrice, l'agente Ex, est développeuse Elixir. Elle encode des messages secrets dans son code.

Pour décoder ses messages secrets :

- Prends toutes les fonctions (publiques et privées) dans l'ordre dans lequel elles sont définies.
- Pour chaque fonction, prends les `n` premiers caractères de son nom, où `n` est l'arité de la fonction.

## 1. Transforme le code en données

Implémente la fonction `TopSecret.to_ast/1`. Elle doit prendre une _string_ contenant du code Elixir et renvoyer son AST.

```elixir
TopSecret.to_ast("div(4, 3)")
# => {:div, [line: 1], [4, 3]}
```

## 2. Analyse un seul nœud de l'AST

Implémente la fonction `TopSecret.decode_secret_message_part/2`. Elle doit prendre un nœud de l'AST et un accumulateur pour le message secret (un tableau). Elle doit renvoyer un tuple avec le nœud de l'AST inchangé comme premier élément, et l'accumulateur comme second élément.

Si l'opération du nœud de l'AST est la définition d'une fonction (`def` ou `defp`), ajoute le nom de la fonction (converti en _string_) au début de l'accumulateur. Si l'opération est autre chose, renvoie l'accumulateur inchangé.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b, c), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["cat", "day"]}

ast_node = TopSecret.to_ast("10 + 3")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["day"]}
```

Cette fonction n'a pas besoin de faire d'appels récursifs pour vérifier tout l'AST, seulement le nœud donné. On parcourra tout l'AST avec des outils intégrés dans la dernière étape.

## 3. Décode la partie du message secret à partir d'une définition de fonction

Étends la fonction `TopSecret.decode_secret_message_part/2`. Si l'opération du nœud de l'AST est la définition d'une fonction, ne renvoie pas le nom complet de la fonction. Vérifie plutôt l'arité de la fonction. Ensuite, ne renvoie que les `n` premiers caractères du nom, où `n` est l'arité.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}

ast_node = TopSecret.to_ast("defp cat(), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["", "day"]}
```

## 4. Corrige le décodage pour les fonctions avec des gardes

Étends la fonction `TopSecret.decode_secret_message_part/2`. Assure-toi que le nom et l'arité de la fonction sont correctement détectés pour les définitions de fonction qui utilisent des gardes.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b) when is_nil(a), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}
```

## 5. Décode le message secret complet

Implémente la fonction `TopSecret.decode_secret_message/1`. Elle doit prendre une _string_ contenant du code Elixir et renvoyer le message secret sous forme de _string_, décodé à partir de toutes les définitions de fonction trouvées dans le code. Pense à réutiliser les fonctions définies dans les étapes précédentes.

```elixir
code = """
defmodule MyCalendar do
  def busy?(date, time) do
    Date.day_of_week(date) != 7 and
      time.hour in 10..16
  end

  def yesterday?(date) do
    Date.diff(Date.utc_today, date)
  end
end
"""

TopSecret.decode_secret_message(code)
# => "buy"
```
