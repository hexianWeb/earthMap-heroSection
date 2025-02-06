import gsap from 'gsap';
import * as THREE from 'three'; // 动画持续时间（秒）

import Experience from '../experience.js';
import fragmentShader from './shader/fragment.glsl';
import vertexShader from './shader/vertex.glsl';

const DURATION_TIME = 2.5;

export default class EarthMap {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.sizes = this.experience.sizes;
    this.debug = this.experience.debug;
    this.debugActive = this.experience.debug.active;
    this.time = this.experience.time;

    // 初始化几何体、材质和网格
    this.setGeometry();
    this.setMaterial();
    this.setMesh();

    // 初始化完成后播放动画
    this.playAnimation();

    // 初始化调试面板
    this.setDebug();
  }

  setGeometry() {
    // 创建一个适应视窗的 PlaneGeometry
    const aspect = this.sizes.width / this.sizes.height;
    this.geometry = new THREE.PlaneGeometry(aspect * 2, 2);
  }

  setMaterial() {
    const texture = this.resources.items['earthTexture'];
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    // 创建一个简单的 ShaderMaterial
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTexture: {
          value: texture
        },
        uFadeStart: {
          value: 0 // 初始值改为 0
        },
        uMaxDistance: {
          value: 0.24 // 初始值改为 0.24
        },
        uStrength: {
          value: 1
        },
        uTime: {
          value: 0
        },
        uOffset: {
          // 添加偏移量 uniform
          value: new THREE.Vector2(0, 0)
        },
        uNoiseStrength: { value: 0.02 },
        uNoiseSpeed: { value: 0.5 },
        uMoveSpeed: { value: 1 }
      },
      transparent: true,
      side: THREE.DoubleSide
    });
  }

  setMesh() {
    // 将几何体和材质组合成 Mesh 并添加到场景中
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);

    // 初始化位置和旋转
    this.position = new THREE.Vector3(-0.11, -0.2, 0.75);
    this.rotation = new THREE.Euler(-0.75, 0, 0);

    this.mesh.position.copy(this.position);
    this.mesh.rotation.copy(this.rotation);
  }

  playAnimation() {
    // uFadeStart 动画：0 -> 0.24 -> 0
    gsap
      .timeline()
      .to(this.material.uniforms.uFadeStart, {
        value: 0.24,
        duration: DURATION_TIME / 2,
        ease: 'power2.inOut'
      })
      .to(this.material.uniforms.uFadeStart, {
        value: 0,
        duration: DURATION_TIME / 2,
        ease: 'power2.inOut'
      });

    // uMaxDistance 动画：0.24 -> 1
    gsap.to(this.material.uniforms.uMaxDistance, {
      value: 1,
      duration: DURATION_TIME,
      ease: 'power2.inOut'
    });

    // uStrength 动画：1 -> 0.72
    gsap.to(this.material.uniforms.uStrength, {
      value: 0.72,
      duration: DURATION_TIME,
      ease: 'power2.inOut'
    });
  }

  setDebug() {
    if (this.debugActive) {
      // 创建调试面板
      const earthMapFolder = this.debug.ui.addFolder({
        title: 'Earth Map',
        expanded: false
      });

      // 添加位置控制
      earthMapFolder
        .addBinding(this.position, 'x', {
          label: 'Position X',
          min: -10,
          max: 10,
          step: 0.01
        })
        .on('change', () => {
          this.mesh.position.copy(this.position);
        });

      earthMapFolder
        .addBinding(this.position, 'y', {
          label: 'Position Y',
          min: -10,
          max: 10,
          step: 0.01
        })
        .on('change', () => {
          this.mesh.position.copy(this.position);
        });

      earthMapFolder
        .addBinding(this.position, 'z', {
          label: 'Position Z',
          min: -10,
          max: 10,
          step: 0.01
        })
        .on('change', () => {
          this.mesh.position.copy(this.position);
        });

      // 添加旋转控制
      earthMapFolder
        .addBinding(this.rotation, 'x', {
          label: 'Rotation X',
          min: -Math.PI,
          max: Math.PI,
          step: 0.01
        })
        .on('change', () => {
          this.mesh.rotation.copy(this.rotation);
        });

      earthMapFolder
        .addBinding(this.rotation, 'y', {
          label: 'Rotation Y',
          min: -Math.PI,
          max: Math.PI,
          step: 0.01
        })
        .on('change', () => {
          this.mesh.rotation.copy(this.rotation);
        });

      earthMapFolder
        .addBinding(this.rotation, 'z', {
          label: 'Rotation Z',
          min: -Math.PI,
          max: Math.PI,
          step: 0.01
        })
        .on('change', () => {
          this.mesh.rotation.copy(this.rotation);
        });

      // 添加材质控制
      const materialFolder = earthMapFolder.addFolder({
        title: 'Material',
        expanded: false
      });
      materialFolder.addBinding(this.material.uniforms.uFadeStart, 'value', {
        label: 'Fade Start',
        min: 0,
        max: 1,
        step: 0.01
      });
      materialFolder.addBinding(this.material.uniforms.uMaxDistance, 'value', {
        label: 'Max Distance',
        min: 0,
        max: 1,
        step: 0.01
      });
      materialFolder.addBinding(this.material.uniforms.uStrength, 'value', {
        label: 'Strength',
        min: 0,
        max: 1,
        step: 0.01
      });
      // 新增调试参数
      materialFolder.addBinding(
        this.material.uniforms.uNoiseStrength,
        'value',
        {
          label: 'Noise Strength',
          min: 0,
          max: 0.1,
          step: 0.001
        }
      );

      materialFolder.addBinding(this.material.uniforms.uNoiseSpeed, 'value', {
        label: 'Noise Speed',
        min: 0,
        max: 4,
        step: 0.1
      });

      materialFolder.addBinding(this.material.uniforms.uMoveSpeed, 'value', {
        label: 'Move Speed',
        min: 0,
        max: 5,
        step: 0.1
      });
    }
  }

  resize() {
    // 当窗口大小改变时，更新 PlaneGeometry 的尺寸
    const aspect = this.sizes.width / this.sizes.height;
    this.geometry.dispose(); // 释放旧的几何体
    this.geometry = new THREE.PlaneGeometry(aspect * 2, 2);
    this.mesh.geometry = this.geometry;
  }

  update() {
    this.material.uniforms.uTime.value = this.experience.time.elapsed;
  }
}
