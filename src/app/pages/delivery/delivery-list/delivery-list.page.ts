import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeCircleOutline, funnelOutline, locationOutline, searchOutline } from 'ionicons/icons';
import { DeliveryCardComponent } from 'src/app/components/delivery-card/delivery-card.component';
import { EmptyStateComponent } from 'src/app/components/empty-state/empty-state.component';
import { SectionHeaderComponent } from 'src/app/components/section-header/section-header.component';
import { DeliveryProductItem } from 'src/app/components/product-list/product-list.component';
import { DeliveryStatus, ScheduleType } from 'src/app/components/status-chip/status-chip.component';

type FilterKey = 'all' | 'pending' | 'delivered' | 'alternate-day' | 'with-extras';

interface DeliveryStop {
  customerName: string;
  customerCode: string;
  address: string;
  landmark: string;
  routeLabel: string;
  scheduleType: ScheduleType;
  status: DeliveryStatus;
  milkSummary: string;
  extraSummary: string;
  timeSlot: string;
  sequenceLabel: string;
  milkItems: DeliveryProductItem[];
  extraItems: DeliveryProductItem[];
}

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.page.html',
  styleUrls: ['./delivery-list.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonIcon,
    CommonModule,
    FormsModule,
    DeliveryCardComponent,
    EmptyStateComponent,
    SectionHeaderComponent
  ]
})
export class DeliveryListPage {
  searchTerm = '';
  selectedFilter: FilterKey = 'all';

  readonly todayLabel = 'Tue, 24 Mar';
  readonly routeLabel = 'Morning Route';
  readonly filterOptions: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'alternate-day', label: 'Alternate-day' },
    { key: 'with-extras', label: 'With Extras' }
  ];

  readonly deliveries: DeliveryStop[] = [
    {
      customerName: 'Green Meadows Residency',
      customerCode: 'C-184',
      address: '12 Palm Grove Main Road, Anna Nagar West',
      landmark: 'Near East gate security booth',
      routeLabel: 'Stop 01 • Zone A',
      scheduleType: 'daily',
      status: 'in-progress',
      milkSummary: '12 packets',
      extraSummary: '2 items',
      timeSlot: '06:30 - 06:45',
      sequenceLabel: '#01',
      milkItems: [{ name: 'Toned Milk', quantity: '10 x 500ml' }, { name: 'Full Cream Milk', quantity: '2 x 1L' }],
      extraItems: [{ name: 'Curd Tub', quantity: '2' }]
    },
    {
      customerName: 'Maya Krishnan',
      customerCode: 'C-225',
      address: '44 Lake View Street, Mogappair East',
      landmark: 'Opposite children park',
      routeLabel: 'Stop 02 • Zone A',
      scheduleType: 'alternate-day',
      status: 'pending',
      milkSummary: '6 packets',
      extraSummary: 'No extras',
      timeSlot: '06:45 - 07:00',
      sequenceLabel: '#02',
      milkItems: [{ name: 'Cow Milk', quantity: '6 x 500ml' }],
      extraItems: []
    },
    {
      customerName: 'Vignesh Villa',
      customerCode: 'C-091',
      address: '9 Temple Avenue, Shenoy Nagar',
      landmark: 'Grey villa with side gate',
      routeLabel: 'Stop 03 • Zone B',
      scheduleType: 'one-time',
      status: 'pending',
      milkSummary: '8 packets',
      extraSummary: '3 items',
      timeSlot: '07:00 - 07:15',
      sequenceLabel: '#03',
      milkItems: [{ name: 'Full Cream Milk', quantity: '8 x 500ml' }],
      extraItems: [{ name: 'Paneer', quantity: '1' }, { name: 'A2 Ghee', quantity: '1' }, { name: 'Butter', quantity: '1' }]
    },
    {
      customerName: 'Lakshmi Narayanan',
      customerCode: 'C-048',
      address: '3 North Mada Street, Mylapore',
      landmark: 'Next to temple tank corner',
      routeLabel: 'Stop 07 • Zone C',
      scheduleType: 'daily',
      status: 'delivered',
      milkSummary: '4 packets',
      extraSummary: '1 item',
      timeSlot: '07:25 - 07:40',
      sequenceLabel: '#07',
      milkItems: [{ name: 'Toned Milk', quantity: '4 x 500ml' }],
      extraItems: [{ name: 'Curd Cup', quantity: '1' }]
    },
    {
      customerName: 'Skyline Heights',
      customerCode: 'C-302',
      address: '88 Club House Road, Kilpauk',
      landmark: 'Tower B service entrance',
      routeLabel: 'Stop 11 • Zone C',
      scheduleType: 'daily',
      status: 'delivered',
      milkSummary: '14 packets',
      extraSummary: 'No extras',
      timeSlot: '07:50 - 08:05',
      sequenceLabel: '#11',
      milkItems: [{ name: 'Toned Milk', quantity: '14 x 500ml' }],
      extraItems: []
    }
  ];

  constructor() {
    addIcons({ closeCircleOutline, funnelOutline, locationOutline, searchOutline });
  }

  get filteredDeliveries(): DeliveryStop[] {
    const query = this.searchTerm.trim().toLowerCase();

    return this.deliveries.filter((stop) => {
      const matchesSearch =
        !query ||
        [stop.customerName, stop.customerCode, stop.address, stop.landmark]
          .join(' ')
          .toLowerCase()
          .includes(query);

      const matchesFilter =
        this.selectedFilter === 'all' ||
        (this.selectedFilter === 'pending' && (stop.status === 'pending' || stop.status === 'in-progress')) ||
        (this.selectedFilter === 'delivered' && stop.status === 'delivered') ||
        (this.selectedFilter === 'alternate-day' && stop.scheduleType === 'alternate-day') ||
        (this.selectedFilter === 'with-extras' && stop.extraItems.length > 0);

      return matchesSearch && matchesFilter;
    });
  }

  get activeStops(): DeliveryStop[] {
    return this.filteredDeliveries.filter((stop) => stop.status !== 'delivered');
  }

  get nextStop(): DeliveryStop | null {
    return this.activeStops[0] ?? null;
  }

  get remainingActiveStops(): DeliveryStop[] {
    return this.activeStops.slice(1);
  }

  get completedStops(): DeliveryStop[] {
    return this.filteredDeliveries.filter((stop) => stop.status === 'delivered');
  }

  get totalStops(): number {
    return this.deliveries.length;
  }

  get pendingCount(): number {
    return this.deliveries.filter((stop) => stop.status === 'pending').length;
  }

  get inProgressCount(): number {
    return this.deliveries.filter((stop) => stop.status === 'in-progress').length;
  }

  get completedCount(): number {
    return this.deliveries.filter((stop) => stop.status === 'delivered').length;
  }

  get activeFilterCount(): number {
    return Number(this.selectedFilter !== 'all') + Number(this.searchTerm.trim().length > 0);
  }

  selectFilter(filter: FilterKey): void {
    this.selectedFilter = filter;
  }

  clearSearch(): void {
    this.searchTerm = '';
  }
}
