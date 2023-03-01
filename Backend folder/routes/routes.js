const express = require('express');
const { AuthControls } = require('../controllers/Auth.controller');
const { dashboardConstrols } = require('../controllers/Dashboard.controller');
const { authMiddlewares } = require('../middleware/auth');

const routemanager = express.Router();

// Auth routes
routemanager.post('/api/v1/auth/signup', AuthControls.signup);
routemanager.post('/api/v1/auth/login', AuthControls.login);
routemanager.get('/api/v1/auth/logout', AuthControls.logout);
routemanager.post('/api/v1/auth/forget-password', AuthControls.forgetPassword);
routemanager.get(
  '/api/v1/auth/reset-password/:id/:token',
  AuthControls.renderResetPasswordPage
);
routemanager.post(
  '/api/v1/auth/reset-password/:id/:token',
  AuthControls.resetPassword
);

//Dashboard routes

routemanager.get(
  '/api/v1/dashboard/home',
  authMiddlewares.verifyLoginToken,
  dashboardConstrols.home
);

module.exports = { routemanager };
