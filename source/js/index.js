
'use strict'

import ready from 'domready'
import context from '2d-context'
import loop from 'canvas-loop'
import randf from 'randf'

import Vector from './lib/vector'

var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

ready(() => {

  var canvas = document.querySelector('.canvas')
  var caption = document.querySelector('.caption')
  var ctx = context({ canvas })
  var app = loop(canvas, { scale: window.devicePixelRatio })

  var count = 150
  var rate = 1 / 40

  caption.style.width = `${even(window.innerHeight)}px`

  if (!mobile.test(navigator.userAgent)) app.start()
  document.body.classList.remove('loading')

  var r = Math.min(app.shape[0], app.shape[1])
  var diff = 50
  var pts = []
  var center = new Vector(app.shape[0]*0.65, app.shape[1]*0.5)

  for (let i = 0; i < count; i++) {
    var p = Vector.create().random(randf(-r, r)).add(center)
    p.depth = randf(0.4, 0.8)
    p.scale = randf(0.5, 1.5)
    p.center = center.clone().add({ x: randf(-diff, diff), y: randf(-diff, diff) })
    pts.push(p)
  }

  app.on('tick', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < pts.length; i++) {
      let pt = pts[i]
      pt.depth += (randf(0.5, 1.0) - pt.depth) / 7
      let color = Math.round(pt.depth * 255)
      ctx.fillStyle = `rgb(${color}, ${color}, ${color})`
      pt.rotate(pt.center, rate)
      ctx.beginPath()
      ctx.arc(pt.x, pt.y, pt.scale, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fill()
    }
  })

  app.on('resize', () => {
    var center = new Vector(app.shape[0]/2, app.shape[1]/2)
    caption.style.width = `${even(window.innerHeight)}px`
    for (let i = 0; i < pts.length; i++) {
      let pt = pts[i]
      pt.center = center.clone().add({ x: randf(-diff, diff), y: randf(-diff, diff) })
      pt.set(Vector.create().random(randf(-r, r)).add(pt.center))
    }
  })

  function even (num) {
    return 2 * Math.round(num / 2)
  }

})
