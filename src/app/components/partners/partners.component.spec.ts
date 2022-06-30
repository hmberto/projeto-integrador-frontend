import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PartnersComponent } from './partners.component';


describe('PartnersComponent', () => {
  let component: PartnersComponent;
  let fixture: ComponentFixture<PartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartnersComponent],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create partners component', () => {
    expect(component).toBeTruthy();
  });
});
