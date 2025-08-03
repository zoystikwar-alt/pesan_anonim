// admin.js
import { db, ref, onValue, update, remove } from "./firebase.js";

const pesanContainer = document.getElementById("pesanContainer");

onValue(ref(db, "pesan"), snapshot => {
  pesanContainer.innerHTML = "";
  const data = snapshot.val();
  if (data) {
    const keys = Object.keys(data).reverse();
    keys.forEach(key => {
      const item = data[key];
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <strong>${item.nama}:</strong><br>${item.pesan}<br>
        <textarea placeholder="Tulis balasan...">${item.balasan || ""}</textarea><br>
        <button class="balas">Balas</button>
        <button class="hapus">Hapus</button>
      `;

      const textarea = card.querySelector("textarea");
      const balasBtn = card.querySelector(".balas");
      const hapusBtn = card.querySelector(".hapus");

      balasBtn.onclick = () => {
        update(ref(db, "pesan/" + key), {
          balasan: textarea.value
        });
      };

      hapusBtn.onclick = () => {
        if (confirm("Yakin ingin menghapus pesan ini?")) {
          remove(ref(db, "pesan/" + key));
        }
      };

      pesanContainer.appendChild(card);
    });
  }
});
