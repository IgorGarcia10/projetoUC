import { Ong } from "./ong"
import { User } from "./user"

export class Doacao{
    public idDoacao: number
    public valor: number
    public FK_nomeCliente: User
    public FK_nomeOng: Ong
}
