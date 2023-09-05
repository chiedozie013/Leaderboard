class LeaderBoard {
  constructor() {
    this.scores = 'scores';
    this.getStorage = JSON.parse(localStorage.getItem(this.scores)) || [];
    this.name = document.querySelector('.name');
    this.count = document.querySelector('.score');
    this.btn = document.querySelector('.input-button');
    this.form = document.querySelector('.form');
    this.listContainer = document.querySelector('.scores-container');
    this.listAdd = document.querySelector('.scores-list');
    this.document = document;
  }

  setStorage() {
    localStorage.setItem(this.scores, JSON.stringify(this.getStorage));
  }

  displayScores() {
    this.listAdd.innerHTML = '';
    if (this.getStorage.length === 0) {
      const msg = this.document.createElement('h3');
      msg.textContent = 'No scores yet! Add some!';
      msg.classList.add('display-msg');
      this.listContainer.appendChild(msg);
    } else {
      this.getStorage.forEach((score) => {
        this.listAdd.innerHTML += `
           <li class="scores-item">${score.name}: ${score.count}</li>
            `;
      });
    }
  }

  addScores() {
    const scoresObj = {};
    scoresObj.name = this.name.value;
    scoresObj.count = this.count.value;
    scoresObj.id = Math.floor(Math.random() * 10000000);

    if (this.name && this.count) {
      this.getStorage.push(scoresObj);
      this.setStorage();
      this.displayScores();
    }

    this.name = '';
    this.count = '';
  }

  submitInput() {
    this.form.addEventListener('submit', () => this.addScores());
    this.btn.addEventListener('click', () => this.addScores());
    this.displayScores();
  }
}
export default LeaderBoard;
