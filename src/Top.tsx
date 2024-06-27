import { useEffect, useRef } from "react";
import AOS from "aos";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VRMLoaderPlugin } from "@pixiv/three-vrm";
import {
  createVRMAnimationClip,
  VRMAnimationLoaderPlugin,
} from "@pixiv/three-vrm-animation";

export default function Top() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const viewVroid = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(-0.08, 1.4, -0.6);
    camera.rotation.set(0, Math.PI * 0.9, 0);

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0xffffff, 0);

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(-1, 1, -1).normalize();
    scene.add(light);

    // VRM要素の準備
    let currentVrm: any = undefined;
    let currentVrmAnimation: any = undefined;
    let currentMixer: any = undefined;

    // ファイルの読み込み
    function load(url: string) {
      loader.load(
        url,
        // ロード時に呼ばれる
        (gltf) => {
          tryInitVRM(gltf);
          tryInitVRMA(gltf);
        },
        // プログレス時に呼ばれる
        (progress) =>
          console.log(
            "Loading model...",
            100.0 * (progress.loaded / progress.total),
            "%"
          ),
        // エラー時に呼ばれる
        (error) => console.error(error)
      );
    }

    // VRMの読み込み
    function tryInitVRM(gltf: any) {
      const vrm = gltf.userData.vrm;
      if (vrm == null) {
        return;
      }
      currentVrm = vrm;
      scene.add(vrm.scene);
      initAnimationClip();
    }

    // VRMAの読み込み
    function tryInitVRMA(gltf: any) {
      const vrmAnimations = gltf.userData.vrmAnimations;
      if (vrmAnimations == null) {
        return;
      }
      currentVrmAnimation = vrmAnimations[0] ?? null;
      initAnimationClip();
    }

    // オーディオクリップの初期化
    function initAnimationClip() {
      if (currentVrm && currentVrmAnimation) {
        currentMixer = new THREE.AnimationMixer(currentVrm.scene);
        const clip = createVRMAnimationClip(currentVrmAnimation, currentVrm);
        currentMixer.clipAction(clip).play();
      }
    }

    // ローダーの準備
    const loader = new GLTFLoader();
    loader.register((parser) => {
      return new VRMLoaderPlugin(parser);
    });
    loader.register((parser) => {
      return new VRMAnimationLoaderPlugin(parser);
    });

    // VRMとVRMAの読み込み
    load("/vroid/girl3.vrm");
    load("/vrma/VRMA_01.vrma");

    // clock備
    const clock = new THREE.Clock();
    clock.start();

    // フレーム毎に呼ばれる
    const update = () => {
      requestAnimationFrame(update);

      const deltaTime = clock.getDelta();
      if (currentMixer) {
        currentMixer.update(deltaTime);
      }
      if (currentVrm) {
        currentVrm.update(deltaTime);
      }

      renderer.render(scene, camera);
    };
    update();
  };

  useEffect(() => {
    viewVroid();

    AOS.init({ duration: 2000 });
  }, []);

  return (
    <section className="relative w-screen h-screen bg-color bg-cover flex items-center">
      <h2
        className="catch-copy text-3xl font-bold mx-auto font-Shippori text-zinc-700 z-10"
        data-aos="fade-in"
        data-aos-anchor-placement="top-center"
      >
        aaaaa
      </h2>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 z-0 w-screen h-screen"
      />
    </section>
  );
}
