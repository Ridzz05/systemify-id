# Project Roadmap & Checkpoints

File ini berfungsi sebagai panduan dan log perubahan agar semua agent AI (termasuk subagent) yang bekerja dalam proyek ini dapat memahami arsitektur, alur sistem, dan sejarah perubahan tanpa merasa kebingungan.

## 🏗️ Arsitektur Proyek Saat Ini
Proyek ini adalah aplikasi **Monolith Modern**.
- **Backend:** Laravel (PHP 8.3+), menggunakan SQLite sebagai database bawaan.
- **Frontend:** React 19 dengan Vite 8.
- **Penghubung (Bridge):** Inertia.js (menyambungkan routing Laravel langsung ke page React tanpa API terpisah).
- **Styling & UI:** Tailwind CSS v4, dipadukan dengan **shadcn/ui** (menggunakan style `new-york` dan icon `lucide-react`).
- **Lokasi Kode Penting:**
  - `routes/web.php` -> Mengatur endpoint dan render page frontend.
  - `resources/js/Pages/` -> Berisi halaman-halaman utama (View) React.
  - `resources/js/components/` -> Berisi komponen UI yang reusable (termasuk dari shadcn).
  - `app/Http/Controllers/` -> Logika bisnis backend.

## 📅 Rencana Pengerjaan Berikutnya (To-Do List)
*   **Halaman Admin & System Dashboard:**
    *   Mendesain ulang halaman pasca-login (`Dashboard.jsx`) untuk diubah menjadi sistem Dashboard Admin terpadu.
    *   Menyesuaikan tema visual dashboard dengan gaya gelap premium (`brand-dark`, `brand-lime` accent, `brand-glow`) agar senada dengan halaman landing Welcome.
    *   Memastikan navigasi dashboard dan layout otentikasi (`Login.jsx`, `Register.jsx`) mematuhi standar kegelapan, tipografi, dan interaksi kursor kustom global.

## 📝 Aturan Update Checkpoint
Setiap agen yang menyelesaikan tugas terstruktur (membuat fitur baru, mengubah alur sistem, menambah dependensi, dll) **WAJIB** menambahkan log ke bagian bawah file ini.

---

## 🚀 Changelog & Checkpoints

### [01 Juli 2026] - Refaktorisasi Layout, Scroll Snapping, & Kursor Kustom (Hasil Audit Subagent)
- **Apa yang dilakukan:**
  1. **Struktur Kontainer:** Memisahkan pembungkus grid internal Hero Section dari tag `<section>` luar di `Welcome.jsx` untuk menyelaraskan lebar border divider horizontal penuh dengan section lainnya.
  2. **Audit Scroll Snapping:** Membatasi efek native CSS scroll snapping (`scroll-snap-type: y mandatory`) hanya pada lebar viewport desktop (`min-width: 1024px`) di `app.css`. Hal ini menyelesaikan masalah keterbacaan kritis pada mobile di mana konten tinggi yang melebihi 100vh memotong form masukan dan tumpukan kartu.
  3. **Keamanan Kursor Kustom:** Membatasi penyembunyian kursor asli (`cursor: none`) hanya saat class `.has-custom-cursor` ditambahkan secara dinamis ke elemen `<html>` via JavaScript di `AppLayout.jsx`, mencegah hilangnya kursor jika JS gagal dimuat.
  4. **Pembaruan Efek Hover & Klasifikasi Badges:** Menambahkan class `group` pada `InstagramCard` dan kartu About serta mengaktifkan transisi opacity pendaran glow dinamis saat hover. Membersihkan deklarasi ganda `bg-white` pada badging generator.
  5. **Sinkronisasi Shuffling:** Mengurangi durasi transisi visual shuffle card di `app.css` menjadi `0.3s` agar selaras sempurna dengan timeout event handler React 300ms, menghilangkan jank/snap patah-patah di tengah jalan.
  6. **Penyelarasan Tipografi & Aksen Tombol:** Memperbaiki kesalahan syntax `overflow-hidden` di `app.css`, menyelaraskan font-weight H2, H3, dan eyebrows, serta menstandarkan skala hover tombol Navigasi menjadi `hover:scale-[1.03] active:scale-[0.97]` sesuai `DESIGN.md`.
