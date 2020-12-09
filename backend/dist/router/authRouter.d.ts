declare const authRouter: import("express-serve-static-core").Router;
declare const loginHandler: (username: string, password: string, done: (error: any, user?: any) => void) => Promise<void>;
export { authRouter, loginHandler };
