import { db, ref, push, onValue } from "./firebase.js";

const namaInput = document.getElementById("nama");
const pesanInput = document.getElementById("pesan");
const kirimBtn = document.getElementById("kirimBtn");
const balasanContainer = document.getElementById("balasanContainer");

kirimBtn.onclick = async () => {
  const nama = namaInput.value.trim();
  const pesan = pesanInput.value.trim();

  if (!nama || !pesan) {
    alert("Nama dan pesan tidak boleh kosong.");
    return;
  }

  try {
    const newRef = push(ref(db, "pesan")); // Buat referensi ID unik
    await newRef.set({
      nama,
      pesan,
      balasan: ""
    });

    // Simpan ID pesan di localStorage
    let myMessages = JSON.parse(localStorage.getItem("myMessages") || "[]");
    myMessages.push(newRef.key);
    localStorage.setItem("myMessages", JSON.stringify(myMessages));

    alert("Pesan berhasil dikirim!");
    namaInput.value = "";
    pesanInput.value = "";
    console.log("Pesan terkirim dengan ID:", newRef.key);
  } catch (error) {
    console.error("Gagal mengirim pesan:", error);
    alert("Terjadi kesalahan saat mengirim pesan.");
  }
};

// Tampilkan hanya pesan milik sendiri
onValue(ref(db, "pesan"), snapshot => {
  balasanContainer.innerHTML = "";
  const data = snapshot.val();
  const myMessages = JSON.parse(localStorage.getItem("myMessages") || "[]");

  if (data && myMessages.length > 0) {
    myMessages.slice().reverse().forEach(key => {
      const item = data[key];
      if (item) {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <strong>${item.nama}:</strong><br>${item.pesan}
          <small>Balasan: ${item.balasan || "(belum dibalas)"}</small>
        `;
        balasanContainer.appendChild(div);
      }
    });
  } else {
    balasanContainer.innerHTML = "<p>Belum ada pesan milikmu.</p>";
  }
});
