# Anleitung

In dieser Übung geht es um das Parsen von Logdateien.

Nach einer kürzlichen Sicherheitsüberprüfung wurdest du gebeten, die archivierten Logdateien der Organisation aufzuräumen.

Alle Strings, die an die Funktionen übergeben werden, sind garantiert nicht null und haben keine führenden oder abschließenden Leerzeichen.

## 1. Fehlerhafte Logzeilen erkennen

Du brauchst einen Überblick darüber, wie viele Logzeilen in deinem Archiv nicht den aktuellen Standards entsprechen.
Du bist der Meinung, dass ein einfacher Test zeigt, ob eine Logzeile gültig ist.
Um als gültig zu gelten, muss eine Zeile mit einem der folgenden Strings beginnen:

- [TRC]
- [DBG]
- [INF]
- [WRN]
- [ERR]
- [FTL]

Implementiere die Funktion `IsValidLine`, sodass sie `false` zurückgibt, wenn ein String nicht gültig ist, andernfalls `true`.

```go
IsValidLine("[ERR] A good error here")
// => true
IsValidLine("Any old [ERR] text")
// => false
IsValidLine("[BOB] Any old text")
// => false
```

## 2. Die Logzeile aufteilen

Ein neues Team ist der Organisation beigetreten, und du stellst fest, dass seine Logdateien ein seltsames Trennzeichen für „Felder“ verwenden.
Statt etwas Vernünftigem wie einem Doppelpunkt „:“ verwenden sie einen String wie „<--->“ oder „<=>“ (weil es hübscher aussieht), und zwar jeden String, dessen erstes Zeichen „<“ und dessen letztes Zeichen „>“ ist und der dazwischen eine beliebige Kombination der folgenden Zeichen enthält: „~“, „\*“, „=“ und „-“.

Implementiere die Funktion `SplitLogLine`, die eine Zeile entgegennimmt und ein Array von Strings zurückgibt, von denen jeder ein Feld enthält.

```go
SplitLogLine("section 1<*>section 2<~~~>section 3")
// => []string{"section 1", "section 2", "section 3"},
```

## 3. Die Anzahl der Zeilen zählen, die `password` in zitiertem Text enthalten

Das Team muss über Verweise auf Passwörter in zitiertem Text Bescheid wissen, damit sie manuell überprüft werden können.

Implementiere die Funktion `CountQuotedPasswords`, um einen Hinweis auf den wahrscheinlichen Umfang der manuellen Arbeit zu geben.

Identifiziere Logzeilen, in denen der String „password“, der in beliebiger Groß- und Kleinschreibung vorkommen kann, von Anführungszeichen umgeben ist.
Du solltest berücksichtigen, dass zwischen den Anführungszeichen vor und nach „password“ zusätzlicher Inhalt stehen kann.
Jede Zeile enthält höchstens zwei Anführungszeichen.

Zeilen, die an die Routine übergeben werden, können gültig oder ungültig sein, wie in Aufgabe 1 definiert.
Wir verarbeiten sie auf die gleiche Weise, unabhängig davon, ob sie gültig sind.

```go
lines := []string{
    `[INF] passWord`, // contains 'password' but not surrounded by quotation marks
    `"passWord"`,  // count this one
    `[INF] User saw error message "Unexpected Error" on page load.`, // does not contain 'password'
    `[INF] The message "Please reset your password" was ignored by the user`, // count this one
}
// => 2
```

## 4. Artefakte aus dem Log entfernen

Du hast festgestellt, dass eine vorgelagerte Verarbeitung der Logs den Text „end-of-line“, gefolgt von einer Zeilennummer (ohne dazwischenliegendes Leerzeichen), in den Logs verstreut.

Implementiere die Funktion `RemoveEndOfLineText`, die einen String entgegennimmt, den end-of-line-Text entfernt und einen „sauberen“ String zurückgibt.

Zeilen, die keinen end-of-line-Text enthalten, sollen unverändert zurückgegeben werden.

Entferne einfach den end-of-line-String.
Versuche nicht, die Leerzeichen anzupassen.

```go
RemoveEndOfLineText("[INF] end-of-line23033 Network Failure end-of-line27")
// => "[INF]  Network Failure "
```

## 5. Zeilen mit Benutzernamen versehen

Dir ist aufgefallen, dass einige der Logzeilen Sätze enthalten, die sich auf Benutzer beziehen.
Diese Sätze enthalten immer den String `"User"`, gefolgt von einem oder mehreren Leerzeichen und dann einem Benutzernamen.
Du beschließt, solche Zeilen zu markieren.

Implementiere eine Funktion `TagWithUserName`, die Logzeilen verarbeitet:

- Zeilen, die den String `"User "` nicht enthalten, bleiben unverändert.
- Bei Zeilen, die den String `"User "` enthalten, stellst du der Zeile `[USR]` gefolgt vom Benutzernamen voran.

Zum Beispiel:

```go
result := TagWithUserName([]string{
    "[WRN] User James123 has exceeded storage space.",
	"[WRN] Host down. User   Michelle4 lost connection.",
	"[INF] Users can login again after 23:00.",
	"[DBG] We need to check that user names are at least 6 chars long.",
})
// => []string {
//  "[USR] James123 [WRN] User James123 has exceeded storage space.",
//  "[USR] Michelle4 [WRN] Host down. User   Michelle4 lost connection.",
//  "[INF] Users can login again after 23:00.",
//  "[DBG] We need to check that user names are at least 6 chars long."
// }
```

Du kannst davon ausgehen, dass:

- auf Benutzernamen im Log mindestens ein Whitespace-Zeichen folgt.
- in jeder Zeile höchstens ein Vorkommen des Strings `"User "` gibt.
- Benutzernamen nicht leere Strings sind, die kein Whitespace enthalten.
