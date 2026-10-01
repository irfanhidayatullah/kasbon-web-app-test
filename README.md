# Nama Proyek

Aplikasi web yang dikembangkan sebagai bagian dari uji kompetensi teknis, berfokus pada pemenuhan kebutuhan _test case_ fungsional, alur pengguna yang sesuai, serta konsistensi UI.

## 🚀 (Live Demo)

[Lihat Demo](https://kasbon-web-app-test.vercel.app/)

## 🛠️ Panduan Memulai

### Prasyarat

- **Node.js** (disarankan versi 18 atau yang lebih baru). Unduh dan install melalui [nodejs.org](https://nodejs.org/) apabila belum ada.

### Pemasangan & Konfigurasi Lokal

1. **Clone repository**

   ```bash
   git clone {tautan_repositori}
   cd <nama-folder-proyek>
   ```

2. **Konfigurasi Variabel Lingkungan (_Environment Variables_)**
   - Salin file `.env.example` dan ubah namanya menjadi `.env`:

     ```bash
     cp .env.example .env

     ```

   - Ganti nilai (_placeholder_) `xxx` dengan kredensial konfigurasi Anda yang sebenarnya. **Jangan mengubah nama (_key_) yang ada.**

3. **Migrasi Basis Data (Supabase)**
   - **Opsi A (Melalui Supabase CLI):**
     Hubungkan proyek lokal Anda ke proyek Supabase, lalu unggah skema basis data:

     ```bash
     npx supabase link --project-ref <id-proyek-supabase-anda>
     npx supabase db push

     ```

   - **Opsi B (Melalui Dasbor Supabase):**
     Salin skrip migrasi SQL dari proyek (jika tersedia), lalu jalankan secara langsung pada menu **SQL Editor** di dasbor Supabase Anda.

4. **Memasang Dependensi & Menjalankan di Lokal**

   ```bash
   npm install
   npm run dev

   ```

   Buka alamat yang muncul (misalnya `http://localhost:3000`) pada browser Anda.

## 💡 Pendekatan Teknis

Pilihan pustaka dan arsitektur diselaraskan dengan spesifikasi _test case_ yang diberikan, dengan tetap memprioritaskan kemudahan pemeliharaan kode serta pengalaman pengguna:

- **Pengelolaan Formulir & Validasi Skema:** Mengintegrasikan **Formik** dengan **Yup** (beserta `yup-password`) untuk kontrol formulir yang terstruktur serta validasi kata sandi yang andal.

- **Pengelolaan Status & Pengambilan Data:** Memanfaatkan **TanStack Query (React Query)** untuk mengelola _server state_, (_caching_), serta penarikan data asinkron secara rapi.

- **Antarmuka & Pengalaman Pengguna:** Menggunakan komponen **shadcn/ui** untuk menjaga konsistensi desain dan aksesibilitas, dikombinasikan dengan **React Toastify** untuk memberikan notifikasi umpan balik yang jelas kepada pengguna.

## ⚖️ Kompromi Pengembangan & Rencana Penyempurnaan

Apabila diberikan alokasi waktu pengembang satu hari tambahan, beberapa peningkatan berikut akan diprioritaskan untuk mengoptimalkan aplikasi:

1. **Pengurutan & Penyaringan Lanjutan:** Menambahkan fitur untuk mengurutkan data berdasarkan tanggal atau jumlah nominal.

2. **Agregasi Data:** Mengelompokkan beberapa entri utang dari kontak yang sama agar tampilan ringkasan lebih rapi.

3. **Optimasi Kinerja:** Menerapkan fungsi _debounce_ pada pencarian nama untuk meminimalkan permintaan API yang tidak perlu.

4. **Peningkatan UX:** Menambahkan ikon penampil kata sandi (_show/hide password_) pada bidang masukan kredensial.

## ⏱️ Estimasi Waktu Pengerjaan

- **Total Waktu Pengembangan:** \~12 Jam
