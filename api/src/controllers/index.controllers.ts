import { Request, Response } from 'express';

class indexController {
    static get(req: Request, res: Response): void {
        res.status(200).send('Welcome to Express !');
    }
}

export default indexController;
