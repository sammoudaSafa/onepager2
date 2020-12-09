"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPermission = exports.wrap = void 0;
exports.wrap = (fn => (req, res, next) => fn(req, res, next).catch(next));
function hasPermission(permission) {
    return (req, res, next) => {
        if (!req.user?.hasPermission(permission)) {
            return res.sendStatus(403);
        }
        return next();
    };
}
exports.hasPermission = hasPermission;
//# sourceMappingURL=util.js.map