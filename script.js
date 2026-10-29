// ===== GANTI TAMPILAN SKILL (Hard Skill / Soft Skill) =====
function tampilkan(id, tombol) {
    // sembunyikan dua-duanya dulu
    document.getElementById("teknis").style.display = "none";
    document.getElementById("nonteknis").style.display = "none";

    // tampilkan yang dipilih
    document.getElementById(id).style.display = "flex";

    // pindahkan warna tombol aktif
    var semua = document.querySelectorAll(".tab-skill");
    for (var i = 0; i < semua.length; i++) {
        semua[i].classList.remove("aktif");
    }
    tombol.classList.add("aktif");
}


// ===== MODE GELAP / TERANG =====
var tombolTema = document.getElementById("btnTema");

// simpan dan ambil pilihan tema (dibungkus try supaya tidak error di browser yang menolak)
function simpanTema(tema) {
    try {
        localStorage.setItem("tema", tema);
    } catch (e) {}
}

function ambilTema() {
    try {
        return localStorage.getItem("tema");
    } catch (e) {
        return null;
    }
}

function setTema(tema) {
    document.documentElement.setAttribute("data-theme", tema);
    simpanTema(tema);

    // dark mode -> tombol tampil matahari (klik untuk terang)
    // light mode -> tombol tampil bulan (klik untuk gelap)
    if (tombolTema) {
        tombolTema.textContent = (tema === "dark") ? "☀️" : "🌙";
    }
}

// pakai pilihan terakhir; kalau belum ada, ikuti pengaturan perangkat
var temaTersimpan = ambilTema();

if (temaTersimpan) {
    setTema(temaTersimpan);
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    setTema("light");
} else {
    setTema("dark");
}

// klik tombol = ganti tema
if (tombolTema) {
    tombolTema.addEventListener("click", function () {
        var sekarang = document.documentElement.getAttribute("data-theme");
        setTema(sekarang === "dark" ? "light" : "dark");
    });
}

// ===== FLIP KARTU EXPERIENCE =====
var tombolFlip = document.querySelectorAll(".btn-flip, .btn-kembali");

for (var k = 0; k < tombolFlip.length; k++) {
    tombolFlip[k].addEventListener("click", function () {
        this.closest(".flip-exp").classList.toggle("dibalik");
    });
}
// ===== FLIP OTOMATIS UNTUK KOTAK YANG PUNYA data-caption =====
function buatTombolFlip() {
    var tombol = document.createElement("button");
    tombol.className = "btn-flip";
    tombol.setAttribute("aria-label", "Balik kartu");
    tombol.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    tombol.addEventListener("click", function () {
        this.closest(".flip-exp").classList.toggle("dibalik");
    });
    return tombol;
}

var kotakCaption = document.querySelectorAll(".card-exp[data-caption]");

for (var m = 0; m < kotakCaption.length; m++) {
    var kotak = kotakCaption[m];
    var teksCaption = kotak.getAttribute("data-caption");

    // sisi depan: isi kotak yang lama + tombol panah di kanan
    var depan = document.createElement("div");
    depan.className = "flip-face flip-front";
    while (kotak.firstChild) {
        depan.appendChild(kotak.firstChild);
    }
    depan.appendChild(buatTombolFlip());

    // sisi belakang: deskripsi + tombol panah di posisi yang sama
    var belakang = document.createElement("div");
    belakang.className = "flip-face flip-back flip-back-desc";
    var p = document.createElement("p");
    p.className = "caption-exp";
    p.textContent = teksCaption;
    belakang.appendChild(p);
    belakang.appendChild(buatTombolFlip());

    // susun semuanya
    var dalam = document.createElement("div");
    dalam.className = "flip-inner";
    dalam.appendChild(depan);
    dalam.appendChild(belakang);

    kotak.className = "flip-exp";
    kotak.appendChild(dalam);
}
