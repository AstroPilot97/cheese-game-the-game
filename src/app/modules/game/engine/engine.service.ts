import { WindowRefService } from '../../../services/window-ref.service';
import { ElementRef, Injectable, NgZone } from '@angular/core';
import {
  Engine,
  FreeCamera,
  Scene,
  Vector3,
  HemisphericLight,
  SceneLoader,
  DirectionalLight,
  DirectionalLightFrustumViewer,
  ShadowGenerator,
  Tools,
  Space,
  Quaternion,
} from '@babylonjs/core';

@Injectable({ providedIn: 'root' })
export class EngineService {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private camera: FreeCamera;
  private scene: Scene;
  private hemiLight: HemisphericLight;
  private sunlight: DirectionalLight;
  private shadowGenerator: ShadowGenerator;

  public constructor(
    private ngZone: NgZone,
    private windowRef: WindowRefService
  ) {}

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;

    // Then, load the Babylon 3D engine:
    this.engine = new Engine(this.canvas, true);

    // create a basic BJS Scene object
    this.scene = new Scene(this.engine);

    // create a FreeCamera, and set its position to (x:5, y:10, z:-20 )
    this.camera = new FreeCamera(
      'camera1',
      new Vector3(5, 10, -20),
      this.scene
    );

    // target the camera to scene origin
    this.camera.setTarget(Vector3.Zero());

    // attach the camera to the canvas
    this.camera.attachControl(this.canvas, false);

    this.scene.activeCamera = this.camera;

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    this.hemiLight = new HemisphericLight(
      'light1',
      new Vector3(0, 1, 0),
      this.scene
    );

    this.hemiLight.intensity = 0.3;

    this.sunlight = new DirectionalLight(
      'sunlight',
      new Vector3(-2, -1, 1.8),
      this.scene
    );

    this.sunlight.position = new Vector3(10, 10, -10);
    this.sunlight.intensity = 1.2;

    this.shadowGenerator = new ShadowGenerator(4096, this.sunlight);
    this.shadowGenerator.useContactHardeningShadow = true;

    this.initCheeses();
    this.initBarEnvironement();
  }

  public initCheeses(): void {
    // SceneLoader.ImportMesh(
    //   '',
    //   'assets/models/cheese/',
    //   'cheese.glb',
    //   this.scene,
    //   (meshes) => {
    //     meshes.forEach((mesh) => {
    //       mesh.scaling = new Vector3(0.6, 0.6, 0.6);
    //       mesh.position = new Vector3(-3, -2, 1.5);
    //       mesh.rotation = new Vector3(Math.PI, 0, Math.PI);
    //       this.shadowGenerator.addShadowCaster(mesh, true);
    //     });
    //   }
    // );

    SceneLoader.ImportMesh(
      '',
      'assets/models/cheese/',
      'cheddar.glb',
      this.scene,
      (meshes) => {
        meshes.forEach((mesh) => {
          mesh.scaling = new Vector3(8, 8, 8);
          mesh.rotation = new Vector3(0, 0, Math.PI / 2);
          mesh.position = new Vector3(5, 3, 0);
          mesh.receiveShadows = true;
          this.shadowGenerator.addShadowCaster(mesh, true);
        });
      }
    );

    SceneLoader.ImportMesh(
      '',
      'assets/models/cheese/',
      'brie.glb',
      this.scene,
      (meshes) => {
        meshes.forEach((mesh) => {
          mesh.scaling = new Vector3(0.26, 0.26, 0.26);
          mesh.rotation = new Vector3(Math.PI / 2, Math.PI / 4, Math.PI);
          mesh.position = new Vector3(5.6, 1.35, -3.2);
          mesh.receiveShadows = true;
          this.shadowGenerator.addShadowCaster(mesh, true);
        });
      }
    );
  }

  public initBarEnvironement(): void {
    SceneLoader.ImportMesh(
      '',
      'assets/models/structures/',
      'sushi_bar.glb',
      this.scene,
      (meshes) => {
        meshes.forEach((mesh) => {
          mesh.receiveShadows = true;
          this.shadowGenerator.addShadowCaster(mesh, true);
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
