<div align="center">
🌤️ WeatherFinder
Aplikasi cuaca modern berbasis React Native + Expo
Cari kondisi cuaca kota manapun di dunia — real-time, cepat, dan elegan.
<br/>
Tampilkan Gambar
Tampilkan Gambar
Tampilkan Gambar
Tampilkan Gambar
</div>

✨ Fitur

🔍 Pencarian real-time — hasil muncul otomatis saat mengetik (debounce 500ms)
🌡️ Data cuaca lengkap — suhu, maks/min, kecepatan angin, arah angin, curah hujan
🌅 Sunrise & Sunset — waktu matahari terbit dan terbenam sesuai kota
🕓 Riwayat pencarian — simpan 5 kota terakhir yang pernah dicari
🌙 Mode siang/malam — tampilan & warna berubah otomatis sesuai waktu lokal kota
🔄 Pull to refresh — perbarui data cuaca dengan tarik layar ke bawah
⚡ Abort controller — request lama otomatis dibatalkan saat pencarian baru dimulai


📱 Tampilan
<div align="center">
<img src="scripts/Screenshot 2026-06-06 013220.png" width="30%" />
<img src="scripts/Screenshot 2026-06-06 013233.png" width="30%" />
<img src="scripts/Screenshot 2026-06-06 013243.png" width="30%" />
</div>

Tema gelap deep navy dengan accent biru (siang) dan ungu (malam).


🗂️ Struktur Proyek
WeatherFinder/
├── app/
│   └── (tabs)/
│       └── index.tsx          # HomeScreen utama
├── components/
│   ├── WeatherCard.tsx         # Card cuaca utama
│   ├── SearchBar.tsx           # Input pencarian
│   ├── SearchHistory.tsx       # Riwayat kota
│   └── LoadingSpinner.tsx      # Indikator loading
├── constants/
│   └── utils/
│       └── weatherHelper.ts   # Fungsi fetch & helper cuaca
└── README.md

🚀 Cara Menjalankan
1. Clone repo
bashgit clone https://github.com/yonamatondang17-source/WeatherFinder.git
cd WeatherFinder
2. Install dependencies
bashnpm install
3. Install Expo dependencies
bashnpx expo install expo-linear-gradient
4. Jalankan aplikasi
bashnpx expo start
Scan QR code dengan aplikasi Expo Go di HP kamu, atau tekan:

a → buka di Android Emulator
i → buka di iOS Simulator


🌐 API yang Digunakan
APIKegunaanDokumentasiOpen-Meteo ForecastData cuaca real-time & hariandocsOpen-Meteo GeocodingKonversi nama kota → koordinatdocs

Kedua API gratis dan tanpa API key — tidak perlu konfigurasi tambahan.


🛠️ Tech Stack
TeknologiVersiKeteranganReact Native0.76+Framework mobileExpo52+Build & development toolchainTypeScript5+Type safetyexpo-linear-gradientlatestGradient background & card

📦 Data Cuaca yang Ditampilkan
current_weather:
  ├── temperature      → Suhu saat ini (°C)
  ├── weathercode      → Kode kondisi cuaca (WMO)
  ├── windspeed        → Kecepatan angin (km/j)
  ├── winddirection    → Arah angin (derajat)
  └── is_day           → Siang (1) atau malam (0)

daily[0]:
  ├── temperature_2m_max   → Suhu maksimum hari ini
  ├── temperature_2m_min   → Suhu minimum hari ini
  ├── precipitation_sum    → Total curah hujan (mm)
  ├── sunrise              → Waktu matahari terbit
  └── sunset               → Waktu matahari terbenam

👤 Author
Yona Matondang
@yonamatondang17-source

<div align="center">
Made with ☕ and React Native
</div>
