import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { PharmacyComponent } from './pharmacy.component';
import { PharmacyService } from './pharmacy.service';


describe('PharmacyComponent', () => {
  let component: PharmacyComponent;
  let fixture: ComponentFixture<PharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpModule
      ],
      declarations: [PharmacyComponent],
      providers: [
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        },
        PharmacyService,
        ApiService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create pharmacy component', () => {
    expect(component).toBeTruthy();
  });
});