- **File yang terdampak:** `resources/css/app.css`, `resources/js/Layouts/AppLayout.jsx`, `resources/js/Pages/Welcome.jsx`

### [30 Juni 2026] - Integrasi Database Riil Formulir Contact Brief & Admin Cockpit
- **Apa yang dilakukan:**
  1. Membuat berkas migrasi database dan model `Brief` untuk menyimpan input formulir kontak secara persisten di SQLite.
  2. Mengimplementasikan `BriefController` untuk memproses penyimpanan brief baru dari pengunjung, secara cerdas mengekstrak keyword tumpukan teknologi (*tech stack*) dari isi pesan brief, dan menghasilkan budget/company metadata yang realistis.
  3. Menghubungkan formulir kontak landing page di `Welcome.jsx` dengan hook `useForm` dari Inertia.js untuk mengirimkan brief baru secara asinkron ke `/briefs` lengkap dengan status pemrosesan/loading.
  4. Memperbarui `routes/web.php` untuk memuat data brief secara dinamis, mengkueri ukuran berkas SQLite asli di backend, dan jumlah admin terdaftar, lalu meneruskannya sebagai Inertia props ke `Dashboard.jsx`.
  5. Melengkapi `Dashboard.jsx` dengan antarmuka manajemen brief yang interaktif: tombol untuk memperbarui status brief (*Approve* / *Discuss*) secara instan dan tombol hapus dengan konfirmasi aman.
  6. Memperbarui seeder database di `DatabaseSeeder.php` dengan contoh data brief awal yang realistis, dan menjalankan `php artisan migrate:fresh --seed`.
- **File yang terdampak:** `database/migrations/2026_07_01_030636_create_briefs_table.php`, `app/Models/Brief.php`, `app/Http/Controllers/BriefController.php`, `database/seeders/DatabaseSeeder.php`, `routes/web.php`, `resources/js/Pages/Welcome.jsx`, `resources/js/Pages/Dashboard.jsx`

### [30 Juni 2026] - Refaktorisasi Anti-Slop Dashboard & Minimalis Sidebar Footer (Sesuai Konstitusi DESIGN.md)
- **Apa yang dilakukan:**
  1. Menghapus elemen bermulut besar/fiktif (*AI Slop*) pada dashboard seperti port dev-server Vite dan indikator running palsu.
  2. Merancang ulang **Dashboard.jsx** menjadi *Agency Cockpit* yang otentik dan fungsional:
     *   **Inbound Client Briefs:** Menampilkan daftar pengajuan briefs kustom yang masuk dari prospek klien nyata (nama, perusahaan, anggaran/budget spesifik, deskripsi kebutuhan teknis, tumpukan tech stack kustom, dan status peninjauan).
     *   **Database & Engine Specs:** Audit ukuran berkas SQLite (`database.sqlite`), jumlah administrator terdaftar, serta spesifikasi detail runtime PHP 8.3 & Laravel 13.
     *   **Security Audit Trail:** Log aktivitas keamanan internal yang bersih dan informatif.
  3. Merombak bagian footer sidebar pada **AdminLayout.jsx** dengan membuang visual avatar fiktif dengan ikon perisai (`Shield`) dan label statis `System Admin`. Menggantinya dengan baris tunggal profil horizontal minimalis yang menampilkan nama dan email pengguna dinamis secara presisi, serta tombol logout berskala kecil yang terintegrasi (seperti bilah workspace Vercel).
  4. Menghapus sub-elemen fiktif *System: Operational // Live Build v1.0.3* dari bilah navigasi atas (topbar) untuk menyederhanakan *visual balance* area header.
  5. Mematuhi aturan *anti-slop* visual: Menghilangkan semua efek transisi berdenyut (*pulse*) dekoratif murni dan gradien template generik.
- **File yang terdampak:** `resources/js/Pages/Dashboard.jsx`, `resources/js/Layouts/AdminLayout.jsx`

### [30 Juni 2026] - Perbaikan Eror Ekspor Ikon Search Phosphor
- **Apa yang dilakukan:**
  *   Menghilangkan import `Search` yang tidak terpakai dari `@phosphor-icons/react` pada `AdminLayout.jsx` karena dalam library Phosphor, ikon pencarian sebenarnya bernama `MagnifyingGlass`, yang memicu error saat rendering runtime.
