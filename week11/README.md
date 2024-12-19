# Week 9 - Introduction to OAuth2
Topics:
- Introduction to OAuth2
- Why OAuth2
- OAuth2 vs Traditional Username & Password

## Introduction to OAuth2
What is OAuth2?

1. OAuth2 Terminology:
- Client: The application requesting access.
- Resource Owner: The user granting access.
- Authorization Server: Issues tokens after authentication.
- Resource Server: Hosts the protected resources.

2. OAuth2 Grant Types:
- Authorization Code (most common for web applications).
- Implicit (used in legacy single-page applications).
- Client Credentials (machine-to-machine authentication).
- Password Grant (for trusted clients).

3. OAuth2 Flow:
- The client requests authorization.
- The user grants permission.
- The authorization server issues an access token.
- The client uses the access token to access protected resources.

OAuth2 adalah protokol otorisasi yang digunakan untuk memberikan akses aman ke sumber daya tanpa harus membagikan kredensial (seperti username dan password) langsung ke aplikasi pihak ketiga. Misalnya, saat login dengan akun Google di aplikasi lain, OAuth2 memungkinkan Google untuk memberikan akses terbatas kepada aplikasi tersebut tanpa mengungkapkan password pengguna.

## Why OAuth2
- Keamanan: Menghindari praktik buruk seperti berbagi password.
- Kontrol Akses: Pengguna dapat memberikan izin spesifik ke aplikasi pihak ketiga (misalnya, hanya akses ke profil, bukan semua data).
- Stateless Authentication: Token digunakan untuk menyimpan informasi, tidak perlu menyimpan sesi di server.
- Fleksibilitas: Mendukung berbagai jenis aplikasi (web, mobile, API).
- Single Sign-On (SSO): Login sekali untuk mengakses berbagai layanan.

OAuth2 lebih aman dibandingkan metode tradisional karena pengguna tidak perlu membagikan password mereka dengan aplikasi pihak ketiga. Dengan OAuth2, akses dapat dibatasi sesuai kebutuhan, misalnya hanya membaca data profil tanpa akses penuh ke akun. OAuth2 juga mendukung konsep Stateless Authentication, di mana informasi pengguna disimpan dalam token, sehingga server tidak perlu menyimpan sesi.

## OAuth2 vs Traditional Username & Password
1. Traditional Authentication:

- Login menggunakan username dan password.
- Menyimpan sesi di server.
- Risiko keamanan seperti pencurian password dan Session Hijacking.

2. OAuth2 Authentication:

- Menggunakan token sebagai pengganti sesi.
- Tidak perlu membagikan password dengan aplikasi pihak ketiga.
- Dukungan untuk izin akses yang terbatas.

3. Keunggulan OAuth2:

- Lebih Aman: Token bisa memiliki masa kadaluarsa dan hak akses terbatas.
- Skalabilitas: Cocok untuk aplikasi besar dan mikroservis.
- Kemudahan Integrasi: Mendukung login melalui penyedia pihak ketiga seperti Google atau GitHub.

Dalam metode tradisional, pengguna harus memberikan username dan password kepada setiap aplikasi yang ingin mereka akses. Ini berisiko jika aplikasi tersebut tidak aman atau mengalami kebocoran data. OAuth2 memberikan solusi dengan memungkinkan pengguna memberikan akses melalui token, tanpa harus berbagi password. Selain itu, OAuth2 mendukung kontrol izin yang lebih fleksibel dan cocok untuk aplikasi modern seperti API dan layanan mikro.