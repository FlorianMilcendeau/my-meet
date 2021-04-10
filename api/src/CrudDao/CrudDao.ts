export interface ICrudDao {
    create: (ressource: any) => Promise<any>;
}
