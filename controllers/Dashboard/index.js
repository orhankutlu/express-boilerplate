const express = require('express');
const configs = require('../../configs');
const middlewareHandler = require('../../handlers/middlewareHandler');
const { checkScope, verifyToken } = require('../../middlewares');

const dashboardRoutes = express.Router({ mergeParams: true });
dashboardRoutes.use('/auth', require('./Auth'));


dashboardRoutes.use(middlewareHandler(verifyToken(configs.auth.secret)));
dashboardRoutes.use(middlewareHandler(checkScope('user')));

dashboardRoutes.use('/users', require('./UserProfile'));
dashboardRoutes.use('/uploads', require('./Uploads'));

module.exports = dashboardRoutes;
