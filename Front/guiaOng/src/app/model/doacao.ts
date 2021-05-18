import { UserOng } from "./userOng"
import { User } from "./user"

export class Doacao{
    public idDoacao: number
    public valor: number
    public FK_nomeCliente: User
    public FK_nomeOng: UserOng
}
