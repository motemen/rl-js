// depends: Map

var FOV = {};

FOV.Visitor = function (option) {
    this.map = option.map;
    this.x   = option.x;
    this.y   = option.y;
    this.maxDepth = option.maxDepth || 10;
    this.callback = option.callback;
};

FOV.Visitor.prototype.visit = function () {
    if (!this.callback(this.map.get(this.x, this.y), 0, 0))
        return;
    for (var i = 0; i < 4; i++)
        this.visitOneQuadrant(i);
};

FOV.Visitor.prototype.visitOneQuadrant = function (N) {
    var depthSign = N % 4 < 2 ? +1 : -1;
    var depthIsX  = N % 2 == 0;

    var ranges = [ [ -1.0, 1.0 ] ];
    for (var depth = 1; depth < this.maxDepth; ++depth) {
        for (var offset = -depth; offset <= depth; ++offset) {
            if (depthIsX) {
                var dx = depth * depthSign, dy = offset;
            } else {
                var dx = offset, dy = depth * depthSign;
            }

            var x = this.x + dx, y = this.y + dy;
            if (x < this.map.left || this.map.right < x
                    || y < this.map.top || this.map.bottom < y)
                continue;

            var slope = offset / depth;
            for (var r = 0; r < ranges.length; r++) {
                var range = ranges[r];
                if (range[0] <= slope && slope <= range[1])
                    break;
            }
            if (r == ranges.length)
                continue;

            var thru = this.callback(this.map.get(x, y), dx, dy);
            if (!thru) {
                ranges.splice(
                    r, 1,
                    [ range[0], Math.min(( offset - 0.5 ) / ( depth - 0.5 ), ( offset - 0.5 ) / ( depth + 0.5 )) ],
                    [ Math.max(( offset + 0.5 ) / ( depth + 0.5 ), ( offset + 0.5 ) / ( depth - 0.5 )), range[1] ]
                );
            }
        }
    }
};

this.FOV = FOV;
