const foco = document.getElementById("inputNote");

document.addEventListener("DOMContentLoaded", () => {});

function teclaEnter(event) {
  if (event.key === "keydown") {
    event.preventDefault();
    event.addEventListener("keydown", "Enter");
    api.createNote(stickyNote);
  }
}

frmNote.addEventListener("keydown", teclaEnter);

let frmNote = document.getElementById("frmNote");
let note = document.getElementById("inputNote");
let color = document.getElementById("selectColor");

frmNote.addEventListener("submit", async (event) => {
  event.preventDefault();
  const stickyNote = {
    textNote: note.value,
    colorNote: color.value,
  };

  api.createNote(stickyNote);
});

api.resetForm((args) => {
  location.reload();
  api.updateList();
});
