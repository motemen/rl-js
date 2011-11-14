var Random = function (n) {
    if (arguments.length == 0) n = 1;
    return Math.random() * n;
};

Random.between = function (from, to) {
    if (from > to) {
        var tmp = from;
        from = to;
        to = tmp;
    }
    return Math.floor(this.realBetween(from, to + 1));
};

Random.realBetween = function (from, to) {
    return Random(to - from) + from;
};

Random.oneIn = function (n) {
    return Random(n) < 1;
};

Random.choose = function () {
    var choices = [];
    var weights = [];
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        var a = arguments[i];
        var choice = a instanceof Array ? a[0] : a;
        var weight = a instanceof Array ? a[1] : 1.0;
        choices.push(choice);
        weights.push(weight);
        sum += weight;
    }

    var r = Random(sum);
    for (var i = 0, w = weights[0]; i < weights.length; w += weights[++i]) {
        if (r < w) {
            return choices[i];
        }
    }

    // should not reach here
    return choices[chooses.length - 1];
};

this.Random = Random;
