/*
 * MarbleJar object for simulating simple marble jar experiments.
 *
 * Written by Craig Miller, April 2012
 * Adapted from concepts by David Reed
 *
 * This jar can only add white or black marbles.
 *
 * Example usage:
 *   jar = new MarbleJar();  // create an empty jar
 *   jar.addMarble("white"); // add a white marble
 *   jar.drawMarble();  // randomly selects marble and returns color (string)
 *   jar.isEmpty();  // returns true if jar is empty, false otherwise
 *
 */

// constructor for creating an empty jar
MarbleJar = function ()
{
    this.white = 0;
    this.black = 0;
}

MarbleJar.prototype.addMarble = function (color)
{
    if (color === "white") {
	this.white += 1;
    }
    else if (color === "black") {
	this.black += 1;
    }
}

// assumes that object has at least one marble
// returns color (string) of drawn marble
MarbleJar.prototype.drawMarble = function ()
{
    var chosenMarble;

    // choose marble so that 0 <= chosenMarble < total_marbles
    chosenMarble = Math.floor(Math.random() * (this.white + this.black));

    if (chosenMarble < this.white) {
	this.white -= 1;
	return "white";
    }
    else {
	this.black -= 1;
	return "black";
    }
}

MarbleJar.prototype.isEmpty = function ()
{
    return 0 === this.white + this.black;
}