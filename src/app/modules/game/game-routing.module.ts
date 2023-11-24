import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngineComponent } from './engine/engine.component';

const routes: Routes = [{ path: '', component: EngineComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
