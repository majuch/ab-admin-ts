export interface ICustomer {
    id: number;
    r_social: string;
    rfc: string;
    phone: string;
    email: string;
    address: string;
    credit: number;
}

export interface Customer {
    id: number;
    r_social: string;
    rfc: string;
    phone: string;
    email: string;
    address: string;
    balance: number;
    credits: number;
    services: number;
}

export interface ICreditCustomer {
    id: number;
    date_note: string;
    date_promised: string;
    folio: string;
    factura: string;
    amount: number;
    abonos: number;
    saldo: number;
    status: string;
    dias: number;
}

export interface IServiceCustomer {
    id: number;
    fecha: string;
    dias: number;
    folio: string;
    importe: number;
    abonos: number;
    saldo: number;
    ubicacion: string;
    usuario: string;
    observaciones: string;
    vehiculo: number;
    solicita: string;
    status: string;
}