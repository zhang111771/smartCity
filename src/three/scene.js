import * as THREE from 'three'
//初始化场景
const scene=new THREE.Scene()
//场景天空盒子
const textureCubeLoader=new THREE.CubeTextureLoader()
const textureCube=textureCubeLoader.load([
    './textures/1.jpg','./textures/2.jpg','./textures/3.jpg',
    './textures/4.jpg','./textures/5.jpg','./textures/6.jpg',
])
scene.background=textureCube
scene.environment=textureCube
export default scene