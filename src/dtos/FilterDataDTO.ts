export interface FilterDataDTO {
  simbolo: string;
  nome: string;
  orderByDescending: "old" | "new" | boolean;
}