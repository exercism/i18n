# Ottobre orientato agli oggetti

## Introduzione

Ciao a tutti. Spero che stiate bene. Abbiamo avuto un settembre intenso. Abbiamo pubblicato tantissimi miglioramenti e nuove funzionalità sul sito, in gran parte per migliorare il mentoring e i flussi a esso legati. Di conseguenza, ora riceviamo il doppio delle richieste di mentore rispetto a 4 settimane fa, il che è fantastico. Se non avete mai provato a farvi revisionare il codice da un mentore, fatelo assolutamente: è un modo fantastico per imparare. E se desiderate aiutare gli altri, ci sono tantissime richieste nelle code che aspettano il vostro aiuto. Potete iscrivervi come mentori alla voce Mentoring nel menu Contribute! Abbiamo anche fatto un grosso aggiornamento del database, da MySQL 5.6 a MySQL 8, che ho registrato ed è disponibile nella sezione Insiders, quindi se siete Insider e non l'avete ancora guardato, dateci un'occhiata!

Bene, passiamo a #12in23. Settembre è stato un mese interessante, all'insegna dei linguaggi concisi e sintetici. Questo mese andiamo nella direzione opposta e guardiamo a esemplari molto più grandi. Ci concentriamo sui linguaggi orientati agli oggetti, in particolare C#, Crystal, Java, Pharo, Ruby e PowerShell. Abbiamo già parlato sia di Pharo sia di Java, rispettivamente a maggio e ad agosto, quindi non li tratteremo di nuovo in questo video, ma date un'occhiata ai video dei mesi precedenti se siete interessati alle introduzioni a quei linguaggi. In questo video, invece, esploreremo C#, Crystal, Ruby e PowerShell e, come sempre, Erik ci racconterà cosa rende questi linguaggi interessanti e unici.

## I badge

Come sempre, potete ottenere il badge di Ottobre orientato agli oggetti completando 5 esercizi qualsiasi in questi linguaggi. C'è anche il badge Year-Long, verso cui so che molti di voi stanno lavorando. Per quello abbiamo 5 esercizi in evidenza da completare, tutti quanti adatti a essere risolti in stile OOP. Sono:

- **Albero binario di ricerca**: inserisci e cerca numeri in un albero binario
- **Buffer circolare**: implementa una struttura dati connessa end-to-end
- **Orologio**: implementa un orologio che gestisce orari senza date
- **Matrice**: restituisci le righe e le colonne di una matrice rappresentata come stringa
- **Cifrario semplice**: implementa un cifrario a sostituzione

## Panoramiche

### C#
- Sviluppato da Anders Hejlsberg in Microsoft nel 2000
- Il linguaggio e la macchina virtuale hanno specifiche ufficiali. È diventato uno standard ECMA ufficiale nel 2002 e uno standard ISO nel 2003
- Il compilatore, .NET Framework (la libreria standard) e Visual Studio (l'editor) erano tutti inizialmente a codice chiuso, ma il compilatore e .NET Framework sono stati resi open source nel 2014
- Pur condividendo molta sintassi con Java (uscito un paio d'anni prima), C# non era una copia identica di Java (ad esempio il supporto per le proprietà e i tipi valore, e l'assenza di eccezioni controllate)
- Compila in bytecode, con la compilazione in codice macchina supportata a partire da .NET 7 (ancora in miglioramento)
- Usato in una quantità enorme di software, dai siti web ai sistemi embedded, e dalle app (Xamarin) ai videogiochi (Unity)

### Crystal
- Crystal è stato sviluppato da Ary Borenszweig (che ha un account su Exercism), Juan Wajnerman e Brian Cardiff (in origine si chiamava Joy, ma è stato ribattezzato Crystal 3 giorni dopo :))
- Progettato per avere l'eleganza e la produttività di Ruby, ma con la velocità, l'efficienza e la sicurezza dei tipi di un moderno linguaggio compilato.
- Linguaggio open source sviluppato dall'organizzazione Manas.
- La versione 1.0 è stata pubblicata nel 2021.
- Compila in codice macchina usando LLVM (come Rust)
- Il compilatore era inizialmente scritto in Ruby, ma in seguito è stato convertito in una versione self-hosted
- Usato dall'azienda di camion Nikola, da Manas e altri, soprattutto per siti web, ma anche servizi cloud, applicazioni a riga di comando e script

