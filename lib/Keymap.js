// depends: Game

var Keymap = function (game) {
    this.game = game;
    this.keymap = Keymap.keymap;
};

Keymap.prototype.register = function (node) {
    var self = this;
    $(node || document).keypress(function (e) {
        var key = String.fromCharCode(e.charCode);
        if (e.ctrlKey) key = '^' + key;
        if (e.metaKey) key = 'M-' + key;
        if (key in self.keymap) {
            self.keymap[key].call(self);
        }
    });
};

Keymap.keymap = {};

Keymap.keymap['h'] = function () {
    this.game.character.x--;
    this.game.render();
};

Keymap.keymap['j'] = function () {
    this.game.character.y++;
    this.game.render();
};

Keymap.keymap['k'] = function () {
    this.game.character.y--;
    this.game.render();
};

Keymap.keymap['l'] = function () {
    this.game.character.x++;
    this.game.render();
};

this.Keymap = Keymap;
