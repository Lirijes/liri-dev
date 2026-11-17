import { Project } from "@/types/project";

// Svenskt projektinnehåll. Samma fakta som i en.ts — bara språket skiljer sig.
// Allt som inte är text (id, länkar, bilder, diagram, status, år, tekniknamn)
// måste vara identiskt med den engelska versionen; ett test kontrollerar det.
export const projectsSv: Project[] = [
  {
    id: "nodia",
    title: "Nodia",
    year: "2026",
    role: "Projektägare & utvecklare (AI-assisterat)",
    type: "Fullstack",
    status: "In development",
    featured: true,
    decisionsTerm: "solutions",
    summary:
      "En AI-plattform för företag som vill söka i och arbeta med sin egen data. Grunden är byggd i .NET med inloggning, företagsbaserade behörigheter och säker datahantering. AI-funktionerna är nästa steg.",
    overview:
      "Nodia är en AI-plattform jag utvecklar för företag som vill kunna söka i, ställa frågor om och så småningom utföra uppgifter med hjälp av sin egen data.\n\nJag har börjat med den tekniska grunden: ett .NET API som hanterar autentisering, behörigheter och åtkomst till företagens data. Plattformen är byggd för flera företag, där varje användare bara ska kunna komma åt information som tillhör företag hen är medlem i.\n\nFrontenden är byggd i React och TypeScript, med Supabase för inloggning och PostgreSQL som databas. Den började som en prototyp i Lovable och flyttades sedan till Vite och React Router. Nästa steg är att bygga dokumenthantering och AI-funktioner ovanpå den befintliga grunden.",
    myRole: "Jag äger projektet: jag har definierat vad Nodia ska göra och vilka säkerhetskrav som gäller, prioriterat omfattningen och testat varje funktion när den byggts. En stor del av arkitekturanalysen och koden har tagits fram med Claude, en AI-assistent för kodning, som jag har styrt och vars förslag jag har diskuterat och valt mellan. Just nu arbetar jag aktivt med att gå igenom koden för att fördjupa min förståelse och kunna förklara de tekniska lösningarna och implementationen.",
    keyPoints: [
      "ASP.NET Core-API på .NET 10 som verifierar JWT:er från Supabase och kräver inloggning som standard",
      "Företag och medlemskap med kontroller som säkerställer att användare bara kommer åt data från företag de tillhör.",
      "Runt 30 integrationstester mot en riktig PostgreSQL-container, körda i CI",
    ],
    story:
      "En AI-plattform för företag som vill söka i och arbeta med sin egen data. Grunden är byggd i .NET med inloggning, företagsbaserade behörigheter och säker datahantering. AI-funktionerna är nästa steg.",
    visualTone: "paper",
    implementation: [
      {
        title: "Inloggning som standard",
        text: "En fallback-policy för auktorisering skyddar varje endpoint; bara health check-endpointen är markerad som publik.",
      },
      {
        title: "Ett medlemskapsfilter",
        text: "Ett [CompanyMember]-attribut skapar ett filter per request, med just den requestens databaskontext. Den som inte är medlem får 404, och en för låg roll ger 403.",
      },
      {
        title: "Migreringar som säkerhetsdokumentation",
        text: "EF Core-migreringar, med rå SQL för främmande nycklar mot Supabases auth-schema och för Row Level Security och återkallade rättigheter.",
      },
      {
        title: "Tester och CI",
        text: "Ungefär 30 integrationstester i xUnit körs mot PostgreSQL 17 via Testcontainers. GitHub Actions bygger och testar båda repona.",
      },
      {
        title: "Utvecklingsmiljö med ett kommando",
        text: "Docker Compose kör API:et med hot reload bredvid Vite-frontenden, som proxar /api — alltså ingen CORS-konfiguration, och hemligheter monteras skrivskyddat.",
      },
    ],
    visual: { kind: "diagram", id: "nodia-architecture" },
    diagrams: ["nodia-architecture", "nodia-request-flow"],
    architecture:
      "Två repon: en React/Vite-frontend och ett ASP.NET Core Web API. Webbläsaren loggar in med Supabase Auth och anropar API:et via en Vite-proxy med sin access token. API:et validerar token, kontrollerar medlemskapet i företaget och är den enda komponenten som pratar med PostgreSQL. Under utveckling körs båda tillsammans i Docker Compose.",
    cardTech: ["C#", "ASP.NET Core", "EF Core", "PostgreSQL", "React"],
    tech: [
      { label: "Backend", items: ["C#", "ASP.NET Core Web API (.NET 10)", "Entity Framework Core", "Swagger/OpenAPI"] },
      { label: "Frontend", items: ["React", "TypeScript", "Vite", "React Router", "Tailwind CSS"] },
      { label: "Data & autentisering", items: ["PostgreSQL (Supabase)", "Supabase Auth", "JWT"] },
      { label: "Testning & infrastruktur", items: ["xUnit", "Testcontainers", "Vitest", "Docker Compose", "GitHub Actions"] },
    ],
    plannedTech: ["Semantic Kernel", "Ollama"],
    decisions: [
      {
        title: "API:et är enda vägen till datan",
        problem:
          "Supabase exponerar som standard varje tabell via sitt eget Data API, vilket skulle låta en klient gå förbi API:ets auktorisering.",
        decision:
          "Migreringarna slår på Row Level Security utan några policies och återkallar tabellrättigheterna — även standardrättigheterna för framtida tabeller — från Supabases klientroller.",
        why: "Auktoriseringen finns på ett enda ställe, och tester kontrollerar att klientrollerna saknar åtkomst till samtliga tabeller.",
      },
      {
        title: "Identitet bara från den verifierade token",
        problem: "Ett användar-id som klienten skickar kan manipuleras.",
        decision:
          "Användar-id:t hämtas alltid från subject-claimet i den verifierade JWT:n. Id:n i URL, body eller headers används aldrig som identitet.",
        why: "Testerna skickar en annan användares id på exakt de ställena och kontrollerar att resultatet inte ändras.",
      },
      {
        title: "Inte avslöja vilka företag som finns",
        problem: "Att svara 403 för ett annat företags data bekräftar att företaget finns.",
        decision:
          "Den som inte är medlem får 404 — samma svar som för ett företag som inte finns. Medlemmar med för låg roll får 403.",
      },
      {
        title: "Säkerhetsregler som testerna upprätthåller",
        problem: "En ny endpoint skulle kunna läggas till utan medlemskapskontrollen.",
        decision:
          "Inloggning krävs som standard, och arkitekturtester fäller bygget om en route med {companyId} saknar medlemskapsfiltret, eller om något annat än health check tillåter anonym åtkomst.",
      },
      {
        title: "En riktig databas i testerna",
        problem:
          "En in-memory-databas kan inte testa constraints, främmande nycklar mot Supabases auth-schema eller Row Level Security.",
        decision:
          "Integrationstesterna körs mot PostgreSQL 17 i Docker via Testcontainers, med de riktiga migreringarna applicerade.",
      },
    ],
    progress: {
      built: [
        "API-grund: ASP.NET Core på .NET 10, EF Core-migreringar mot Supabase PostgreSQL, Swagger",
        "Autentisering: validering av JWT:er från Supabase och inloggning som standard; registrering, inloggning och skyddade routes i React-frontenden",
        "Multi-tenancy: företag och medlemskap (owner/member), en medlemskapskontroll på varje företagsroute och databasåtkomst som är låst till API:et",
        "Workspaces: onboarding för den första workspacen, en workspace-väljare och en aktiv workspace som sparas per användare",
        "Kvalitet: runt 30 integrationstester mot riktig PostgreSQL, CI i GitHub Actions för båda repona och en utvecklingsmiljö i Docker Compose",
      ],
      planned: [
        "Uppladdning, hantering och sökning av dokument",
        "Retrieval-Augmented Generation (RAG) för frågor som besvaras utifrån företagets dokument",
        "AI-integration med Semantic Kernel och lokala modeller via Ollama",
        "AI-agenter med tool calling och arbetsflöden i flera steg",
        "Human-in-the-loop: granskning och godkännande av åtgärder som AI:n föreslår",
        "Körloggar för AI-aktivitet",
      ],
    },
    links: [
      { label: "Frontend", url: "https://github.com/Lirijes/nodia", type: "github" },
      { label: "Backend", url: "https://github.com/Lirijes/NodiaApi", type: "github" },
    ],
  },
  {
    id: "minsommar",
    title: "MinSommar",
    year: "2026",
    role: "Ensam utvecklare",
    type: "Fullstack",
    status: "Live",
    featured: true,
    summary:
      "En webbapp där familjer planerar sommarens aktiviteter tillsammans — med flera föräldrar per familj, en vy för barnen utan inloggning och ett valfritt system med poäng och belöningar.",
    overview:
      "MinSommar är en fullstackapplikation som jag tog från idé till lanserad produkt. Föräldrar samlar aktiviteter, bucket lists och favoriter åt sina barn och kan slå på ett valfritt system med poäng och belöningar. Flera föräldrar kan hantera samma familj, och barnen använder appen via en familjelänk utan att behöva något konto. Jag byggde allt från början till slut: UX, frontend, datamodell, autentisering, auktorisering, serverlogik och driftsättning.",
    myRole: "Ensam utvecklare, från idé till driftsatt produkt.",
    keyPoints: [
      "Datamodell avgränsad per familj, där varje tabell skyddas av Row Level Security",
      "Två vägar in: föräldrar med Supabase-konton, barn via en signerad session från familjelänken",
      "Godkännanden av belöningar som kontrolleras i databasen och tål samtidiga anrop",
    ],
    story:
      "En sommarplanerare för familjer, tagen från idé till lanserad produkt. Bakom det lekfulla gränssnittet finns ett behörighetsproblem: flera föräldrar delar på en familj, barnen kommer in via en länk i stället för ett konto, och det är databasen — inte gränssnittet — som avgör vem som ser vad.",
    visualTone: "mint",
    implementation: [
      {
        title: "Serverkod stannar på servern",
        text: "Serverfunktionerna är tunna wrappers som validerar indata med zod och importerar den serverbundna modulen dynamiskt, så att service role-klienten och cookielogiken aldrig hamnar i webbläsarens bundle.",
      },
      {
        title: "En familj per request",
        text: "En förälders familj kommer från den verifierade token och förälderns medlemskap — en efterfrågad familj används först när den har kontrollerats. Ett barns familj kommer från den signerade cookien.",
      },
      {
        title: "Poäng räknas fram — de lagras inte",
        text: "Intjänade poäng summeras från genomförda aktiviteter; tillgängliga poäng drar av godkända belöningar, och väntande förfrågningar reserveras så att ett barn inte kan be om mer än det har.",
      },
      {
        title: "Strikt RLS i en egen migrering",
        text: "Prototypen började med öppna policies. En separat migrering ersatte dem med medlemskapsbaserade policies på varje familjetabell och återkallade anonym åtkomst.",
      },
      {
        title: "Inbjudningar som inte kan återanvändas",
        text: "Bara en SHA-256-hash av varje inbjudningstoken lagras. Inbjudningar går ut efter sju dagar, måste matcha den inloggade användarens e-post, och bara en kan vänta per adress och familj.",
      },
    ],
    visual: { kind: "image", src: "/minsommar.png", alt: "MinSommars barnvy med dagens mål och poäng" },
    images: ["/minsommar.png", "/minsommar-2.png", "/minsommar-3.png", "/minsommar-4.png", "/minsommar-5.png"],
    diagrams: ["minsommar-access", "minsommar-rewards"],
    architecture:
      "En TanStack Start-applikation på Vercel, med Supabase för autentisering och PostgreSQL. Föräldrar använder Supabase-klienten, där RLS-policies avgränsar varje fråga till deras egen familj, plus SECURITY DEFINER-funktioner för operationer som kräver extra kontroller. Barn har inget konto: en familjelänk sätter en signerad cookie, och deras anrop går via serverfunktioner som själva upprätthåller familjeavgränsningen.",
    cardTech: ["TypeScript", "React", "TanStack Start", "Supabase", "PostgreSQL"],
    tech: [
      { label: "Frontend", items: ["TypeScript", "React", "TanStack Start", "TanStack Router"] },
      { label: "Server", items: ["Serverfunktioner i TanStack Start", "PostgreSQL-funktioner (SECURITY DEFINER)"] },
      { label: "Data & autentisering", items: ["PostgreSQL (Supabase)", "Supabase Auth", "Row Level Security"] },
      { label: "Hosting", items: ["Vercel"] },
    ],
    decisions: [
      {
        title: "Behörighet i databasen",
        problem: "All data tillhör en familj, och flera föräldrar delar på den.",
        decision:
          "Varje familjetabell har en RLS-policy byggd på is_family_member(family_id) — en SECURITY DEFINER-hjälpfunktion som kontrollerar medlemskap utan att orsaka rekursion i RLS. Tabeller som completions avgränsas via barnets familj.",
        why: "Behörighetsreglerna gäller oavsett vilken fråga klienten skickar, och anonym åtkomst till familjetabellerna är helt återkallad.",
      },
      {
        title: "Barn utan konton",
        problem: "Barn ska kunna använda appen utan e-post och lösenord.",
        decision:
          "En förälder delar en familjelänk med en token som kan återkallas. Servern validerar den och sätter en signerad httpOnly-cookie (HMAC) som bara innehåller familjens id. Barnens anrop går via serverfunktioner som använder service role och kontrollerar familjeavgränsningen uttryckligen.",
        why: "Service role går förbi RLS, så varje serverfunktion upprätthåller avgränsningen själv och litar aldrig på id:n från anroparen.",
      },
      {
        title: "Godkännanden av belöningar vid samtidiga anrop",
        problem:
          "Med flera föräldrar skulle två kunna godkänna belöningar för samma barn samtidigt och spendera fler poäng än barnet har.",
        decision:
          "Godkännandet körs i en SECURITY DEFINER-funktion som låser förfrågans rad, tar ett advisory lock per barn och räknar om saldot innan något godkänns.",
        why: "Poängen lagras aldrig som ett saldo — de räknas fram från genomförda aktiviteter minus godkända belöningar — så det finns ingen räknare som kan hamna i otakt.",
      },
      {
        title: "Bara inbjudna kan gå med i en familj",
        problem: "Det får inte gå att bli medlem i en befintlig familj genom en insert från klienten.",
        decision:
          "Föräldrar går med via en inbjudan per e-post som accepteras i en SECURITY DEFINER-funktion. Den kontrollerar att inbjudan väntar på svar, inte har gått ut och är skickad till den inloggade användarens e-post. Bara en SHA-256-hash av inbjudningstoken lagras, och bara ägaren kan ta bort medlemmar.",
        why: "Ett dataläckage avslöjar inga användbara inbjudningar, och ingen förälder kan ta bort ägaren.",
      },
    ],
    links: [
      { label: "Besök sidan", url: "https://minsommar.se/", type: "demo" },
      { label: "GitHub", url: "https://github.com/Lirijes/minsommar", type: "github" },
    ],
  },
  {
    id: "inspecto",
    title: "Inspecto",
    year: "2026",
    role: "Ensam utvecklare",
    type: "Fullstack",
    status: "Demo",
    summary:
      "Dashboard för att hantera anläggningar, ärenden och inspektioner, byggd på Supabase — plus ett separat ASP.NET Core Web API mot samma databas.",
    overview:
      "En dashboardapplikation för att hantera anläggningar, ärenden och inspektioner, med autentisering och CRUD-funktionalitet. Frontenden arbetar direkt mot Supabase. Vid sidan av byggde jag ett separat Web API i C#/.NET mot samma PostgreSQL-schema, som ett steg mot att flytta affärslogik och validering till en backend som jag själv styr över. Nästa steg är att låta frontenden gå via API:et.",
    myRole: "Ensam utvecklare av både dashboarden och API:et.",
    highlights: [
      "Mappade ett befintligt Supabase-schema till EF Core med en baseline-migrering",
      "Controllers, separata DTO:er för create/update och ett servicelager",
      "JWT-autentisering och dokumentation med Swagger/OpenAPI",
    ],
    visual: { kind: "image", src: "/inspectoboard.png", alt: "Inspectos dashboard med översikt över ärenden och inspektioner" },
    images: ["/inspectoboard.png"],
    diagrams: ["inspecto-architecture"],
    architecture:
      "React-frontenden använder Supabase för autentisering och data. ASP.NET Core Web API:et använder Entity Framework Core mot samma PostgreSQL-databas, med controllers, request-DTO:er och ett servicelager, skyddat med JWT och dokumenterat med Swagger/OpenAPI.",
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
          "Modellerade de befintliga tabellerna i EF Core och skapade en baseline-migrering, i stället för att låta EF generera ett nytt schema.",
      },
      {
        title: "Var logiken hör hemma",
        problem:
          "Att prata direkt med Supabase från frontenden gick snabbt att bygga, men sprider ut validering och affärsregler i klienten.",
        decision:
          "Byggde ett separat Web API — controllers, separata DTO:er för create/update och ett servicelager — som platsen för de reglerna. Nästa steg är att flytta över frontenden dit.",
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
    context: "RevolutionRace",
    year: "2024",
    role: "Fullstackutvecklare (praktik)",
    type: "Web",
    status: "Internal",
    summary:
      "Internt verktyg där redaktörer modererar kundrecensioner — söker, filtrerar, publicerar och avpublicerar — ovanpå företagets GraphQL-API.",
    overview:
      "Utvecklat under min praktik på RevolutionRace som en intern administrationsapplikation för redaktörer och innehållsansvariga. Den samlar kundrecensionerna på ett ställe och låter dem styra vilka som syns, genom att söka, filtrera, publicera och avpublicera recensioner. Byggd i Nuxt mot företagets befintliga GraphQL-API.",
    myRole: "Byggde applikationen under min praktik, som en del av teamets sprintarbete.",
    highlights: [
      "Modereringsflöde för att publicera och avpublicera recensioner",
      "Sökning och filtrering via företagets GraphQL-API",
      "Byggt i teamets sprintar, parallellt med arbete på CMS och sitemap",
    ],
    visual: { kind: "image", src: "/adminreviews.png", alt: "Verktyget för recensionshantering med en lista över kundrecensioner" },
    images: ["/adminreviews.png"],
    cardTech: ["Nuxt", "Vue", "TypeScript", "GraphQL"],
    tech: [
      { label: "Frontend", items: ["Nuxt", "Vue", "TypeScript"] },
      { label: "API", items: ["GraphQL"] },
      { label: "Verktyg", items: ["Azure DevOps", "Git"] },
    ],
    decisions: [
      {
        title: "En plats för moderering",
        problem: "Redaktörer och innehållsansvariga behövde kunna styra vilka kundrecensioner som syns.",
        decision: "Byggde en intern administrationsapplikation där de kan hitta recensioner och publicera eller avpublicera dem.",
      },
      {
        title: "Sökning och filtrering i recensionsdata",
        problem: "Att hitta specifika recensioner i en stor mängd recensionsdata.",
        decision:
          "Implementerade sökning och filtrering ovanpå företagets befintliga GraphQL-API, inom ramen för det befintliga API:et och systemets struktur.",
      },
    ],
    links: [],
  },
  {
    id: "sitemap-generator",
    title: "Sitemap Generator",
    year: "2024",
    role: "Ensam utvecklare",
    type: "Backend",
    status: "Live",
    summary:
      "Verktyg i ASP.NET Core MVC som läser en webbsida och gör om den till en XML-sitemap eller ett XML-utdrag av sidans HTML-innehåll, paketerat med Docker.",
    overview:
      "Utifrån en URL hämtar verktyget sidan och skapar ett av två resultat: en sitemap enligt sitemaps.org-schemat, byggd från länkarna på sidan, eller ett XML-dokument som beskriver varje element i sidans body med dess text och attribut. Resultatet kan visas i webbläsaren eller laddas ner som en fil.",
    myRole: "Ensam utvecklare.",
    highlights: [
      "En kedja för hämtning och parsning med två XML-resultat",
      "Relativa länkar görs om till absoluta URL:er, med prioritet utifrån sökvägens djup",
      "Docker-bygge i flera steg på .NET 8",
    ],
    visual: { kind: "image", src: "/sitemapp.png", alt: "Sitemap Generators formulär för att ange en URL" },
    images: ["/sitemapp.png"],
    diagrams: ["sitemap-pipeline"],
    architecture:
      "En enda controller i ASP.NET Core MVC hanterar formuläret. Båda lägena delar samma steg för hämtning och parsning och skiljer sig bara åt i hur XML:en byggs.",
    cardTech: ["C#", "ASP.NET Core MVC", "HtmlAgilityPack", "Docker"],
    tech: [
      { label: "Backend", items: ["C#", "ASP.NET Core MVC (.NET 8)", "HtmlAgilityPack", "LINQ to XML"] },
      { label: "Infrastruktur", items: ["Docker (bygge i flera steg)", "Render"] },
    ],
    decisions: [
      {
        title: "En kedja, två resultat",
        problem: "Samma sida ska kunna användas både till en sitemap och till ett strukturerat innehållsutdrag.",
        decision:
          "Båda lägena delar hämtning (HttpClient) och parsning (HtmlAgilityPack); bara steget som bygger XML:en skiljer sig åt och väljs med ett alternativ i formuläret.",
      },
      {
        title: "En giltig sitemap",
        problem: "Länkar på en sida är ofta relativa, och resultatet måste följa sitemap-schemat.",
        decision:
          "Länkarna görs om till absoluta URL:er utifrån sidans URL och skrivs med LINQ to XML i sitemaps.org-namnrymden, med lastmod och en prioritet som sjunker med 0,1 per nivå i sökvägen, men aldrig under 0,5.",
      },
      {
        title: "Driftsättning i container",
        problem: "Appen ska köras likadant oavsett hur värdens .NET-miljö ser ut.",
        decision:
          "En Dockerfile i flera steg bygger med .NET 8 SDK-imagen och körs på den mindre runtime-imagen för ASP.NET.",
      },
    ],
    links: [
      { label: "Live-demo", url: "https://sitemapgenerator-cz9s.onrender.com/", type: "demo" },
      { label: "GitHub", url: "https://github.com/Lirijes/SitemapGenerator", type: "github" },
    ],
  },
];