### PowerShell
- Creato da un team guidato da Jeffrey Snover in Microsoft e pubblicato originariamente nel 2006.
- Lo sviluppo è stato avviato da Intel, che voleva spostare i propri script KornShell da Sun RISC a un'altra piattaforma per aiutare lo sviluppo delle proprie CPU. Alla fine Intel scelse una piattaforma diversa, ma Microsoft continuò a lavorare sulla sua nuova shell, PowerShell, perché offriva la possibilità di migliorare l'amministrazione di sistema di Windows (che all'epoca non era particolarmente brillante e richiedeva spesso l'uso di interfacce grafiche)
- La sintassi è stata ispirata a KornShell, ma anche a PHP, Perl e altri
- La prima versione girava solo su .NET Framework, il che significava che funzionava solo su Windows. Ma PowerShell 6.0 (pubblicato nel 2018) girava su .NET Core, che è multipiattaforma e open source.
- Usato principalmente per l'amministrazione di sistema, ma anche per fornire utilità CLI o wrapper attorno ad altri strumenti. L'abbiamo usato tantissimo per lavorare in blocco sui repository di Exercism

### Ruby
- Sviluppato da Yukihiro Matsumoto (detto Matz) e pubblicato per la prima volta nel 1995
- Matz voleva lavorare con un vero linguaggio di scripting orientato agli oggetti, ma non gli piacevano le opzioni esistenti (come Perl e Python), così creò un nuovo linguaggio: Ruby
- Matz descrive Ruby come un semplice linguaggio Lisp nel suo nucleo, con un sistema a oggetti simile a quello di Smalltalk, blocchi ispirati alle funzioni di ordine superiore e un'utilità pratica pari a quella di Perl.
- Di solito è interpretato, ma può anche essere compilato just-in-time in codice macchina
- Oltre all'interprete ufficiale esistono implementazioni alternative, come JRuby (gira sulla JVM), Rubinius (usa LLVM) e YJIT, un compilatore just-in-time incluso nel pacchetto di installazione ufficiale
- Usato soprattutto nei siti web (con Ruby on Rails), ad esempio GitHub, Stripe, Shopify e molti altri (tra cui Exercism e il forum di Exercism!). Ruby è usato anche per l'automazione

## E dal punto di vista della programmazione, in cosa differiscono?

Sono tutti linguaggi orientati agli oggetti, anche se non tutti lo fanno allo stesso modo (ad esempio Crystal e Ruby usano il modello di invio di messaggi di Smalltalk per chiamare i metodi).

### C#
- Tipizzato in modo forte e statico
- Supporta anche i paradigmi imperativo e dichiarativo, e sta diventando sempre più funzionale

### Crystal
- Tipizzato in modo forte e statico (a differenza di Ruby)
- Supporta anche la programmazione funzionale e imperativa

### PowerShell
- Tipizzato in modo forte
- Supporta anche la programmazione imperativa e funzionale, e la programmazione basata su pipeline.

### Ruby
- Tipizzato dinamicamente
- Supporta anche la programmazione funzionale e imperativa

Detto questo, tutti questi linguaggi sono innanzitutto linguaggi orientati agli oggetti.

## Cosa rende grandi questi linguaggi?

### C#
- Gira (quasi) ovunque, comprese le app tramite Xamarin. In origine girava solo su Windows, il che diede vita a Mono, un'implementazione gratuita e open source di un compilatore e runtime C# multipiattaforma. Nel 2015 è stato introdotto .NET Core, completamente multipiattaforma e open source.
- Uso generale: può essere usato per quasi qualsiasi tipo di carico di lavoro, comprese app, siti web e videogiochi
- Espressivo: si può fare molto con relativamente poco codice C#. LINQ in particolare è un grande moltiplicatore di produttività e molto divertente da usare
- Strumenti eccellenti, sia per gli IDE sia per altri strumenti come i sistemi di build. Mentre Visual Studio è solo per Windows, JetBrains Rider e VS Code sono multipiattaforma
- La .NET Compiler Platform (spesso chiamata Roslyn) è un modo fantastico per analizzare, trasformare e generare codice C# (la usiamo ampiamente nel test runner, nell'analyzer e nel representer di C#)
- La documentazione è ampia, dettagliata e ben scritta
- Community numerosa: molte risorse disponibili, tra cui blog, forum e altro ancora

