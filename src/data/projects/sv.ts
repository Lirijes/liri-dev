import { Project } from "@/types/project";

// Svenskt projektinnehåll. Samma fakta som i en.ts — bara språket skiljer sig.
// Allt som inte är text (id, länkar, bilder, diagram, status, år, tekniknamn)
// måste vara identiskt med den engelska versionen; ett test kontrollerar det.
export const projectsSv: Project[] = [
  {
    id: "nodia",
    title: "Nodia",
    tagline: "AI-plattform för företagsdata",
    year: "2026",
    role: "Projektägare & utvecklare (AI-assisterat)",
    type: "Fullstack",
    status: "In development",
    featured: true,
    summary:
      "En AI-plattform för företag som vill söka i och arbeta med sin egen data. Grunden är byggd i .NET med inloggning, företagsbaserade behörigheter och säker datahantering. AI-funktionerna är nästa steg.",
    background:
      "Idén till Nodia växte fram när jag arbetade på Readymade. Där skapades offerter manuellt eftersom varje kundförfrågan kunde se väldigt olika ut, beroende på vilka produkter och tjänster kunden behövde.\n\nJag började undersöka om det fanns system som kunde automatisera processen utifrån kundens önskemål och företagets befintliga data. Jag hittade lösningar som kunde generera offerttexter med AI, men saknade en mer komplett offerthantering där innehållet kunde anpassas samtidigt som företagets grafiska profil och struktur behölls.\n\nMin idé blev att bygga en plattform där företag kan samla sin information, ansluta sina egna datakällor och använda AI för att matcha kundförfrågningar mot rätt produkter och tjänster. AI:n skulle sedan kunna skapa ett offertförslag i företagets egen mall, med rätt logotyp, typsnitt och utformning. Innan offerten skickas ska en medarbetare kunna granska och godkänna den.\n\nDet är den långsiktiga visionen för Nodia.",
    currentFocus:
      "Innan AI:n kommer in behöver grunden vara säker. Därför har jag börjat med API:et, inloggningen och hur data hålls isär mellan företag. AI-delen är nästa steg.",
    myRole:
      "Jag har drivit idén, kravställningen, prioriteringarna och testningen. Claude har använts för analys och kodgenerering, och jag har successivt arbetat med att förstå och granska implementationen.",
    visualTone: "paper",
    visual: { kind: "diagram", id: "nodia-architecture" },
    diagrams: ["nodia-architecture"],
    architecture:
      "Webbläsaren loggar in via Supabase och skickar sin token till API:et. API:et kontrollerar vem du är och vilket företag du tillhör, och är det enda som får prata med databasen.",
    cardTech: ["C#", "ASP.NET Core", "EF Core", "PostgreSQL", "React"],
    tech: [
      { label: "Backend", items: ["C#", "ASP.NET Core Web API (.NET 10)", "Entity Framework Core", "Swagger/OpenAPI"] },
      { label: "Frontend", items: ["React", "TypeScript", "Vite", "React Router", "Tailwind CSS"] },
      { label: "Data & autentisering", items: ["PostgreSQL (Supabase)", "Supabase Auth", "JWT"] },
      { label: "Testning & infrastruktur", items: ["xUnit", "Testcontainers", "Vitest", "Docker Compose", "GitHub Actions"] },
    ],
    plannedTech: ["Semantic Kernel", "Ollama"],
    techNote: "Frontenden började som en prototyp i Lovable och flyttades sedan till Vite och React Router.",
    challengesIntro: "Det mesta av arbetet hittills handlar om en sak: att ingen ska kunna se ett annat företags data.",
    decisions: [
      {
        title: "Ingen genväg förbi API:et",
        problem:
          "Supabase gör som standard varje tabell åtkomlig direkt från klienten. Då går det att hoppa över API:ets behörighetskontroller.",
        decision:
          "Row Level Security är påslaget utan policies, och klientrollernas rättigheter är återkallade, även för tabeller som läggs till senare.",
        why: "Behörigheterna avgörs på ett enda ställe, och tester kontrollerar att klientrollerna inte når någon tabell.",
      },
      {
        title: "Rätt person, rätt företag",
        problem:
          "En användare får bara se data från företag hen är medlem i, och ett id som klienten skickar går att manipulera.",
        decision:
          "Identiteten hämtas alltid från den verifierade token, och ett filter på varje företagsroute kontrollerar medlemskapet. Den som inte är medlem får 404, samma svar som för ett företag som inte finns.",
        why: "Ett 403 hade avslöjat att företaget finns.",
      },
      {
        title: "Regler som inte går att glömma",
        problem: "En ny endpoint kan läggas till utan medlemskapskontrollen.",
        decision:
          "Inloggning krävs som standard, och arkitekturtester stoppar bygget om en företagsroute saknar filtret. Runt 30 integrationstester körs mot en riktig PostgreSQL i Docker, i CI.",
        why: "En databas i minnet kan inte testa Row Level Security eller kopplingen till Supabases inloggning.",
      },
    ],
    progress: {
      built: [
        ".NET 10-API där inloggning krävs som standard",
        "Företag, medlemskap och roller",
        "Workspaces: onboarding, väljare och aktiv workspace per användare",
        "Databasen låst så att bara API:et når den",
        "Runt 30 integrationstester och CI för båda repona",
        "Utvecklingsmiljö i Docker Compose",
      ],
      planned: [
        "Uppladdning och sökning av dokument",
        "Frågor som besvaras utifrån företagets dokument (RAG)",
        "AI via Semantic Kernel och lokala modeller i Ollama",
        "Agenter vars åtgärder en människa granskar och godkänner, med körloggar",
        "Offertförslag i företagets egen mall, som en medarbetare granskar och godkänner innan de skickas",
      ],
    },
    learnings: [
      "Att sätta upp ett strukturerat utvecklingsflöde från grunden i GitHub Actions: tester som körs automatiskt, pull requests som skapas automatiskt och en spärr som kräver ett mänskligt godkännande innan ändringar i känsliga delar, som behörigheter och databas, får mergas. Sådana flöden hade jag arbetat med tidigare, men aldrig konfigurerat själv.",
      "Hur en applikation delas upp mellan frontend, API, autentisering och databas, och hur delarna hänger ihop i praktiken.",
    ],
    links: [
      { label: "Frontend", url: "https://github.com/Lirijes/nodia", type: "github" },
      { label: "Backend", url: "https://github.com/Lirijes/NodiaApi", type: "github" },
    ],
  },
  {
    id: "minsommar",
    title: "MinSommar",
    tagline: "Sommarplanerare för familjer",
    year: "2026",
    role: "Projektägare & utvecklare (AI-assisterat)",
    type: "Fullstack",
    status: "Live",
    featured: true,
    summary:
      "En webbapp där familjer planerar sommarens aktiviteter tillsammans — med flera föräldrar per familj, en vy för barnen utan inloggning och ett valfritt system med poäng och belöningar.",
    background:
      "MinSommar är ett eget projekt för barnfamiljer. Syftet är att uppmuntra barn till fler aktiviteter och mindre skärmtid, genom aktiviteter, mål och poäng.\n\nFöräldrar samlar aktiviteter, bucket lists och favoriter åt sina barn och kan slå på poäng och belöningar. Flera föräldrar kan hantera samma familj, och barnen använder appen via en familjelänk utan att behöva något konto. Appen är live på minsommar.se.",
    myRole:
      "Jag har använt AI som stöd under utvecklingen. Jag beskrev vad jag ville bygga, specificerade funktionaliteten och styrde Claude Code i arbetet. AI har hjälpt till med olika funktioner och implementationen, men det är jag som har drivit projektet och ansvarat för att sätta upp utvecklingsflödet och de tekniska lösningarna.",
    visualTone: "mint",
    visual: { kind: "image", src: "/minsommar.png", alt: "MinSommars barnvy med dagens mål och poäng" },
    images: ["/minsommar.png", "/minsommar-2.png", "/minsommar-3.png", "/minsommar-4.png", "/minsommar-5.png"],
    diagrams: ["minsommar-access"],
    architecture:
      "Föräldrar loggar in med Supabase, och databasens behörighetsregler ser till att de bara når sin egen familj. Barn har inget konto: familjelänken ger en signerad cookie, och deras anrop går via serverfunktioner som själva kontrollerar vilken familj de tillhör.",
    cardTech: ["TypeScript", "React", "TanStack Start", "Supabase", "PostgreSQL"],
    tech: [
      { label: "Frontend", items: ["TypeScript", "React", "TanStack Start", "TanStack Router"] },
      { label: "Server", items: ["Serverfunktioner i TanStack Start", "PostgreSQL-funktioner (SECURITY DEFINER)"] },
      { label: "Data & autentisering", items: ["PostgreSQL (Supabase)", "Supabase Auth", "Row Level Security"] },
      { label: "Hosting", items: ["Vercel"] },
    ],
    challengesIntro:
      "Bakom det lekfulla gränssnittet finns ett behörighetsproblem: det är databasen, inte gränssnittet, som avgör vem som ser vad.",
    decisions: [
      {
        title: "Barn utan konton",
        problem: "Barn ska kunna använda appen utan e-post och lösenord.",
        decision:
          "En förälder delar en familjelänk som kan återkallas. Servern sätter en signerad cookie som bara innehåller familjens id, och barnens anrop går via serverfunktioner som kontrollerar familjen själva.",
        why: "Serverfunktionerna går förbi databasens behörighetsregler, så de får aldrig lita på id:n som skickas med anropet.",
      },
      {
        title: "En familj, flera föräldrar",
        problem:
          "All data tillhör en familj som flera föräldrar delar, och ingen ska kunna bli medlem utan att ha blivit inbjuden.",
        decision:
          "Varje familjetabell skyddas av Row Level Security som kontrollerar medlemskapet. Föräldrar går med via en inbjudan per e-post som går ut efter sju dagar och bara gäller den inloggade användarens adress.",
        why: "Reglerna gäller oavsett vilken fråga klienten skickar, och eftersom bara en hash av inbjudningslänken lagras avslöjar ett dataläckage inga användbara inbjudningar.",
      },
      {
        title: "Två föräldrar, samma belöning",
        problem:
          "Två föräldrar kan godkänna belöningar för samma barn samtidigt och spendera fler poäng än barnet har.",
        decision:
          "Godkännandet körs i en databasfunktion som låser förfrågan och barnet och räknar om saldot innan något godkänns.",
        why: "Poängen lagras aldrig som ett saldo — de räknas fram från genomförda aktiviteter minus godkända belöningar — så det finns ingen räknare som kan hamna i otakt.",
      },
    ],
    learnings: [
      "Hur e-post hänger ihop med inloggningen: kontobekräftelser vid registrering och inbjudningar som skickas ut och måste fungera innan någon kan börja använda appen.",
      "Hur man bygger en familjestruktur där flera konton hör till samma familj, så att två föräldrar kan logga in med varsitt konto men ändå se och hantera samma innehåll.",
    ],
    links: [
      { label: "Besök sidan", url: "https://minsommar.se/", type: "demo" },
      { label: "GitHub", url: "https://github.com/Lirijes/minsommar", type: "github" },
    ],
  },
  {
    id: "inspecto",
    title: "Inspecto",
    tagline: "Ärendehantering + .NET-API",
    year: "2026",
    role: "Projektägare & utvecklare (AI-assisterat)",
    type: "Fullstack",
    status: "Paused",
    summary:
      "Dashboard för att hantera anläggningar, ärenden och inspektioner, byggd på Supabase — plus ett separat ASP.NET Core Web API mot samma databas.",
    background:
      "Inspecto började som ett behov jag såg när jag arbetade på Readymade. Företaget hanterade besiktningar men saknade ett riktigt system för det. Jag började därför bygga ett eget system som även skulle kunna hantera andra typer av ärenden, till exempel felsökning och problem kopplade till byggnader.\n\nJag hann inte färdigställa projektet på arbetstid och fortsatte därför att utveckla det privat.",
    myRole:
      "Precis som med MinSommar använde jag främst Claude Code som stöd. Jag beskrev vad jag ville bygga och styrde arbetet med funktionalitet och implementation.",
    visual: { kind: "image", src: "/inspectoboard.png", alt: "Inspectos dashboard med översikt över ärenden och inspektioner" },
    images: ["/inspectoboard.png"],
    diagrams: ["inspecto-architecture"],
    architecture:
      "Frontenden arbetar i dag direkt mot Supabase för inloggning och data. Vid sidan av finns ett eget Web API i C#/.NET mot samma PostgreSQL-databas, med controllers, DTO:er och ett servicelager, skyddat med JWT och dokumenterat med Swagger.",
    cardTech: ["React", "C#", "ASP.NET Core", "EF Core"],
    tech: [
      { label: "Frontend", items: ["TypeScript", "React", "Vite"] },
      { label: "Backend", items: ["C#", "ASP.NET Core Web API", "Entity Framework Core", "Swagger/OpenAPI"] },
      { label: "Data & autentisering", items: ["PostgreSQL (Supabase)", "Supabase Auth", "JWT"] },
      { label: "Hosting", items: ["Vercel"] },
    ],
    decisions: [
      {
        title: "EF Core på en befintlig databas",
        problem: "Databasschemat fanns redan i Supabase.",
        decision:
          "Jag modellerade de befintliga tabellerna i EF Core och skapade en baseline-migrering, i stället för att låta EF generera ett nytt schema.",
      },
      {
        title: "Var logiken hör hemma",
        problem:
          "Att prata direkt med Supabase från frontenden gick snabbt att bygga, men sprider ut validering och affärsregler i klienten.",
        decision:
          "Ett separat Web API — controllers, separata DTO:er för create/update och ett servicelager — blev platsen för de reglerna.",
      },
    ],
    links: [
      { label: "Besök sidan", url: "https://inspecto-silk.vercel.app/", type: "demo" },
      { label: "Frontend", url: "https://github.com/Lirijes/inspecto", type: "github" },
      { label: "Backend", url: "https://github.com/Lirijes/inspecto-api", type: "github" },
    ],
  },
  {
    id: "review-management-tool",
    title: "Review Management Tool",
    tagline: "Internt verktyg · RevolutionRace",
    context: "RevolutionRace",
    year: "2024",
    role: "Fullstackutvecklare (praktik)",
    type: "Web",
    status: "Internal",
    summary:
      "Internt verktyg där redaktörer modererar kundrecensioner — söker, filtrerar, publicerar och avpublicerar — ovanpå företagets GraphQL-API.",
    background:
      "Verktyget byggde jag under min praktik på RevolutionRace. Företaget behövde ett enklare sätt att hantera recensioner. Bland annat behövde de kunna avpublicera recensioner när kunder begärde det, och publicera recensioner med bilder manuellt, eftersom de inte publicerades automatiskt.",
    myRole:
      "Designen tog jag fram tillsammans med en UX-designer. Funktionaliteten utformades utifrån företagets behov och genom att studera hur befintliga funktioner fungerade i deras webbapp. Arbetet gjordes i teamets sprintar, parallellt med arbete på CMS och sitemap. ChatGPT använde jag för enstaka frågor, men inte för att skriva koden.",
    visual: { kind: "image", src: "/adminreviews.png", alt: "Verktyget för recensionshantering med en lista över kundrecensioner" },
    images: ["/adminreviews.png"],
    cardTech: ["Nuxt", "Vue", "TypeScript", "GraphQL"],
    tech: [
      { label: "Frontend", items: ["Nuxt", "Vue", "TypeScript"] },
      { label: "API", items: ["GraphQL"] },
      { label: "Verktyg", items: ["Azure DevOps", "Git"] },
    ],
    decisions: [],
    builtItems: [
      "Ett modereringsflöde för att publicera och avpublicera recensioner.",
      "Sökning och filtrering i recensionsdata via företagets befintliga GraphQL-API.",
    ],
    learnings: [
      "Att utveckla en webbapplikation för ett etablerat företag, med deras krav på struktur och funktionalitet.",
      "GraphQL, och hur jag använder det för att hämta och presentera data.",
    ],
    links: [],
  },
  {
    id: "sitemap-generator",
    title: "Sitemap Generator",
    tagline: "Webbsida → XML · C#",
    year: "2024",
    role: "Ensam utvecklare",
    type: "Backend",
    status: "Live",
    summary:
      "Verktyg i ASP.NET Core MVC som läser en webbsida och gör om den till en XML-sitemap eller ett XML-utdrag av sidans HTML-innehåll, paketerat med Docker.",
    background:
      "Jag hade arbetat en del med XML på RevolutionRace, och min mentor tipsade mig om att bygga en egen applikation som genererar XML-filer. Det blev Sitemap Generator, ett eget projekt som jag byggde själv.",
    myRole: "Jag använde inte AI för utvecklingen, utöver att jag ibland tog hjälp av ChatGPT vid felsökning.",
    visual: { kind: "image", src: "/sitemapp.png", alt: "Sitemap Generators formulär för att ange en URL" },
    images: ["/sitemapp.png"],
    diagrams: ["sitemap-pipeline"],
    architectureLabel: "howItWorks",
    architecture:
      "Utifrån en URL hämtar verktyget sidan och skapar ett av två resultat: en sitemap enligt sitemaps.org, byggd från länkarna på sidan, eller ett XML-dokument som beskriver varje element i sidans body med dess text och attribut. Resultatet kan visas i webbläsaren eller laddas ner som en fil. En enda controller hanterar formuläret, och båda lägena delar samma steg för hämtning och parsning.",
    cardTech: ["C#", "ASP.NET Core MVC", "HtmlAgilityPack", "Docker"],
    tech: [
      { label: "Backend", items: ["C#", "ASP.NET Core MVC (.NET 8)", "HtmlAgilityPack", "LINQ to XML"] },
      { label: "Infrastruktur", items: ["Docker (bygge i flera steg)", "Render"] },
    ],
    techNote:
      "Paketerad med en Dockerfile i flera steg: den byggs med .NET 8 SDK och körs på den mindre ASP.NET-runtimen.",
    decisions: [
      {
        title: "En giltig sitemap",
        problem: "Länkar på en sida är ofta relativa, och resultatet måste följa sitemap-schemat.",
        decision:
          "Länkarna görs om till absoluta URL:er utifrån sidans URL och skrivs med LINQ to XML i sitemaps.org-namnrymden, med lastmod och en prioritet som sjunker med 0,1 per nivå i sökvägen, men aldrig under 0,5.",
      },
      {
        title: "En kedja, två resultat",
        problem: "Samma sida ska kunna användas både till en sitemap och till ett strukturerat innehållsutdrag.",
        decision:
          "Båda lägena delar hämtning (HttpClient) och parsning (HtmlAgilityPack); bara steget som bygger XML:en skiljer sig åt och väljs i formuläret.",
      },
    ],
    links: [
      { label: "Live-demo", url: "https://sitemapgenerator-cz9s.onrender.com/", type: "demo" },
      { label: "GitHub", url: "https://github.com/Lirijes/SitemapGenerator", type: "github" },
    ],
  },
];
