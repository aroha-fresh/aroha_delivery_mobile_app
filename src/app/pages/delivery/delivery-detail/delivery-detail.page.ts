import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  alertCircleOutline,
  arrowBackOutline,
  cameraOutline,
  checkmarkCircleOutline,
  chatbubbleEllipsesOutline,
  keyOutline,
  receiptOutline,
  timeOutline
} from 'ionicons/icons';
import { CustomerInfoCardComponent } from 'src/app/components/customer-info-card/customer-info-card.component';
import { DeliveryProductItem, ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { SectionHeaderComponent } from 'src/app/components/section-header/section-header.component';
import { DeliveryStatus, ScheduleType, StatusChipComponent } from 'src/app/components/status-chip/status-chip.component';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.page.html',
  styleUrls: ['./delivery-detail.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonIcon,
    CommonModule,
    CustomerInfoCardComponent,
    ProductListComponent,
    SectionHeaderComponent,
    StatusChipComponent
  ]
})
export class DeliveryDetailPage {
  readonly customerName = 'Green Meadows Residency';
  readonly customerCode = 'C-184';
  readonly address = '12 Palm Grove Main Road, Anna Nagar West';
  readonly landmark = 'Leave at gate if security confirms. Call if no response.';
  readonly routeLabel = 'Stop 01 • Zone A';
  readonly scheduleType: ScheduleType = 'daily';
  readonly status: DeliveryStatus = 'in-progress';
  readonly timeSlot = '06:30 AM - 06:45 AM';
  readonly sequenceLabel = '#01';
  readonly deliveryNotes = [
    'Call before entering the apartment block.',
    'Leave milk crate at security desk if customer is unavailable.'
  ];
  readonly proofOptions = [
    { label: 'OTP Verification', helper: 'Confirm secure handoff', icon: 'key-outline' },
    { label: 'Photo Capture', helper: 'Record doorstep placement', icon: 'camera-outline' },
    { label: 'Signature', helper: 'Use for manual confirmation', icon: 'receipt-outline' },
    { label: 'Delivery Note', helper: 'Add delivery remarks', icon: 'chatbubble-ellipses-outline' }
  ];
  readonly milkItems: DeliveryProductItem[] = [
    { name: 'Toned Milk', quantity: '10 x 500ml' },
    { name: 'Full Cream Milk', quantity: '2 x 1L' }
  ];
  readonly extraItems: DeliveryProductItem[] = [
    { name: 'Curd Tub', quantity: '2' }
  ];

  constructor() {
    addIcons({
      alertCircleOutline,
      arrowBackOutline,
      cameraOutline,
      checkmarkCircleOutline,
      chatbubbleEllipsesOutline,
      keyOutline,
      receiptOutline,
      timeOutline
    });
  }

  get milkSummary(): string {
    return '12 packets';
  }

  get extraSummary(): string {
    return this.extraItems.length ? `${this.extraItems.length} extra item${this.extraItems.length > 1 ? 's' : ''}` : 'No extras';
  }
}
