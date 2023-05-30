import * as THREE from 'three'
import controls from './controls'
import camera from './camera'
import renderer from './renderer'
import scene from './scene'
const clock=new THREE.Clock()
function animate(t){
  controls.update()
  const time=clock.getElapsedTime()
  renderer.render(scene,camera)
  requestAnimationFrame(animate)
}
export default animate