import { OrderItem } from "./order-item";

export interface Order {
    name: string;
    email: string;
    phone: string;
    orderItems : OrderItem[];
}