- **File yang terdampak:** `resources/js/Layouts/AdminLayout.jsx`

### [30 Juni 2026] - Kerangka AdminLayout Sidebar & Setup Akun Seeder
- **Apa yang dilakukan:**
  1. Membuat komponen layout khusus admin baru (**AdminLayout.jsx**) yang menggunakan navigasi bilah sisi (*sidebar*) berestetika gelap premium (collapsible di mobile, dilengkapi logo code bracket, panel kontrol navigasi, badge live status, dan kartu info profil admin di bagian bawah).
  2. Menghubungkan halaman **Dashboard.jsx** utama agar dibungkus dengan `AdminLayout` baru ini, menyinkronkan status tab aktif serta header konsol root.
  3. Memperbarui berkas **DatabaseSeeder.php** agar otomatis menyuntikkan (*seeding*) akun administrator berhak akses penuh:
     *   **Email:** `admin@systemify.id`
     *   **Password:** `password`
  4. Menjalankan *fresh migration* dan *seeding* database (`php artisan migrate:fresh --seed`) untuk mereset dan mengisi database SQLite lokal secara bersih.
- **File yang terdampak:** `database/seeders/DatabaseSeeder.php`, `resources/js/Layouts/AdminLayout.jsx`, `resources/js/Pages/Dashboard.jsx`

### [30 Juni 2026] - Redesain Dashboard Admin & Halaman Autentikasi Premium
- **Apa yang dilakukan:**
  1. Merombak total **AuthenticatedLayout.jsx** dengan menambahkan *noise texture overlay*, *custom LERP cursor*, *ambient glow*, dan *floating pill-shaped navbar* pada desktop agar selaras dengan nuansa premium landing page.
  2. Merancang ulang halaman **Dashboard.jsx** menjadi visual konsol developer/sistem real-time, menampilkan status basis data SQLite, compiler Vite, backend Laravel, daemon Open Design, status pipelines, dan linimasa Git commit aktivitas terbaru.
  3. Mengubah layout autentikasi (**GuestLayout.jsx**) ke tema gelap premium lengkap dengan pendaran latar belakang hijau neon dan logo *centered* yang elegan.
  4. Menyelaraskan seluruh kontrol formulir bawaan (**TextInput.jsx**, **Checkbox.jsx**, **PrimaryButton.jsx**, **InputLabel.jsx**, **NavLink.jsx**, **ResponsiveNavLink.jsx**) ke visual konsol kustom kita (misalnya label berhuruf tebal uppercase, tombol hijau lime dengan hover scale, border masukan glow-on-focus).
- **File yang terdampak:** `resources/js/Components/Checkbox.jsx`, `resources/js/Components/InputLabel.jsx`, `resources/js/Components/NavLink.jsx`, `resources/js/Components/PrimaryButton.jsx`, `resources/js/Components/ResponsiveNavLink.jsx`, `resources/js/Components/TextInput.jsx`, `resources/js/Layouts/AuthenticatedLayout.jsx`, `resources/js/Layouts/GuestLayout.jsx`, `resources/js/Pages/Auth/Login.jsx`, `resources/js/Pages/Dashboard.jsx`

### [30 Juni 2026] - Implementasi Native CSS Scroll Snap System & Floating Header Fix
- **Apa yang dilakukan:**
  1. Mengimplementasikan sistem scroll snapping layar penuh berbasis CSS native (`scroll-snap-type: y mandatory`) yang sangat halus dan diakselerasi perangkat keras pada level root container (`.scroll-container` di `AppLayout.jsx` & `app.css`).
  2. Menyelaraskan seluruh 5 section halaman landing di `Welcome.jsx` agar menggunakan kelas `.snap-section` (`scroll-snap-align: start`, `scroll-snap-stop: always`) dan menyesuaikan tinggi minimumnya menjadi layar penuh (`min-h-screen`) dengan pemosisian konten terpusat vertikal (`flex/grid items-center`).
  3. Mengubah elemen header navigation menjadi `fixed top-0 left-1/2 -translate-x-1/2` dengan background glassmorphic blur (`bg-brand-dark/30 backdrop-blur-md border-b border-white/5`) agar tetap melayang stabil di bagian atas viewport (tidak ikut tersembunyi / terdorong akibat pemicu scroll snap di bawahnya).
  4. Mengonfigurasi elemen global `footer` agar menggunakan snapping terpasang (`scroll-snap-align: end`) di akhir dokumen agar meluncur masuk dan terkunci pas di dasar layar.
