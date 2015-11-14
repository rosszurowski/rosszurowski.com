
'use strict'

import ready from 'domready'
import context from '2d-context'
import loop from 'canvas-loop'
import randf from 'randf'

import Vector from './lib/vector'

const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
const even = num => Math.round(num / 2) * 2
const rgb = (r, g, b) => `rgb(${r}, ${g}, ${b})`

ready(() => {

  document.body.classList.remove('loading')

  const canvas = document.querySelector('.canvas')
  const caption = document.querySelector('.caption')
  const ctx = context({ canvas })
  const app = loop(canvas, { scale: window.devicePixelRatio })

  const count = 150
  const rate = 1 / 40
  const diff = 50

  const r = Math.min(app.shape[0], app.shape[1])
  const points = []

  let [width, height] = app.shape
  let scale = app.scale
  let center = new Vector(app.shape[0]*0.65, app.shape[1]*0.5)

  for (let i = 0; i < count; i++) {
    var p = Vector.create()
      .random(randf(-r, r))
      .add(center)
    p.depth = randf(0.4, 0.8)
    p.scale = randf(0.5, 1.5)
    p.center = center.clone().add({
      x: randf(-diff, diff),
      y: randf(-diff, diff)
    })
    points.push(p)
  }

  caption.style.width = `${even(window.innerHeight)}px`

  app.on('tick', tick)
  app.on('resize', resize)
  if (!mobile.test(navigator.userAgent)) app.start()

  function tick () {
    ctx.save()
    ctx.scale(scale, scale)
    ctx.clearRect(0, 0, width, height)
    for (let i = 0; i < points.length; i++) {
      const p = points[i]
      p.depth += (randf(0.5, 1.0) - p.depth) / 7
      const color = Math.round(p.depth * 255)
      ctx.fillStyle = rgb(color, color, color)
      p.rotate(p.center, rate)
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.scale, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fill()
    }
    ctx.restore()
  }

  function resize () {
    [width, height] = app.shape
    scale = app.scale
    center = new Vector(width/2, height/2)
    caption.style.width = `${even(document.body.clientHeight)}px`
    for (let i = 0; i < points.length; i++) {
      const p = points[i]
      const position = Vector.create().random(randf(-r, r)).add(p.center)
      p.center = center.clone().add({
        x: randf(-diff, diff),
        y: randf(-diff, diff)
      })
      p.set(position)
    }
  }

})
