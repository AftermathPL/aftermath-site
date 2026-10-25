(function(){
  const POSTS = {
    en: [
      {date:"Oct 2026", cat:"AI · Operations", title:"Agentic AI in operations: start with the process, not the model",
       lead:"Most AI pilots stall for the same reason ERP projects did: nobody owns the process the tool is supposed to change.",
       body:["Before choosing a model or a vendor, map one end-to-end process, name its owner and agree on two metrics that should move. Then let an agent take over a single, well-bounded step.",
             "Companies that scale AI treat it as an operating-model change. Decision rights, exception handling and audit trails matter more than prompt quality."]},
      {date:"Sep 2026", cat:"Pricing · SaaS", title:"Usage-based pricing changes more than the price list",
       lead:"Moving from seats to usage shifts forecasting, sales compensation and customer success at the same time.",
       body:["Revenue becomes variable, so finance needs leading indicators of consumption, not just bookings. Sales plans have to reward expansion, not only new logos.",
             "Customer success becomes a revenue function. Plan the organizational changes before the new price list goes live."]},
      {date:"Sep 2026", cat:"Regulation · AI", title:"AI regulation is now a delivery requirement",
       lead:"For software companies selling into banking and the public sector, AI governance has moved from legal review into the definition of done.",
       body:["Treat model documentation, data lineage and human oversight as backlog items with owners, in the same way as security requirements.",
             "Teams that built compliance into delivery for GDPR and banking regulation already have most of the muscle they need."]}
    ],
    pl: [
      {date:"paź 2026", cat:"AI · Operacje", title:"Agentowe AI w operacjach: zacznij od procesu, nie od modelu",
       lead:"Większość pilotaży AI utyka z tego samego powodu co projekty ERP: nikt nie jest właścicielem procesu, który narzędzie ma zmienić.",
       body:["Zanim wybierzesz model lub dostawcę, opisz jeden proces end-to-end, wskaż jego właściciela i uzgodnij dwie metryki, które mają się zmienić. Dopiero wtedy oddaj agentowi jeden, dobrze ograniczony krok.",
             "Firmy, które skalują AI, traktują je jako zmianę modelu operacyjnego. Prawa decyzyjne, obsługa wyjątków i ścieżka audytu ważą więcej niż jakość promptów."]},
      {date:"wrz 2026", cat:"Cennik · SaaS", title:"Cennik usage-based zmienia więcej niż cennik",
       lead:"Przejście z licencji per użytkownik na rozliczanie za użycie zmienia jednocześnie prognozowanie, wynagradzanie sprzedaży i customer success.",
       body:["Przychód staje się zmienny, więc finanse potrzebują wskaźników wyprzedzających zużycia, a nie tylko bookingów. Plany sprzedażowe muszą nagradzać rozwój klientów, nie tylko nowe logotypy.",
             "Customer success staje się funkcją przychodową. Zaplanuj zmiany organizacyjne, zanim nowy cennik wejdzie w życie."]},
      {date:"wrz 2026", cat:"Regulacje · AI", title:"Regulacje AI to dziś wymaganie delivery",
       lead:"Dla firm software'owych sprzedających do bankowości i sektora publicznego ład AI przeszedł z działu prawnego do definicji ukończenia zadania.",
       body:["Dokumentację modeli, pochodzenie danych i nadzór człowieka traktuj jak elementy backlogu z właścicielami, tak samo jak wymagania bezpieczeństwa.",
             "Zespoły, które wbudowały zgodność z RODO i regulacjami bankowymi w delivery, mają już większość potrzebnych kompetencji."]}
    ]
  };

  const PL = {
    "nav.services":"Usługi","nav.approach":"Podejście","nav.record":"Doświadczenie","nav.leader":"Lider","nav.news":"News","nav.cta":"Porozmawiajmy",
    "hero.eyebrow":"Doradztwo w przywództwie technologicznym · od 2014",
    "hero.h1":"Strategia to plan.<b><em>Aftermath</em> to rezultat.</b>",
    "hero.lede":"AFTERMATH buduje, skaluje i rozwija firmy technologiczne. Wchodzimy tam, gdzie strategia zamienia się w realizację: model operacyjny, odpowiedzialność, delivery i liczby, które z tego wynikają.",
    "hero.cta1":"Umów rozmowę →","hero.cta2":"Zobacz, co robimy",
    "ledger.title":"Bilans zmian","ledger.cols":"przed → po","ledger.r1":"Roczny przychód","ledger.r2":"Zespół inżynierski","ledger.r3":"Europejski oddział zbudowany od zera","ledger.s3":"InfoGlobalTech · pozycja rynkowa w 12 miesięcy","ledger.r4":"Nowe rynki eksportowe","ledger.s4":"Produkty rozwijane i eksportowane","ledger.foot":"Wyniki osiągnięte przez założyciela AFTERMATH w rolach zarządczych.",
    "stat.1":"lat doświadczenia na stanowiskach zarządczych","stat.2":"osób w jednej zarządzanej organizacji","stat.3":"odpowiedzialności za P&amp;L","stat.4":"projektów strategicznych dla ponad 50 globalnych firm",
    "svc.eyebrow":"Co robimy","svc.h2":"Sześć sposobów, by <b>pchnąć firmę do przodu</b>","svc.lede":"Od dwutygodniowej diagnozy po miejsce przy stole zarządu. Każde zlecenie kończy się mierzalną zmianą, a nie prezentacją.",
    "svc.1.tag":"Flagowa usługa","svc.1.h":"Management as a Service","svc.1.p":"Tymczasowy lub częściowy COO, CEO i wsparcie na poziomie zarządu dla firm w transformacji, wzroście lub restrukturyzacji.","svc.1.l":"<li>Model operacyjny i projekt organizacji</li><li>Systemy KPI i raportowanie zarządcze</li><li>Ład portfelowy i budżetowy</li>",
    "svc.2.tag":"Doradztwo IT","svc.2.h":"Alians biznes–IT","svc.2.p":"Dopasowanie technologii do celów biznesowych: architektura, chmura i AI, decyzje build vs buy.","svc.2.l":"<li>Strategia i roadmapy technologiczne</li><li>Wdrażanie AI/ML, chmury, RPA</li><li>Środowiska regulowane (bankowość, RODO, NIS)</li>",
    "svc.3.tag":"Delivery","svc.3.h":"Zarządzanie produktem i projektami","svc.3.p":"Przewidywalne dostarczanie w zespołach produktowych, inżynierskich i klienckich, od budowy PMO po ratowanie zatrzymanego programu.","svc.3.l":"<li>PMO i frameworki delivery</li><li>Strategia produktu i cennik</li><li>Ratowanie programów</li>",
    "svc.4.tag":"Komercja","svc.4.h":"Negocjacje i zarządzanie dostawcami","svc.4.p":"Negocjacje IT i kontraktowe, wybór dostawców i ład vendorowy, który chroni budżet i zakres.","svc.4.l":"<li>Negocjacje kontraktów IT</li><li>Wybór i audyt dostawców</li><li>Ład w outsourcingu</li>",
    "svc.5.tag":"Wzrost","svc.5.h":"Doradztwo PR i marketingowe","svc.5.p":"Pozycjonowanie i go-to-market produktów technologicznych wchodzących w nowe segmenty lub regiony.","svc.5.l":"<li>Strategia wejścia na rynek</li><li>Spójność sprzedaży i pre-sales</li><li>Pozycjonowanie marki w B2B tech</li>",
    "svc.6.tag":"Ludzie","svc.6.h":"Szkolenia przywódcze","svc.6.p":"Programy dla menedżerów i kadry zarządzającej prowadzone osobiście przez Adama Bugaja, oparte na dwudziestu latach kierowania zespołami.","svc.6.l":"<li>Przywództwo i odpowiedzialność</li><li>Zarządzanie w zmianie</li><li>Coaching i mentoring</li>",
    "app.eyebrow":"Jak wygląda współpraca","app.h2":"Od diagnozy <b>do mierzalnego rezultatu</b>",
    "app.1.h":"Diagnoza","app.1.p":"Rozmowy, dane i rzetelne spojrzenie na to, jak dziś zapadają decyzje. Dostajesz jasny obraz miejsc, w których ucieka wartość.",
    "app.2.h":"Projekt","app.2.p":"Model operacyjny, odpowiedzialności i KPI uzgodnione z zarządem. Jeden plan z właścicielami i terminami.",
    "app.3.h":"Realizacja","app.3.p":"Pracujemy wewnątrz organizacji, obok Twoich liderów, aż nowy sposób działania utrzyma się bez nas.",
    "app.4.h":"Pomiar efektu","app.4.p":"Porównanie przed i po na metrykach uzgodnionych w kroku drugim. Tak oceniamy własną pracę.",
    "rec.eyebrow":"Doświadczenie","rec.h2":"Zbudowane w bankowości. <b>Sprawdzone w wielu branżach.</b>","rec.lede":"Doświadczenie AFTERMATH pochodzi z budowania organizacji FinTech, bankowych i enterprise software na czterech kontynentach.",
    "rec.1":"Podwojenie rocznego przychodu z 25 do 50 mln USD w roli co-CEO i COO","rec.2":"Specjalistów IT zrekrutowanych, rozwijanych i utrzymanych w jednej organizacji","rec.3":"Nowy europejski oddział zbudowany od zera i osadzony na rynku","rec.4":"Banków, dla których realizowano programy bankowości internetowej, mobilnej i wideo w Europie, Zatoce Perskiej, APAC i obu Amerykach","rec.5":"Osób koordynowanych zdalnie w Europie, Indiach i USA","rec.6":"Poprowadzony program certyfikacji; współtworzenie ram regulacyjnych z polskimi instytucjami państwowymi",
    "rec.cl.h":"Programy zrealizowane dla","rec.cl.p":"Zrealizowane przez założyciela AFTERMATH w rolach zarządczych w Comarch, Software Mind, Ailleron i InfoGlobalTech.","rec.more":"+20 kolejnych",
    "reg.1.b":"Europa i CEE","reg.1.s":"Polska, Niemcy, Grecja, Ukraina, Skandynawia","reg.2.b":"Zatoka Perska i Bliski Wschód","reg.2.s":"ZEA (Dubaj) i wdrożenia regionalne","reg.3.s":"Singapur, Tajlandia, Indonezja, Sri Lanka","reg.4.b":"Ameryki","reg.4.s":"USA, Meksyk, Karaiby",
    "lead.role":"Założyciel · prowadzi każdy projekt","lead.eyebrow":"Przywództwo","lead.h2":"Prowadzone przez praktyka, <b>nie obserwatora</b>",
    "lead.p1":"AFTERMATH prowadzi Adam Bugaj, menedżer, który kierował organizacjami technologicznymi, a nie tylko doradzał im z zewnątrz. Jego droga prowadzi od Program Management i Delivery, przez Engineering, Product i Business Development, do roli Managing Directora, COO, co-CEO i członka zarządu.",
    "lead.p2":"To doświadczenie wyznacza sposób pracy AFTERMATH: praktycznie, z odpowiedzialnością za wynik i z myślą o tym, by technologia była bardziej ludzka.",
    "tl.1":"Członek Zarządu i COO · automatyzacja procesów biznesowych","tl.2":"Członek Zarządu i COO, strefa europejska","tl.3":"Członek Zarządu · co-CEO · COO · EVP · Managing Director, FinTech","tl.4":"Head of Delivery i Engineering, FinTech (USA)","tl.5":"Head of Delivery · Program Manager · PMO",
    "pr.eyebrow":"Jak pracujemy","pr.h2":"Trzy zasady, <b>których się trzymamy</b>",
    "pr.1.h":"Przekraczamy oczekiwania dzięki współpracy.","pr.1.p":"Każde małe działanie powinno poprawiać świat klienta. Nawet dobrze napisana wiadomość może zmienić przebieg projektu.",
    "pr.2.h":"Budujemy współpracę na zaufaniu.","pr.2.p":"Najpierw słuchamy, potem przekładamy potrzeby na praktyczne rozwiązania i bierzemy pełną odpowiedzialność za to, co nam powierzono.",
    "pr.3.h":"Pracujemy z szacunkiem dla każdego.","pr.3.p":"Jasna komunikacja, profesjonalna realizacja i pamięć o tym, że ciężka praca wymaga dobrego odpoczynku.",
    "news.eyebrow":"News · AI i technologia","news.h2":"Notatki <b>z praktyki zarządczej</b>","news.all":"Wszystkie artykuły →",
    "ct.eyebrow":"Kontakt","ct.h2":"Zainteresowany?<b>Porozmawiajmy.</b>","ct.lede":"Opowiedz, gdzie jest dziś Twoja organizacja i gdzie powinna być. Pierwsza rozmowa dotyczy Twojej sytuacji, nie naszej oferty.","ct.mail":"E-mail","ct.phone":"Telefon","ct.copy":"Kopiuj","ct.qr":"Zeskanuj lub kliknij, aby połączyć się z Adamem na LinkedIn",
    "nv.back":"← Powrót","nv.lede":"Krótkie, praktyczne notatki o AI i technologii z perspektywy ludzi, którzy prowadzą firmy.","nv.note":"Przykładowe wpisy: przed publikacją zastąp je właściwymi artykułami.",
    "nav.contact":"Kontakt",
    "nav.menu":"Menu",
    "nav.home":"Start",
    "ex.eyebrow":"Poznaj AFTERMATH",
    "ex.h2":"Wszystko, co robimy, <b>w pięciu krokach</b>",
    "ex.1.h":"Usługi",
    "ex.1.p":"Sześć sposobów, by pchnąć firmę do przodu: od Management as a Service po szkolenia przywódcze.",
    "ex.2.h":"Podejście",
    "ex.2.p":"Diagnoza, projekt, realizacja i pomiar efektu. Jak wygląda współpraca krok po kroku.",
    "ex.3.h":"Doświadczenie",
    "ex.3.p":"Wyniki, banki i firmy, dla których pracowaliśmy na czterech kontynentach.",
    "ex.4.h":"Lider",
    "ex.4.p":"Adam Bugaj i zasady, którymi kieruje się AFTERMATH.",
    "ex.5.h":"News",
    "ex.5.p":"Krótkie notatki o AI i technologii z perspektywy ludzi, którzy prowadzą firmy.",
    "ex.6.h":"Porozmawiajmy",
    "ex.6.p":"Pierwsza rozmowa dotyczy Twojej sytuacji, nie naszej oferty.",
    "ex.go":"Zobacz →",
    "ex.go2":"Umów rozmowę →",
    "next.l":"Dalej",
    "ph.404.h":"Ta strona <b>nie istnieje</b>",
    "ph.404.p":"Adres mógł się zmienić. Zacznij od strony głównej albo wybierz sekcję u góry.",
    "crumb.home":"Start",
    "ph.services":"Co robimy",
    "ph.approach":"Jak wygląda współpraca",
    "ph.record":"Doświadczenie",
    "ph.leadership":"Przywództwo",
    "ph.news":"News · AI i technologia",
    "ph.contact":"Kontakt",
    "ph.contact.h":"Zacznijmy <b>rozmowę</b>",
    "ft.tag":"Budujemy, skalujemy i rozwijamy firmy technologiczne od 2014"
  };
  const UI = {en:{read:"Read →",sample:"Sample",copied:"Copied",copyFail:"Select the text and copy it manually"},
              pl:{read:"Czytaj →",sample:"Przykład",copied:"Skopiowano",copyFail:"Zaznacz tekst i skopiuj ręcznie"}};

  const EN = {};
  document.querySelectorAll("[data-i18n]").forEach(el=>{ if(!(el.dataset.i18n in EN)) EN[el.dataset.i18n]=el.innerHTML; });
  let lang = "en";
  try{ const s=localStorage.getItem("am-lang"); if(s==="pl"||s==="en") lang=s; }catch(e){}

  function esc(s){return s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
  function renderNews(){
    const p=POSTS[lang], u=UI[lang];
    const c=document.getElementById("news-cards"), l=document.getElementById("news-list");
    if(c) c.innerHTML = p.map((x,i)=>`
      <a class="post" href="${BASE}news/#post-${i}">
        <span class="meta"><span class="badge">${u.sample}</span>${esc(x.date)} · ${esc(x.cat)}</span>
        <h3>${esc(x.title)}</h3><p>${esc(x.lead)}</p><span class="more">${u.read}</span>
      </a>`).join("");
    if(l) l.innerHTML = p.map((x,i)=>`
      <article class="article" id="post-${i}">
        <aside><span class="badge" style="justify-self:start">${u.sample}</span><span>${esc(x.date)}</span><span>${esc(x.cat)}</span></aside>
        <div class="body"><h2>${esc(x.title)}</h2><p>${esc(x.lead)}</p>${x.body.map(b=>`<p>${esc(b)}</p>`).join("")}</div>
      </article>`).join("");
  }
  function apply(l){
    lang=l; document.documentElement.lang=l;
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const k=el.dataset.i18n; const v = l==="pl" ? (PL[k] ?? EN[k]) : EN[k];
      if(v!==undefined) el.innerHTML=v;
    });
    document.querySelectorAll(".lang button").forEach(b=>b.setAttribute("aria-pressed", String(b.dataset.lang===l)));
    renderNews();
    try{ localStorage.setItem("am-lang",l); }catch(e){}
  }
  document.querySelectorAll(".lang button").forEach(b=>b.addEventListener("click",()=>apply(b.dataset.lang)));

  const BASE=document.body.dataset.base||"";
  const mb=document.querySelector(".menu-btn"), ln=document.querySelector(".links");
  if(mb) mb.addEventListener("click",()=>{const o=ln.classList.toggle("open");mb.setAttribute("aria-expanded",String(o));});

  const toast=document.getElementById("toast"); let tt;
  function say(m){toast.textContent=m;toast.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove("show"),1800)}
  document.addEventListener("click",e=>{
    const b=e.target.closest("[data-copy]"); if(!b) return;
    const el=document.getElementById(b.dataset.copy); const txt=el.textContent.trim();
    const fallback=()=>{const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);say(UI[lang].copyFail)};
    try{ navigator.clipboard.writeText(txt).then(()=>say(UI[lang].copied),fallback); }catch(err){ fallback(); }
  });

  document.getElementById("yr").textContent=new Date().getFullYear();
  apply(lang);
  if(location.hash){const t=document.getElementById(location.hash.slice(1)); if(t) requestAnimationFrame(()=>t.scrollIntoView());}
})();