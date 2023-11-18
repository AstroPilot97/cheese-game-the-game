import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EngineService } from '../../game/engine/engine.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  public hatList = [
    {
      name: 'Christmas Hat',
      fileName: 'christmas_hat',
      description: 'Ho-Ho-Holy cheese!',
      price: '$2.49',
    },
    {
      name: 'Christmas Hat',
      fileName: 'christmas_hat',
      description: 'Ho-Ho-Holy cheese!',
      price: '$2.49',
    },
    {
      name: 'Christmas Hat',
      fileName: 'christmas_hat',
      description: 'Ho-Ho-Holy cheese!',
      price: '$2.49',
    },
    {
      name: 'Christmas Hat',
      fileName: 'christmas_hat',
      description: 'Ho-Ho-Holy cheese!',
      price: '$2.49',
    },
    {
      name: 'Christmas Hat',
      fileName: 'christmas_hat',
      description: 'Ho-Ho-Holy cheese!',
      price: '$2.49',
    },
    {
      name: 'Christmas Hat',
      fileName: 'christmas_hat',
      description: 'Ho-Ho-Holy cheese!',
      price: '$2.49',
    },
    {
      name: 'Christmas Hat',
      fileName: 'christmas_hat',
      description: 'Ho-Ho-Holy cheese!',
      price: '$2.49',
    },
    {
      name: 'Christmas Hat',
      fileName: 'christmas_hat',
      description: 'Ho-Ho-Holy cheese!',
      price: '$2.49',
    },
    {
      name: 'Christmas Hat',
      fileName: 'christmas_hat',
      description: 'Ho-Ho-Holy cheese!',
      price: '$2.49',
    },
  ];

  public constructor(private engServ: EngineService) {}

  public ngOnInit(): void {
    this.engServ.createScene(this.rendererCanvas);
    this.engServ.animate();
  }
}
