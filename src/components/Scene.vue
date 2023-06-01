<template>
  <div ref="container"></div>
 </template>
 
 <script setup>
 import * as THREE from 'three'
 import { onMounted,ref,watch } from 'vue'

 import Vertex from '../shader/test/Vertex.glsl'

 //导入场景
 import scene from '../three/scene'
 //导入相机
 import camera from '../three/camera'
 //导入gui对象
 import gui from '../three/gui'
//导入渲染器
import renderer from '../three/renderer'
//添加辅助坐标轴
import helper from '../three/axesHelper'
//导入控制器
import controls from '../three/controls'
//初始化屏幕大小
import '../three/init'
//导入每一帧函数
import animate from '../three/animate'
//导入添加物体函数
import createMesh from '../three/createMesh'
import AlarmSprite from '@/three/mesh/AlarmSprite'
import LightWall from '@/three/mesh/LightWall'
import FlyLineShader from '@/three/mesh/FlyLineShader'
import LightRadar from '@/three/mesh/LightRadar'
import eventHub from '@/utils/EeventHub'
import gsap from 'gsap'
 const container=ref(null)
const props=defineProps(['eventList'])
 scene.add(helper)
 createMesh()
 onMounted(()=>{
   container.value.appendChild(renderer.domElement)
   animate()
 })
 const eventListMesh=[]
 let mapFn={
  火警:(position,i)=>{
    const lightWall=new LightWall(1,2,position)
    lightWall.eventListIndex=i
    scene.add(lightWall.mesh)
    eventListMesh.push(lightWall)
  },
  治安:(position,i)=>{
    //生成随机颜色
    const color=new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    ).getHex()
    const flyLineShader=new FlyLineShader(position,color)
    flyLineShader.eventListIndex=i
    scene.add(flyLineShader.mesh)
    eventListMesh.push(flyLineShader)
  },
  电力:(position,i)=>{
     //生成随机颜色
     const color=new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    ).getHex()
    //添加雷达
    const lightRadar=new LightRadar(2,position,color)
    lightRadar.eventListIndex=i
    scene.add(lightRadar.mesh)
    eventListMesh.push(lightRadar)
  }
 }
eventHub.on('eventToggle',(i)=>{

  eventListMesh.forEach((item)=>{
   if(item.eventListIndex===i){
    // item.mesh.visible=true
    // item.mesh.scale.set(5,5,5)
    camera.lookAt(item.mesh.position)
   }else{
    // item.mesh.visible=false
    // item.mesh.scale.set(1,1,1)
   }
  })
  const position={
    x:props.eventList[i].position.x/5-10,
    y:0,
    z:props.eventList[i].position.y/5-10
  }
  // controls.target.set(position.x,position.y,position.z)
  gsap.to(controls.target,{
    x:position.x,
    y:position.y,
    z:position.z,
    duration:1
  })
})
 watch(()=>props.eventList,(val)=>{
  eventListMesh.forEach((item)=>{
    item.remove()
  })
  props.eventList.forEach((item,i)=>{
    const position={
      x:item.position.x/5-10,
      z:item.position.y/5-10
    }
   
    const alarmSprite=new AlarmSprite(item.name,position)
    alarmSprite.onClick(()=>{
      eventHub.emit('spriteClick',{event:item,i})
    })
    alarmSprite.eventListIndex=i
    eventListMesh.push(alarmSprite)
    scene.add(alarmSprite.mesh)
    if(mapFn[item.name]){
      mapFn[item.name](position,i)
    }
  })
 })


 </script>
 
 <style>
 *{
   margin:0;
   padding:0;
 }
 canvas{
   width:100vw;
   height: 100vh;
   position: fixed;
   top:0;
   left:0;
 }
 </style>
 