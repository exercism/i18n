# A „nem változtak fontos fájlok” workflow

Amikor egyesítenek egy kurzushoz tartozó, feladatot érintő PR-t, az a tanulók megoldásainak legutóbb közzétett iterációit _mind_ újrateszteli.
A népszerű feladatoknál ez _nagyon_ költséges művelet (szélsőséges esetben a Python Hello World esetében például 70 000 tesztfuttatás!).

Ez a workflow ellenőrzi, hogy egy PR változásai kiváltanák-e a megoldások újratesztelését, és ha igen, hozzászólást fűz a PR-hoz, amely elmagyarázza, mi a kockázata annak, ha a PR-t _változatlan formában_ egyesítik.
Arra is kitér, hogyan lehet a PR-t egyesíteni anélkül, hogy a megoldásokat újra kellene tesztelni.

Ha többet szeretnél megtudni, nézd meg a [felesleges tesztfuttatások elkerüléséről szóló](https://exercism.org/docs/building/tracks#h-avoiding-triggering-unnecessary-test-runs) dokumentációt.

## Forrás

A workflow-t a `.github/workflows/no-important-files-changed.yml` fájl definiálja.
