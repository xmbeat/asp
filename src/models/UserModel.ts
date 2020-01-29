import { Model } from './Model';
export class UserModel extends Model{
    id: string;
    user: string;
    password:string;
    email: string;
}