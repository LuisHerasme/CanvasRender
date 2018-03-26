import Graphic from './graphics/Graphic'
import Vector from './Vector'

export default class Group {
  private childs: Array<Graphic> = []
  private context: CanvasRenderingContext2D
  public position: Vector = new Vector(0, 0) // la posicion tu la tenias publica, asi que no tiene sentido ese metodo de translate que querias hacer
  public scale: Vector = new Vector(1, 1)
  public rotation: number

  add(child: Graphic): void {
    this.childs.push(child)
  }

  scaling_objects(child: any) {
    if (child.type == "arc") {
      child.radius *= this.scale.x;
    } else if (child.type == "line") {
      child.end = new Vector(child.end.x * this.scale.x, child.end.y * this.scale.y)
    } else if (child.type == "img" || child.type == "rect") {
      child.width *= this.scale.x
      child.height *= this.scale.y
    } else if (child.type == "poligon") {
      child.cords.filter((pnt: any) => {
        return new Vector(pnt.x * this.scale.x, pnt.y * this.scale.y)
      })
    } else if (child.type == "circle") {
      child.radius *= this.scale.x
    } else {
      console.error("Scale isnt supported for this object");
    }
    return child
  }

  render(): void {
    this.context.save()
    this.childs.forEach((child) => {
      let temp_child = child
      temp_child.position.x += this.position.x
      temp_child.position.y += this.position.y
      temp_child.context = this.context
      temp_child = this.scaling_objects(temp_child)
      temp_child.render()
    })
    this.context.restore()
  }
}
