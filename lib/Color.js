var Color = {};

Color.rgbToHsv = function (rgb) {
    var hsv = {};

    var max = Math.max(rgb.r, rgb.g, rgb.b);
    var min = Math.min(rgb.r, rgb.g, rgb.b);

    hsv.h = max == rgb.r ? 60 * ( rgb.g - rgb.b ) / ( max - min ) + 360
          : max == rgb.g ? 60 * ( rgb.b - rgb.r ) / ( max - min ) + 360 + 120
          : max == rgb.b ? 60 * ( rgb.r - rgb.g ) / ( max - min ) + 360 + 240
          : undefined;
    hsv.h %= 360;
    hsv.s = (max - min) / max;
    hsv.v = max;
    return hsv;
};

Color.hsvToRgb = function (hsv) {
    var rgb = {};

    var h = Math.floor(hsv.h / 60) % 6;
    var f = hsv.h / 60 - h;
    var p = hsv.v * ( 1 - hsv.s );
    var q = hsv.v * ( 1 - f * hsv.s );
    var t = hsv.v * ( 1 - ( 1 - f ) * hsv.s );

    switch (h) {
        case 0:
            rgb.r = hsv.v;
            rgb.g = t;
            rgb.b = p;
            break;

        case 1:
            rgb.r = q;
            rgb.g = hsv.v;
            rgb.b = p;
            break;

        case 2:
            rgb.r = p;
            rgb.g = hsv.v;
            rgb.b = t;
            break;

        case 3:
            rgb.r = p;
            rgb.g = q;
            rgb.b = hsv.v;
            break;

        case 4:
            rgb.r = t;
            rgb.g = p;
            rgb.b = hsv.v;
            break;

        case 5:
            rgb.r = hsv.v;
            rgb.g = p;
            rgb.b = q;
    }

    return rgb;
};

Color.rgbToHex = function (rgb) {
    var hexes = [
        Math.floor(rgb.r * 255).toString(16),
        Math.floor(rgb.g * 255).toString(16),
        Math.floor(rgb.b * 255).toString(16)
    ];
    for (var i = 0; i < hexes.length; i++) {
        if (hexes[i].length < 2) {
            hexes[i] = '0' + hexes[i];
        }
    }
    return '#' + hexes.join('');
};

Color.hsvToHex = function (hsv) {
    return this.rgbToHex(this.hsvToRgb(hsv));
};

Color.seemsLikeHsv = function (o) {
    return [ 'h', 's', 'v' ].every(
        function (p) { return o.hasOwnProperty(p) }
    );
};

this.Color = Color;