### Crystal
- Sintassi elegante e leggibile, che rende il codice Crystal facile da leggere e scrivere
- Espressivo. Come Ruby, Crystal è molto espressivo: si può fare molto con poco codice. Questo è dovuto in parte a una libreria standard eccellente e completa.
- Veloce. La tipizzazione statica permette di compilare in codice macchina efficiente usando LLVM, con una gestione semplice della memoria tramite garbage collector.
- Implementazione orientata agli oggetti eccezionale. Tutto è un oggetto, comprese le classi e i tipi primitivi come numeri e booleani
- Tutto incluso: ampia libreria standard, formattatore integrato, motore di template, framework di test e altro ancora
- Interoperabilità. Facile interazione con le librerie C
- Multipiattaforma: gira su Linux, macOS e Windows, anche se Windows non è ancora un cittadino di prima classe

### PowerShell
- Potente: PowerShell è uno strumento potente per gli amministratori. Si integra bene con molti altri sistemi, come il sistema operativo Windows (componenti, servizi e impostazioni) e altri prodotti Microsoft come Exchange, SharePoint, Azure, ecc. Può anche interagire con molte altre tecnologie, come le API REST, i database, i servizi web e altro ancora.
- Disponibilità: PowerShell è preinstallato su ogni moderno sistema operativo Windows e può essere installato su qualsiasi sistema che esegue .NET (tra cui macOS, Linux e molti sistemi Unix)
- Sicurezza: PowerShell include funzionalità per proteggere gli script e limitarne l'esecuzione in base a script firmati e criteri di esecuzione. Questo è fondamentale per garantire la sicurezza dei vostri processi di automazione.
- GUI: potete combinarlo con altri framework come Windows Forms o Windows Presentation Foundation per progettare e creare interfacce grafiche per i vostri script PowerShell, rendendoli più facili da usare.
- Pipeline: come Bash sui sistemi Unix, PowerShell permette di concatenare i cmdlet tra loro per eseguire operazioni e attività complesse, passando l'output di un cmdlet come input a un altro

### Ruby
- Sintassi elegante e leggibile, che rende il codice Ruby facile da leggere e scrivere
- Espressivo. Ruby è un linguaggio molto espressivo: si può fare molto con poco codice. Questo è dovuto in parte a una libreria standard eccellente e completa
- Ecosistema enorme, con un numero enorme di librerie disponibili (le gem)
- Implementazione orientata agli oggetti eccezionale. Tutto è un oggetto, comprese le classi e i tipi primitivi come numeri e booleani.
- Pragmatico. Ruby e la maggior parte delle sue librerie sono molto pragmatici, con l'obiettivo di risolvere problemi del mondo reale.
- Interoperabilità. Facile interazione con le librerie C, usata spesso quando le prestazioni sono particolarmente importanti. Per esempio, la gem Nokogiri permette di lavorare con XML in modo molto performante, avvolgendo librerie C che fanno il lavoro pesante
- C'è molta innovazione. Ad esempio, Stripe ha creato Sorbet, un type checker per Ruby, Shopify ha sviluppato YJIT, un compilatore Just-In-Time per Ruby (incluso in Ruby 3.1+) e si sta lavorando al supporto WASM

## Funzionalità di spicco

