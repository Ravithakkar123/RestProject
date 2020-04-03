import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopOwnerComponent } from './shop-owner.component';

describe('ShopOwnerComponent', () => {
  let component: ShopOwnerComponent;
  let fixture: ComponentFixture<ShopOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
