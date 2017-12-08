let deletePlaceholderNode = function (list) {
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    if (item.placeholder) {
      list.splice(i, 1)
      continue
    } else if (item.children) {
      deletePlaceholderNode(item.children)
    }
  }
}
export default {
  jsonSiblings: function (node, parentNode) {
    let list = parentNode.children || []
    let siblings = []
    for (let i = 0; i < list.length; i++) {
      if (list[i] === node) {
        continue
      }
      siblings.push(list[i])
    }
    return siblings
  },
  jsonIndex: function (node, list = []) {
    return list.findIndex(item => item === node)
  },
  dragInfo (node, parentNode) {
    // let jsonSiblings = this.jsonSiblings
    let jsonIndex = this.jsonIndex
    // let deletePlaceholderNode = this.deletePlaceholderNode
    return {
      source: node,
      index: jsonIndex(node, parentNode.children),
      siblings: parentNode.children,
      parent: parentNode,
      prev: function () {
        if (this.index > 0) {
          return this.siblings[this.index - 1]
        }
        return null
      },
      next: function () {
        if (this.index < this.siblings.length - 1) {
          return this.siblings[this.index + 1]
        }
        return null
      },
      moveTo: function (parent, siblings, index) {
        deletePlaceholderNode(this.parent.children)
        this.parent = parent
        this.siblings = siblings.slice(0)
        let i = this.siblings.indexOf(this.source)
        if (i > -1) {
          this.siblings.splice(i, 1)
          if (jsonIndex(this.source, this.parent) < index) {
            index--
          }
        }
        this.parent.children.splice(index, 0, Object.assign({}, this.source, {placeholder: true}))
        this.siblings = this.parent.children
        this.index = index
      },
      apply: function () {
        this.parent.children.splice(this.index, 1, this.source)
      }
    }
  },
  // 删除替换节点的placeholder属性
  removePlaceholderProperty (list = []) {
    for (let i = 0; i < list.length; i++) {
      let item = list[i]
      if (item.hidden) {
        delete item.hidden
        continue
      } else if (item.children) {
        this.removeHiddenProperty(item.children)
      }
    }
  },

  offset (element) {
    var boundingClientRect = element.getBoundingClientRect()
    return {
      width: element.offsetWidth,
      height: element.offsetHeight,
      top: boundingClientRect.top + (window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop),
      left: boundingClientRect.left + (window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft)
    }
  },
  positionStarted (e, target) {
    let pos = {}
    let pageX = e.pageX
    let pageY = e.pageY

    // Check to set correct data for TouchEvents
    if (e.originalEvent && e.originalEvent.touches && (e.originalEvent.touches.length > 0)) {
      pageX = e.originalEvent.touches[0].pageX
      pageY = e.originalEvent.touches[0].pageY
    }
    pos.offsetX = pageX - this.offset(target).left
    pos.offsetY = pageY - this.offset(target).top
    pos.startX = pos.lastX = pageX
    pos.startY = pos.lastY = pageY
    pos.nowX = pos.nowY = pos.distX = pos.distY = pos.dirAx = 0
    pos.dirX = pos.dirY = pos.lastDirX = pos.lastDirY = pos.distAxX = pos.distAxY = 0
    return pos
  },
  positionMoved (e, pos, firstMoving) {
    let pageX = e.pageX
    let pageY = e.pageY
    let newAx
    // If there are multiple touch points, choose one to use as X and Y.
    if (e.originalEvent && e.originalEvent.touches && (e.originalEvent.touches.length > 0)) {
      pageX = e.originalEvent.touches[0].pageX
      pageY = e.originalEvent.touches[0].pageY
    }
    let spacing = 10
    // Mouse position last event.
    if (Math.abs(pageX - pos.lastX) > spacing || Math.abs(pageY - pos.lastY) > spacing) {
      pos.lastX = pos.nowX
      pos.lastY = pos.nowY
    }
    // pos.lastX = pos.nowX
    // pos.lastY = pos.nowY
    // Mouse position this event.
    pos.nowX = pageX
    pos.nowY = pageY
    // Distance mouse moved between events.
    pos.distX = Math.abs(pos.nowX - pos.lastX) >= spacing ? pos.nowX - pos.lastX : 0
    pos.distY = Math.abs(pos.nowY - pos.lastY) >= spacing ? pos.nowY - pos.lastY : 0
    // Direction mouse was moving.
    pos.lastDirX = pos.dirX
    pos.lastDirY = pos.dirY
    // Direction mouse is now moving (on both axis).
    pos.dirX = pos.distX === 0 ? 0 : pos.distX > 0 ? 1 : -1
    pos.dirY = pos.distY === 0 ? 0 : pos.distY > 0 ? 1 : -1
    // Axis mouse is now moving on.
    newAx = Math.abs(pos.distX) > Math.abs(pos.distY) ? 1 : 0
    // Do nothing on first move.
    if (firstMoving) {
      pos.dirAx = newAx
      pos.moving = true
      return
    }
    // Calc distance moved on this axis (and direction).
    if (pos.dirAx !== newAx) {
      pos.distAxX = 0
      pos.distAxY = 0
    } else {
      pos.distAxX += Math.abs(pos.distX)
      if (pos.dirX !== 0 && pos.dirX !== pos.lastDirX) {
        pos.distAxX = 0
      }
      pos.distAxY += Math.abs(pos.distY)
      if (pos.dirY !== 0 && pos.dirY !== pos.lastDirY) {
        pos.distAxY = 0
      }
    }
    pos.dirAx = newAx
  },
  elementIsTreeNode (element) {
    return typeof element.attr('drag-tree-node') !== 'undefined'
  },
  elementIsTreeNodeHandle (element) {
    return typeof element.attr('drag-tree-handle') !== 'undefined'
  },
  elementIsTree (element) {
    return typeof element.attr('drag-tree') !== 'undefined'
  },
  elementIsTreeNodes (element) {
    return typeof element.attr('drag-tree-nodes') !== 'undefined'
  },
  elementIsPlaceholder (element) {
    return element.hasClass('drag-tree-placeholder')
  },
  elementIsDropzone (element) {
    return element.hasClass('drag-tree-dropzone')
  },
  elementContainsTreeNodeHandler (element) {
    return element.querySelectorAll('[drag-tree-handle]').length >= 1
  },
  elementVueInstance (element, vm) {}
}
