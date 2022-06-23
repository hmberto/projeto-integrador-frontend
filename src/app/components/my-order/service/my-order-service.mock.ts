import { IMyOrderService } from './my-order.service.interface';
import {} from 'jasmine';
import { MyOrderService } from './my-order.service';

export class MyOrderServiceMock extends MyOrderService {
    orderData: jasmine.Spy = jasmine.createSpy('orderData');
    myOrders: jasmine.Spy = jasmine.createSpy('myOrders');
}
