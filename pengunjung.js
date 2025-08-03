import { db, ref, push, onValue } from "./firebase.js";

const namaInput = document.getElementById("nama");
const pesanInput = document.getElementById("pesan");
const kirimBtn = document.getElementById("kirimBtn");
const balasanContainer = document.getElementById("balasanContainer");

kirimBtn.onclick = () => {
  const nama = namaInput.value.trim();
  const pesan = pesanInput.value.trim();
  if (nama && pesan) {
    const newRef = push(ref(db, "pesan"));
    newRef.set({
      nama,
      pesan,
      balasan: ""
    });
    // Simpan ID pesan ke localStorage
    let myMessages = JSON.parse(localStorage.getItem("myMessages") || "[]");
    myMessages.push(newRef.key);
    localStorage.setItem("myMessages", JSON.stringify(myMessages));
    namaInput.value = "";
    pesanInput.value = "";
    alert("Pesan dikirim!");
  }
};

onValue(ref(db, "pesan"), snapshot => {
  balasanContainer.innerHTML = "";
  const data = snapshot.val();
  const myMessages = JSON.parse(localStorage.getItem("myMessages") || "[]");

  if (data) {
    myMessages.reverse().forEach(key => {
      const item = data[key];
      if (item) {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<strong>${item.nama}:</strong><br>${item.pesan}<small>Balasan: ${item.balasan || '(belum dibalas)'}</small>`;
        balasanContainer.appendChild(div);
      }
    });
  }
});
