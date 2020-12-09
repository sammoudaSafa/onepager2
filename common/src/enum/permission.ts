import { Role } from './role';

// create access permission
export enum Permission {
    manageUsers = 'manageUsers',
    managePublicite = 'managePublicite'
}

export const rolePermissions = {
    [Role.admin]: [
        Permission.manageUsers
    ],
    [Role.user]: [
        Permission.managePublicite
    ]
};
