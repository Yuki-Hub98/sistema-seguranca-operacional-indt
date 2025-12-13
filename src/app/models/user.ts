export interface User {
    id: number;
    username: string;
    email?: string;
    password?: string;
    firstName: string;
    lastName?: string;
    roles: UserRole[];
    isActive: boolean;
}


export enum UserRole {
    ADMIN = 'ADMIN',
    OPERADOR = 'OPERADOR',
    SUPERVISOR = 'SUPERVISOR',
    VISITANTE = 'VISITANTE',
    GESTOR = 'GESTOR'
}