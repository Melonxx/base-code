var _dom = {
  // 事件委托
  on: function(element, eventType, selector, fn) {
    let Relement = document.querySelector(element)
    Relement.addEventListener(eventType, e => {
      var el = e.target
      while (!el.matches(selector)) {
        if (Relement === el) {
          el = null
          break
        }
        el = el.parentNode
      }
      el && fn.call(el, e, el)
    })
    return Relement
  },

  // 监听滑动操作
  onSwipe: function(element, fn) {
    var x0, y0
    element.addEventListener('touchstart', function(e) {
      x0 = e.touches[0].clientX
      y0 = e.touches[0].clientY
    })
    element.addEventListener('touchmove', function(e) {
      if (!x0 || !y0) {
        return
      }
      var xDiff = e.touches[0].clientX - x0
      var yDiff = e.touches[0].clientY - y0
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          fn.call(element, e, 'right')
        } else {
          fn.call(element, e, 'left')
        }
      } else {
        if (yDiff > 0) {
          fn.call(element, e, 'down')
        } else {
          fn.call(element, e, 'up')
        }
      }
      x0 = undefined
      y0 = undefined
    })
  },

  // 获取元素的index
  index: function(element) {
    var siblings = element.parentNode.children
    for (var index = 0; index < siblings.length; index++) {
      if (siblings[index] === element) {
        return index
      }
    }
    return -1
  },

  // 切换样式
  uniqueClass: function(element, className) {
    function every(nodeList, fn) {
      for (var i = 0; i < nodeList.length; i++) {
        fn.call(null, nodeList[i], i)
      }
      return nodeList
    }
    every(element.parentNode.children, el => {
      el.classList.remove(className)
    })
    element.classList.add(className)
    return element
  },

  // http://stackoverflow.com/a/35385518/1262580
  create: function(html, children) {
    var template = document.createElement('template')
    template.innerHTML = html.trim()
    var node = template.content.firstChild
    if (children) {
      dom.append(node, children)
    }
    return node
  },

  // 插入dom界面
  append: function(parent, children) {
    if (children.length === undefined) {
      children = [children]
    }
    for (var i = 0; i < children.length; i++) {
      parent.appendChild(children[i])
    }
    return parent
  },
  prepend: function(parent, children) {
    if (children.length === undefined) {
      children = [children]
    }
    for (var i = children.length - 1; i >= 0; i--) {
      if (parent.firstChild) {
        parent.insertBefore(children[i], parent.firstChild)
      } else {
        parent.appendChild(children[i])
      }
    }
    return parent
  },

  // 移除所有子节点
  removeChildren: function(element) {
    while (element.hasChildNodes()) {
      element.removeChild(element.lastChild)
    }
    return this
  },

  // 创建自定义事件
  dispatchEvent: function(element, eventType, detail) {
    var event = new CustomEvent(eventType, { detail })
    element.dispatchEvent(event)
    return this
  },
}
