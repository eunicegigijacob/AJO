const express = require('express');
const { AuthControls } = require('../controllers/Auth.controller');

const routemanager = express.Router();

// Auth routes
routemanager.post('/api/v1/auth/signup', AuthControls.signup);
routemanager.post('/api/v1/auth/login', AuthControls.login);
routemanager.post('/api/v1/auth/forget-password', AuthControls.forgetPassword);
routemanager.get(
  '/api/v1/auth/reset-password/:id/:token',
  AuthControls.renderResetPasswordPage
);
routemanager.post(
  '/api/v1/auth/reset-password/:id/:token',
  AuthControls.resetPassword
);

module.exports = { routemanager };
