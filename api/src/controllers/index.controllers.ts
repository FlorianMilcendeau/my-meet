import { Request, Response } from 'express';

class indexController {
    get(req: Request, res: Response) {
        res.status(200).send('Welcome to Express !');
    }
}

export default new indexController();
