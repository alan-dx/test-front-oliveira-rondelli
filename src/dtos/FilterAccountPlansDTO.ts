export interface FilterAccountPlansDataDTO {
  tipo?: string;
  identificacao?: string;
  orderByDescending?: "old" | "new" | boolean;
}