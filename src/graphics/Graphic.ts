
import Vector from '../Vector'

class Graphic {
  public context  : any
  public position : Vector
  public anchor   : Vector
  public z_index  : number

  constructor (data: any) {
    if (data.position) this.position = data.position    
    if (data.anchor)   this.anchor   = data.anchor
    if (data.z_index)  this.z_index  = data.z_index    
  }

  setStyle (styles: any): void {
    for (let style in styles) {
      this.context[style] = styles[style]
    }
  }

  render (): void {}
}

export default Graphic
