# Bei cu Alex?

O pagină simplă cu întrebarea **Bei cu Alex?**, butoanele **Da** și **Nu** și textul **server de bautura** dedesubt. După vot apar procentele direct în butoane. Interfața funcționează pe telefon și desktop, cu tastatura și cu preferința de mișcare redusă.

## Voturi locale

Acesta este un **demo**: voturile sunt salvate în `localStorage`, separat în fiecare browser, fără server și fără cont. Nu sunt rezultate comune tuturor vizitatorilor. Fiecare apăsare pe un buton adaugă un vot pentru testarea procentelor. Procentele sunt rotunjite și însumează 100%.

Reîncărcarea paginii păstrează rezultatele. Dacă browserul blochează stocarea, votarea funcționează în memorie, iar voturile se pierd la reîncărcare. Starea este anunțată cititoarelor de ecran. Pentru a relua demo-ul de la zero, șterge datele site-ului din browser. Ștergerea afectează doar browserul respectiv.

## Dezvoltare locală

Nu există dependențe de instalat sau etapă de build. Cu Python 3:

```sh
cd /workspace/mock-up
python3 -m http.server 4173 --bind 0.0.0.0
```

Deschide pagina prin serverul HTTP în mediul tău local. Pentru verificare: votează „Da”, verifică 100% / 0%, adaugă un vot „Nu”, verifică 50% / 50%, apoi reîncarcă pagina. Rezultatele trebuie să rămână 50% / 50%. Fișierele folosesc căi relative, compatibile cu subdirectorul unui proiect GitHub Pages.

## Publicare pe GitHub Pages

1. Salvează fișierele în repository-ul `madfuchs/mock-up`, pe ramura `main`.
2. În GitHub, deschide **Settings → Pages → Build and deployment → Source** și selectează **GitHub Actions**. Repository-ul trebuie să aibă GitHub Pages disponibil în planul său.
3. Pornește publicarea manual din **Actions → Publish GitHub Pages → Run workflow**, alegând ramura `main`. Un push nu publică automat pagina.
4. După ce workflow-ul reușește, GitHub afișează adresa publicată în **Settings → Pages** și în deployment-ul `github-pages`.

Workflow-ul publică doar `index.html`, `styles.css`, `app.js`, `favicon.svg` și `.nojekyll`. Nu necesită chei API sau secrete suplimentare.
