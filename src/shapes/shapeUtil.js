const shapeUtil = {
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
  }
}

export default shapeUtil