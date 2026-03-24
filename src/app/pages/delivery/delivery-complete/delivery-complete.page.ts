import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonButton, IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  alertCircleOutline,
  arrowBackOutline,
  cameraOutline,
  chatbubbleEllipsesOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  keyOutline,
  pencilOutline,
  refreshOutline,
  receiptOutline,
  timeOutline
} from 'ionicons/icons';
import { CustomerInfoCardComponent } from 'src/app/components/customer-info-card/customer-info-card.component';
import { DeliveryProductItem, ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { SectionHeaderComponent } from 'src/app/components/section-header/section-header.component';
import { DeliveryStatus, ScheduleType, StatusChipComponent } from 'src/app/components/status-chip/status-chip.component';

type CompletionAction = 'delivered' | 'failed' | 'skipped';

interface ProofOption {
  key: 'otp' | 'photo' | 'signature' | 'note';
  label: string;
  helper: string;
  icon: string;
}

@Component({
  selector: 'app-delivery-complete',
  templateUrl: './delivery-complete.page.html',
  styleUrls: ['./delivery-complete.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonIcon,
    CommonModule,
    FormsModule,
    CustomerInfoCardComponent,
    ProductListComponent,
    SectionHeaderComponent,
    StatusChipComponent
  ]
})
export class DeliveryCompletePage {
  readonly stopId: number;
  selectedAction: CompletionAction = 'delivered';
  otpCode = '';
  deliveryNote = '';
  selectedReason = '';
  proofState = {
    otp: true,
    photo: false,
    signature: false,
    note: false
  };

  readonly customerName = 'Green Meadows Residency';
  readonly customerCode = 'C-184';
  readonly routeLabel = 'Stop 01 • Zone A';
  readonly address = '12 Palm Grove Main Road, Anna Nagar West';
  readonly landmark = 'Security desk accepts early-morning handoff.';
  readonly scheduleType: ScheduleType = 'daily';
  readonly currentStatus: DeliveryStatus = 'in-progress';
  readonly timeSlot = '06:30 AM - 06:45 AM';
  readonly milkItems: DeliveryProductItem[] = [
    { name: 'Toned Milk', quantity: '10 x 500ml' },
    { name: 'Full Cream Milk', quantity: '2 x 1L' }
  ];
  readonly extraItems: DeliveryProductItem[] = [
    { name: 'Curd Tub', quantity: '2' }
  ];
  readonly reasons = [
    'Customer unavailable',
    'Address locked',
    'Payment issue',
    'Route blocked',
    'Product damaged'
  ];
  readonly proofOptions: ProofOption[] = [
    { key: 'otp', label: 'OTP', helper: 'Customer confirmation code', icon: 'key-outline' },
    { key: 'photo', label: 'Photo', helper: 'Doorstep proof capture', icon: 'camera-outline' },
    { key: 'signature', label: 'Signature', helper: 'Manual recipient sign-off', icon: 'pencil-outline' },
    { key: 'note', label: 'Note', helper: 'Add delivery remark', icon: 'chatbubble-ellipses-outline' }
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.stopId = Number(this.route.snapshot.paramMap.get('id') ?? '1');
    addIcons({
      alertCircleOutline,
      arrowBackOutline,
      cameraOutline,
      chatbubbleEllipsesOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      keyOutline,
      pencilOutline,
      receiptOutline,
      refreshOutline,
      timeOutline
    });
  }

  get itemSummary(): string {
    return '12 milk packets • 2 extras';
  }

  get selectedActionLabel(): string {
    return this.selectedAction.charAt(0).toUpperCase() + this.selectedAction.slice(1);
  }

  get finalCtaLabel(): string {
    return this.selectedAction === 'delivered' ? 'Confirm Delivery' : 'Submit Status';
  }

  get proofSummary(): string[] {
    const items: string[] = [];
    if (this.selectedAction === 'delivered' && this.proofState.otp && this.otpCode.trim()) {
      items.push('OTP added');
    }
    if (this.proofState.photo) {
      items.push('Photo ready');
    }
    if (this.proofState.signature) {
      items.push('Signature required');
    }
    if (this.proofState.note && this.deliveryNote.trim()) {
      items.push('Note added');
    }
    if ((this.selectedAction === 'failed' || this.selectedAction === 'skipped') && this.selectedReason) {
      items.push(this.selectedReason);
    }
    return items;
  }

  selectAction(action: CompletionAction): void {
    this.selectedAction = action;
    if (action === 'delivered') {
      this.selectedReason = '';
      return;
    }
    this.proofState.otp = false;
    this.otpCode = '';
  }

  toggleProof(key: ProofOption['key']): void {
    this.proofState[key] = !this.proofState[key];
  }

  resetProof(): void {
    this.otpCode = '';
    this.deliveryNote = '';
    this.selectedReason = '';
    this.proofState = {
      otp: this.selectedAction === 'delivered',
      photo: false,
      signature: false,
      note: false
    };
  }

  cancel(): void {
    void this.router.navigate(['/delivery', this.stopId]);
  }

  confirm(): void {
    void this.router.navigate(['/deliveries']);
  }
}
