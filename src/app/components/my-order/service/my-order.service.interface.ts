import { Order } from "../../../../models/order";


export abstract class IMyOrderService {
    abstract orderData(session);
    abstract myOrders(): Order[];
}
