import * as THREE from 'three'
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.set(5,10,15)
export default camera