import fs from 'fs';
import Promise from 'bluebird';

import {
  userIds,
} from './loadAssets';

import {
  generateUsername,
  randomProfilePic,
} from './seedHelpers.js';

const createUser = (userId) => {
  const user = {};
  user.id = userId;
  while (!user.username) {
    user.username = generateUsername();
  }
  user.img = randomProfilePic();
  return `INSERT INTO users (id, username, img) VALUES(${user.id}, "${user.username}", "${user.img}");\n`;
};

const addUsers = () => {
  return new Promise((resolve) => {
    resolve(userIds.reduce((acc, user) => {
      console.log(user);
      return acc + createUser(user);
    }, 'USE reviews;\n'));
  });
};

export { addUsers };