/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'GET /api/ping': 'PingController.ping',

  // Auth
  'POST /auth/login': 'AuthController.login',
  'POST /auth/signup': 'AuthController.signup',

  // User - Role Management
  'POST /user/assign-role': 'UserController.assignRole',
  'POST /user/remove-role': 'UserController.removeRole',
  'POST /user/replace-roles': 'UserController.replaceRoles',
  'GET /user/:id': 'UserController.getById',
  'GET /user': 'UserController.getAll',

  // Role Management APIs
  'POST /role/create': {
    controller: 'RoleController',
    action: 'create',
    policies: ['hasPermission'],
    permission: 'manage_roles'
  },

  'GET /role': {
    controller: 'RoleController',
    action: 'getAll',
    policies: ['hasPermission'],
    permission: 'manage_roles'
  },

  'GET /role/:id': {
    controller: 'RoleController',
    action: 'getById',
    policies: ['hasPermission'],
    permission: 'manage_roles'
  },

  'PUT /role/:id': {
    controller: 'RoleController',
    action: 'update',
    policies: ['hasPermission'],
    permission: 'manage_roles'
  },

  'DELETE /role/:id': {
    controller: 'RoleController',
    action: 'delete',
    policies: ['hasPermission'],
    permission: 'manage_roles'
  },

  'POST /role/:id/assign-permission': {
    controller: 'RoleController',
    action: 'assignPermission',
    policies: ['hasPermission'],
    permission: 'manage_roles'
  },

  'POST /role/:id/remove-permission': {
    controller: 'RoleController',
    action: 'removePermission',
    policies: ['hasPermission'],
    permission: 'manage_roles'
  },

  // Permission Management APIs
  'POST /permission/create': {
    controller: 'PermissionController',
    action: 'create',
    policies: ['hasPermission'],
    permission: 'manage_permissions'
  },

  'GET /permission': {
    controller: 'PermissionController',
    action: 'getAll',
    policies: ['hasPermission'],
    permission: 'manage_permissions'
  },

  'GET /permission/:id': {
    controller: 'PermissionController',
    action: 'getById',
    policies: ['hasPermission'],
    permission: 'manage_permissions'
  },

  'PUT /permission/:id': {
    controller: 'PermissionController',
    action: 'update',
    policies: ['hasPermission'],
    permission: 'manage_permissions'
  },

  'DELETE /permission/:id': {
    controller: 'PermissionController',
    action: 'delete',
    policies: ['hasPermission'],
    permission: 'manage_permissions'
  },

  // Product APIs
  'GET /api/products': {
    controller: 'ProductController',
    action: 'find',
    policies: ['hasPermission'],
    permission: 'view_product'
  },

  'POST /api/products': {
    controller: 'ProductController',
    action: 'create',
    policies: ['hasPermission'],
    permission: 'add_product'
  },

  'GET /api/products/:id': {
    controller: 'ProductController',
    action: 'findOne',
    policies: ['hasPermission'],
    permission: 'view_product'
  },

  'PUT /api/products/:id': {
    controller: 'ProductController',
    action: 'update',
    policies: ['hasPermission'],
    permission: 'edit_product'
  },

  'DELETE /api/products/:id': {
    controller: 'ProductController',
    action: 'delete',
    policies: ['hasPermission'],
    permission: 'delete_product'
  }
};
