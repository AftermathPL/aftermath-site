# aftermath.pl

Strona AFTERMATH. Wszystko, co jest w folderze `public/`, trafia na serwer.

## Jak to działa
1. Zmieniasz pliki w `public/` (lub robi to Claude).
2. W GitHub Desktop: wpisz opis zmiany → **Commit to main** → **Push origin**.
3. GitHub Actions (zakładka **Actions**) wysyła zmienione pliki na serwer cyber_Folks.
4. Po około minucie zmiana jest widoczna na https://aftermath.pl

## Sekrety (Settings → Secrets and variables → Actions)
- `FTP_SERVER` = s78.cyber-folks.pl
- `FTP_USERNAME` = nazwa konta FTP z panelu (np. deploy@aftermath.pl)
- `FTP_PASSWORD` = hasło konta FTP
