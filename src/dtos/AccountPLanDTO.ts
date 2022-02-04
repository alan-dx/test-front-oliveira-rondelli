export interface AccountPlanDTO {
  identificacao: string,
  tipo: string,
  parentPlanoConta: null | AccountPlanDTO,
  id: number,
  dataCadastro: Date,
  dataAlteracao: null | Date
}