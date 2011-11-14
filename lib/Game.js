// depends: Map, Light

var Game = function () { Game.initialize.apply(this, arguments) };

Game.initialize = function (option) {
    this.map = option.map;
    this.screen = $(option.screen || '#screen');

    this.colorMap = new Map({ defaultValue: Tile.COLOR_INVISIBLE });

    this.colorMap.left   = this.map.left;
    this.colorMap.top    = this.map.top;
    this.colorMap.right  = this.map.right;
    this.colorMap.bottom = this.map.bottom;

    this.character = {};
    this.character.x = this.map.left;
    this.character.y = this.map.top;
};

Game.prototype.render = function () {
    var lightMap = this.colorMap.cloneSize();

    Light.setNoDirection(this.map, lightMap, this.character.x, this.character.y);

    var colorMap = new Map.Layered(lightMap, this.colorMap);

    var html = '';
    for (var y = colorMap.top; y <= colorMap.bottom; y++) {
        for (var x = colorMap.left; x <= colorMap.right; x++) {
            var attr = '';
            var color = colorMap.get(x, y);
            if (color) {
                attr = ' style="color: ' + Color.hsvToHex(color) + '"';
            }
            html += '<span'+attr+'>' + (this.map.get(x, y) || ' ') + '</span>';
        }
        html += "\n";
    }

    this.screen.html(html);
};

this.Game = Game;
