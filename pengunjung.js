// pengunjung.js
import { db, ref, push, onValue } from "./firebase.js";

const namaInput = document.getElementById("nama");
const pesanInput = document.getElementById("pesan");
const kirimBtn = document.getElementById("kirimBtn");
const balasanContainer = document.getElementById("balasanContainer");

kirimBtn.onclick = () => {
  const nama = namaInput.value.trim();
  const pesan = pesanInput.value.trim();
  if (nama && pesan) {
    push(ref(db, "pesan"), {
      nama,
      pesan,
      balasan: ""
    });
    namaInput.value = "";
    pesanInput.value = "";
    alert("Pesan dikirim!");
  }
};

onValue(ref(db, "pesan"), snapshot => {
  balasanContainer.innerHTML = "";
  const data = snapshot.val();
  if (data) {
    const keys = Object.keys(data).reverse();
    keys.forEach(key => {
      const item = data[key];
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<strong>${item.nama}:</strong><br>${item.pesan}<small>Balasan: ${item.balasan || '(belum dibalas)'}</small>`;
      balasanContainer.appendChild(div);
    });
  }
});
