import express from "express";
import goldenGlobesData from "./data/golden-globes.json";

const port = process.env.PORT || 8080;
const app = express();

app.get("/", (request, response) => {
  const dataLength = String(goldenGlobesData.length);
  response.send(
    `You can find ${dataLength} movies from Golden Globes ceremony here!`
  );
});

app.get("/golden-globes", (request, response) => {
  const { ceremony, win, category } = request.query;
  let result = goldenGlobesData;

  if (ceremony) {
    result = goldenGlobesData.filter(
      (movie) => movie.ceremony === Number(ceremony)
    );
  }

  if (win) {
    result = result.filter((movie) => movie.win);
  }

  if (category) {
    result = result.filter((movie) => movie.category.includes(category));
  }
  response.json(result);
});

app.get("/golden-globes/:film", (request, response) => {
  const { film } = request.params;
  const filteredFilm = goldenGlobesData.filter((movie) => movie.film === film);

  if (filteredFilm.length > 0) {
    response.json(filteredFilm);
  } else {
    response.send(`There is not information about ${film}`);
  }
});

app.listen(port, () => {
  console.log("Hello console the serer is now running");
});
