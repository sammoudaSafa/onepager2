"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolePermissions = exports.Permission = void 0;
const role_1 = require("./role");
var Permission;
(function (Permission) {
    Permission["manageUsers"] = "manageUsers";
    Permission["managePublicite"] = "managePublicite";
})(Permission = exports.Permission || (exports.Permission = {}));
exports.rolePermissions = {
    [role_1.Role.admin]: [
        Permission.manageUsers
    ],
    [role_1.Role.user]: [
        Permission.managePublicite
    ]
};
//# sourceMappingURL=permission.js.map