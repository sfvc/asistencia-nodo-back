export interface Personal {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  dni: number;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
}