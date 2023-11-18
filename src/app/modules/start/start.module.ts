import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ShopComponent } from './shop/shop.component';

@NgModule({
  declarations: [StartScreenComponent, ShopComponent],
  imports: [CommonModule, StartRoutingModule, CardModule, ButtonModule],
})
export class StartModule {}
