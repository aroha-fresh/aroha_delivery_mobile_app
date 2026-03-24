import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowForwardOutline,
  calendarOutline,
  checkmarkCircleOutline,
  cubeOutline,
  locationOutline,
  mapOutline,
  moonOutline,
  ribbonOutline,
  statsChartOutline,
  timeOutline,
  waterOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonIcon, CommonModule, RouterLink]
})
export class DashboardPage {
  readonly agentName = 'Arjun';
  readonly shiftLabel = 'Morning Route';
  readonly todayLabel = 'Tue, 24 Mar';
  readonly totalStops = 28;
  readonly completedStops = 12;
  readonly pendingStops = 16;
  readonly milkQuantity = '186 L';
  readonly extraProducts = 34;
  readonly alternateDayCount = 6;
  readonly oneTimeCount = 4;
  readonly nextDelivery = {
    customer: 'Green Meadows Residency',
    area: 'Anna Nagar West',
    eta: '7 mins away',
    window: '06:30 AM - 06:45 AM',
    orderSummary: '12 milk packets, 2 curd tubs'
  };

  readonly quickMetrics = [
    { label: 'Milk volume', value: this.milkQuantity, icon: 'water-outline', tone: 'primary' },
    { label: 'Extra products', value: `${this.extraProducts}`, icon: 'cube-outline', tone: 'tertiary' },
    { label: 'Alternate-day', value: `${this.alternateDayCount}`, icon: 'moon-outline', tone: 'secondary' },
    { label: 'One-time', value: `${this.oneTimeCount}`, icon: 'ribbon-outline', tone: 'secondary' }
  ];

  readonly quickActions = [
    { label: 'List View', icon: 'calendar-outline', route: '/deliveries' },
    { label: 'Map View', icon: 'map-outline', route: '/deliveries/map' },
    { label: 'Completed', icon: 'checkmark-circle-outline', route: '/deliveries' },
    { label: 'Day Summary', icon: 'stats-chart-outline', route: '/day-summary' }
  ];

  constructor() {
    addIcons({
      arrowForwardOutline,
      calendarOutline,
      checkmarkCircleOutline,
      cubeOutline,
      locationOutline,
      mapOutline,
      moonOutline,
      ribbonOutline,
      statsChartOutline,
      timeOutline,
      waterOutline
    });
  }

  get progressPercent(): number {
    return Math.round((this.completedStops / this.totalStops) * 100);
  }
}
