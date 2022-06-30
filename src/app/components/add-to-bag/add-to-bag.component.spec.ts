import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { PharmacyService } from '../pharmacy/pharmacy.service';
import { ProductService } from '../products/product.service';

import { AddToBagComponent } from './add-to-bag.component';

describe('AddToBagComponent', () => {
  let component: AddToBagComponent;
  let fixture: ComponentFixture<AddToBagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpModule
      ],
      declarations: [ AddToBagComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of(convertToParamMap({ 
              search: ""
            }))
          }
        },
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        },
        ProductService,
        PharmacyService,
        ApiService
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
