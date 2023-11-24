import { WindowRefService } from '../../../services/window-ref.service';
import { ElementRef, Injectable, NgZone } from '@angular/core';
import {
  Engine,
  FreeCamera,
  Scene,
  Light,
  Mesh,
  Color3,
  Color4,
  Vector3,
  HemisphericLight,
  StandardMaterial,
  Texture,
  DynamicTexture,
  Space,
  ArcRotateCamera,
  MeshBuilder,
  SceneLoader,
  MirrorTexture,
  Plane,
  Constants,
  SSRRenderingPipeline,
} from '@babylonjs/core';

@Injectable({ providedIn: 'root' })
export class EngineService {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private camera: FreeCamera;
  private scene: Scene;
  private light: Light;

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
    this.scene.clearColor = new Color4(1, 1, 1, 1);

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
    this.light = new HemisphericLight(
      'light1',
      new Vector3(0, 1, 0),
      this.scene
    );

    this.initCheeseDisplay();
    this.initSSR();
  }

  public initCheeseDisplay(): void {
    SceneLoader.ImportMesh(
      '',
      'assets/models/cheese/',
      'cheese.glb',
      this.scene
    );
  }

  public initSSR(): void {
    const ground = MeshBuilder.CreateGround(
      'ground',
      { width: 128, height: 128 },
      this.scene
    );

    const mirrorMaterial = new StandardMaterial('mirror', this.scene);
    mirrorMaterial.specularColor = new Color3(1, 1, 1);

    ground.material = mirrorMaterial;

    ground.position.y = -1.1;

    const ssr = new SSRRenderingPipeline(
      'ssr', // The name of the pipeline
      this.scene, // The scene to which the pipeline belongs
      [this.scene.activeCamera], // The list of cameras to attach the pipeline to
      false, // Whether or not to use the geometry buffer renderer (default: false, use the pre-pass renderer)
      Constants.TEXTURETYPE_UNSIGNED_BYTE // The texture type used by the SSR effect (default: TEXTURETYPE_UNSIGNED_BYTE)
    );

    ssr.thickness = 0.1;
    ssr.enableSmoothReflections = true;
    ssr.step = 15;

    ssr.isEnabled = true;
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
