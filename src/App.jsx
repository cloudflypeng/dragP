import './App.css'
import './lib'

import {dragP} from '../dist/index.js'

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
      <div className='from' draggable onDragStart={handleDrag}>
        from
      </div>

      <div className='target' id="xxx" onDrop={handleDrop} >target</div>
      <div className='target' onDrop={handleDrop} >target2</div>
      <div className='target' onDrop={handleDrop} >target</div>
      <div className='target' id="wow4" onDrop={handleDrop} >target431</div>
      <div className='target' id="wow4" draggable >3213</div>
    </div>
  )


}

export default App
