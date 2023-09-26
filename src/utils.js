import html2canvas from 'html2canvas'
// 驼峰转 kabab-case


let domToImg = (dom, options) => {
  let extraStyle = options.extraStyle || {}

  let cloneDom = dom.cloneNode(true)
  Object.keys(extraStyle).forEach(key => {
    cloneDom.style[key] = extraStyle[key]
  })

  console.log('cloneDom :>> ', cloneDom);
  document.body.appendChild(cloneDom)
  return html2canvas(cloneDom).then(canvas => {
    let img = canvas.toDataURL('image/png')
    
    return img
  })
}

export default domToImg