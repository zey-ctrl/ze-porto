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