# UI Theme

UI aktif PINISI ERP mengadaptasi visual system Untitled UI untuk Vue 3 dan
Tailwind CSS. Implementasi tidak mengimpor komponen React; pola visualnya
diterapkan pada komponen Vue yang sudah ada.

Referensi:

- https://www.untitledui.com/
- https://www.untitledui.com/react/docs/theming

## Token Utama

Token tersentralisasi di `src/style.css`.

```text
Brand 600   #7F56D9
Brand 50    #F9F5FF
Gray 900    #101828
Gray 700    #344054
Gray 500    #667085
Gray 200    #EAECF0
Gray 50     #F9FAFB
Success     #079455
Info        #1570EF
Warning     #DC6803
Error       #D92D20
```

## Karakter Visual

- Sidebar memakai token tersendiri: `#2F3349` pada light theme dan `#151D2E`
  pada dark theme, dengan active state brand.
- Card putih, radius 12px, border netral, dan shadow ringan.
- Heading menggunakan gray-900 dan body menggunakan gray-700.
- Status memakai background tint ringan dan foreground dengan kontras tinggi.
- Chart mengikuti brand dan semantic status palette yang sama.
- Tabel memakai header gray-50 dan separator gray-200.
- Focus ring memakai brand-600.

## Compatibility Layer

Beberapa section masih mengirim class palette tema sebelumnya melalui props
atau mock presentasi. `src/style.css` memetakan class tersebut ke semantic token Untitled
UI agar data dan isi dashboard tidak perlu diubah. Reusable card serta chart
utama sudah memakai palette Untitled UI secara langsung.

## Responsive dan Accessibility

- Sidebar desktop tetap, sedangkan mobile menggunakan slide-over dan backdrop.
- Grid tetap turun menjadi satu atau dua kolom sesuai breakpoint yang sudah ada.
- Tabel lebar mempertahankan horizontal scroll.
- Focus-visible, reduced motion, ARIA navigation, semantic table, dan alert
  tetap dipertahankan.

## Format Nominal

- Nominal utama atau headline card memakai Rupiah lengkap, misalnya
  `Rp 15.000.000.000`.
- Nominal pendukung pada list, badge, axis chart, atau tooltip ringkas boleh
  memakai format compact, misalnya `Rp 15 M`.
- Format compact selalu menyertakan `Rp` dan spasi antara angka dengan unit.
