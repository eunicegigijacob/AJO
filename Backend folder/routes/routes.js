const express = require('express');
const { AuthControls } = require('../controllers/Auth.controller');

const routemanager = express.Router();

routemanager.post('/api/v1/auth/signup', AuthControls.signup);
routemanager.post('/api/v1/auth/login', AuthControls.login);

module.exports = { routemanager };
