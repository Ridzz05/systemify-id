# Project-Scoped Rules

Aturan berikut wajib diikuti oleh setiap agent yang bekerja pada *workspace* ini:

1. **Update Roadmap & Checkpoint:**
   Setiap kali Anda selesai melakukan generasi kode skala besar, mengimplementasikan fitur, melakukan *refactor*, atau mengubah konfigurasi penting dalam project ini, Anda **WAJIB** mencatat perubahan tersebut di file `.agents/roadmap.md` pada bagian **Changelog & Checkpoints**.
   Sertakan informasi tentang: 
   - Tanggal pengerjaan.
   - Fitur atau perubahan yang dilakukan.
   - Daftar file utama yang diubah atau dibuat.

2. **Pahami Alur Proyek:**
   Sebelum membuat perubahan arsitektur atau jika Anda merasa ragu dengan alur sistem, bacalah `.agents/roadmap.md` terlebih dahulu untuk menyesuaikan *context* Anda dengan state proyek terbaru.

3. **Wajib Baca DESIGN.md Sebelum Mengerjakan UI:**
   Sebelum membuat, mengedit, atau mereview kode yang berhubungan dengan tampilan (komponen React, layout, CSS, Tailwind), Anda **WAJIB** membaca `.agents/DESIGN.md`. File tersebut berisi:
   - Brand token system (warna, font, radius)
   - Blacklist AI Slop — pola desain dan copy yang dilarang
   - Component patterns yang sudah disepakati
   - Animation & interaction rules
   - Copy voice & quality checklist
   
   Melanggar panduan di `DESIGN.md` dianggap sebagai output yang gagal, meskipun secara teknis kode berjalan dengan benar.
