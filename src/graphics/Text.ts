import Graphic from './Graphic'

class Text extends Graphic {
  public content : string
  public stroke  : boolean
  public style   : any
  public type: string = "text"

  constructor (configuration: any) {
    super(configuration)
    if (configuration.style)   this.style   = configuration.style
    if (configuration.content) this.content = configuration.content
    if (configuration.stroke)  this.stroke  = configuration.stroke
  }

  render () :void{
    this.setStyle(this.style)
    if (this.stroke) {
      this.context.strokeText(this.content, this.position.x, this.position.y)
    }
    this.context.fillText(this.content, this.position.x, this.position.y)
  }
}

export default Text
