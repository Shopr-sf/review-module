import Promise from 'bluebird';
// TODO: remove if unnecessary

import {
  hipsum,
  profilePics,
  productPics,
} from './loadAssets.js';

const inclusiveRandom = (min, max) => {
  const minR = Math.ceil(min);
  const maxR = Math.floor(max);
  return Math.floor(Math.random() * (maxR - minR + 1)) + minR;
};

const randomArray = (min, max) => {
  return Array.apply(null, Array(inclusiveRandom(min, max))).map((x, i) => i);
};

const fixedArray = (size) => {
  return Array(size).fill().map((x, i) => i + 1);
};

const thirdOdds = () => inclusiveRandom(1, 3) === 3;

const seventhOdds = () => inclusiveRandom(1, 7) === 3;

const randomHipsum = () => hipsum[inclusiveRandom(0, 14)];

const randomProfilePic = () => profilePics[inclusiveRandom(0, 25)];

const randomProductPic = () => productPics[inclusiveRandom(0, productPics.length - 1)];

const generateUsername = () => {
  const startIndex = inclusiveRandom(0, 100);
  return randomHipsum().slice(startIndex).split(' ')[0];
};

const assignUser = () => {
  return thirdOdds() ? inclusiveRandom(200, 250) : inclusiveRandom(1, 199);
};

const generateTitle = () => {
  const startIndex = inclusiveRandom(0, 100);
  const endIndex = inclusiveRandom(startIndex + 5, startIndex + 100);
  return randomHipsum().slice(startIndex, endIndex);
};

const generateReview = () => {
  let review = '';
  randomArray(1, 7).forEach(() => {
    review = `${review}${randomHipsum()}\n`;
  });
  return review.slice(0, review.length - 3);
  // TODO: finish less sophisticated algorithm
  // const length = inclusiveRandom(1, 5);
  // hipsum.forEach((paragraph) => {
  // if (inclusiveRandom(1, 7) === 3) {
  // const sentences = paragraph.split('.');
  // sentences.forEach((sentence) => {
  // inclusiveRandom(1, 5) === 3 ? review.push(sentence);
};

const addImage = (review) => {
  const img = {};
  img.review = review;
  img.title = generateTitle();
  img.url = randomProductPic();
  return img;
};

/* const addComments = (review) => {
**  assignUser();
** }; TODO: generate comments/replies */

const updateAggregate = (product, review) => {

  //   CREATE TABLE aggregates (
//   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   product_id INT NOT NULL,
//   score INT(9),
//   qty INT(9)
//   );
  // write record @ product id, filtering & averaging reviews by product id
};

const generateAggregate = (product) => {
  db.query(`SELECT rating FROM reviews WHERE product_id=${product};`, (err, data) => {
    if (err) return console.log('The aggregates are: 0,0');  
    console.log('The review id is: ', data);
    const aggregates = {};
    let total = 0;
    data.forEach((rating) => total += rating);
    aggregates.score = total / data.length;
    aggregates.qty = data.length;
    db.query(`INSERT INTO aggregates (product_id, score, qty) VALUES(${product}, ${aggregates.score}, ${aggregates.qty});`, (err, data) => {
      if (err) console.log('error aggregating');
      // console.log('The aggregates are: ', data);
      return data;
    });
  });
};

export {
  inclusiveRandom,
  randomArray,
  fixedArray,
  thirdOdds,
  seventhOdds,
  generateUsername,
  randomProfilePic,
  assignUser,
  generateTitle,
  generateReview,
  addImage,
  generateAggregate,
};