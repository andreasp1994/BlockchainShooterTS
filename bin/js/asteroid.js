"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Asteroid = (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Asteroid.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (s) {
            this._size = s;
        },
        enumerable: true,
        configurable: true
    });
    Asteroid.ASTEROID_TINY = 0;
    Asteroid.ASTEROID_SMALL = 1;
    Asteroid.ASTEROID_MEDIUM = 2;
    Asteroid.ASTEROID_LARGE = 3;
    return Asteroid;
}(Phaser.Sprite));
exports.Asteroid = Asteroid;
//# sourceMappingURL=asteroid.js.map