- **File yang terdampak:** `resources/css/app.css`, `resources/js/Layouts/AppLayout.jsx`, `resources/js/Pages/Welcome.jsx`

### [30 Juni 2026] - Integrasi Framer Motion & Animasi Scroll/Sticker Dinamis
- **Apa yang dilakukan:**
  1. Menginstal library `framer-motion` untuk mendukung sistem animasi React 19 native.
  2. Menerapkan **Staggered Entrance Animation** pada kolom kiri Hero (Tagline, Heading, Deskripsi, CTA, dan Metrics bar) sehingga memudar ke atas secara bertahap saat pertama kali dimuat menggunakan custom bezier easing.
  3. Menerapkan animasi skala masuk (`scale: 0.96` -> `1`, `delay: 0.35`) pada tumpukan kartu poker interaktif Hero sebelah kanan.
  4. Menambahkan **Viewport Triggered Animations** (`whileInView`, `viewport={{ once: true, margin: "-50px" }}`) pada header section Methodology, 4 kartu Bento Grid, 3 kartu keuntungan About, dan formulir panel Contact sehingga meluncur naik dengan halus saat tersentuh scroll.
  5. Mengimplementasikan transisi `<AnimatePresence>` dan `<motion.span>` pada sticker badges di Playground (baik render preview kartu maupun panel edit customizer) agar badge yang ditambah/dihapus memudar dan menyusut secara organis menggunakan layout transitions.
- **File yang terdampak:** `package.json`, `package-lock.json`, `resources/js/Pages/Welcome.jsx`

### [30 Juni 2026] - Custom Cursor Follower dengan LERP (Linear Interpolation)
- **Apa yang dilakukan:**
  1. Mengimplementasikan fitur **Custom Cursor Follower** premium di desktop/webview (tersembunyi secara otomatis di perangkat mobile/tablet dengan lebar layar < 768px).
  2. Menyembunyikan kursor sistem asli di desktop menggunakan CSS `@media (min-width: 768px) { cursor: none !important }` di `app.css`.
  3. Membagi kursor menjadi 2 elemen DOM di `AppLayout.jsx` (dot pusat `1:1` dan ring luar pengikut) yang dianimasikan menggunakan `useRef`, `requestAnimationFrame` (RAF), dan formula LERP (`ease = 0.16`) untuk performa rendering tinggi bebas jank.
  4. Menambahkan deteksi hover adaptif berbasis target mouseover untuk memperbesar ring kursor dan mengubah warnanya secara instan sesuai brand accents (warna Neon Lime atau Electric Blue).
- **File yang terdampak:** `resources/css/app.css`, `resources/js/Layouts/AppLayout.jsx`

### [30 Juni 2026] - Animasi Shuffling Kartu Hero Ala Dek Kartu Poker
- **Apa yang dilakukan:**
  1. Merancang interaksi dan animasi tumpukan kartu Hero bergaya Poker/Tinder shuffle deck yang sangat fluid saat diklik/di-tap.
  2. Menambahkan kelas CSS khusus (`.shuffle-card`, `.card-blue-active`, `.card-lime-active`, `.shuffling-out`) pada `app.css` dengan properti transisi cubic-bezier, z-index dynamic, dan sliding translation (`translate3d(130%, -20px, 0)`).
  3. Menggunakan React state (`heroActiveCard`, `isHeroShuffling`) dan event handler (`handleHeroShuffle`) dengan timeout `300ms` di `Welcome.jsx` untuk menyinkronkan animasi keluar kartu teratas sebelum berpindah ke bagian belakang tumpukan. Menambahkan `e.stopPropagation()` pada tombol interaktif kartu (Like, Comment, Share, Bookmark, & Badges) agar klik konten tidak memicu shuffling secara tidak sengaja.
  4. Menambahkan stiker petunjuk animasi pada desktop (`Click to Shuffle` berkedip/pulse) dan mobile (`Tap card to swap / shuffle`).
- **File yang terdampak:** `resources/css/app.css`, `resources/js/Pages/Welcome.jsx`

