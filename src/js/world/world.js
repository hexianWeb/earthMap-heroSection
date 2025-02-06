import * as THREE from 'three';

import Float from '../components/float.js';
import Experience from '../experience.js';
import EarthMap from './earth-map.js';
import Environment from './environment.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.float = new Float({ speed: 1.5, floatIntensity: 2 });

    // Environment
    this.resources.on('ready', () => {
      // Setup
      this.environment = new Environment();
      this.map = new EarthMap();
    });
  }

  update() {
    if (this.float) {
      this.float.update();
    }
    if (this.map) {
      this.map.update();
    }
  }
}
