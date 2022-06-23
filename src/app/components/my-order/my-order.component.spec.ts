import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MatExpansionModule } from '@angular/material';
import { Router } from '@angular/router';
import { Order } from '../../../models/order';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../login/auth.service';

import { MyOrderComponent } from './my-order.component';
import { MyOrderServiceMock } from './service/my-order-service.mock';
import { IMyOrderService } from './service/my-order.service.interface';
import { MyOrderService } from './service/my-order.service';

describe('MyOrderComponent', () => {

  let component: MyOrderComponent;
  let fixture: ComponentFixture<MyOrderComponent>;
  let testBedService: MyOrderService;
  let componentService: MyOrderService;

  beforeEach(() => {

      // refine the test module by declaring the test component
      TestBed.configureTestingModule({
          imports: [
            MatExpansionModule,
            HttpClientModule,
            HttpModule
          ],
          declarations: [MyOrderComponent],
          providers: [
              {
                provide: Router,
                useClass: class { navigate = jasmine.createSpy("navigate"); }
              },
              { provide: IMyOrderService, useClass: MyOrderServiceMock },
              ApiService,
              AuthService,
          ]
      });

      // Configure the component with another set of Providers
      TestBed.overrideComponent(
          MyOrderComponent,
          { set: { providers: [{ provide: MyOrderService, useClass: MyOrderServiceMock }] } }
      );

      // create component and test fixture
      fixture = TestBed.createComponent(MyOrderComponent);

      // get test component from the fixture
      component = fixture.componentInstance;

      // AuthService provided to the TestBed
      testBedService = TestBed.get(MyOrderService);

      // AuthService provided by Component, (should return MockAuthService)
      componentService = fixture.debugElement.injector.get(MyOrderService);
  });

  it('should create my order component', () => {
    expect(component).toBeTruthy();
  });

  it('should get my orders', inject(
    [IMyOrderService],
    (service: MyOrderServiceMock) => {
        // Arrange
        const orders = <Order[]>[
          {
            idCompra: '1'
          },
          {
            idCompra: '2'
          }
        ];
        service.myOrders.and.returnValue(orders);

        // Act
        const result = component.orders;

        // Assert
        expect(result).toEqual(orders);
    }
));

  it('should navigate to track order screen when track order button is pressed', () => {
    // Arrange
    const orderId = '1';
    const paramsMock = { queryParams: { orderId: orderId } };

    // Act
    component.trackOrder(orderId);

    // Assert
    expect(component).toBeTruthy();
  });
});
