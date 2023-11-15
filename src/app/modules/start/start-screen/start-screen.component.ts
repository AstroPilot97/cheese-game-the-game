import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit {
  private app = new PIXI.Application({
    background: '#1099bb',
    resizeTo: window,
  });

  ngOnInit(): void {
    // this.renderBackground();
  }

  // renderBackground(): void {
  //   document.body.appendChild<any>(this.app.view);
  //   const bunny = PIXI.Sprite.from('assets/sprites/cheese.png');
  //   this.app.stage.addChild(bunny);

  //   // center the sprite's anchor point
  //   bunny.anchor.set(0.5);

  //   // move the sprite to the center of the screen
  //   bunny.y = this.app.screen.height / 2;

  //   this.app.stage.addChild(bunny);

  //   // Listen for animate update
  //   this.app.ticker.add((delta) => {
  //     // just for fun, let's rotate mr rabbit a little
  //     // delta is 1 if running at 100% performance
  //     // creates frame-independent transformation
  //     bunny.rotation += 0.1 * delta;
  //   });
  // }
}
