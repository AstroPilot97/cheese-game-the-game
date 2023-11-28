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
  AxesViewer,
} from '@babylonjs/core';
import { Inspector } from '@babylonjs/inspector';

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
      new Vector3(-5, -5, 0),
      this.scene
    );

    this.sunlight.position = new Vector3(10, 20, -8);
    this.sunlight.intensity = 1.2;

    // const helper = new DirectionalLightFrustumViewer(
    //   this.sunlight,
    //   this.camera
    // );

    this.shadowGenerator = new ShadowGenerator(8192, this.sunlight);
    this.shadowGenerator.useContactHardeningShadow = true;

    this.initCheeses();
    this.initEnvironement();
    this.initMoustache();

    Inspector.Show(this.scene, {});
  }

  public initCheeses(): void {
    SceneLoader.ImportMesh(
      '',
      'assets/models/cheese/',
      'cheese.glb',
      this.scene,
      (meshes) => {
        meshes.forEach((mesh) => {
          mesh.receiveShadows = true;
          this.shadowGenerator.addShadowCaster(mesh, true);
        });
      }
    );

    SceneLoader.ImportMesh(
      '',
      'assets/models/cheese/',
      'cheddar.glb',
      this.scene,
      (meshes) => {
        meshes.forEach((mesh) => {
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
          mesh.receiveShadows = true;
          this.shadowGenerator.addShadowCaster(mesh, true);
        });
      }
    );

    SceneLoader.ImportMesh(
      '',
      'assets/models/cheese/',
      'half_cheese_wheel.glb',
      this.scene,
      (meshes) => {
        meshes.forEach((mesh) => {
          mesh.receiveShadows = true;
          this.shadowGenerator.addShadowCaster(mesh, true);
        });
      }
    );

    SceneLoader.ImportMesh(
      '',
      'assets/models/cheese/',
      'roquefort_cheese.glb',
      this.scene,
      (meshes) => {
        meshes.forEach((mesh) => {
          mesh.receiveShadows = true;
          this.shadowGenerator.addShadowCaster(mesh, true);
        });
      }
    );

    SceneLoader.ImportMesh(
      '',
      'assets/models/cheese/',
      'parmesan.glb',
      this.scene,
      (meshes) => {
        meshes.forEach((mesh) => {
          mesh.receiveShadows = true;
          this.shadowGenerator.addShadowCaster(mesh, true);
        });
      }
    );

    SceneLoader.ImportMesh(
      '',
      'assets/models/cheese/',
      'blue_cheese.glb',
      this.scene,
      (meshes) => {
        meshes.forEach((mesh) => {
          mesh.receiveShadows = true;
          this.shadowGenerator.addShadowCaster(mesh, true);
        });
      }
    );
  }

  public initEnvironement(): void {
    SceneLoader.ImportMesh(
      '',
      'assets/models/structures/',
      'capital_isle.glb',
      this.scene,
      (meshes) => {
        meshes.forEach((mesh) => {
          if (
            mesh.name.includes('Guest') ||
            mesh.name.includes('queen') ||
            mesh.name.includes('Moon') ||
            mesh.name.includes('Sun') ||
            mesh.name.includes('Viking') ||
            mesh.name.includes('archer')
          ) {
            mesh.dispose();
          }
          mesh.receiveShadows = true;
          this.shadowGenerator.addShadowCaster(mesh, true);
        });
      }
    );

    SceneLoader.ImportMesh(
      '',
      'assets/models/skybox/',
      'anime_sky.glb',
      this.scene,
      (meshes) => {
        meshes.forEach((mesh) => {
          mesh.scaling = new Vector3(2, 2, 2);
        });
      }
    );
  }

  public initMoustache(): void {
    SceneLoader.ImportMesh(
      '',
      'assets/models/moustache/',
      'mustache.glb',
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
