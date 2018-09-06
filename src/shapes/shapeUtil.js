const shapeUtil = {
  // Some constants
  xAxis: [1.0, 0.0, 0.0],
  yAxis: [0.0, 1.0, 0.0],
  zAxis: [0.0, 0.0, 1.0],

  createArrayBuffer: (gl, verts = [], vertsOption = {}) => {
    const {
      vertDataConstructor = Float32Array,
      bindTarget = gl.ARRAY_BUFFER,
      itemSize = 1,
      numItems = verts.length
    } = vertsOption
    
    const cubeBuffer = gl.createBuffer()
    gl.bindBuffer(bindTarget, cubeBuffer)
    
    gl.bufferData(bindTarget, new vertDataConstructor(verts), gl.STATIC_DRAW)
    cubeBuffer.info = {
      itemSize,
      numItems
    }
  
    return cubeBuffer
  },

  degToRad: (deg) => {
    return deg / 180 * Math.PI
  }
}

export default shapeUtil