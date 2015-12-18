(function() {

var notes = {
    captainProportional: "The exact multiplier used to compute the damage is proportional to the " +
        "crew's remaining HP and is higher the #1 the HP is. The multiplier is calculated as #2. " +
        "At full health the boost is equal to #3x, with 1 HP left to #4x.",
    fixed: "Fixed damage means it entirely bypasses the enemy's defense.",
	noFixedPerc: "Specials that deal fixed damage or cut a percentage of the enemy's HP are not " +
        "affected by this captain ability",
    orb: "Orb amplification only affects matching and opposite orbs and works both ways: " +
        "matching orbs will deal #1x more damage and opposite orbs will deal #1x less damage.",
    poison: "Poison deals 0.5x character's ATK in fixed damage at the end of each turn.",
    random: "Estimated random damage range: between #1 HP and #2 HP.",
    randomHits: "The target of each of the #1 hits is chosen randomly.",
    specialProportional: "The exact multiplier used to compute the damage is proportional to the " +
        "crew's remaining HP and is higher the #1 the HP is. The multiplier is calculated as: #2."
};

/***********
 * Angular *
 ***********/

var app = angular.module('optc');
var directives = { }, filters = { };

/**********************
 * Element directives *
 **********************/

directives.linkButton = function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../common/views/links.html',
        scope: { exclude: '@' },
        link: function(scope, element, attrs) {
            element.find(".trigger").click(function() {
                element.toggleClass("active"); 
            });
        }
    };
};

/***********
 * Filters * 
 ***********/

filters.notes = function() {
    return function(input) {
        if (!input) return input;
        return input.trim().replace(/#\{(.+?)\}/g,function(x,y) {
            var tokens = y.trim().split(/:/);
            if (!tokens.length || !notes.hasOwnProperty(tokens[0].trim())) return x;
            return notes[tokens[0].trim()].replace(/#(\d+)/g,function(a,b) {
                return (tokens[parseInt(b,10)] || '').trim();
            });
        });
    };
};

/******************
 * Initialization *
 ******************/

for (var directive in directives)
    app.directive(directive, directives[directive]);

for (var filter in filters)
    app.filter(filter, filters[filter]);

})();
