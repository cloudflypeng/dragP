import './App.css'
import './lib'

// import {dragP} from '../dist/index.js'
import {dragP} from './lib'

import Group from './group.jsx'

const extraStyle = {
  backgroundColor: 'green',
}

const targetStyle = {
  backgroundColor: 'black',
  width: '300px'
}

function App() {

  const handleDrag = dragP((e)=>{
    console.log('startgragOrigin :>> ', );
    e.dataTransfer.setData('text', 'from')
    // 传递数据
    e.remember({a: 1})
    // 可以传选择器和dom节点
    // e.activeTarget(['.target'])
    e.activeTarget(['#xxx'])
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.dropEffect = 'copy'
    // e.activeTarget([ document.getElementById('wow4')])
  }, {
    clonedStyle: extraStyle, // 拖拽时的样式
    targetStyle // 目标容器样式
  })

  const handleDrop = (e) =>{
    console.log('drop', e, e.dataTransfer.getData('text'))
    let origin = document.querySelector('.from')
    console.log('origin :>> ', origin);
    origin = origin.cloneNode(true)
    e.target.appendChild(origin)
    // 
  }

  return (
    <div>
      <Group />
    </div>
  )


}

export default App
