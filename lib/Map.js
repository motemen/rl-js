var Tile = {};

Tile.FLOOR = '.';
Tile.WALL  = '#';

Tile.COLOR_SHADOW = { h: 0, s: 0.0, v: 0.2 };
Tile.COLOR_INVISIBLE = { h: 0, s: 0.0, v: 0 };

var Map = function (option) {
    if (!option) option = {};

    this.map = {};

    this.defaultValue = option.defaultValue;

    this.left   = 0;
    this.top    = 0;
    this.right  = option.width - 1 || 0;
    this.bottom = option.height - 1 || 0;
};

Map.prototype.cloneSize = function () {
    var map = new Map;
    map.left   = this.left;
    map.top    = this.top;
    map.right  = this.right;
    map.bottom = this.bottom;
    return map;
};

Map.prototype.set = function (x, y, c, option) {
    if (!option) option = {};
    if (!(y in this.map)) this.map[y] = {};

    if (x < this.left)   this.left   = x;
    if (y < this.top)    this.top    = y;
    if (x > this.right)  this.right  = x;
    if (y > this.bottom) this.bottom = y;

    this.map[y][x] = c;
    if (option.color) {
        this.setColor(x, y, option.color);
    }
};

Map.prototype.get = function (x, y) {
    if (!(y in this.map))    return this.defaultValue;
    if (!(x in this.map[y])) return this.defaultValue;
    return this.map[y][x];
};

Map.prototype.toString = function () {
    var s = '';
    for (var y = this.top; y <= this.bottom; y++) {
        for (var x = this.left; x <= this.right; x++) {
            s += this.get(x, y) || ' ';
        }
        s += "\n";
    }
    return s;
};

Map.fromArrays = function () {
    var map = new this;
    for (var y = 0; y < arguments.length; y++) {
        for (var x = 0; x < arguments[y].length; x++) {
            map.set(x, y, arguments[y][x]);
        }
    }
    return map;
};

Map.Layered = function () {
    this.maps = Array.prototype.slice.call(arguments);
    this.defaultValue = this.maps[this.maps.length - 1].defaultValue;

    this.left   = 0
    this.top    = 0;
    this.right  = 0;
    this.bottom = 0;

    for (var i = 0; i < this.maps.length; i++) {
        this.left   = Math.min(this.left,   this.maps[i].left);
        this.top    = Math.min(this.top,    this.maps[i].top);
        this.right  = Math.max(this.right,  this.maps[i].right);
        this.bottom = Math.max(this.bottom, this.maps[i].bottom);
    }
};

Map.Layered.prototype.get = function (x, y) {
    for (var i = 0; i < this.maps.length; i++) {
        var map = this.maps[i].map;
        if (!(y in map))    continue;
        if (!(x in map[y])) continue;
        return map[y][x];
    }
    return this.defaultValue;
};

Map.Layered.prototype.toString = function () {
    return this.maps.join("\n");
};

this.Tile = Tile;
this.Map = Map;
