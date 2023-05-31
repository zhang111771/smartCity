import * as THREE from 'three'
import gsap from 'gsap'
import vertex from '@/shader/lightWall/vertex.glsl'
import fragment from '@/shader/lightWall/fragment.glsl'

export default class LightWall{
  constructor(){
    this.geometry=new THREE.CylinderGeometry(5,5,2,32,1,true)

 
   
    this.geometry.computeBoundingBox()
    let {min,max}=this.geometry.boundingBox
    //获取物体的高度差
    let uHeight=max.y-min.y
    this.material=new THREE.ShaderMaterial({
      vertexShader:vertex,
      fragmentShader:fragment,
      transparent:true,
      side:THREE.DoubleSide,
      uniforms:{
        uHeight:{
          value:uHeight
        }
      }
    })
    this.mesh=new THREE.Mesh(this.geometry,this.material)
    this.mesh.position.set(0,2,0)
    //光墙动画
    gsap.to(this.mesh.scale,{
      x:2,
      z:2,
      duration:1,
      repeat:-1,
      yoyo:true
    })
  }
}