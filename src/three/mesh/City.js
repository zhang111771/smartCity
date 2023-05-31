import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import modifyCityMaterial from '../modify/modifyCityMaterial'
import LightWall from './LightWall'
import MeshLine from './meshLine'
import scene from '../scene'
import * as THREE from 'three'
import FlyLine from './FlyLine'
import FlyLineShader from './FlyLineShader'
import LightRadar from './LightRadar'

export default function createCity(){
  const gltfLoader = new GLTFLoader();
 gltfLoader.load('./model/cqcity.glb',(gltf)=>{
 


  gltf.scene.traverse((child)=>{
    
    if(child.isMesh){
      const cityMaterial=new THREE.MeshBasicMaterial({
        color:new THREE.Color(0x0c0ef6)
      })
      
      child.material=cityMaterial
      modifyCityMaterial(child)
      if(child.name==='Layerbuildings'){
          const meshLine=new MeshLine(child.geometry)
          const size=child.scale.x*1.001
          // meshLine.mesh.scale.copy(child.scale)
          meshLine.mesh.scale.set(size,size,size)


          scene.add(meshLine.mesh)
      }
    }
  })
  scene.add(gltf.scene)
  //添加飞线
  const flyLine=new FlyLine()
  scene.add(flyLine.mesh)
  //添加着色器飞线
  const flyLineShader=new FlyLineShader()
  scene.add(flyLineShader.mesh)
  //添加光墙
  const lightWall=new LightWall()
  scene.add(lightWall.mesh)
  //添加雷达
  const lightRadar=new LightRadar()
  scene.add(lightRadar.mesh)
 })
}