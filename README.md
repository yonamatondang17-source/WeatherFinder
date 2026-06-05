# 🌤️ WeatherFinder

> Aplikasi cuaca modern berbasis React Native + Expo — cari kondisi cuaca kota manapun di dunia, real-time, cepat, dan elegan.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Open-Meteo](https://img.shields.io/badge/Open--Meteo_API-00897B?style=for-the-badge&logo=cloudflareworkers&logoColor=white)

---

## 📱 Tampilan

| Home | Loading | Hasil Cuaca |
|:----:|:-------:|:-----------:|
| ![home](scripts/Screenshot%202026-06-06%20013220.png) | ![loading](scripts/Screenshot%202026-06-06%20013233.png) | ![result](scripts/Screenshot%202026-06-06%20013243.png) |

---

## ✨ Fitur

- 🔍 **Pencarian real-time** — hasil muncul otomatis saat mengetik (debounce 500ms)
- 🌡️ **Data cuaca lengkap** — suhu, maks/min, kecepatan angin, arah angin, curah hujan
- 🌅 **Sunrise & Sunset** — waktu matahari terbit dan terbenam sesuai kota
- 🕓 **Riwayat pencarian** — simpan 5 kota terakhir yang pernah dicari
- 🌙 **Mode siang/malam** — tampilan & warna berubah otomatis sesuai waktu lokal kota
- 🔄 **Pull to refresh** — perbarui data cuaca dengan tarik layar ke bawah
- ⚡ **Abort controller** — request lama otomatis dibatalkan saat pencarian baru dimulai

---

## 🗂️ Struktur Proyek

```
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
```

---

## 🚀 Cara Menjalankan

### 1. Clone repo

```bash
git clone https://github.com/yonamatondang17-source/WeatherFinder.git
cd WeatherFinder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Expo dependencies

```bash
npx expo install expo-linear-gradient
```

### 4. Jalankan aplikasi

```bash
npx expo start
```

Scan QR code dengan aplikasi **Expo Go** di HP kamu, atau tekan:
- `a` → buka di Android Emulator
- `i` → buka di iOS Simulator

---

## 🌐 API yang Digunakan

| API | Kegunaan | Dokumentasi |
|-----|----------|-------------|
| [Open-Meteo Forecast](https://api.open-meteo.com) | Data cuaca real-time & harian | [docs](https://open-meteo.com/en/docs) |
| [Open-Meteo Geocoding](https://geocoding-api.open-meteo.com) | Konversi nama kota → koordinat | [docs](https://open-meteo.com/en/docs/geocoding-api) |

> Kedua API **gratis** dan **tanpa API key** — tidak perlu konfigurasi tambahan.

---

## 🛠️ Tech Stack

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| React Native | 0.76+ | Framework mobile |
| Expo | 52+ | Build & development toolchain |
| TypeScript | 5+ | Type safety |
| expo-linear-gradient | latest | Gradient background & card |

---

## 📦 Data Cuaca yang Ditampilkan

```
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
```

---

## 👤 Author

**Yona Matondang** — [@yonamatondang17-source](https://github.com/yonamatondang17-source)

---

*Made with ☕ and React Native*