### [30 Juni 2026] - Animasi Floating & Redesign Copy Kartu Hero
- **Apa yang dilakukan:**
  1. Mengimplementasikan animasi floating otomatis berbasis CSS `@keyframes` (`hero-float-left`, `hero-float-right`) yang diakselerasi perangkat keras (`translate3d`, `will-change`) pada 2 kartu bertumpuk di bagian Hero untuk menciptakan sensasi melayang yang halus dan hidup.
  2. Merancang efek transisi reset rotasi, scale-up, dan shadow-depth menggunakan bezier curve kustom (`cubic-bezier(0.16, 1, 0.3, 1)`) saat di-hover pada class `.hero-card-left` dan `.hero-card-right`.
  3. Memperbarui copy visual pada kedua InstagramCard di Hero tersebut agar 100% selaras dengan brand identity *systemify.id* (menyajikan sistem Laravel+React dan rekayasa UI bespoke, alih-alih copy generik tentang pemasaran media sosial).
- **File yang terdampak:** `resources/css/app.css`, `resources/js/Pages/Welcome.jsx`

### [30 Juni 2026] - Migrasi Ikon ke Phosphor Icons
- **Apa yang dilakukan:**
  1. Menginstal library ikon `@phosphor-icons/react` untuk menggantikan ikon bawaan `lucide-react`.
  2. Mengganti seluruh referensi ikon lama di `Welcome.jsx` dengan ekivalen Phosphor:
     - `Heart` (dengan properti `weight={isLiked ? "fill" : "bold"}`)
     - `ChatCircle` (untuk komentar, dengan properti `weight`)
     - `PaperPlaneRight` (untuk ikon kirim)
     - `Bookmark` (dengan properti `weight`)
     - `Sparkle` (untuk ikon pendar)
     - `ArrowRight` (dengan `weight="bold"`)
     - `Code` (dengan `weight="bold"`)
     - `TrendUp` (menggantikan `TrendingUp` yang tidak diekspor oleh Phosphor, dengan `weight="bold"`)
     - `Stack` (menggantikan `Layers` yang tidak diekspor oleh Phosphor, dengan `weight="bold"`)
     - `CursorClick` (untuk CTA builder)
     - `Plus` (untuk customizer badges)
     - `Gear` (untuk header kustomizer)
     - `Check` & `CheckCircle` (untuk verifikasi & sukses)
  3. Membersihkan seluruh import ikon `lucide-react` yang tidak terpakai dari `Welcome.jsx` dan `AppLayout.jsx`.
- **File yang terdampak:** `package.json`, `resources/js/Layouts/AppLayout.jsx`, `resources/js/Pages/Welcome.jsx`

### [30 Juni 2026] - Konsolidasi Kelas Komponen Visual Terpadu
- **Apa yang dilakukan:**
  1. Menghilangkan seluruh inkonsistensi styling inline background, border, dan radius ad-hoc pada section, form, dan panel.
  2. Mendefinisikan class terpusat di `app.css`:
     - `.brand-card` (standard card dengan border tipis dan hover state yang halus)
     - `.brand-card-accent` (accent card bertema lime/neon)
     - `.brand-panel` (form & customizer panel dengan padding luas dan radius yang seragam)
     - `.brand-input` (form control dengan focus neon dan transition smooth)
     - `.brand-preview-box` (container preview di Playground)
  3. Menerapkan class-class terpusat ini ke seluruh komponen di `Welcome.jsx` (Bento grid, Customizer, About cards, dan Contact Brief form), menyatukan seluruh visual sistem ke bawah 1 standard blueprint yang seragam.
- **File yang terdampak:** `resources/css/app.css`, `resources/js/Pages/Welcome.jsx`

### [30 Juni 2026] - Redesign Tipografi Editorial & Side Rails
- **Apa yang dilakukan:**
  1. Menambahkan font serif premium `Playfair Display` dari Google Fonts ke dalam `app.blade.php`.
  2. Menerapkan gaya tipografi editorial kontras tinggi (*serif italic highlight* dengan huruf kecil/sentence case) pada seluruh heading utama di `Welcome.jsx` (Hero, Services, About, dan Contact) untuk mencerminkan tension estetika *Atelier Zero* yang bersih dan premium.
  3. Mengimplementasikan fitur **Side Rails** (left dan right) pada `AppLayout.jsx` dan `app.css` berupa panel batas vertikal tipis (`white/[0.03]`) dengan teks vertikal penanda brand (`SYSTEMIFY.ID // DIGITAL SYSTEMS ARCHITECTURE` & `STATUS: ACTIVE // LIVE BUILD ENGINE`) yang menempel di tepi kiri dan kanan viewport layar lebar.
