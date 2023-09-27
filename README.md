dragP

这是一个基于直觉的拖拽交互库,你只需要聚焦于拖和放就可以

希望只使用dragStart和drop就完成拖拽交互

基本用法
```javascript
const dragStartFunction = dragP(func, options)
// options 可选,目前仅支持虚拟节点和目标容器的样式
// func即原本的方法,本库在对象上扩展了两个方法 remember 和 activeTarget
// remember 用于 传递一个对象数据
// activeTarget 用于激活目标容器, 不激活的容器是不可拖拽进去的

```

示例

```javascript
import { dragP } from 'dragP'

const handleDrag = dragP((e)=>{	
	// 传递数据
	e.remember({a: 1})
	// 激活目标容器的样式可以传选择器和dom
	// e.activeTarget(['.target'])
	// e.activeTarget(['#target'])
	// e.activeTarget([ document.getElementById('target')])
	}, {
	clonedStyle, // 拖拽时的样式
	targetStyle // 目标容器样式
})
```

本地使用
```javascript
git clone [项目地址]
yarn install
yarn run dev
```

在线地址
https://codesandbox.io/s/gallant-cori-ccydgs?file=/src/App.js