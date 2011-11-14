var Light = {};

Light.power = 3.5;

Light.BRIGHT_COLOR_HSV = { h: 60, s: 1.0, v: 1.0 };

Light.setNoDirection = function (map, colorMap, x, y) {
    var self = this;
    var fov = new FOV.Visitor({
        map: map,
        x: x,
        y: y,
        maxDepth: this.power + 1
    });
    fov.callback = function (tile, dx, dy) {
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d > self.power) return false;

        colorMap.set(x + dx, y + dy, { h: 60, s: 1.0, v: 1 / (d + 1) });

        return tile == Tile.FLOOR; // thru
    };
    fov.visit();
};

this.Light = Light;
