import * as THREE from 'three'
import gsap from 'gsap'
import vertex from '@/shader/lightRadar/vertex.glsl'
import fragment from '@/shader/lightRadar/fragment.glsl'

export default class LightRadar{
  constructor(){
    this.geometry=new THREE.PlaneGeometry(2,2)
    this.material=new THREE.ShaderMaterial({
      vertexShader:vertex,
      fragmentShader:fragment
    })
    this.mesh=new THREE.Mesh(this.geometry,this.material)
    this.mesh.position.set(-5,1,3)
    
  }
}