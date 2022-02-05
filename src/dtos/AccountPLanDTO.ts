export interface AccountPlanDTO {
  identificacao: string,
  tipo: string,
  parentPlanoConta: null | AccountPlanDTO,
  id: number,
  holding?: {
    nome: string;
  }
  dataCadastro: Date,
  dataAlteracao: null | Date
}