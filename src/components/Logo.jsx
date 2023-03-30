import React from 'react'

const Logo = ({ setColor }) => {
  return (
    <svg
    width={setColor.width}
    height={setColor.height}
    xmlns="http://www.w3.org/2000/svg"
    viewBox={setColor.viewBox}
    style={{
      background: "0 0",
      display: 'inline-block',
    }}
    preserveAspectRatio="xMidYMid"
  >
    <defs>
      <filter id="editing-hole" x="-100%" y="-100%" width="300%" height="300%">
        <feFlood floodColor={setColor.color} result="black" />
        <feMorphology
          operator="dilate"
          radius={2}
          in="SourceGraphic"
          result="erode"
        />
        <feGaussianBlur in="erode" stdDeviation={4} result="blur" />
        <feOffset in="blur" dx={2} dy={2} result="offset" />
        <feComposite operator="atop" in="offset" in2="black" result="merge" />
        <feComposite
          operator="in"
          in="merge"
          in2="SourceGraphic"
          result="inner-shadow"
        />
      </filter>
    </defs>
    <g filter="url(#editing-hole)">
      <path
        d="m232.262 62.94 5.23 19.04h1.24v5.08h-12.15v-5.08h1.86l-.49-2.48h-4.22l-.5 2.48h1.86v5.08h-10.6v-5.08h1.24l5.24-19.04h11.29Zm-6.58 7.1-1.27 6.17h2.85l-1.27-6.17h-.31Zm14.05 17.02v-5.08h1.55V68.03h-1.55v-5.09h13.61q3.99 0 6.1 1.72 2.11 1.72 2.11 5.57 0 3.84-2.11 5.56-2.11 1.72-6.1 1.72h-3.38v4.47h2.97v5.08h-13.2Zm10.23-13.95h1.05q1.8 0 1.8-1.98v-1.12q0-1.02-.45-1.5t-1.35-.48h-1.05v5.08Zm25.54-5.08v-5.09h10.35v5.09h-1.24l-5.55 19.03h-10.04l-5.55-19.03h-1.24v-5.09h11.91v5.09h-1.62l2.14 10.38h.31l2.14-10.38h-1.61Z"
        fill={setColor.color}
      />
    </g>
    <style />
  </svg>
  )
}

export default Logo