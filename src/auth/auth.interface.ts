export interface JwtAuthPayload {
  id: string;
  firstname: string;
  lastname: string;
  iat?: number;
  exp?: number;
}