- **File yang terdampak:** `resources/views/app.blade.php`, `resources/css/app.css`, `resources/js/Layouts/AppLayout.jsx`, `resources/js/Pages/Welcome.jsx`

### [30 Juni 2026] - Optimasi Rendering & Proporsionalitas Background
- **Apa yang dilakukan:**
  1. Mengatasi lag scrolling ("scrolling terasa berat") dengan mengubah Lapis 1 (noise texture SVG) dari `absolute` (setinggi dokumen penuh) menjadi `fixed` untuk mencegah repaint storm, serta menurunkan filter `numOctaves` dari `4` menjadi `1` (mengurangi beban kalkulasi GPU/CPU sebesar ~75%).
  2. Mendefinisikan class `.brand-glow` di `app.css` dengan akselerasi perangkat keras (`translate3d(0,0,0)`, `backface-visibility`, dan `will-change`) untuk memindahkan beban kalkulasi blur filter dari CPU ke GPU.
  3. Mengatur proporsionalitas background glows secara responsif menggunakan `vw` dan unit pixel tetap, mencegah regresi tata letak pada aspek rasio layar yang tidak biasa.
  4. Menghapus Lapis 3 (garis pembatas horizontal/vertikal absolut `vh` di shell) karena sudah ditangani secara proporsional oleh border antar section (`brand-section` di `Welcome.jsx`).
- **File yang terdampak:** `resources/css/app.css`, `resources/js/Layouts/AppLayout.jsx`

### [30 Juni 2026] - Redesign Halaman Welcome Sesuai DESIGN.md
- **Apa yang dilakukan:**
  1. Menyesuaikan tombol aksi utama (Primary CTA) di Hero section menjadi warna Neon Lime (`brand-lime` + shadow lime) dan tombol sekunder menjadi ghost button dengan border tipis (`white/10`) sesuai aturan utama di `DESIGN.md`.
  2. Merancang ulang badge tagline "New Age" di Hero menjadi berpenampilan premium ala streetwear label dengan border, rotation kustom, dan tracking yang lebar.
  3. Merombak visual "Metrics Bar" di bawah deskripsi Hero menjadi grid dashboard premium yang presisi dengan pemisah vertikal tipis (`white/5`).
  4. Menyelaraskan seluruh form input, textarea, badge customizer, dan tombol interaktif pada "Playground Section" dan "Contact Section" agar menggunakan gaya visual global, focus outline neon, dan click-scale micro-interaction yang konsisten dengan panduan anti-slop.
- **File yang terdampak:** `resources/js/Pages/Welcome.jsx`

### [30 Juni 2026] - Konsolidasi Background & Redesign Icon System
- **Apa yang dilakukan:**
  1. Membuat class global `.brand-section`, `.brand-section-subtle`, `.brand-section-transparent`, dan `.brand-icon-box` di `app.css` untuk menyeragamkan background, padding, dan struktur section di seluruh website.
  2. Menerapkan class layout global ini ke seluruh section di `Welcome.jsx` (Hero, Services, Playground, About, Contact).
  3. Mengganti iconizer wrappers default di Bento Grid dengan `.brand-icon-box` kustom yang terintegrasi status indicator neon kustom.
  4. Menyesuaikan copy di Services bento grid agar lebih customer-centric ("close to customer looks") dan berorientasi pada trust, bukan sekadar technical jargon.
- **File yang terdampak:** `resources/css/app.css`, `resources/js/Pages/Welcome.jsx`
- **Hotfix:** Memperbaiki 4 tag penutup `div` dan `section` yang tidak sengaja terlewat di Playground & Contact section saat refactoring, mengembalikan status kompilasi Vite menjadi 100% normal.

