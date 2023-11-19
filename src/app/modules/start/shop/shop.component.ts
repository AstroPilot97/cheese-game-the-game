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
      description: 'Good brie, my dear ol chap.',
      price: '$2.49',
    },
    {
      name: 'Cowboy Hat',
      fileName: 'cowboy_hat',
      description: "Steppin' on thin wedge, pardner.",
      price: '$2.49',
    },
    {
      name: 'Clown Hat',
      fileName: 'clown_hat',
      description: 'Camembert circus.',
      price: '$2.49',
    },
    {
      name: 'Rice Hat',
      fileName: 'rice_hat',
      description: 'Welcome to the gouda fields.',
      price: '$2.49',
    },
    {
      name: 'Beanie',
      fileName: 'beanie',
      description: 'Life, man.',
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
