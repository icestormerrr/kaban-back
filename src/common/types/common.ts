export type Primitive = number | string | boolean;

export type Unknown<T> = {
   [K in keyof T]: unknown
}