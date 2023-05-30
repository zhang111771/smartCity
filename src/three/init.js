
import camera from './camera'
import renderer from './renderer'
window.addEventListener('resize',()=>{
  //更新摄像头
  camera.aspect=window.innerWidth/window.innerHeight
  //更新摄相机的投影矩阵
  camera.updateProjectionMatrix()
  //更新渲染器
  renderer.setSize(window.innerWidth,window.innerHeight)
  //设置渲染器的像素比例
  renderer.setPixelRatio(window.devicePixelRatio)
})