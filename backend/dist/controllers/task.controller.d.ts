import { Request, Response } from 'express';
export declare const createTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare function getTasksByProjectId(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getTask(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateTask(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteTask(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function createSubTask(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateSubTask(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteSubTask(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
