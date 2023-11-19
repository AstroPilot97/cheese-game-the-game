import { ElementRef, Injectable, NgZone } from '@angular/core';
import {
  Engine,
  ArcRotateCamera,
  Scene,
  Color4,
  HemisphericLight,
  Vector3,
  SceneLoader,
  Mesh,
} from '@babylonjs/core';
import { WindowRefService } from 'src/app/services/window-ref.service';
import '@babylonjs/loaders/glTF';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private camera: ArcRotateCamera;
  private scene: Scene;
  private light: HemisphericLight;
  private currentHat: Mesh;

  constructor(private ngZone: NgZone, private windowRef: WindowRefService) {}

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;

    this.engine = new Engine(this.canvas, true);

    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0, 0, 0, 0);

    this.camera = new ArcRotateCamera(
      'camera1',
      5,
      10,
      -1,
      new Vector3(5, 5, -20),
      this.scene
    );

    this.camera.lowerRadiusLimit = 10;
    this.camera.upperRadiusLimit = 10;

    this.camera.setTarget(Vector3.Zero());

    this.camera.attachControl(this.canvas, false);

    this.light = new HemisphericLight(
      'light1',
      new Vector3(0, 1, 0),
      this.scene
    );

    this.initCheeseDisplay();
  }

  public initCheeseDisplay(): void {
    SceneLoader.ImportMesh(
      '',
      'assets/models/cheese/',
      'cheese.glb',
      this.scene
    );

    SceneLoader.ImportMesh(
      '',
      'assets/models/pedestal/',
      'pedestal.glb',
      this.scene,
      (meshes) => {
        meshes.forEach((mesh) => {
          mesh.scaling = new Vector3(0.045, 0.045, 0.045);
          mesh.position = new Vector3(0.012, -0.01, -0.45);
        });
      }
    );
  }

  public addHatToCheese(hat: {
    name: string;
    fileName: string;
    description: string;
    price: string;
  }): void {
    if (this.currentHat) {
      this.currentHat.dispose();
    } else {
      this.currentHat = new Mesh('hat', this.scene);
    }
    SceneLoader.ImportMesh(
      '',
      'assets/models/hats/',
      hat.fileName + '.glb',
      this.scene,
      (meshes) => {
        meshes.forEach((mesh) => {
          mesh.setParent(this.currentHat);
        });
      }
    );
  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      const rendererLoopCallback = () => {
        this.scene.render();
      };

      if (this.windowRef.document.readyState !== 'loading') {
        this.engine.runRenderLoop(rendererLoopCallback);
      } else {
        this.windowRef.window.addEventListener('DOMContentLoaded', () => {
          this.engine.runRenderLoop(rendererLoopCallback);
        });
      }

      this.windowRef.window.addEventListener('resize', () => {
        this.engine.resize();
      });
    });
  }
}
