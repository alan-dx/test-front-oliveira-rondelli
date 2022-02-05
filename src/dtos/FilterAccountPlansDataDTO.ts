export interface FilterAccountPlansDataDTO {
  identificacao: string;
  tipo: string;
  orderByDescending: "old" | "new" | boolean;
}