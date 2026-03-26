export type ApproachItem = {
  title: string;
  body: string;
};

export type HighlightItem = {
  icon: string;
  title: string;
  body: string;
};

export type ServiceData = {
  slug: string;
  index: string;
  title: string;
  label: string;
  tagline: string;
  intro: string;
  problemHeading: string;
  problem: string;
  approachHeading: string;
  approach: ApproachItem[];
  highlights: [HighlightItem, HighlightItem, HighlightItem];
  tags: string[];
  /** 4 image paths — null = placeholder slot */
  images: [string | null, string | null, string | null, string | null];
  cta: string;
};

export const servicesData: ServiceData[] = [
  {
    slug: "agentic-ai",
    index: "01",
    title: "Agentic AI & Orchestrazione",
    label: "Intelligenza Artificiale",
    tagline: "Agenti che agiscono. Sistemi che decidono.",
    intro:
      "Non demo, non chatbot generici. Agenti autonomi capaci di percepire il contesto, prendere decisioni e agire, integrandosi nei processi aziendali esistenti senza richiedere intervento umano continuo.",
    problemHeading: "Quando l'AI deve davvero lavorare",
    problem:
      "La maggior parte delle implementazioni AI in azienda si ferma all'interfaccia conversazionale. Un chatbot che risponde, uno strumento che suggerisce. Raramente un sistema che esegue, monitora e si adatta in autonomia. Il problema non è la tecnologia: è l'architettura. Progettare agenti che funzionano davvero richiede competenze che vanno ben oltre il semplice uso dei modelli.",
    approachHeading: "Come lo affrontiamo",
    approach: [
      {
        title: "Architettura multi-agente",
        body: "Progettiamo sistemi in cui agenti specializzati collaborano, si delegano compiti e si coordinano per obiettivi complessi. Ogni agente ha un ruolo preciso, un contesto delimitato, regole di comportamento chiare.",
      },
      {
        title: "Orchestrazione dei flussi",
        body: "L'orchestratore decide quale agente attivare, quando, con quali input. Gestiamo stati intermedi, fallback, retry logic e supervisione umana opzionale nei punti critici del flusso.",
      },
      {
        title: "Integrazione nei sistemi esistenti",
        body: "Gli agenti non vivono in isolamento. Li integriamo con ERP, CRM, database, email e API aziendali. Il risultato è un sistema che opera nel contesto reale, non in sandbox.",
      },
      {
        title: "Modelli online e on-premise",
        body: "Selezioniamo l'architettura AI più adatta al problema specifico: cloud API, modelli open source in locale, o ibridi. La scelta dipende da requisiti di sicurezza, latenza e costo.",
      },
    ],
    highlights: [
      { icon: "ph:graph-duotone", title: "Architetture multi-agente", body: "Agenti specializzati che collaborano, si delegano compiti e si coordinano per obiettivi complessi." },
      { icon: "ph:plug-duotone", title: "Integrazione nativa", body: "Si collegano ai sistemi esistenti: ERP, CRM, database e API aziendali senza riscrivere nulla." },
      { icon: "ph:sliders-duotone", title: "Online e on-premise", body: "Architettura selezionata sul problema specifico, non sulla tecnologia più in voga." },
    ],
    tags: ["Agentic AI", "Multi-agent", "Orchestrazione", "LLM"],
    images: [null, null, null, null],
    cta: "Parliamo del tuo progetto",
  },
  {
    slug: "prompt-engineering",
    index: "02",
    title: "Prompt Engineering & NLP",
    label: "Linguaggio & Semantica",
    tagline: "Dal testo al significato. Dalla semantica al risultato.",
    intro:
      "Estrarre valore dal linguaggio è una disciplina tecnica, non un'arte improvvisata. Lavoriamo sull'elaborazione del testo dal 2003: sappiamo come guidare le macchine a capire ciò che gli esseri umani intendono davvero.",
    problemHeading: "Il testo non strutturato è un giacimento",
    problem:
      "Email, contratti, feedback, documenti operativi: ogni azienda gestisce enormi volumi di testo che nessun sistema estrae, classifica o interpreta automaticamente. Il linguaggio naturale è ambiguo, contestuale e implicito. Lavorarci con efficacia richiede competenze specifiche che si costruiscono in anni, non in giorni.",
    approachHeading: "Come lo affrontiamo",
    approach: [
      {
        title: "Prompt engineering avanzato",
        body: "Progettiamo prompt strutturati, chain-of-thought, few-shot e system prompt ottimizzati per ogni caso d'uso. Non usiamo il modello come scatola nera: lo guidiamo con precisione chirurgica.",
      },
      {
        title: "NLP su misura",
        body: "Classificazione, estrazione di entità, sentiment analysis, summarization, similarity semantica. Costruiamo pipeline NLP calibrate sul dominio specifico del cliente, non soluzioni generiche.",
      },
      {
        title: "Generative AI applicata",
        body: "Generazione di testi strutturati, report automatici, draft di documenti, risposte contestualizzate. L'AI scrive, riassume, traduce e formatta seguendo le regole che definisce il cliente.",
      },
      {
        title: "RAG e knowledge retrieval",
        body: "Retrieval-Augmented Generation per interrogare corpora documentali complessi in linguaggio naturale. Il modello risponde attingendo ai documenti del cliente, non alle sue conoscenze generali.",
      },
    ],
    highlights: [
      { icon: "ph:hourglass-duotone", title: "Dal 2003", body: "Vent'anni di NLP applicato al business, prima che diventasse una parola di moda." },
      { icon: "ph:funnel-duotone", title: "Pipeline su misura", body: "Classificazione, estrazione e summarization calibrati sul dominio specifico del cliente." },
      { icon: "ph:books-duotone", title: "RAG e knowledge retrieval", body: "Il modello risponde attingendo ai documenti reali del cliente, non alle conoscenze generali." },
    ],
    tags: ["Prompt Eng.", "NLP", "Generative AI", "RAG", "Semantica"],
    images: [null, null, null, null],
    cta: "Parliamo del tuo progetto",
  },
  {
    slug: "cleverflow",
    index: "03",
    title: "CleverFlow",
    label: "Progetto Flagship",
    tagline: "Workflow Zero-Touch. Dall'email al gestionale, senza intervento umano.",
    intro:
      "CleverFlow è il prodotto AI-based di VerdeLab per l'automazione dei processi documentali aziendali. Collega email, documenti e ERP in flussi completamente automatici, dalla ricezione all'aggiornamento del sistema gestionale.",
    problemHeading: "Processi manuali che frenano l'azienda",
    problem:
      "Ogni giorno nelle aziende vengono ricevute email, caricate fatture, protocollati documenti, aggiornati gestionali. Operazioni ripetitive, soggette a errori, che consumano tempo prezioso del personale. CleverFlow sostituisce questi flussi con agenti AI che leggono, interpretano, decidono e agiscono, in modo autonomo e tracciabile.",
    approachHeading: "Come funziona CleverFlow",
    approach: [
      {
        title: "Intake intelligente",
        body: "Email in arrivo, allegati, upload manuali: CleverFlow intercetta il documento in ingresso, lo classifica e avvia il workflow corretto senza configurazione manuale caso per caso.",
      },
      {
        title: "Elaborazione documentale AI",
        body: "OCR, estrazione dati strutturati, validazione e controllo di coerenza. Il contenuto viene letto e interpretato con precisione, indipendentemente dal formato del documento.",
      },
      {
        title: "Decisione agentica",
        body: "L'agente valuta il contesto, applica le regole aziendali e decide il percorso corretto. L'escalation umana è prevista solo nei casi ambigui, con notifica e dashboard di supervisione.",
      },
      {
        title: "Sincronizzazione ERP",
        body: "I dati estratti vengono scritti direttamente nel gestionale aziendale, in tempo reale. Supportiamo i principali ERP del mercato italiano e internazionale.",
      },
    ],
    highlights: [
      { icon: "ph:hand-waving-duotone", title: "Zero-Touch", body: "Dall'email in entrata all'aggiornamento ERP senza nessun intervento manuale nel flusso." },
      { icon: "ph:files-duotone", title: "Qualsiasi formato", body: "OCR, estrazione dati strutturati e validazione su fatture, ordini e documenti di ogni tipo." },
      { icon: "ph:eye-duotone", title: "Supervisione integrata", body: "Dashboard di controllo e escalation umana automatica sui soli casi davvero ambigui." },
    ],
    tags: ["Zero-Touch", "ERP Integration", "Workflow AI", "Automazione"],
    images: [null, null, null, null],
    cta: "Scopri CleverFlow",
  },
  {
    slug: "office-automation",
    index: "04",
    title: "Office Automation",
    label: "Automazione Operativa",
    tagline: "L'AI che libera il personale. Le persone che fanno ciò che conta.",
    intro:
      "Gestire pratiche, rispondere a email, smistare richieste, aggiornare database: queste attività consumano una quota enorme del tempo del personale amministrativo. L'automazione intelligente le delega all'AI, restituendo tempo alle persone.",
    problemHeading: "Il lavoro ripetitivo non crea valore",
    problem:
      "Il personale d'ufficio spende in media oltre il 40% del proprio tempo in attività ripetitive e a basso valore aggiunto: data entry, gestione email, protocollazione, aggiornamenti manuali. Non è un problema di produttività individuale, è un problema di sistema. Un sistema risolvibile con l'automazione intelligente.",
    approachHeading: "Come lo affrontiamo",
    approach: [
      {
        title: "Analisi dei processi",
        body: "Prima di automatizzare, mappiamo. Identifichiamo i flussi ad alta frequenza e basso valore aggiunto, stimiamo il risparmio e progettiamo l'automazione in modo chirurgico.",
      },
      {
        title: "Customer service AI",
        body: "Agenti conversazionali in italiano per gestire richieste di primo livello, raccogliere informazioni e instradare verso l'operatore giusto. Disponibili 24/7, integrabili in qualsiasi canale.",
      },
      {
        title: "Gestione documentale automatica",
        body: "Classificazione, archiviazione, protocollazione e distribuzione di documenti senza intervento manuale. I file arrivano e vengono gestiti in autonomia, con log completo.",
      },
      {
        title: "Integrazione con i tool aziendali",
        body: "I nostri sistemi si collegano agli strumenti che il team già usa: email, calendar, CRM, ERP, gestionale. Nessun cambio di piattaforma, solo meno lavoro manuale.",
      },
    ],
    highlights: [
      { icon: "ph:magnifying-glass-duotone", title: "Analisi prima, automazione poi", body: "Mappiamo i processi e identifichiamo i flussi ad alto potenziale prima di toccare il codice." },
      { icon: "ph:headset-duotone", title: "Customer service 24/7", body: "Agenti in italiano disponibili su qualsiasi canale, integrabili senza cambiare piattaforma." },
      { icon: "ph:puzzle-piece-duotone", title: "Nessuna migrazione", body: "Si connette agli strumenti che il team già usa: email, CRM, ERP, gestionale." },
    ],
    tags: ["Automazione", "Customer Service AI", "Process AI", "Chatbot"],
    images: [null, null, null, null],
    cta: "Parliamo del tuo progetto",
  },
  {
    slug: "data-intelligence",
    index: "05",
    title: "Data Intelligence & ML",
    label: "Dati & Modelli Predittivi",
    tagline: "I dati ci sono. Il valore è nel capirli.",
    intro:
      "Ogni azienda produce dati. Poche li leggono in modo sistematico, ancora meno li usano per decidere in tempo reale. Costruiamo modelli che trasformano i dati operativi in vantaggio competitivo misurabile.",
    problemHeading: "I dati senza analisi sono rumore",
    problem:
      "Dashboard, report, export Excel: molte aziende hanno strumenti per visualizzare i dati, ma raramente sistemi per interpretarli e agire di conseguenza. La distanza tra avere i dati e usarli per decidere è ancora enorme per la maggior parte delle PMI italiane. Colmare questa distanza è ciò che facciamo.",
    approachHeading: "Come lo affrontiamo",
    approach: [
      {
        title: "Data pipeline e ingestion",
        body: "Consolidiamo dati da fonti eterogenee, li normalizziamo e li rendiamo disponibili per l'analisi. Database, API, file, ERP: costruiamo il canale da cui partire.",
      },
      {
        title: "Modelli predittivi e ML",
        body: "Classificazione, regressione, clustering, anomaly detection. Costruiamo modelli calibrati sui dati reali del cliente, validati e interpretabili, non scatole nere.",
      },
      {
        title: "Pattern recognition",
        body: "Identifichiamo correlazioni non ovvie tra variabili operative, commerciali o produttive. Il valore spesso sta nelle relazioni che un occhio umano non riesce a vedere.",
      },
      {
        title: "Integrazione nei processi decisionali",
        body: "I modelli non restano nei notebook: li integriamo nei flussi produttivi, nei cruscotti operativi, nei sistemi che il team usa ogni giorno.",
      },
    ],
    highlights: [
      { icon: "ph:flow-arrow-duotone", title: "Pipeline end-to-end", body: "Dai dati grezzi al modello: ingestion, normalizzazione, analisi in un flusso unico e controllato." },
      { icon: "ph:cube-transparent-duotone", title: "Modelli interpretabili", body: "Validati sui dati reali del cliente. Niente scatole nere, ogni previsione ha una spiegazione." },
      { icon: "ph:gear-six-duotone", title: "Dentro i processi", body: "I risultati entrano nei sistemi operativi del cliente, non restano confinati nei notebook." },
    ],
    tags: ["Data Science", "ML", "Analytics", "Predictive AI"],
    images: [null, null, null, null],
    cta: "Parliamo del tuo progetto",
  },
  {
    slug: "consulenza-formazione",
    index: "06",
    title: "Consulenza & Formazione",
    label: "Strategia & Crescita",
    tagline: "Tecnologia che si capisce. Team che la usa davvero.",
    intro:
      "L'AI funziona quando le persone sanno come usarla. Non basta implementare un sistema: serve che il team comprenda il funzionamento, sappia guidarlo e sia in grado di evolvere la soluzione nel tempo. Per questo la formazione è al centro della nostra offerta.",
    problemHeading: "Adottare l'AI senza capirla è un rischio",
    problem:
      "Molte aziende acquistano soluzioni AI senza che il personale sappia davvero cosa c'è dentro, come funziona, dove può fallire. Il risultato è uno strumento usato male, sottoutilizzato o abbandonato dopo pochi mesi. La formazione non è un optional: è la condizione necessaria perché l'investimento porti risultati duraturi.",
    approachHeading: "Come lo affrontiamo",
    approach: [
      {
        title: "Consulenza strategica AI",
        body: "Affianchiamo il management nella definizione della roadmap di adozione AI, nell'identificazione dei processi ad alto potenziale e nella valutazione delle architetture più adatte.",
      },
      {
        title: "Formazione sui modelli linguistici",
        body: "Workshop pratici su come dialogare con i modelli AI, costruire prompt efficaci, interpretare i risultati in modo critico. Percorsi calibrati sul livello tecnico del team.",
      },
      {
        title: "Project management tecnico",
        body: "Gestiamo i progetti tecnologici end-to-end: definizione dei requisiti, selezione dei fornitori, supervisione dello sviluppo, collaudo, avvio. Un interlocutore unico per tutta la filiera.",
      },
      {
        title: "Stage e collaborazioni formative",
        body: "Collaboriamo con enti di formazione e ospitiamo stage per contribuire alla crescita di professionisti capaci di affrontare la trasformazione digitale con consapevolezza.",
      },
    ],
    highlights: [
      { icon: "ph:map-trifold-duotone", title: "Roadmap su misura", body: "Definiamo insieme la strategia di adozione AI più adatta al contesto e ai processi del cliente." },
      { icon: "ph:chalkboard-teacher-duotone", title: "Workshop pratici", body: "Formazione concreta su prompt engineering e uso critico dei modelli, calibrata sul team." },
      { icon: "ph:handshake-duotone", title: "Un interlocutore unico", body: "Dalla strategia allo sviluppo al collaudo: gestiamo l'intero progetto senza frammentazioni." },
    ],
    tags: ["IT Consulting", "Formazione AI", "Strategy", "Project Management"],
    images: [null, null, null, null],
    cta: "Parliamo del tuo progetto",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((s) => s.slug === slug);
}
