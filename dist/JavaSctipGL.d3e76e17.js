// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({84:[function(require,module,exports) {
"use strict";
exports.__esModule = true;
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
    };
    Vector.prototype.sub = function (vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    };
    Vector.prototype.mult = function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
    };
    Vector.prototype.div = function (scalar) {
        this.x /= scalar;
        this.y /= scalar;
    };
    Vector.prototype.inverse = function () {
        this.x *= -1;
        this.y *= -1;
    };
    Vector.prototype.mag = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector.prototype.dot = function (vector) {
        return this.x * vector.x + this.y * vector.y;
    };
    Vector.prototype.distance = function (vector) {
        return Vector.sub(this, vector).mag();
    };
    Vector.prototype.angle = function () {
        return Math.atan2(this.y, this.x);
    };
    Vector.prototype.copy = function () {
        return new Vector(this.x, this.y);
    };
    Vector.prototype.normalize = function () {
        this.div(this.mag());
    };
    Vector.prototype.setMag = function (mag) {
        this.normalize();
        this.mult(mag);
    };
    Vector.prototype.setAngle = function (angle) {
        var magnitude = this.mag();
        this.x = magnitude * Math.cos(angle);
        this.y = magnitude * Math.sin(angle);
    };
    Vector.prototype.addAngle = function (angle) {
        this.setAngle(this.angle() + angle);
    };
    Vector.prototype.limit = function (scalar) {
        if (this.mag() > scalar) {
            this.setMag(scalar);
        }
    };
    Vector.prototype.moveTowards = function (vector, speed, stop) {
        if (speed === void 0) { speed = 1; }
        if (stop === void 0) { stop = 1; }
        if (this.distance(vector) > stop) {
            var unit = Vector.normalize(Vector.sub(vector, this));
            unit.mult(speed);
            this.add(unit);
        }
    };
    Vector.prototype.zero = function () {
        this.x = 0;
        this.y = 0;
    };
    Vector.add = function (vector1, vector2) {
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
    };
    Vector.sub = function (vector1, vector2) {
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    };
    Vector.mult = function (vector, scalar) {
        return new Vector(vector.x * scalar, vector.y * scalar);
    };
    Vector.div = function (vector, scalar) {
        return new Vector(vector.x / scalar, vector.y / scalar);
    };
    Vector.inverse = function (vector) {
        return new Vector(vector.x * -1, vector.y * -1);
    };
    Vector.distance = function (vector1, vector2) {
        return this.sub(vector1, vector2).mag();
    };
    Vector.normalize = function (vector) {
        return this.div(vector, vector.mag());
    };
    Vector.cross = function (vector1, vector2) {
        return vector1.x * vector2.y - vector2.x * vector1.y;
    };
    Vector.randomP = function (x, y) {
        return new Vector(x * Math.random(), y * Math.random());
    };
    Vector.random = function (x, y) {
        if (x === void 0) { x = 1; }
        if (y === void 0) { y = 1; }
        var s1 = 1;
        var s2 = 1;
        if (Math.random() > 0.5)
            s1 = -1;
        if (Math.random() > 0.5)
            s2 = -1;
        return new Vector(x * Math.random() * s1, y * Math.random() * s2);
    };
    return Vector;
}());
exports["default"] = Vector;

},{}],85:[function(require,module,exports) {
"use strict";
exports.__esModule = true;
var Vector3D = /** @class */ (function () {
    function Vector3D(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector3D.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
    };
    Vector3D.prototype.sub = function (vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
    };
    Vector3D.prototype.mult = function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
    };
    Vector3D.prototype.div = function (scalar) {
        this.x /= scalar;
        this.y /= scalar;
        this.z /= scalar;
    };
    Vector3D.prototype.inverse = function () {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
    };
    Vector3D.prototype.mag = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    Vector3D.prototype.dot = function (vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    };
    Vector3D.prototype.distance = function (vector) {
        return Vector3D.sub(this, vector).mag();
    };
    Vector3D.prototype.angle = function () {
        return Math.atan2(this.y, this.x);
    };
    Vector3D.prototype.copy = function () {
        return new Vector3D(this.x, this.y, this.z);
    };
    Vector3D.prototype.normalize = function () {
        this.div(this.mag());
    };
    Vector3D.prototype.setMag = function (mag) {
        this.normalize();
        this.mult(mag);
    };
    Vector3D.prototype.setAngle = function (angle) {
        var magnitude = this.mag();
        this.x = magnitude * Math.cos(angle);
        this.y = magnitude * Math.sin(angle);
    };
    Vector3D.prototype.addAngle = function (angle) {
        this.setAngle(this.angle() + angle);
    };
    Vector3D.prototype.limit = function (scalar) {
        if (this.mag() > scalar) {
            this.setMag(scalar);
        }
    };
    Vector3D.prototype.moveTowards = function (vector, speed, stop) {
        if (this.distance(vector) > stop) {
            var unit = Vector3D.normalize(vector);
            unit.mult(speed);
            this.add(unit);
        }
    };
    Vector3D.prototype.zero = function () {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    };
    Vector3D.add = function (vector1, vector2) {
        return new Vector3D(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z);
    };
    Vector3D.sub = function (vector1, vector2) {
        return new Vector3D(vector1.x - vector2.x, vector1.y - vector2.y, vector1.z - vector2.z);
    };
    Vector3D.mult = function (vector, scalar) {
        return new Vector3D(vector.x * scalar, vector.y * scalar, vector.z * scalar);
    };
    Vector3D.div = function (vector, scalar) {
        return new Vector3D(vector.x / scalar, vector.y / scalar, vector.z / scalar);
    };
    Vector3D.inverse = function (vector) {
        return new Vector3D(vector.x * -1, vector.y * -1, vector.z * -1);
    };
    Vector3D.distance = function (vector1, vector2) {
        return this.sub(vector1, vector2).mag();
    };
    Vector3D.normalize = function (vector) {
        return this.div(vector, vector.mag());
    };
    Vector3D.cross = function (vector1, vector2) {
        return vector1.x * vector2.y - vector2.x * vector1.y;
    };
    Vector3D.random = function (x, y, z) {
        if (Math.random() > 0.5) {
            return new Vector3D(x * Math.random(), y * Math.random(), z * Math.random());
        }
        else {
            return new Vector3D(-x * Math.random(), -y * Math.random(), -z * Math.random());
        }
    };
    return Vector3D;
}());
exports["default"] = Vector3D;
/*

TO ADD

import vector from '../vector'

function rotate (x, y, z, center, vec) {
  let vecR
  vecR = vector.sub(vec, center)
  vecR = rotateX(vecR, x)
  vecR = rotateY(vecR, y)
  vecR = rotateZ(vecR, z)
  vecR = vector.add(vecR, center)
  return vecR
}

function rotateX (vec, t) {
  let vecR = vec
  let newy = vec[1] * Math.cos(t) - vec[2] * Math.sin(t)
  let newz = vec[1] * Math.sin(t) + vec[2] * Math.cos(t)
  vecR[1] = newy
  vecR[2] = newz
  return vecR
}

function rotateY (vec, t) {
  let vecR = vec
  let newz = vec[2] * Math.cos(t) - vec[0] * Math.sin(t)
  let newx = vec[2] * Math.sin(t) + vec[0] * Math.cos(t)
  vecR[2] = newz
  vecR[0] = newx
  return vecR
}

function rotateZ (vec, t) {
  let vecR = vec
  let newx = vec[0] * Math.cos(t) - vec[1] * Math.sin(t)
  let newy = vec[0] * Math.sin(t) + vec[1] * Math.cos(t)
  vecR[0] = newx
  vecR[1] = newy
  return vecR
}

const memlength = (vec) => Math.pow(Math.pow(vec[0], 2) + Math.pow(vec[1], 2) + Math.pow(vec[2], 2), 0.5)

const normal = (v1, v2, v3) => vector.cross(vector.sub(v2, v1), vector.sub(v3, v1))

function isInTriangle (vec, triangle) {
  let u = vector.sub(triangle.v2, triangle.v1)
  let v = vector.sub(triangle.v3, triangle.v1)
  let w = vector.sub(vec, triangle.v1)

  let vCrossW = vector.cross(v, w)
  let vCrossU = vector.cross(v, u)

  if (vector3.dot(vCrossW, vCrossU) < 0) return false

  let uCrossW = vector.cross(u, w)
  let uCrossV = vector.cross(u, v)

  if (vector3.dot(uCrossW, uCrossV) < 0) return false

  let denom = memlength(uCrossV)
  let r = memlength(vCrossW) / denom
  let t = memlength(uCrossW) / denom

  return (r + t <= 1)
}

function getTriangleArea (triangle) {
  let temp = vector.cross(vector.sub(triangle.v3, triangle.v1), vector.sub(triangle.v3, triangle.v2))
  let x = Math.pow(temp[0], 2)
  let y = Math.pow(temp[1], 2)
  let z = Math.pow(temp[2], 2)
  return Math.pow(x + y + z, 0.5) / 2
}

function dot (vec1, vec2) {
  return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2]
}

function getPlaneIntersect (line1, line2, triangle) {
  let normal = triangle.normal
  let u = vector3.dot(normal, vector.sub(triangle.v1, line1)) / vector3.dot(normal, vector.sub(line2, line1))
  return vector.add(line1, vector.mult(vector.sub(line2, line1), u))
}

const vector3 = { dot, rotate, normal, isInTriangle, getTriangleArea, getPlaneIntersect, memlength }

export default vector3

*/ 

},{}],49:[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Vector2D_1 = __importDefault(require("./Vector2D"));
exports.Vector2D = Vector2D_1["default"];
var Vector3D_1 = __importDefault(require("./Vector3D"));
exports.Vector3D = Vector3D_1["default"];

},{"./Vector2D":84,"./Vector3D":85}],73:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var vector_class_1 = require("vector_class");
var index_1 = require("./index");
var Camera = /** @class */function () {
    function Camera(context) {
        this.keyMap = { up: 'w', down: 's', left: 'a', right: 'd' };
        this.position = new vector_class_1.Vector2D(0, 0);
        this.fLastPosition = new vector_class_1.Vector2D(0, 0);
        this.followingX = false;
        this.followingY = false;
        this.keyTranslateEnabled = false;
        this.velocity = new vector_class_1.Vector2D(0, 0);
        this.acceleration = new vector_class_1.Vector2D(0, 0);
        this.friction = 0.9;
        this.context = context;
    }
    Camera.prototype.addForce = function (force) {
        this.acceleration.add(force);
    };
    /*
      enable() {
        document.addEventListener('mousemove', (e) => {
          this.mouse.position.x = e.clientX
          this.mouse.position.y = e.clientY
        })
      }
    */
    Camera.prototype.getMouse = function () {
        return vector_class_1.Vector2D.add(index_1.mouse.position, this.position);
    };
    Camera.prototype.disableKeyTranslate = function () {};
    Camera.prototype.enableKeyTranslate = function () {
        var _this = this;
        this.keyTranslateEnabled = true;
        document.addEventListener('keypress', function (e) {
            if (e.key.toLowerCase() === _this.keyMap.up) {
                _this.addForce(new vector_class_1.Vector2D(0, 10));
            }
            if (e.key.toLowerCase() === _this.keyMap.down) {
                _this.addForce(new vector_class_1.Vector2D(0, -10));
            }
            if (e.key.toLowerCase() === _this.keyMap.left) {
                _this.addForce(new vector_class_1.Vector2D(10, 0));
            }
            if (e.key.toLowerCase() === _this.keyMap.right) {
                _this.addForce(new vector_class_1.Vector2D(-10, 0));
            }
        });
    };
    Camera.prototype.follow = function (graphic) {
        this.followedPosition = graphic.position;
        this.fLastPosition = this.followedPosition.copy();
        this.followingX = true;
        this.followingY = true;
    };
    Camera.prototype.followX = function (graphic) {
        this.followedPosition = graphic.position;
        this.followingX = true;
    };
    Camera.prototype.followY = function (graphic) {
        this.followedPosition = graphic.position;
        this.followingY = true;
    };
    Camera.prototype.stopFollowing = function () {
        this.followingX = false;
        this.followingY = false;
    };
    Camera.prototype.stopFollowingX = function () {
        this.followingX = false;
    };
    Camera.prototype.stopFollowingY = function () {
        this.followingY = false;
    };
    Camera.prototype.zoom = function (where, howMuch) {
        this.context.translate(where.x, where.y);
        this.context.scale(howMuch.x, howMuch.y);
        this.context.translate(-where.x, -where.y);
    };
    Camera.prototype.translate = function (x, y) {
        this.position.x -= x;
        this.position.y -= y;
        this.context.translate(x, y);
    };
    Camera.prototype.update = function () {
        if (this.keyTranslateEnabled) {
            this.velocity.add(this.acceleration);
            this.velocity.mult(this.friction);
            this.translate(this.velocity.x, this.velocity.y);
            this.position.add(this.velocity);
            this.acceleration.zero();
        }
        if (this.followingX || this.followingY) {
            var change = vector_class_1.Vector2D.sub(this.fLastPosition, this.followedPosition);
            this.fLastPosition = this.followedPosition.copy();
            this.translate(change.x, change.y);
        }
    };
    return Camera;
}();
exports["default"] = Camera;
},{"vector_class":49,"./index":7}],76:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var LineCap;
(function (LineCap) {
    LineCap["butt"] = "butt";
    LineCap["square"] = "square";
    LineCap["round"] = "round";
})(LineCap = exports.LineCap || (exports.LineCap = {}));
var LineJoin;
(function (LineJoin) {
    LineJoin["bevel"] = "bevel";
    LineJoin["round"] = "round";
    LineJoin["miter"] = "miter";
})(LineJoin = exports.LineJoin || (exports.LineJoin = {}));
var Pattern;
(function (Pattern) {
    Pattern["repeat"] = "repeat";
    Pattern["repeat_x"] = "repeat-x";
    Pattern["repeat_y"] = "repeat-y";
    Pattern["no_repeat"] = "no-repeat";
})(Pattern = exports.Pattern || (exports.Pattern = {}));
var weights;
(function (weights) {
    weights["lighter"] = "lighter";
    weights["normal"] = "normal";
    weights["bolder"] = "bolder";
    weights["bold"] = "bold";
})(weights = exports.weights || (exports.weights = {}));
},{}],19:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var vector_class_1 = require("vector_class");
var Properties_1 = require("../Properties");
var Graphic = /** @class */function () {
    function Graphic(data) {
        this.weight = Properties_1.weights.normal;
        this.fill = true;
        this.stroke = false;
        this.anchor = new vector_class_1.Vector2D(0.5, 0.5);
        this.position = new vector_class_1.Vector2D(0, 0);
        this.color = 'grey';
        this.family = 'Arial';
        this.lineCap = Properties_1.LineCap.round;
        this.lineJoin = Properties_1.LineJoin.round;
        this.lineColor = 'rgb(0, 0, 0)';
        this.textAlign = 'center';
        this.shadowColor = 'rgba(0, 0, 0, 0)';
        this.textBaseline = 'middle';
        this.size = 12;
        this.rotation = 0;
        this.z_index = 1;
        this.lineWidth = 1;
        this.miterLimit = 10;
        this.shadowBlur = 0;
        this.shadowOffsetX = 0;
        this.shadowOffsetY = 0;
        this.childs = [];
        if (data) {
            if (data.stroke !== undefined) {
                if (typeof data.stroke === 'boolean') {
                    this.stroke = data.stroke;
                } else {
                    console.info("Type of stroke is not boolean");
                }
            } else {
                this.stroke = false;
            }
            if (data.fill !== undefined) {
                if (typeof data.fill === 'boolean') {
                    this.fill = data.fill;
                } else {
                    console.info("Type of fill is not boolean");
                }
            } else {
                this.fill = true;
            }
            this.weight = data.weights ? data.weights : Properties_1.weights.normal;
            this.anchor = data.anchor ? data.anchor : new vector_class_1.Vector2D(0.5, 0.5);
            this.position = data.position ? data.position : new vector_class_1.Vector2D(0, 0);
            this.z_index = data.z_index ? data.z_index : 1;
            this.shadowBlur = data.shadowBlur ? data.shadowBlur : 0;
            this.shadowOffsetX = data.shadowOffsetX ? data.shadowOffsetX : 0;
            this.shadowOffsetY = data.shadowOffsetY ? data.shadowOffsetY : 0;
            this.shadowColor = data.shadowColor ? data.shadowColor : 'rgba(0,0,0,0)';
            this.miterLimit = data.miterLimit ? data.miterLimit : 10;
            this.lineCap = data.lineCap ? data.lineCap : Properties_1.LineCap.round;
            this.color = data.color ? data.color : 'grey';
            this.family = data.family ? data.family : 'Arial';
            this.lineJoin = data.lineJoin ? data.lineJoin : Properties_1.LineJoin.round;
            this.lineColor = data.lineColor ? data.lineColor : 'rgb(50, 50, 50)';
            this.textAlign = data.textAlign ? data.textAlign : 'center';
            this.textBaseline = data.textBaseline ? data.textBaseline : 'middle';
            this.size = data.size ? data.size : 12;
            this.rotation = data.rotation ? data.rotation : 0;
            this.lineWidth = data.lineWidth ? data.lineWidth : 1;
        }
    }
    Graphic.prototype.add = function (child) {
        child.context = this.context;
        this.childs.push(child);
    };
    Graphic.prototype.remove = function (child) {
        this.childs.push(child);
    };
    Graphic.prototype.getFont = function () {
        return this.weight + " " + this.size + "px " + this.family;
    };
    Graphic.prototype.setStyle = function () {
        this.context.font = this.getFont();
        this.context.fillStyle = this.color;
        this.context.lineCap = this.lineCap;
        this.context.lineJoin = this.lineJoin;
        this.context.strokeStyle = this.lineColor;
        this.context.lineWidth = this.lineWidth;
        this.context.textAlign = this.textAlign;
        this.context.shadowColor = this.shadowColor;
        this.context.textBaseline = this.textBaseline;
        this.context.miterLimit = this.miterLimit;
        this.context.shadowBlur = this.shadowBlur;
        this.context.shadowOffsetX = this.shadowOffsetX;
        this.context.shadowOffsetY = this.shadowOffsetY;
    };
    /*
        Most be somewhere here
    
        this.childs.forEach(c => c.context = this.context)
        this.childs.forEach(c => c.render())
    
    
    */
    Graphic.prototype.render = function () {
        // this.context.save()
        this.context.beginPath();
        // if (this.context.fill || this.context.stroke) {
        this.setStyle();
        this.selfRender();
        // }
        // this.context.restore()
    };
    Graphic.prototype.selfRender = function () {};
    return Graphic;
}();
exports["default"] = Graphic;
/*




-------------------------------- GRUPO --------------------------------






import Graphic from './graphics/Graphic'
import {Vector2D} from 'vector_class'

export default class Group {
  private childs: Array<Graphic> = []
  private context: CanvasRenderingContext2D
  public position: Vector2D = new Vector2D(0, 0) // la posicion tu la tenias publica, asi que no tiene sentido ese metodo de translate que querias hacer
  public scale: Vector2D = new Vector2D(1, 1)
  public rotation: number

  add(child: Graphic): void {
    this.childs.push(child)
  }

  scaleObject(child: any) {
    if (child.type == "arc") {
      child.radius *= this.scale.x
      child.render()
      child.radius /= this.scale.x
    } else if (child.type == "line") {
      child.end = new Vector(child.end.x * this.scale.x, child.end.y * this.scale.y)
      child.render()
      child.end = new Vector(child.end.x / this.scale.x, child.end.y / this.scale.y)
    } else if (child.type == "img" || child.type == "rect") {
      child.width *= this.scale.x
      child.height *= this.scale.y
      child.render()
      child.width /= this.scale.x
      child.height /= this.scale.y
    } else if (child.type == "poligon") {
      child.cords.filter((pnt: any) => {
        return new Vector(pnt.x * this.scale.x, pnt.y * this.scale.y)
      })
      child.render()
      child.cords.filter((pnt: any) => {
        return new Vector(pnt.x / this.scale.x, pnt.y / this.scale.y)
      })
    } else if (child.type == "circle") {
      child.radius *= this.scale.x
      child.render()
      child.radius /= this.scale.x
    } else {
      throw "error, no se puede escalar dicho objeto"
    }
    return child
  }

  render(): void {
    // this.context.save()
    this.childs.forEach((child) => {
      child.position.add(this.position)
      child.context = this.context
      child.render()
      child.position.sub(this.position)
    })
    // this.context.restore()
  }
}

*/
},{"vector_class":49,"../Properties":76}],17:[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Graphic_1 = __importDefault(require("../graphics/Graphic"));
var vector_class_1 = require("vector_class");
// Imaginary canvas
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
var Picture = /** @class */function (_super) {
    __extends(Picture, _super);
    function Picture(data) {
        var _this = _super.call(this, data) || this;
        _this.type = "img";
        _this.ready = false;
        _this.todo = [];
        _this.params = [];
        _this.image = new Image();
        _this.image.src = data.src;
        console.log(_this.image);
        _this.image.addEventListener('load', function () {
            _this.ready = true;
            _this.todo.forEach(function (met, i) {
                met.apply(void 0, _this.params[i]);
            });
        });
        _this.image.addEventListener('error', function (err) {
            console.log(err);
            console.error('Error loading the image...');
        });
        _this.angle = data.angle ? data.angle : 0;
        _this.opacity = data.opacity ? data.opacity : 1;
        _this.width = data.width ? data.width : _this.image.width;
        _this.height = data.height ? data.height : _this.image.height;
        return _this;
    }
    Picture.prototype.filter = function () {};
    Picture.prototype.getImageData = function () {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        canvas.width = this.width;
        canvas.height = this.height;
        context.drawImage(this.image, 0, 0, this.width, this.height);
        return context.getImageData(0, 0, this.width, this.height);
    };
    Picture.prototype.removeColor = function (color) {
        if (this.ready) {
            var image = void 0;
            if (!this.data) {
                image = this.getImageData();
            } else {
                image = this.data;
            }
            for (var pixel = 0; pixel < image.data.length; pixel += 4) {
                if (image.data[pixel] === color[0] && image.data[pixel + 1] === color[1] && image.data[pixel + 2] === color[2]) {
                    image.data[pixel + 3] = 0;
                }
            }
            this.data = image;
            this.render = this.renderData;
        } else {
            this.todo.push(this.removeColor.bind(this));
            this.params.push([color]);
        }
    };
    Picture.prototype.onClick = function (func) {};
    Picture.prototype.realPosition = function () {
        return new vector_class_1.Vector2D(this.position.x - this.anchor.x * this.width, this.position.y - this.anchor.y * this.height);
    };
    Picture.prototype.renderData = function () {
        //  console.log('here')
        //console.log(this.data)
        this.context.beginPath();
        this.context.save();
        // this.context.translate(this.position.x -(this.anchor.x *  this.width), this.position.y -(this.anchor.y *  this.height))
        //this.context.rotate(this.angle)
        // this.context.globalAlpha = this.opacity
        // console.log(this.data)
        this.context.putImageData(this.data, this.position.x - this.anchor.x * this.width, this.position.y - this.anchor.y * this.height); // -(this.anchor.x *  this.width), -(this.anchor.y *  this.height), this.position.x, this.position.y, this.width, this.height)
        // this.context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        this.context.restore();
    };
    Picture.prototype.render = function () {
        this.context.beginPath();
        this.context.save();
        this.context.translate(this.position.x, this.position.y);
        this.context.rotate(this.angle);
        this.context.globalAlpha = this.opacity;
        this.context.drawImage(this.image, -(this.anchor.x * this.width), -(this.anchor.y * this.height), this.width, this.height);
        // this.context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        this.context.restore();
    };
    return Picture;
}(Graphic_1["default"]);
exports["default"] = Picture;
},{"../graphics/Graphic":19,"vector_class":49}],21:[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Graphic_1 = __importDefault(require("../graphics/Graphic"));
var vector_class_1 = require("vector_class");
var Video = /** @class */function (_super) {
    __extends(Video, _super);
    function Video(data) {
        var _this = _super.call(this, data) || this;
        _this.type = "img";
        _this.ready = false;
        _this.todo = [];
        _this.params = [];
        _this.filterEnable = false;
        _this.filterColors = [];
        _this.video = document.createElement('video');
        _this.video.src = data.src;
        _this.video.play();
        _this.video.crossOrigin = "Anonymous";
        _this.video.addEventListener('loadedmetadata', function () {
            _this.ready = true;
            console.info("Video " + data.src + " correctly loaded.");
            console.log(_this.todo);
            console.log(_this.params);
            _this.todo.forEach(function (met, i) {
                met.apply(void 0, _this.params[i]);
            });
        });
        _this.video.addEventListener('error', function () {
            console.error('Error loading the video...');
        });
        _this.angle = data.angle ? data.angle : 0;
        _this.opacity = data.opacity ? data.opacity : 1;
        _this.width = data.width ? data.width : _this.video.width;
        _this.height = data.height ? data.height : _this.video.height;
        return _this;
    }
    Video.prototype.filter = function () {};
    Video.prototype.getImageData = function () {
        var canvas = document.createElement('canvas');
        // console.log(canvas)
        document.body.appendChild(canvas);
        var context = canvas.getContext('2d');
        canvas.width = this.width;
        canvas.height = this.height;
        context.translate(this.anchor.x * this.width, this.anchor.y * this.height);
        context.rotate(this.angle);
        context.drawImage(this.video, -(this.anchor.x * this.width), -(this.anchor.y * this.height), this.width, this.height);
        document.body.removeChild(canvas);
        // return context.getImageData( -this.width / 2 , - this.height/2, this.width + this.width/2, this.height + this.height/2)
        return context.getImageData(0, 0, this.width, this.height);
    };
    /*
      removeColor(color: Array<number>) {
        if (this.ready) {
          let image
          if (!this.data) {
            image = this.getImageData()
          } else {
            image = this.data
          }
    
          for (let pixel = 0; pixel < image.data.length; pixel += 4) {
            if (image.data[pixel] === color[0] && image.data[pixel + 1] === color[1] && image.data[pixel + 2] === color[2]) {
              image.data[pixel + 3] = 0
            }
          }
    
          this.data = image
          this.render = this.renderData
        } else {
          this.todo.push(this.removeColor.bind(this))
          this.params.push([color])
        }
      }
    */
    Video.prototype.onClick = function (func) {};
    Video.prototype.realPosition = function () {
        return new vector_class_1.Vector2D(this.position.x - this.anchor.x * this.width, this.position.y - this.anchor.y * this.height);
    };
    Video.prototype.renderData = function () {
        if (this.filterEnable) {
            this.filterColor(this.filterColors[0], this.filterColors[1], this.filterColors[2]);
        }
        //  console.log('here')
        //console.log(this.data)
        this.context.beginPath();
        this.context.save();
        // this.context.translate(this.position.x -(this.anchor.x *  this.width), this.position.y -(this.anchor.y *  this.height))
        // this.context.rotate(this.angle)
        // this.context.globalAlpha = this.opacity
        // console.log(this.data)
        this.context.putImageData(this.data, this.position.x - this.anchor.x * this.width, this.position.y - this.anchor.y * this.height); // -(this.anchor.x *  this.width), -(this.anchor.y *  this.height), this.position.x, this.position.y, this.width, this.height)
        // this.context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        this.context.restore();
    };
    Video.prototype.filterColor = function (r, g, b) {
        if (this.ready) {
            this.filterEnable = true;
            this.filterColors = [r, g, b];
            var image = this.getImageData();
            for (var pixel = 0; pixel < image.data.length; pixel += 4) {
                image.data[pixel] += r;
                image.data[pixel + 1] += g;
                image.data[pixel + 2] += b;
                // image.data[pixel + 3]
            }
            this.data = image;
            this.render = this.renderData;
        } else {
            this.todo.push(this.filterColor.bind(this));
            this.params.push([r, g, b]);
        }
    };
    Video.prototype.render = function () {
        this.context.beginPath();
        this.context.save();
        this.context.translate(this.position.x, this.position.y);
        this.context.rotate(this.angle);
        this.context.globalAlpha = this.opacity;
        this.context.drawImage(this.video, -(this.anchor.x * this.width), -(this.anchor.y * this.height), this.width, this.height);
        // this.context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        this.context.restore();
    };
    return Video;
}(Graphic_1["default"]);
exports["default"] = Video;
},{"../graphics/Graphic":19,"vector_class":49}],10:[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Camera_1 = __importDefault(require("./Camera"));
var Picture_1 = __importDefault(require("./Media/Picture"));
var Video_1 = __importDefault(require("./Media/Video"));
/**
 * This is the detail about the constructor
 * @class This is the detail about the class
 * @memberOf namespace
 * @param {Render} renderer The first argument
 */
var Scene = /** @class */function () {
    function Scene(renderer) {
        this.backgroundColor = 'black';
        this.childs = [];
        this.frameRate = 0;
        this.ready = false;
        this.renderer = renderer;
        this.context = this.renderer.context;
        this.camera = new Camera_1["default"](this.context);
    }
    Scene.prototype.dataLoaded = function () {
        // Gets all the pictures and videos from the scene.
        var elements = this.childs.filter(function (child) {
            if (child instanceof Picture_1["default"]) return true;
            if (child instanceof Video_1["default"]) return true;
            return false;
        });
        // If there is an image that is not loaded returns false
        return !elements.some(function (element) {
            return !element.ready;
        });
    };
    /**
     * This method adds one element to the scene
     * @param {Graphic} element any graphic object
     * @returns {void}
     */
    Scene.prototype.add = function (element) {
        element.context = this.context;
        this.childs.push(element);
        this.organizeByZindex();
    };
    /**
     * Removes an element from the scene
     * @param {Graphic} element any graphic object
     * @returns {void}
     */
    Scene.prototype.remove = function (element) {
        var index = this.childs.indexOf(element);
        if (index >= 0) {
            this.childs.splice(index, 1);
        }
    };
    /**
     * This method clears the screen
     */
    Scene.prototype.clearScreen = function () {
        this.context.save();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
        this.context.restore();
    };
    /**
     * This method enables or disables the image smoothing
     * @param {boolean} state enable or disable
     */
    Scene.prototype.smoth = function (state) {
        if (this.context.imageSmoothingEnabled) {
            this.context.imageSmoothingEnabled = state;
        } else if (this.context.mozImageSmoothingEnabled) {
            this.context.mozImageSmoothingEnabled = state;
        } else if (this.context.webkitImageSmoothingEnabled) {
            this.context.webkitImageSmoothingEnabled = state;
        }
    };
    /**
     * This method organizes the childs of the scene by their property z_indez
     */
    Scene.prototype.organizeByZindex = function () {
        this.childs.sort(function (a, b) {
            return a.z_index - b.z_index;
        });
    };
    /**
     * This method renders the screne ultil you call stopAutoRender
     */
    Scene.prototype.autoRender = function (func) {
        var _this = this;
        this.interval = setInterval(function () {
            if (func) func();
            _this.render();
        }, this.frameRate);
    };
    /**
     * This method stops autoRender
     */
    Scene.prototype.stopAutoRender = function () {
        clearInterval(this.interval);
    };
    /**
     * This method renders the screne
     */
    Scene.prototype.render = function () {
        if (!this.dataLoaded()) {
            console.info('Waiting for images to load...');
            setTimeout(this.render.bind(this), 100);
        } else {
            this.clearScreen();
            this.childs.forEach(function (child) {
                return child.render();
            });
            this.camera.update();
        }
    };
    return Scene;
}();
exports["default"] = Scene;
},{"./Camera":73,"./Media/Picture":17,"./Media/Video":21}],11:[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Scene_1 = __importDefault(require("./Scene"));
var vector_class_1 = require("vector_class");
var Render = /** @class */function () {
    function Render(canvas, width, height) {
        var _this = this;
        this.frameRate = 1000 / 60;
        if (canvas) {
            var _canvas = document.getElementById(canvas);
            if (_canvas !== null) {
                if (_canvas.tagName === 'CANVAS') {
                    this.canvas = _canvas;
                } else {
                    console.error('The ID provided is not a of canvas elements');
                }
            } else {
                console.error('The ID provided is not in the DOM');
            }
        } else {
            this.canvas = document.createElement('canvas');
            document.body.appendChild(this.canvas);
        }
        if (width && height) {
            this.canvas.width = width;
            this.canvas.height = height;
        } else {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', function () {
            _this.canvas.width = window.innerWidth;
            _this.canvas.height = window.innerHeight;
        });
        this.context = this.canvas.getContext('2d');
        var scene = new Scene_1["default"](this);
        this.setScene(scene);
    }
    Render.prototype.add = function (element) {
        this.scene.add(element);
    };
    Render.prototype.remove = function (element) {
        this.scene.remove(element);
    };
    Render.prototype.addMultiple = function (e) {
        var _this = this;
        e.forEach(function (m) {
            return _this.add(m);
        });
    };
    /*
    autoUpdateRender (func?: Function) {
      this.scene.autoRender(func)
    }
    */
    Render.prototype.getWidth = function () {
        return this.canvas.width;
    };
    Render.prototype.getHeight = function () {
        return this.canvas.height;
    };
    Render.prototype.getSize = function () {
        return new vector_class_1.Vector2D(this.canvas.width, this.canvas.height);
    };
    Render.prototype.getCenter = function () {
        return new vector_class_1.Vector2D(this.canvas.width / 2, this.canvas.height / 2);
    };
    Render.prototype.getCanvasImage = function () {
        return this.canvas.toDataURL();
    };
    /*
      filter () {
        let image = new Image()
        image.src = this.getCanvasImage()
    
      }
    */
    Render.prototype.fullScreen = function () {
        var _this = this;
        var isFull = false;
        document.addEventListener('click', function () {
            if (!isFull) {
                _this.canvas.webkitRequestFullScreen();
            }
        });
    };
    /**
     * This method renders the screne ultil you call stopAutoRender
     */
    Render.prototype.autoRender = function (func) {
        var _this = this;
        this.interval = setInterval(function () {
            if (func) func();
            _this.render();
        }, this.frameRate);
    };
    Render.prototype.render = function () {
        this.scene.render();
    };
    Render.prototype.setScene = function (scene) {
        this.scene = scene;
        this.scene.renderer = this;
        this.scene.context = this.context;
        this.scene.smoth(false);
    };
    return Render;
}();
exports["default"] = Render;
},{"./Scene":10,"vector_class":49}],12:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var vector_class_1 = require("vector_class");
var LinearGradient = /** @class */function () {
    function LinearGradient(config) {
        this.context = config.context;
        this.size = config.size ? config.size : new vector_class_1.Vector2D(100, 100);
        this.gradient = this.context.createLinearGradient(this.position.x, this.position.y, this.size.x, this.size.y);
        var counter = 0;
        for (var _i = 0, _a = config.colors; _i < _a.length; _i++) {
            var color = _a[_i];
            this.gradient.addColorStop(counter, color);
            // console.log(1 / config.colors.length)
            counter += 1 / config.colors.length;
        }
    }
    return LinearGradient;
}();
exports["default"] = LinearGradient;
},{"vector_class":49}],13:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var Color = /** @class */function () {
    function Color(red, green, blue, alpha) {
        if (red === void 0) {
            red = 0;
        }
        if (green === void 0) {
            green = 0;
        }
        if (blue === void 0) {
            blue = 0;
        }
        if (alpha === void 0) {
            alpha = 1;
        }
        this.red = Math.round(red * 255);
        this.green = Math.round(green * 255);
        this.blue = Math.round(blue * 255);
        this.alpha = alpha;
        if (this.red > 255) this.red = 255;else if (this.red < 0) this.red = 0;
        if (this.green > 255) this.green = 255;else if (this.green < 0) this.green = 0;
        if (this.blue > 255) this.blue = 255;else if (this.blue < 0) this.blue = 0;
        if (this.alpha > 1) this.alpha = 1;else if (this.alpha < 0) this.alpha = 0;
    }
    Color.prototype.setRed = function (color) {
        if (color > 255) {
            this.red = 255;
        } else if (color < 0) {
            this.red = 0;
        } else {
            this.red = color;
        }
    };
    Color.prototype.setGreen = function (color) {
        if (color > 255) {
            this.green = 255;
        } else if (color < 0) {
            this.green = 0;
        } else {
            this.green = color;
        }
    };
    Color.prototype.setBlue = function (color) {
        if (color > 255) {
            this.blue = 255;
        } else if (color < 0) {
            this.blue = 0;
        } else {
            this.blue = color;
        }
    };
    Color.prototype.rgba = function () {
        return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
    };
    Color.prototype.rgb = function () {
        return "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
    };
    Color.random = function () {
        return new Color(Math.random(), Math.random(), Math.random());
    };
    return Color;
}();
exports["default"] = Color;
},{}],14:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var Wind = /** @class */function () {
    function Wind(name, sizeX, sizeY, positionX, positionY) {
        this.name = name;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.positionX = positionX;
        this.positionY = positionY;
        this.element = document.createElement('div');
        this.element.setAttribute('class', 'wind');
        this.element.setAttribute('style', "\n            width: " + this.sizeX + "px;\n            height: " + this.sizeY + "px;\n            top: " + this.positionX + "px;\n            left: " + this.positionY + "px\n        ");
        this.render();
        document.body.appendChild(this.element);
        dragElement(this.element);
    }
    Wind.prototype.setMsg = function (msg) {
        this.msg = msg;
        this.render();
    };
    Wind.prototype.remove = function () {
        document.body.removeChild(this.element);
    };
    Wind.prototype.render = function () {
        var btn = document.createElement('button');
        btn.innerHTML = 'Close';
        btn.onclick = this.remove.bind(this);
        this.element.innerHTML = "\n        <div style='\n        background: #222;\n        padding: 5px;\n        '>" + this.name + "</div>\n        <hr>\n        <br>\n        <p>" + this.msg + "</p>\n        <br>\n        ";
        this.element.appendChild(btn);
    };
    return Wind;
}();
function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }
    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
