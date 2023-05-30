import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import modifyCityMaterial from '../modify/modifyCityMaterial'
import scene from '../scene'
import * as THREE from 'three'

export default function createCity(){
  const gltfLoader = new GLTFLoader();
 gltfLoader.load('./model/city.glb',(gltf)=>{
  const cityMaterial=new THREE.MeshBasicMaterial({
    color:0x00ffff
  })
  cityMaterial.onBeforeCompile=(shader)=>{
    console.log(shader)
  }
  // modifyCityMaterial(cityMaterial)
  gltf.scene.traverse((child)=>{
    if(child.isMesh){
      child.material=cityMaterial
    }
  })
  scene.add(gltf.scene)
 })
}