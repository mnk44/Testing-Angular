import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../app.component';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  amount: any;
  name: any;
  serial_number: any;

  product: Product | undefined;

  onClose =  new BehaviorSubject<boolean>(false);

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onCancel() {
    console.log('onCancel');
    this.modalRef.hide();
  }

  increase() {
    this.amount = this.amount + 0.1;
  }

  decrease() {
    this.amount = this.amount - 0.1;
  }

  setAmount(){
    this.onClose.next(true);
    this.modalRef.content['product'] = this.product;
    this.modalRef.hide();
  }

}