### [30 Juni 2026] - Redesign Background System + Logo Brand Identity
- **Apa yang dilakukan:** Menghapus grid background generik dan merancang ulang sistem latar belakang berbasis "filosofi atmosfer brand". 3 perubahan utama:
  1. **Background** — hapus grid `bg-[linear-gradient]` generic → diganti 3 lapis: (a) noise texture editorial, (b) brand glow yang di-anchor ke konten (bukan random corner), (c) editorial horizontal rules sebagai struktur halaman
  2. **Logo** — ganti huruf "S" → code bracket `</>` — memberi identitas teknis yang spesifik ke brand developer
  3. **Nav pulse dot** — hapus `animate-pulse` (blacklisted DESIGN.md) → status dot static dengan `title="System online"` yang bermakna
  4. **Meta description** — ganti slop copy "high-converting...Elevate your brand" → klaim teknikal spesifik
- **File yang terdampak:** `resources/js/Layouts/AppLayout.jsx`

### [30 Juni 2026] - Anti-Slop Overhaul: Welcome.jsx
- **Apa yang dilakukan:** Audit dan perbaikan AI Slop di halaman utama berdasarkan `DESIGN.md`. 4 kategori perbaikan:
  1. **Hero copy** — hapus "high-performance...incredibly fast" → diganti dengan klaim teknikal spesifik tentang Inertia bridge
  2. **Services description** — hapus "lighting fast speed" (typo + slop) → klaim intentional decision-making
  3. **Services section layout** — redesign dari **4 kartu identik** menjadi **bento grid asimetris** (4col+2col baris 1, 2col+4col baris 2) dengan hierarki visual: featured card, accent lime card, small card, horizontal wide card
  4. **About card 3** — hapus "fastest, most optimal tools" → klaim spesifik tentang interoperabilitas stack
- **File yang terdampak:** `resources/js/Pages/Welcome.jsx`

### [30 Juni 2026] - Pembuatan DESIGN.md (Anti-Slop Design Constitution)
- **Apa yang dilakukan:** Membuat dokumen panduan desain resmi `.agents/DESIGN.md` sebagai "taste guide" untuk seluruh agent AI yang bekerja di project ini. Terinspirasi dari konsep Open Design (open-design.ai) dan riset tentang "AI Slop Design". Dokumen ini mencakup: filosofi desain, blacklist AI Slop (copy & visual), brand token system, typography hierarchy, component patterns (card, button, badge), layout principles, animation rules, copy voice guide, dan quality checklist. Juga mengupdate `AGENTS.md` untuk mewajibkan setiap agent membaca `DESIGN.md` sebelum menyentuh kode UI.
- **File yang terdampak:** `.agents/DESIGN.md` (baru), `.agents/AGENTS.md`
- **Catatan:** DESIGN.md adalah living document — perbarui setiap kali ada keputusan desain baru yang disepakati.

### [30 Juni 2026] - Fix Kritis: Inertia Version Mismatch (TypeError: Cannot read component)
- **Apa yang dilakukan:** Diagnosa dan perbaikan bug kritis `TypeError: Cannot read properties of null (reading 'component')` yang menyebabkan halaman tidak bisa dirender sama sekali.
- **Root Cause:** Breaking change antara `@inertiajs/react@3.x` (client) vs `inertiajs/inertia-laravel@2.x` (server). Inertia v3 client membaca data halaman dari `<script type="application/json" data-page="app">`, sedangkan server v2 masih menulis ke `<div id="app" data-page="...">`. Mismatch ini menyebabkan `getInitialPageFromDOM()` return `null`, yang kemudian crash saat diakses `.component`.
- **Fix:** Downgrade `@inertiajs/react` dari `^3.5.0` ke `^2.0` (terinstall `2.3.27`) agar cocok dengan `inertiajs/inertia-laravel@2.0.x` yang ada di server-side.
- **File yang terdampak:** `package.json`, `package-lock.json`
- **Catatan:** Jika ingin naik ke Inertia v3, server-side (`inertiajs/inertia-laravel`) juga harus diupgrade ke `^3.x` secara bersamaan.

