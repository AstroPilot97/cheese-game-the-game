import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: '', component: StartScreenComponent },
  { path: 'shop', component: ShopComponent },
  {
    path: 'cheese',
    loadChildren: () => import('../game/game.module').then((m) => m.GameModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartRoutingModule {}
