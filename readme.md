# Email podpis - nasazeni do klientu

Tento projekt obsahuje HTML podpis vytvoreny v React Email (`emails/index.tsx`).
Nize je jednoduchy postup, jak podpis pripravit a vlozit do Apple Mail, Outlook a Gmail tak, aby se zobrazoval co nejkonzistentneji.

## 1) Priprava podpisu (jednou po kazde uprave)

1. Otevri terminal v `react-email`.
2. Nainstaluj zavislosti (pokud jeste nejsou):

```sh
npm install
```

3. Spust lokalni nahled a zkontroluj podpis:

```sh
npm run dev
```

4. Otevri `http://localhost:3000` a vizualne zkontroluj:
   - fonty (Rubik -> fallback Tahoma),
   - barvy odkazu,
   - logo,
   - mezery mezi radky.
5. Vygeneruj export:

```sh
npm run export
```

Po exportu pouzij vygenerovane HTML jako zdroj pro vlozeni podpisu do klientu.

---

## 2) Obecna pravidla (dulezite)

- Vzdy vkladej podpis jako **HTML**, ne jako prosty text.
- Obrazky pouzivej pouze s verejnou HTTPS URL (zadne lokalni soubory).
- Po vlozeni podpisu udelej test:
  - novy email,
  - odpoved/reply,
  - preposlani/forward,
  - light i dark mode (pokud klient umi).
- Nektere klienty prepisuji styly odkazu automaticky - proto je normalni, ze je nutne finalne overit realnym odeslanim.

---

## 3) Apple Mail (macOS)

### Varianta A: bezpecna (manualni vlozeni)

1. Otevri Apple Mail -> `Nastaveni` -> `Podpisy`.
2. Vyber ucet a vytvor novy podpis.
3. Vloz podpis (kopie z pripraveneho HTML nahledu v prohlizeci).
4. Zrus volbu, ktera automaticky meni formatovani (pokud je dostupna).
5. Odesli testovaci email na Gmail + Outlook schranku a zkontroluj vysledek.

### Varianta B: pres soubor podpisu (pokrocila)

Pouzij jen pokud potrebujes maximalni kontrolu nad HTML:

1. V Apple Mail vytvor docasny podpis.
2. Ukonci Apple Mail.
3. Otevri slozku podpisu v `~/Library/Mail/.../MailData/Signatures/`.
4. Najdi odpovidajici `.mailsignature` soubor.
5. Nahrazenim HTML casti vloz exportovany obsah podpisu.
6. Soubor uloz, pripadne nastav proti prepisu (locked), pokud ho Mail meni.
7. Spust Apple Mail a otestuj znovu.

Poznamka: Cesta se lisi podle verze macOS/Mail. Pokud Mail podpis prepisuje, pouzij znovu lock souboru.

---

## 4) Outlook

Outlook existuje ve vice variantach. Princip je stejny: otevrit nastaveni podpisu a vlozit HTML podobu podpisu.

### Outlook Web / New Outlook

1. `Settings` -> `Mail` -> `Compose and reply`.
2. V sekci podpisu vytvor novy podpis.
3. Vloz HTML podpis (idealne z renderu v prohlizeci).
4. Zapni automaticke pouziti pro nove zpravy i odpovedi (pokud chces).
5. Uloz a otestuj odeslanim na Gmail + Apple Mail.

### Outlook Classic (Windows desktop)

1. `File` -> `Options` -> `Mail` -> `Signatures`.
2. Vytvor novy podpis.
3. Vloz podpis do editoru.
4. Uloz a nastav jako vychozi pro dany ucet.
5. Odesli test a over:
   - podtrzeni odkazu je vypnute,
   - odkazy nejsou nechtene prebarvene,
   - logo ma spravnou velikost.

Poznamka: Outlook desktop ma nejprisnejsi rendering. Vzdy testuj i reply/forward.

---

## 5) Gmail (web)

1. Otevri Gmail -> `Settings` -> `See all settings`.
2. V sekci `Signature` vytvor novy podpis.
3. Vloz podpis (kopie z HTML nahledu).
4. V `Signature defaults` nastav podpis pro:
   - nove emaily,
   - odpovedi/forward.
5. Uloz (`Save Changes`).
6. Odesli test aspon do Apple Mail a Outlooku.

Poznamky pro Gmail:
- Gmail muze obcas upravit mezery/radkovani po dalsi editaci podpisu.
- Po kazde zmene je vhodne vlozit podpis znovu ciste.

---

## 6) Doporuceny test checklist (kratce)

- [ ] Novy email: vsechny barvy, font, logo OK
- [ ] Reply: podpis zustava stejny
- [ ] Forward: podpis zustava stejny
- [ ] Odkazy nejsou podtrzene
- [ ] Odkazy nemeni nechtene barvy
- [ ] Telefon/email se nepreformatuje divne v Apple klientech

Pokud se nekde styling rozbije, opravujeme primarne `emails/index.tsx` a znovu opakujeme export + vlozeni.
