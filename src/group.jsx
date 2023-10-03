import './group.less';
import { useState, useRef } from 'react';
import {dragP} from './lib'
import './App.css'

const fromList = [
  '苹果',
  '香蕉',
  '橘子',
  '梨子',
  '西瓜',
  '哈密瓜',
  '葡萄',
  '樱桃',
  '草莓',
  '芒果',
  '榴莲',
  '菠萝',
  '柚子',
  '桃子',
  '李子',
  '橙子',
  '柠檬',
  '猕猴桃',
  '火龙果',
  '椰子',
  '榴莲',
  '樱桃',
  '荔枝',
  '龙眼',
  '桑葚',
  '山竹',
  '杨梅',
  '杨桃',
  '杏子',
  '枇杷',
  '李子',
  '柿子',
  '莲雾',
  '莲雾',
  '莓子',
  '葡萄',
  '葡萄柚',
  '蓝莓',
  '蕃茄',
  '樱桃',
  '橙子',
  '柠檬',
];

const Group = (props) => {
  console.log('props :>> ', props);

  const [box, setBox] = useState([]);
  const boxRef = useRef()

  const handleDrag = dragP((e,num)=>{
    console.log('num :>> ', num);
    let fruit = e.target.innerText
    e.remember({type: fruit})
    e.activeTarget([boxRef.current])

    return ()=>{
      console.log('自定义清理函数');
    }

  },
  {
    // clonedStyle: {
    //   width: '50px',
    //   height: '50px',
    //   borderRadius: '50%',
    //   padding: '1rem',
    //   backgroundColor: 'green',
    //   color: 'white',
    // },
    clonedClass: 'cloned-test',
    targetStyle: {
      border: '1px solid red',
      color: 'blue',
    },
    offset:{
      x: 50,
      y: 50
    },
    // customDragDom: ()=>{
    //   return document.createElement('div')
    // }
  }
  )

  const handleDrop = e =>{
    const params = JSON.parse(e.dataTransfer.getData('text'))
    setBox([...box, params.type])
  }

  return (
    <div className='group'>
      <div className='group-from border'>
        水果列表
        {fromList.map((item, index) => {
          return (
            <div className='from fruit border' draggable key={index} onDragStart={(e)=>handleDrag(e, 321)}>
              {item}
            </div>
          );
        })}
      </div>
      <div ref={boxRef} className='group-to border' onDrop={handleDrop}>
        水果篮
        <div>{box?.map(item=>{
          return <div className='box-fruit'>{item}</div>
        })}</div>
      </div>
    </div>
  );
};

export default Group;
