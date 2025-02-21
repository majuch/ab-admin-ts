export interface ICashRegister {
    id: number;
    folio: string;
    factura: string;
    importe: number;
    forma_pago: string;
    usuario: string;
    cliente: string;
    concepto: string;
    terminal: string;
    fecha: string;
    hora: string;
    referencia: string;
    tipo: string;
    caja: string;
    id_nota: number;
    cancelada: boolean;
    id_pago: number;
}

export interface ICashRegisterBox {
    id_cash_register: number;
    nombre: string;
}