<template>
   <div class="class">
      <Scene :eventList="eventList"/>
      <BigScreen :dataInfo="dataInfo" :eventList="eventList"></BigScreen>
   </div>

</template>

<script setup>
import Scene from './components/Scene.vue'
import BigScreen from './components/BigScreen.vue'
import {onMounted, reactive,ref} from 'vue'
import { getSmartCityInfo,getSmartCityList } from './api/api';
import gsap from 'gsap';
const dataInfo=reactive({
  iot:{number:0},
  event:{number:0},
  test:{number:0},
  power:{number:0},


})
onMounted(async ()=>{
  changeInfo() 
  getEventList()
  setInterval(()=>{
    changeInfo() 
    getEventList()
  },5000)
 
})
const changeInfo=async ()=>{
  let res=await getSmartCityInfo()

  for(let key in dataInfo){
    dataInfo[key].name=res.data.data[key].name
    dataInfo[key].unit=res.data.data[key].unit
  
    gsap.to(dataInfo[key],{
      number:res.data.data[key].number,
      duration:1,
      repeat:0
    })
  }
}
const eventList=ref([])
const getEventList=async ()=>{
  const result=await getSmartCityList()
  eventList.value=result.data.list
  console.log(eventList)
}

</script>

<style>
*{
  margin:0;
  padding:0;
}

</style>
