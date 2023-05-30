import * as THREE from 'three'
import gsap from 'gsap'
export default function modifyCityMaterial(mesh){

  mesh.material.onBeforeCompile=(shader)=>{
    shader.fragmentShader=shader.fragmentShader.replace('#include <dithering_fragment>',
    `
    #include <dithering_fragment>
    //#end#
    `
    )
    addGradColor(shader,mesh)
   addSpread(shader)
  }
}
export function addGradColor(shader,mesh){
  mesh.geometry.computeBoundingBox()
  console.log(mesh.geometry.boundingBox)
  let {min,max}=mesh.geometry.boundingBox
  let uHeight=max.y-min.y
  shader.uniforms.uTopColor={
    value:new THREE.Color('#aaaeff')
  }
  shader.uniforms.uHeight={
    value:uHeight
  }
  shader.vertexShader=shader.vertexShader.replace('#include <common>',
  `
  #include <common>
  varying vec3 vPosition;
  `
  )
  shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',
  `
  #include <begin_vertex>
  vPosition=position;
  `
  )
  shader.fragmentShader=shader.fragmentShader.replace('#include <common>',
  `
  #include <common>
  uniform vec3 uTopColor;
  uniform float uHeight;
  varying vec3 vPosition;
  `
  )
  shader.fragmentShader=shader.fragmentShader.replace('//#end#',
  `
  #include <dithering_fragment>
  vec4 distGradColor=gl_FragColor;
  //设置混合的百分比
  float gradMix=(vPosition.y+uHeight/2.0)/uHeight;
  //计算出混合颜色
  vec3 gradMixColor=mix(distGradColor.xyz,uTopColor,gradMix);
  gl_FragColor=vec4(gradMixColor,1);
  //#end#
  `
  )
}
export function addSpread(shader){
  //设置扩散的中心点
  shader.uniforms.uSpreadCenter={
    value:new THREE.Vector2(0,0)
  }
  //扩散的时间
  shader.uniforms.uSpreadTime={
    value:0
  }
  //设置条带的宽度
  shader.uniforms.uSpreadWidth={
    value:40
  }
  shader.fragmentShader=shader.fragmentShader.replace(
    '#include <common>',
    `
    #include <common>
    uniform vec2 uSpreadCenter;
    uniform float uSpreadTime;
    uniform float uSpreadWidth;
    `
  )
  shader.fragmentShader=shader.fragmentShader.replace(' //#end#',
  `
  float spreadRadius=distance(vPosition.xz,uSpreadCenter);
  //扩散范围的函数
  float spreadIndex=-(spreadRadius-uSpreadTime)*(spreadRadius-uSpreadTime)+uSpreadWidth;
  if(spreadIndex>0.0){
    gl_FragColor=mix(gl_FragColor,vec4(1,1,1,1),spreadIndex/uSpreadWidth);
  }
  //#end#
  `
  )
  gsap.to(shader.uniforms.uSpreadTime,{
    value:800,
    duration:2,
    ease:'none',
    repeat:-1
  })
}