import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EngineService } from '../../game/engine/engine.service';
import { ShopService } from './shop.service';

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
      name: 'Top Hat',
      fileName: 'top_hat',
      description: 'Got quite the knacker for style.',
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

  public constructor(private shopService: ShopService) {}

  public ngOnInit(): void {
    this.shopService.createScene(this.rendererCanvas);
    this.shopService.animate();
  }

  public previewHat(hat: {
    name: string;
    fileName: string;
    description: string;
    price: string;
  }): void {
    this.shopService.addHatToCheese(hat);
  }
}
