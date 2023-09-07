import "./style.css";

import LeaderBoard from "./modules/addScore.js";

const scores = new LeaderBoard();

scores.submitInput();
scores.refreshScores();
scores.displayScores();
