
//== Backend =================================================================

const convolutedCryptoProvider = function(seed) {
  return new Promise(function(resolve, reject) {
    resolve({
        boolean: seed % 2 == 0,
        next: () => convolutedCryptoProvider((seed * 13 + 1) % 25)
      });
  });
}

// TODO

// ... Catcha ...



// == Some Tests You May Want To Use =========================================

// getBooleanList(7).then(x => console.log(x));

/* 
const c = new Catcha(7);
c.getImages().then(x => console.log(x));
c.checkAnswer([ false, false, true, true, 
	false, false, true, true, false ]).then(x => console.log(x));
*/

/*
for (let i = 0; i < 13; i++) {
  new Catcha(i).getImages().then(list => console.log(i + " " + list))
}
*/

//== Web Server ==============================================================

import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 3001;
const __dirname = path.resolve();
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/challenge', function(req, res) {

  if (typeof Catcha != "undefined") {
    const challenge = Math.floor(Math.random() * 13);
    const catcha = new Catcha(challenge);

    catcha.getImages().then(images => {
      res.json({ challenge: challenge, images: images });
    });
  } else {
    // Fallback
    res.json({ challenge: 'TODO', images:
      ['img/cat1.png','img/cat1.png','img/bike1.png',
      'img/bike1.png','img/bike1.png','img/bike1.png',
      'img/bike1.png','img/bike1.png','img/bike1.png']
    });
  }
});

app.post('/response/:challenge', function(req, res) {
  const catcha = new Catcha(req.params.challenge);
  const selected = req.body["selected"];

  catcha.checkAnswer(selected)
    .then(boolean => res.end(boolean ? "PASS": "FAIL"));
});

app.listen(port, () => console.log(`Server listening on port ${port}`))
