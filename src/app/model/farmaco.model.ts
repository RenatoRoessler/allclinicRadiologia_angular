export interface Farmaco {
    id_farmaco?: string;
    descricao: string;
    ph_superior: number;
    ph_inferior: number;
    solv_organico?: number;
    solv_inorganico?: number;
    id_instituicao?: string;
    ativo: boolean;
    id_fabricante: string;
}