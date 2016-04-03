var t1l = [1,0,-1,1];
var t1r = [-1,-1,-1,1];

//////////FUNCT START////////////////
var dotProduct = 0;
var magnitude1 = 0;
var magnitude2 = 0;

for (i = 0; i < t1l.length; i++) {
    //summing together the squares
    //Math:  a2 = x2 + y2 + z2
    magnitude1 += (t1l[i]*t1l[i]);
    magnitude2 += (t1r[i]*t1r[i]);

    //Math: 3D dot product = x1*x2 + y1*y2 + z1*z2
    //Cite: http://www.developer.com/java/other/article.php/3776231/Getting-Started-with-the-Vector-Dot-Product-Math-for-Java-Game-Programmers.htm
    dotProduct += t1l[i]*t1r[i];
}

//sqrt the magnitudes for the final calculation
magnitude1=Math.sqrt(magnitude1);
magnitude2=Math.sqrt(magnitude2);

//Math: Angle = inverse cosine of dot product / magnitude
//Cite: https://www.quora.com/How-are-angles-between-dimensions-measured-What-would-be-the-angle-between-10-dimensions-In-fact-is-there-a-specific-angle-for-any-two-perpendicular-dimensions
var angle = (dotProduct / (magnitude1 * magnitude2));

console.log(angle);
