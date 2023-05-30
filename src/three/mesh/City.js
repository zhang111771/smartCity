import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import modifyCityMaterial from '../modify/modifyCityMaterial'
import scene from '../scene'
import * as THREE from 'three'

export default function createCity(){
  const gltfLoader = new GLTFLoader();
 gltfLoader.load('./model/cqcity.glb',(gltf)=>{
 


  gltf.scene.traverse((child)=>{
    
    if(child.isMesh){
      const cityMaterial=new THREE.MeshBasicMaterial({
        color:0x0c0ef6
      })
      
      child.material=cityMaterial
      modifyCityMaterial(child)
    }
  })
  scene.add(gltf.scene)
 })
}