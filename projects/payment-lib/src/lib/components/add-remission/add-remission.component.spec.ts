import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { AddRemissionComponent } from './add-remission.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('Add remission component', () => {
  let component: AddRemissionComponent,
  fixture: ComponentFixture<AddRemissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRemissionComponent],
      providers: [PaymentViewService, PaymentLibComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
      ],
    });

    fixture = TestBed.createComponent(AddRemissionComponent);
    component = fixture.componentInstance;
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

});
