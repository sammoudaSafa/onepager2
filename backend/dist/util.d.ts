import { Permission } from 'common';
import { NextFunction, Request, Response } from 'express';
export declare const wrap: (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => void;
export declare function hasPermission(permission: Permission): (req: Request, res: Response, next: NextFunction) => void | Response<any>;
