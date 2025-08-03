import { db, ref, push, set, onValue } from "./firebase.js";

const namaInput = document.getElementById("nama");
const pesanInput = document.getElementById("pesan");
const kirimBtn = document.getElementById("kirimBtn");
const balasanContainer = document.getElementById("balasanContainer");

// Tombol kirim
kirimBtn.onclick = async () => {
  const nama = namaInput.value.trim();
  const pesan = pesanInput.value.trim();

  if (!nama || !pesan) {
    alert("Nama dan pesan tidak boleh kosong.");
    return;
  }

  // Tambahkan pesan baru ke Firebase
  const newRef = push(ref(db, "pesan"));
  await set(newRef, {
    nama: nama,
    pesan: pesan,
    balasan: ""
  });

  // Simpan kunci pesan ke localStorage
  let myMessages = JSON.parse(localStorage.getItem("myMessages") || "[]");
  myMessages.push(newRef.key);
  localStorage.setItem("myMessages", JSON.stringify(myMessages));

  // Kosongkan input
  pesanInput.value = "";
  alert("Pesan berhasil dikirim!");
};

// Menampilkan hanya pesan milik sendiri
onValue(ref(db, "pesan"), snapshot => {
  balasanContainer.innerHTML = "";
  const data = snapshot.val();
  const myMessages = JSON.parse(localStorage.getItem("myMessages") || "[]");

  if (data && myMessages.length > 0) {
    // Terbalikkan urutan biar terbaru di atas
    myMessages.slice().reverse().forEach(key => {
      const item = data[key];
      if (item) {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <strong>${item.nama}:</strong><br>${item.pesan}
          <br><small>Balasan: ${item.balasan || "(belum dibalas)"}</small>
        `;
        balasanContainer.appendChild(div);
      }
    });
  } else {
    balasanContainer.innerHTML = "<p>Belum ada pesan milikmu.</p>";
  }
});
