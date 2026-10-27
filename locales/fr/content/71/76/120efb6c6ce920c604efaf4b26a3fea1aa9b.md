# Indices

## Général

- Implémente des fonctions pures qui renvoient des _strings_ JSON ; tu n'as pas besoin de faire tourner un serveur web.

- Roc fournit `Json.parse` et `Json.to_str` nativement.
  Une annotation de type sur la valeur de retour d'une fonction utilitaire d'analyse indique à `Json.parse` quelle structure d'enregistrement décoder.

- Le champ `payload ?: Str` est facultatif : le `payload` lié par le motif d'enregistrement du squelette vaut soit `Ok(text)`, soit `Err(MissingField)`.
