import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NewProductComponent } from './new-product/new-product.component';

export interface Product { name: string; serial_name: number, price: number }
@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let product of products | async">
        {{ product.name }}
      </li>
    </ul>
  `
})

export class AppComponent implements OnInit{
  private productCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  modalRef: BsModalRef | undefined;

  constructor(private afs: AngularFirestore, private modalServ: BsModalService) {
    this.productCollection = afs.collection<Product>('products');
    this.products = this.productCollection.valueChanges();
  }

  ngOnInit() {
  }

  addItem() {
    this.modalRef = this.openModal(NewProductComponent);
    this.modalRef.content.onClose.subscribe(
      (next: any) => {
        if(next) {
          console.log(this.modalRef?.content);
          //this.productCollection.add(this.modalRef?.content);
        }
      }
    );
  }

  returnProducts(){
    return this.products;
  }

  openModal(component: any, stateLabel?: string, stateData?: any) {
    return this.modalServ.show(component, <ModalOptions>{
      class: "modal-dialog-centered",
      initialState: {
        'data': stateData
      }
    });
  }
}