### [30 Juni 2026] - Perbaikan 4 Bug Rendering Halaman Utama
- **Apa yang dilakukan:** Melakukan audit dan perbaikan 4 masalah rendering di halaman utama:
  1. **Double Title (Kritis):** Menghapus `title` callback dari `createInertiaApp()` di `app.jsx` karena menyebabkan konflik dengan `<Head><title>` yang sudah dikelola oleh `AppLayout.jsx`, mengakibatkan title di-generate & di-wrap dua kali. Progress bar juga diubah ke warna `brand-lime`.
  2. **containerClassName Override Rapuh:** Didokumentasikan sebagai desain sadar (intentional). `AppLayout` mengekspos `containerClassName` sebagai escape hatch untuk page yang butuh full-width layout.
  3. **Services Section — Z-index Isolation:** Menambahkan `overflow-hidden` pada `<section id="services">` agar glow background dari `AppLayout` tidak menembus (bleed) ke dalam section tersebut.
  4. **Hero Cards Overflow di Mobile:** Memperbesar `min-h` container kartu dari `460px` → `540px` (kartu berukuran ~450px tingginya), dan menambahkan `pb-[280px]` pada hero section untuk mobile agar kedua kartu absolut tidak terpotong oleh section berikutnya.
- **File yang terdampak:** `resources/js/app.jsx`, `resources/js/Pages/Welcome.jsx`
- **Catatan:** Semua fix bersifat non-breaking. Tidak ada perubahan pada arsitektur atau dependensi.

### [30 Juni 2026] - Reusable Page Boilerplate (AppLayout)
- **Apa yang dilakukan:** Membuat layout boilerplate `AppLayout.jsx` yang membungkus struktur halaman utama (navigasi, background grid, lingkaran cahaya neon, dynamic `<Head>`, dan footer). Melakukan refactor pada `Welcome.jsx` agar meng-extend `AppLayout` untuk modularitas dan mempermudah pembuatan halaman baru.
- **File yang terdampak:** `resources/js/Layouts/AppLayout.jsx`, `resources/js/Pages/Welcome.jsx`
- **Catatan:** Memisahkan struktur visual layout dasar dari konten halaman. Aset dikompilasi ulang dengan sukses.

### [30 Juni 2026] - Implementasi Stack Inertia.js, React 19, Tailwind v4 & Landing Page
- **Apa yang dilakukan:** Menginstal Laravel Breeze untuk konfigurasi stack React/Inertia, memutakhirkan React ke v19 dan Tailwind CSS ke v4, mengkonfigurasi `@theme` brand-blue/lime/dark di stylesheet, memperbarui font ke Outfit & Plus Jakarta Sans, mendesain logo kustom `systemify.id`, serta mengimplementasikan halaman landing Modern Agency yang dinamis dengan visual playground interaktif dan form kontak.
- **File yang terdampak:** `package.json`, `vite.config.js`, `resources/css/app.css`, `resources/views/app.blade.php`, `resources/js/app.jsx`, `resources/js/Pages/Welcome.jsx`, `resources/js/Components/ApplicationLogo.jsx`
- **Catatan:** Semua aset berhasil dikompilasi dengan sukses menggunakan Vite 8 tanpa error.

### [30 Juni 2026] - Menambahkan Utilitas & Kelas CSS Tailwind v4
- **Apa yang dilakukan:** Menambahkan spesifikasi kelas utilitas Tailwind CSS v4, markup HTML dasar untuk kontainer kartu (Instagram-style), header mockup, pill badges, engagement footer, aksen dekorasi, serta interaksi mikro ke dalam `design.md`.
- **File yang terdampak:** `design.md`
- **Catatan:** Siap untuk proses implementasi dan penulisan style aktual di file proyek.

### [29 Juni 2026] - Analisa Desain Visual & UI Guidelines
- **Apa yang dilakukan:** Menganalisa referensi gambar (`design.png`) dan membuat dokumen panduan desain (`design.md`). Desain mengusung tema Modern Agency dengan paduan warna Biru Solid dan Hijau Neon.
- **File yang terdampak:** `design.md`
- **Catatan:** Langkah selanjutnya adalah mengimplementasikan gaya visual ini ke dalam konfigurasi Tailwind dan *root css variables* dari `shadcn/ui`.

### [29 Juni 2026] - Inisialisasi Roadmap
- **Apa yang dilakukan:** Menganalisa struktur proyek awal dan membuat file `roadmap.md` beserta instruksi di `AGENTS.md`.
- **File yang terdampak:** `.agents/roadmap.md`, `.agents/AGENTS.md`
- **Catatan:** Sistem siap digunakan. Agent masa depan diminta untuk selalu merujuk ke file ini sebelum melakukan perubahan arsitektur.
