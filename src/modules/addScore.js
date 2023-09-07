class LeaderBoard {
  constructor() {
    this.scores = "scores";
    this.name = document.querySelector(".name");
    this.count = document.querySelector(".score");
    this.btn = document.querySelector(".input-button");
    this.form = document.querySelector(".form");
    this.listContainer = document.querySelector(".scores-container");
    this.listAdd = document.querySelector(".scores-list");
    this.document = document;
    this.apiEndPoint =
      "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/rov8KthJ9rzrWECdKBf4/scores";
    this.refresh = document.querySelector(".refresh");
  }

  clearInput() {
    this.name.value = "";
    this.count.value = "";
  }

  async postScores() {
    const user = this.name.value;
    const score = this.count.value;

    const options = {
      method: "POST",
      body: JSON.stringify({
        user,
        score,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (this.name && this.count) {
      await fetch(this.apiEndPoint, options).then((res) => res.json());
    }

    this.clearInput();
  }

  async getScores() {
    const res = await fetch(this.apiEndPoint);
    const data = await res.json();
    return data;
  }

  async displayScores() {
    const list = await this.getScores();
    this.listAdd.innerHTML = "";
    if (list.result.length === 0) {
      const msg = this.document.createElement("h3");
      msg.textContent = "No scores yet! Add some!";
      msg.classList.add("display-msg");
      this.listAdd.appendChild(msg);
    } else {
      list.result
        .sort((a, b) => a.score - b.score)
        .forEach((score) => {
          this.listAdd.innerHTML += `
         <li class="scores-item">${score.user}: ${score.score}</li>
          `;
        });
    }
  }

  submitInput() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.postScores();
    });
  }

  refreshScores() {
    this.refresh.addEventListener("click", () => this.displayScores());
  }
}
export default LeaderBoard;
