import { DomController } from "./domController.js";

export class ModalController {
  modal;
  constructor() {
    this.modal = document.getElementById("modal");
    this.modal.addEventListener("click", () => this.closeModal());
    this.modal
      .querySelector("#modal-wrapper")
      .addEventListener("click", (e) => e.stopPropagation());
  }

  openModal() {
    this.modal.style.display = "grid";
  }

  closeModal() {
    this.modal.style.display = "none";
    new DomController().clearForm();
  }
}
