import * as THREE from 'three'
export default function modifyCityMaterial(material){
  console.log(material)
  material.onBeforeCompile=(shader)=>{
    console.log(shader.vertexShader)
  }
}