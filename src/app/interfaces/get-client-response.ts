export interface Response {
    trxId: string
    trxFchhr: string
    error: any
    datos: Datos
  }
  
  export interface Datos {
    cliente: Cliente
    code: string
    idCode: number
    mensaje: string
    rutFactoring: any
  }
  
  export interface Cliente {
    id: number
    rut: string
    nombre: string
    apellido: string
    email: string
  }
  