exports["default"] = Wind;
},{}],15:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var vector_class_1 = require("vector_class");
var Animation = /** @class */function () {
    function Animation(configuration) {
        this.loop = true;
        this.size = new vector_class_1.Vector2D(32, 32);
        this.frame = new vector_class_1.Vector2D(0, 0);
        this.animationPlaying = false;
        this.load(configuration.src);
        this.loop = configuration.loop ? configuration.loop : true;
        this.size = configuration.size ? configuration.size : new vector_class_1.Vector2D(32, 32);
        this.scale = configuration.scale ? configuration.scale : new vector_class_1.Vector2D(1, 1);
        this.frameRate = configuration.frameRate ? configuration.frameRate : 24;
        this.animations = configuration.animations;
        this.x = 0;
        this.y = 0;
    }
    Animation.prototype.playAnimation = function (name) {
        if (!this.animationPlaying) {
            this.animationPlaying = true;
            this.frame.x = 0;
            this.frame.y = this.animations[name][1];
            this.reproduceAnimation(name);
        }
    };
    Animation.prototype.reproduceAnimation = function (name) {
        var _this = this;
        this.x = this.size.x * this.frame.x;
        this.y = this.size.y * this.frame.y;
        this.frame.x += 1;
        if (this.frame.x >= this.animations[name][0]) {
            this.animationPlaying = false;
        } else {
            setTimeout(function () {
                return _this.reproduceAnimation(name);
            }, this.frameRate);
        }
    };
    Animation.prototype.mouseDown = function () {};
    Animation.prototype.onClick = function (func) {};
    Animation.prototype.load = function (src) {
        this.image = new Image();
        this.image.src = src;
    };
    Animation.prototype.getSize = function () {
        return new vector_class_1.Vector2D(this.size.x * this.scale.x, this.size.y * this.scale.y);
    };
    Animation.prototype.render = function () {
        this.context.drawImage(this.image, this.x, this.y, this.size.x, this.size.y, this.position.x, this.position.y, this.size.x * this.scale.x, this.size.y * this.scale.y);
    };
    Animation.prototype.destroy = function () {
        clearInterval(this.interval);
    };
    return Animation;
}();
exports["default"] = Animation;
},{"vector_class":49}],16:[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Graphic_1 = __importDefault(require("./Graphic"));
var vector_class_1 = require("vector_class");
var LinearGradient_1 = __importDefault(require("../LinearGradient"));
var Ellipse = /** @class */function (_super) {
    __extends(Ellipse, _super);
    function Ellipse(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.radiusX = 10;
        _this.radiusY = 5;
        if (configuration) {
            _this.lineWidth = configuration.lineWidth ? configuration.lineWidth : _this.lineWidth;
            _this.lineColor = configuration.lineColor ? configuration.lineColor : _this.lineColor;
            _this.radiusX = configuration.radiusX ? configuration.radiusX : _this.radiusX;
            _this.radiusY = configuration.radiusY ? configuration.radiusY : _this.radiusY;
            _this.stroke = configuration.stroke ? configuration.stroke : _this.stroke;
            _this.color = configuration.color ? configuration.color : _this.color;
            _this.fill = configuration.fill ? configuration.fill : _this.fill;
            if (configuration.linearGradient) {
                _this.linearGradient = configuration.linearGradient;
                // this.render = this.renderGradient
            }
        }
        return _this;
    }
    Ellipse.prototype.renderGradient = function () {
        this.color = new LinearGradient_1["default"]({
            context: this.context,
            colors: this.linearGradient,
            size: new vector_class_1.Vector2D(this.position.x, this.position.y + this.radiusY),
            position: new vector_class_1.Vector2D(this.position.x, this.position.y - this.radiusY / 2)
        }).gradient;
        if (this.fill) {
            this.context.beginPath();
            this.context.fillStyle = this.color;
            this.context.ellipse(this.position.x, this.position.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
            this.context.fill();
        }
        if (this.stroke) {
            this.context.lineWidth = this.lineWidth;
            this.context.strokeStyle = this.lineColor;
            this.context.stroke();
        }
    };
    Ellipse.prototype.render = function () {
        this.renderGradient();
        /*
        if (this.fill) {
          this.context.beginPath()
          this.context.fillStyle = this.color
          this.context.ellipse(this.position.x, this.position.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI)
          this.context.fill()
        }
        if (this.stroke) {
          this.context.lineWidth = this.lineWidth
          this.context.strokeStyle = this.lineColor
          this.context.stroke()
        }
        */
    };
    return Ellipse;
}(Graphic_1["default"]);
exports["default"] = Ellipse;
},{"./Graphic":19,"vector_class":49,"../LinearGradient":12}],18:[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Graphic_1 = __importDefault(require("./Graphic"));
var vector_class_1 = require("vector_class");
var Poligon = /** @class */function (_super) {
    __extends(Poligon, _super);
    function Poligon(configuration) {
        var _this = _super.call(this, configuration) || this;
        if (configuration.color) _this.color = configuration.color;
        if (configuration.stroke) _this.stroke = configuration.stroke;
        if (configuration.cords) _this.cords = configuration.cords.slice(1, configuration.cords.length);
        if (configuration.fill) _this.fill = configuration.fill;
        _this.position = configuration.cords.slice[0];
        _this.cords.filter(function (pnt) {
            return new vector_class_1.Vector2D(pnt.x - _this.position.x, pnt.y - _this.position.y);
        });
        return _this;
    }
    Poligon.prototype.render = function () {
        this.context.beginPath();
        this.context.strokeStyle = this.lineColor;
        this.context.lineCap = this.lineCap;
        this.context.fillStyle = this.color;
        this.context.lineJoin = this.lineJoin;
        this.context.moveTo(this.cords[0].x, this.cords[0].y);
        for (var i = 0; i < this.cords.length; i++) {
            this.context.lineTo(this.cords[i].x + this.position.x, this.cords[i].y + this.position.y);
        }
        this.context.closePath();
        this.context.fill();
        if (this.stroke) this.context.stroke;
    };
    return Poligon;
}(Graphic_1["default"]);
exports["default"] = Poligon;
},{"./Graphic":19,"vector_class":49}],77:[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Graphic_1 = __importDefault(require("../graphics/Graphic"));
var vector_class_1 = require("vector_class");
var CircleEvents = /** @class */function (_super) {
    __extends(CircleEvents, _super);
    function CircleEvents(configuration) {
        var _this = _super.call(this, configuration) || this;
        // Private
        _this.mouseDownEnabled = false;
        _this.dragStartEnabled = false;
        _this.dragEndEnabled = false;
        _this.dragingEnabled = false;
        _this.mouseUpEnabled = false;
        _this.hoverEnabled = false;
        _this.moveEnabled = false;
        _this.moveMethods = [];
        _this.mouseDownMethods = [];
        _this.mouseUpMethods = [];
        _this.hoverMethods = [];
        _this.dragStartMethods = [];
        _this.dragEndMethods = [];
        _this.dragingMethods = [];
        if (configuration) {
            if (configuration.radius) _this.radius = configuration.radius;
        }
        return _this;
    }
    CircleEvents.prototype.checkIfInside = function (point) {
        return this.position.distance(point) < this.radius;
    };
    CircleEvents.prototype.enableEvent = function (eventName, methods) {
        var _this = this;
        var mouse;
        document.addEventListener(eventName, function (event) {
            mouse = new vector_class_1.Vector2D(event.clientX, event.clientY);
            if (_this.checkIfInside(mouse)) {
                methods.forEach(function (method) {
                    return method(mouse);
                });
            }
        });
    };
    CircleEvents.prototype.mouseDown = function (func) {
        if (!this.mouseDownEnabled) {
            this.mouseDownEnabled = !this.mouseDownEnabled;
            this.enableEvent('mousedown', this.mouseDownMethods);
        }
        this.mouseDownMethods.push(func.bind(this));
    };
    CircleEvents.prototype.mouseUp = function (func) {
        if (!this.mouseUpEnabled) {
            this.mouseUpEnabled = !this.mouseUpEnabled;
            this.enableEvent('mouseup', this.mouseUpMethods);
        }
        this.mouseUpMethods.push(func.bind(this));
    };
    CircleEvents.prototype.hover = function (func) {
        if (!this.hoverEnabled) {
            this.hoverEnabled = !this.hoverEnabled;
            this.enableEvent('mousemove', this.hoverMethods);
        }
        this.hoverMethods.push(func.bind(this));
    };
    CircleEvents.prototype.mouseMove = function (func) {
        var _this = this;
        if (!this.moveEnabled) {
            this.moveEnabled = !this.moveEnabled;
            var mouse_1;
            document.addEventListener('mousemove', function (event) {
                mouse_1 = new vector_class_1.Vector2D(event.clientX, event.clientY);
                _this.moveMethods.forEach(function (method) {
                    return method(mouse_1);
                });
            });
        }
        func = func.bind(this);
        this.moveMethods.push(func);
    };
    CircleEvents.prototype.dragStart = function (func) {
        this.dragStartMethods.push(func.bind(this));
    };
    CircleEvents.prototype.draging = function (func) {
        this.dragingMethods.push(func.bind(this));
    };
    CircleEvents.prototype.dragEnd = function (func) {
        this.dragEndMethods.push(func.bind(this));
    };
    CircleEvents.prototype.enableMouseDrag = function () {
        var _this = this;
        var isDraging = false;
        var distance = new vector_class_1.Vector2D();
        document.addEventListener('mousemove', function (event) {
            if (isDraging) {
                _this.position = vector_class_1.Vector2D.add(distance, new vector_class_1.Vector2D(event.clientX, event.clientY));
                _this.dragingMethods.forEach(function (meth) {
                    return meth();
                });
            }
        });
        this.mouseDown(function (mouse) {
            if (!isDraging) {
                document.body.style.cursor = 'pointer';
                isDraging = true;
                distance = vector_class_1.Vector2D.sub(_this.position, mouse);
                _this.position = vector_class_1.Vector2D.add(distance, mouse);
                _this.dragStartMethods.forEach(function (meth) {
                    return meth();
                });
            }
        });
        this.mouseUp(function () {
            if (isDraging) {
                document.body.style.cursor = 'default';
                isDraging = false;
                _this.dragEndMethods.forEach(function (meth) {
                    return meth();
                });
            }
        });
    };
    return CircleEvents;
}(Graphic_1["default"]);
exports["default"] = CircleEvents;
},{"../graphics/Graphic":19,"vector_class":49}],20:[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var CircleEvents_1 = __importDefault(require("../Events/CircleEvents"));
var Circle = /** @class */function (_super) {
    __extends(Circle, _super);
    function Circle(config) {
        var _this = _super.call(this, config) || this;
        _this.radius = 5;
        if (config) {
            _this.radius = config.radius ? config.radius : 5;
        }
        return _this;
    }
    Circle.prototype.selfRender = function () {
        this.context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        if (this.fill) {
            this.context.fill();
        }
        if (this.stroke) {
            this.context.stroke();
        }
    };
    return Circle;
}(CircleEvents_1["default"]);
exports["default"] = Circle;
},{"../Events/CircleEvents":77}],22:[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Graphic_1 = __importDefault(require("./Graphic"));
var Rect = /** @class */function (_super) {
    __extends(Rect, _super);
    function Rect(data) {
        var _this = _super.call(this, data) || this;
        _this.width = 1;
        _this.height = 1;
        if (data.width) _this.width = data.width;
        if (data.height) _this.height = data.height;
        return _this;
    }
    Rect.prototype.selfRender = function () {
        if (this.fill) {
            this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
        if (this.stroke) {
            this.context.strokeRect(this.position.x, this.position.y, this.width, this.height);
        }
    };
    return Rect;
}(Graphic_1["default"]);
exports["default"] = Rect;
},{"./Graphic":19}],23:[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Graphic_1 = __importDefault(require("./Graphic"));
var vector_class_1 = require("vector_class");
var Line = /** @class */function (_super) {
    __extends(Line, _super);
    function Line(data) {
        var _this = _super.call(this, data) || this;
        _this.start = new vector_class_1.Vector2D(0, 0);
        _this.end = new vector_class_1.Vector2D(1, 1);
        if (data) {
            if (data.start) _this.start = data.start;
            if (data.end) _this.end = data.end;
            if (data.color) _this.color = data.color;
            if (data.start) _this.position = data.start;
            _this.end = new vector_class_1.Vector2D(_this.end.x - _this.start.x, _this.end.y - _this.start.y);
        }
        return _this;
    }
    Line.prototype.selfRender = function () {
        /*
        this.context.strokeStyle = this.color
        this.context.lineWidth = this.width
        this.context.lineCap = this.lineCap
        this.context.lineJoin = this.lineJoin
        */
        this.context.beginPath();
        this.context.moveTo(this.position.x, this.position.y);
        this.context.lineTo(this.end.x + this.position.x, this.end.y + this.position.y);
        this.context.stroke();
    };
    return Line;
}(Graphic_1["default"]);
exports["default"] = Line;
},{"./Graphic":19,"vector_class":49}],24:[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Graphic_1 = __importDefault(require("./Graphic"));
var Text = /** @class */function (_super) {
    __extends(Text, _super);
    function Text(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.fontConfig = '';
        _this.lineHeight = 12;
        _this.maxWidth = 500;
        if (configuration) {
            _this.content = configuration.content ? configuration.content : '';
        }
        return _this;
    }
    Text.prototype.wrapText = function () {
        var x = this.position.x;
        var y = this.position.y;
        var words = this.content.split(' ');
        var line = '';
        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = this.context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > this.maxWidth && n > 0) {
                this.context.fillText(line, x, y);
                line = words[n] + ' ';
                y += this.lineHeight;
            } else {
                line = testLine;
            }
        }
        this.context.fillText(line, x, y);
    };
    Text.prototype.render = function () {
        this.context.fillStyle = this.color;
        this.context.font = this.weight + " " + this.size + "px " + this.family;
        this.context.textAlign = this.textAlign;
        this.context.textBaseline = this.textBaseline;
        if (this.stroke) {
            this.context.strokeText(this.content, this.position.x, this.position.y);
        }
        this.context.fillText(this.content, this.position.x, this.position.y);
    };
    return Text;
}(Graphic_1["default"]);
exports["default"] = Text;
},{"./Graphic":19}],25:[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var CircleEvents_1 = __importDefault(require("../Events/CircleEvents"));
var Arc = /** @class */function (_super) {
    __extends(Arc, _super);
    function Arc(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.endAngle = 0;
        _this.startAngle = Math.PI;
        if (configuration) {
            _this.endAngle = configuration.endAngle ? configuration.endAngle : 0;
            _this.startAngle = configuration.startAngle ? configuration.startAngle : Math.PI;
        }
        return _this;
    }
    Arc.prototype.selfRender = function () {
        this.context.arc(0, 0, this.radius, this.endAngle, this.startAngle, true);
        if (this.fill) {
            this.context.fill();
        }
        if (this.stroke) {
            this.context.stroke();
        }
    };
    return Arc;
}(CircleEvents_1["default"]);
exports["default"] = Arc;
},{"../Events/CircleEvents":77}],26:[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Graphic_1 = __importDefault(require("./Graphic"));
var BezierCurve = /** @class */function (_super) {
    __extends(BezierCurve, _super);
    function BezierCurve(config) {
        var _this = _super.call(this, config) || this;
        _this.cords = config.cords ? config.cords : [[10, 10], [80, 20], [30, 30]];
        return _this;
    }
    BezierCurve.prototype.render = function () {
        this.context.save();
        this.context.beginPath();
        this.context.lineCap = this.lineCap;
        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.lineColor;
        this.context.lineJoin = this.lineJoin;
        this.context.translate(this.position.x, this.position.y);
        this.context.bezierCurveTo(this.cords[0][0], this.cords[0][1], this.cords[1][0], this.cords[1][1], this.cords[2][0], this.cords[2][1]);
        this.context.stroke();
        this.context.restore();
    };
    return BezierCurve;
}(Graphic_1["default"]);
exports["default"] = BezierCurve;
},{"./Graphic":19}],27:[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Graphic_1 = __importDefault(require("./Graphic"));
var QuadraticCurve = /** @class */function (_super) {
    __extends(QuadraticCurve, _super);
    function QuadraticCurve(config) {
        var _this = _super.call(this, config) || this;
        _this.color = config.color ? config.color : 'black';
        _this.width = config.width ? config.width : 5;
        _this.cords = config.cords ? config.cords : [[20, 100], [200, 20]];
        return _this;
    }
    QuadraticCurve.prototype.render = function () {
        this.context.save();
        this.context.beginPath();
        this.context.lineCap = this.lineCap;
        this.context.lineJoin = this.lineJoin;
        this.context.lineWidth = this.width;
        this.context.strokeStyle = this.color;
        this.context.moveTo(this.position.x, this.position.y);
        this.context.quadraticCurveTo(this.cords[0][0], this.cords[0][1], this.cords[1][0], this.cords[1][1]);
        this.context.stroke();
        this.context.restore();
    };
    return QuadraticCurve;
}(Graphic_1["default"]);
exports["default"] = QuadraticCurve;
},{"./Graphic":19}],78:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var Event = /** @class */function () {
    function Event() {
        this.events = {
            // Mouse
            mousemove: [],
            mouseup: [],
            mousedown: [],
            mousemoveActive: false,
            mousedownActive: false,
            mouseupActive: false,
            // KeyBoard
            keypress: [],
            keyup: [],
            keydown: [],
            keypressActive: false,
            keydownActive: false,
            keyupActive: false
        };
    }
    Event.prototype.initEvent = function (name) {
        var _this = this;
        document.addEventListener(name, function (event) {
            _this.events[name].forEach(function (func) {
                return func(_this, event);
            });
        });
    };
    return Event;
}();
exports["default"] = Event;
},{}],28:[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var vector_class_1 = require("vector_class");
var Event_1 = __importDefault(require("./Event"));
var Mouse = /** @class */function (_super) {
    __extends(Mouse, _super);
    function Mouse() {
        var _this = _super.call(this) || this;
        _this.position = new vector_class_1.Vector2D(0, 0);
        _this.clicked = false;
        _this.move(function (self, event) {
            _this.position.x = event.clientX;
            _this.position.y = event.clientY;
        });
        return _this;
    }
    Mouse.prototype.move = function (func) {
        if (!this.events.mousemoveActive) {
            this.initEvent('mousemove');
            this.events.mousemoveActive = true;
        }
        this.events.mousemove.push(func);
    };
    Mouse.prototype.up = function (func) {
        if (!this.events.mouseupActive) {
            this.initEvent('mouseup');
            this.events.mouseupActive = true;
        }
    };
    Mouse.prototype.down = function (func) {
        if (!this.events.mousedownActive) {
            this.initEvent('mousedown');
            this.events.mousedownActive = true;
        }
    };
    return Mouse;
}(Event_1["default"]);
exports["default"] = Mouse;
},{"vector_class":49,"./Event":78}],29:[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Event_1 = __importDefault(require("./Event"));
var KeyBoard = /** @class */function (_super) {
    __extends(KeyBoard, _super);
    function KeyBoard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.keys = [];
        return _this;
    }
    KeyBoard.prototype.press = function (key, func) {
        var _this = this;
        var func2 = function func2(self, event) {
            // console.log(event.key === key)
            // console.log(event.key, key)
            if (event.key === key) {
                // console.log(func)
                func(_this, event);
            }
        };
        if (!this.events.keypressActive) {
            this.events.keypressActive = true;
            this.initEvent('keypress');
        }
        this.events.keypress.push(func2);
    };
    KeyBoard.prototype.down = function (key, _func) {
        var _this = this;
        _func = function func(self, event) {
            if (event.key === key) _func(_this, event);
        };
        if (!this.events.keydownActive) {
            this.events.keydownActive = true;
            this.initEvent('keydown');
        }
        this.events.keydown.push(_func);
    };
    KeyBoard.prototype.up = function (key, func) {
        var _this = this;
        var func2 = function func2(self, event) {
            if (event.key === key) func(_this, event);
        };
        if (!this.events.keyupActive) {
            this.events.keyupActive = true;
            this.initEvent('keyup');
        }
        this.events.keyup.push(func2);
    };
    return KeyBoard;
}(Event_1["default"]);
exports["default"] = KeyBoard;
},{"./Event":78}],7:[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var defaultCss = document.createElement('style');
defaultCss.type = 'text/css';
defaultCss.innerHTML = "\n\n* {\n  margin:0%;\n  padding: 0%;\n}\n\ncanvas {\n  display: block;\n}\n\n/* \n            GUI\n*/\n\n.wind {\n  position: fixed;\n  background: #333;\n  color: white;\n  font-family: arial;\n  border-radius: 5px;\n  text-align: center;\n  border: 1px solid #111;\n  cursor: pointer;\n}\n\nbutton {\n  cursor: pointer;\n  padding: 5px;\n  border: 1px solid #333;\n  color:black;\n  border-radius: 5px;\n}\n\n/* \n            END GUI\n*/\n";
document.head.appendChild(defaultCss);
var Scene_1 = __importDefault(require("./Scene"));
exports.Scene = Scene_1["default"];
var Render_1 = __importDefault(require("./Render"));
exports.Render = Render_1["default"];
var LinearGradient_1 = __importDefault(require("./LinearGradient"));
exports.LinearGradient = LinearGradient_1["default"];
var vector_class_1 = require("vector_class");
exports.Vector2D = vector_class_1.Vector2D;
var Color_1 = __importDefault(require("./Color"));
exports.Color = Color_1["default"];
var Window_1 = __importDefault(require("./GUI/Window"));
exports.Wind = Window_1["default"];
// Graphics
var Animation_1 = __importDefault(require("./Media/Animation"));
exports.Animation = Animation_1["default"];
var Graphic_1 = __importDefault(require("./graphics/Graphic"));
exports.Graphic = Graphic_1["default"];
var Ellipse_1 = __importDefault(require("./graphics/Ellipse"));
exports.Ellipse = Ellipse_1["default"];
var Poligon_1 = __importDefault(require("./graphics/Poligon"));
exports.Poligon = Poligon_1["default"];
var Picture_1 = __importDefault(require("./Media/Picture"));
exports.Picture = Picture_1["default"];
var Circle_1 = __importDefault(require("./graphics/Circle"));
exports.Circle = Circle_1["default"];
var Video_1 = __importDefault(require("./Media/Video"));
exports.Video = Video_1["default"];
var Rect_1 = __importDefault(require("./graphics/Rect"));
exports.Rect = Rect_1["default"];
var Line_1 = __importDefault(require("./graphics/Line"));
exports.Line = Line_1["default"];
var Text_1 = __importDefault(require("./graphics/Text"));
exports.Text = Text_1["default"];
var Arc_1 = __importDefault(require("./graphics/Arc"));
exports.Arc = Arc_1["default"];
var BezierCurve_1 = __importDefault(require("./graphics/BezierCurve"));
exports.BezierCurve = BezierCurve_1["default"];
var QuadraticCurve_1 = __importDefault(require("./graphics/QuadraticCurve"));
exports.QuadraticCurve = QuadraticCurve_1["default"];
// Events
var Mouse_1 = __importDefault(require("./Events/Mouse"));
var KeyBoard_1 = __importDefault(require("./Events/KeyBoard"));
var mouse = new Mouse_1["default"]();
exports.mouse = mouse;
var keyboard = new KeyBoard_1["default"]();
exports.keyboard = keyboard;
},{"./Scene":10,"./Render":11,"./LinearGradient":12,"vector_class":49,"./Color":13,"./GUI/Window":14,"./Media/Animation":15,"./graphics/Graphic":19,"./graphics/Ellipse":16,"./graphics/Poligon":18,"./Media/Picture":17,"./graphics/Circle":20,"./Media/Video":21,"./graphics/Rect":22,"./graphics/Line":23,"./graphics/Text":24,"./graphics/Arc":25,"./graphics/BezierCurve":26,"./graphics/QuadraticCurve":27,"./Events/Mouse":28,"./Events/KeyBoard":29}],4:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var index_1 = require("./src/index");
//const render = new Render('lienzo')
/*
setInterval(() => {
  const w = new Wind('asd')
  w.setMsg('You have won gold')
}, 10000)
*/
var render = new index_1.Render('lienzo');
render.add(new index_1.Picture({
  src: './apple.png'
}));
/*
import { Render, Line, Circle, Color, Vector, Rect, Text } from './src/index'
const render = new Render('lienzo')

let balls = []

class _Circle extends Circle {
  public vel: Vector = new Vector()
  public acc: Vector = new Vector()
  constructor (data) {
    super(data)
  }
  addForce(f: Vector) {
    this.acc.add(f)
  }
  update() {
   // this.c.alpha = 5 / this.vel.mag()
    //this.color = this.c.rgba()
    this.position.add(this.vel)
    this.vel.mult(0.75)
    this.vel.add(this.acc)
    this.acc.zero()
  }
}

const spacing = 35

for (let y = 0; y < 10; y++) {
  for (let x = 0; x < 10; x++) {
    const color = Color.random()
    const circle = new _Circle({
      position: new Vector((x * spacing) + 100, (spacing * y) + 100 ),
      color: 'white',//color.rgb(),
      z_index: 5
    })
    circle.c = color
    balls.push(circle)
    render.add(circle)
  }
}

class _Line extends Line{
  public b1: _Circle
  public b2: _Circle
  public rest
  public k = 0.0005

  constructor (data) {
    super({
      start: data.start.position,
      end: data.end.position
    })
  
    this.lineColor = data.lineColor
    this.b1 = data.start
    this.b2 = data.end
    this.lineWidth = data.lineWidth
    this.rest = Vector.distance(data.start.position, data.end.position)
  }

  update () {
    
    let v = Vector.sub(this.b1.position, this.b2.position)
    v.normalize()
    let x = (this.rest - Vector.distance(this.b1.position, this.b2.position))
    v.mult(x)
    v.mult(this.k)
  
    v.mult(0.25)

    this.b1.addForce(v)
    v.inverse()
    this.b2.addForce(v)
  }
}
let links = []

for (let b1 = 0; b1 < balls.length; b1++) {
  balls[b1].lines = []
  for (let b2 = 0; b2 < balls.length; b2++) {
    if (b1 != b2) {
      const code = String(b1) + String(b2)
      const iCode = String(b1) + String(b2)
      if (!links.includes(code) || !links.includes(iCode)) {
        const line = new _Line({
          start: balls[b1],
          end: balls[b2],
          lineColor: balls[b1].color,
          lineWidth: 0.25
        })
        render.add(line)
        balls[b1].lines.push({line, ball: balls[b2]})
        links.push(code)
        links.push(iCode)
        
      }
    }
  }

  balls[b1].mouseMove((mouse) => {
    balls[b1].addForce(Vector.mult(Vector.normalize(Vector.sub(balls[b1].position, mouse)), 2))
  })
}

render.autoRender(() => {
  balls.forEach(ball => {
    ball.update()
    ball.lines.forEach((line) => {
      
      line.line.end = Vector.sub(line.ball.position, ball.position)
      line.line.update()
    })
  })
})

















*/
/*

import { Render, Color, Vector, Rect, Text } from './src/index'

const render = new Render('lienzo', 130, 100)
const scale = 1
let balls = []
for (let x = 0; x < render.getWidth() / scale; x++) {
    for (let y = 0; y < render.getHeight() / scale; y++) {
      let color = Color.random()
     // color.setRed(255)
      color.setBlue(255)
      const ball = new Rect({
        position: new Vector((x * scale), (y * scale)),
        color: color.rgb(),
        //radius: scale / 2
         width: scale,
         height: scale
      })
      ball.c = color
      balls.push(ball)
      render.add(ball)
  }
}


document.addEventListener('mousemove', (e) => {
  const mouse = new Vector(e.clientX, e.clientY)
  balls.forEach((ball) => {
    ball.color = `rgba(${ball.c.red}, ${ball.c.green}, ${ball.c.blue}, ${+mouse.distance(ball.position) / render.getWidth() * 4})`
  })
  render.render()
})

render.add(new Text({
  content: 'Hola mundo',
  size: 24,
  position: new Vector(300, 300)
}))
*/
// render.autoRender()
},{"./src/index":7}],91:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '53436' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[91,4], null)
//# sourceMappingURL=/JavaSctipGL.d3e76e17.map