### C#
- Prestazioni eccellenti, soprattutto per un linguaggio gestito. Sia il linguaggio sia il runtime hanno moltissime funzionalità per migliorare le prestazioni, ad esempio il tipo Span<T> e l'accesso agli intrinsics della CPU (come le istruzioni AVX). Il CLR è una macchina virtuale matura, stabile e altamente performante, in continuo miglioramento
- Ecosistema enorme, con un numero enorme di librerie disponibili. Queste librerie, come C#, sono mature, stabili e complete
- Moderno ed evolutivo: il linguaggio e il runtime continuano a evolversi, con aggiornamenti molto regolari del linguaggio per renderlo più moderno. Alcuni esempi:
- async/await per una concorrenza semplice
- span<T> per un uso efficiente della memoria
- tipi riferimento nullable (che risolvono l'errore da un miliardo di dollari)
- anche il runtime viene aggiornato regolarmente, ad esempio .NET AOT per compilare direttamente in codice macchina
- Meno alternative rispetto a molti altri linguaggi/ecosistemi. Per la maggior parte degli scopi basta usare le soluzioni predefinite fornite da Microsoft, che spesso includono anche l'IDE. Si potrebbe anche sostenere che questo sia uno svantaggio, ma può essere un vantaggio, soprattutto quando si inizia con un linguaggio

### Crystal
- Il meglio dei due mondi. La combinazione di inferenza di tipo globale e tipi unione fa sembrare Crystal un linguaggio tipizzato dinamicamente, in cui spesso serve specificare pochi tipi, ma che conserva le prestazioni e le ulteriori garanzie di sicurezza (compreso il controllo di nil in fase di compilazione) di un linguaggio tipizzato staticamente
- Metaprogrammazione. Invece della metaprogrammazione dinamica a runtime di Ruby, Crystal ha le macro, che vengono eseguite in fase di compilazione. Le macro lavorano sui nodi dell'AST e producono codice. Sono piuttosto facili da definire e usare. Embedded Crystal (ECR) è un motore di template integrato che usa le macro per incorporare codice Crystal in altro testo
- Ottima concorrenza. La concorrenza è facile da usare con un modello simile a quello di Go, che usa fiber (unità di esecuzione leggere) che comunicano tramite channel
- Produttivo e divertente. Ruby è famoso per essere progettato per la produttività e la felicità degli sviluppatori, con una sintassi elegante e leggibile e un'ottima ergonomia. Dato che la sintassi e il design di Crystal sono molto simili a quelli di Ruby, questo vale anche per Crystal (curiosità: parecchio codice Ruby è anche codice Crystal valido).

### PowerShell

- Cmdlet: PowerShell usa i cmdlet (pronunciato «command-let») come suoi elementi costitutivi. Sono comandi piccoli e orientati a un compito che avvolgono funzionalità esistenti, offrendo agli amministratori di sistema un'interfaccia coerente (ad esempio Get-Help per mostrare la guida di qualsiasi cmdlet) e pensata per loro. Esistono cmdlet per un'ampia varietà di «backend», come tutte le classi .NET, Windows Management Instrumentation, Azure e molti altri. I cmdlet possono essere definiti in qualsiasi linguaggio .NET e sono definiti in modo molto dichiarativo, con parametri, la loro validazione, i requisiti (required true/false), i nomi alternativi (switch) ecc. definiti facilmente.
- Orientato agli oggetti: quasi tutto in PowerShell è un oggetto con molte proprietà diverse. File, processi, chiavi di registro e persino semplici tipi di dati come stringhe e numeri sono tutti trattati come oggetti; questo approccio semplifica il modo in cui si lavora e si interagisce con diversi tipi di dati e servizi. Sarà molto familiare a chiunque abbia lavorato con .NET
- Gestione remota: supporta la gestione remota di server e sistemi Windows e persino di risorse cloud su Azure, AWS e GCP, il che è essenziale per gestire automazioni e rilasci su larga scala.
- Estensibile: ha un ottimo sistema di moduli integrato, permette di creare cmdlet, funzioni e moduli personalizzati e di lavorare con altri linguaggi e librerie di programmazione per estenderne ulteriormente le capacità secondo necessità.

### Ruby

- Produttivo e divertente. Ruby è famoso per essere progettato per la produttività e la felicità degli sviluppatori. Anche se è difficile quantificarlo, l'entusiasmo di chi ha usato Ruby la dice lunga
- Metaprogrammazione. Ruby è molto dinamico e permette la metaprogrammazione a runtime. Che si tratti di fare monkey-patching di classi esistenti o di aggiungere o chiamare metodi dinamicamente, Ruby ha quello che serve
- Ruby on Rails è un framework fantastico e completo per costruire siti web. Di serie contiene templating, caching, ActiveRecord (un modo per interagire con un database tramite oggetti), migrazioni, scaffolding, WebSocket e molto altro.

## Quale scegliere

- Se conoscete la programmazione orientata agli oggetti ma volete vederne una versione diversa, provate Pharo
- Se conoscete Java o C# ma non li toccate da un po', dateci un'altra possibilità. Entrambi i linguaggi si sono evoluti molto, quindi date un'occhiata a qualcuna di quelle brillanti novità!
- C# e Java (e Ruby, in misura minore) sono anche ottime opzioni se cercate lavoro, perché sono tra i linguaggi più richiesti dai datori di lavoro
- Se conoscete Ruby, provate Crystal per vedere come sarebbe un Ruby tipizzato staticamente
- Se vi piacciono i linguaggi dinamici ma volete anche ottime prestazioni, andate a dare un'occhiata a Crystal
- Se conoscete Bash o i file batch di Windows, provate PowerShell per una versione diversa e orientata agli oggetti dello scripting di shell
- Se vi piacciono in generale i linguaggi di scripting, Ruby, Crystal e PowerShell sono tutte buone opzioni
- Pharo, Crystal e Ruby sono ottimi se volete fare un po' di metaprogrammazione (anche C# sta acquisendo alcune funzionalità di metaprogrammazione)
- Se volete provare cosa significa programmare in un linguaggio che non si basa su file di testo, provate Pharo e il suo IDE unico e potente
- Se vi piace costruire siti web, vale la pena provare Ruby con il suo framework Ruby on Rails
