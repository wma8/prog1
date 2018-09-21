/* classes */ 

// Color constructor
class Color {
    constructor(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end try
        
        catch (e) {
            console.log(e);
        }
    } // end Color constructor

        // Color change method
    change(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end throw
        
        catch (e) {
            console.log(e);
        }
    } // end Color change method
} // end color class

//Retrieved from the exercises 4
// Vector class
class Vector { 
    constructor(x,y,z) {
        this.set(x,y,z);
    } // end constructor
    
    // sets the components of a vector
    set(x,y,z) {
        try {
            if ((typeof(x) !== "number") || (typeof(y) !== "number") || (typeof(z) !== "number"))
                throw "vector component not a number";
            else
                this.x = x; this.y = y; this.z = z; 
        } // end try
        
        catch(e) {
            console.log(e);
        }
    } // end vector set
    
    // copy the passed vector into this one
    copy(v) {
        try {
            if (!(v instanceof Vector))
                throw "Vector.copy: non-vector parameter";
            else
                this.x = v.x; this.y = v.y; this.z = v.z;
        } // end try
        
        catch(e) {
            console.log(e);
        }
    }
    
    toConsole(prefix="") {
        console.log(prefix+"["+this.x+","+this.y+","+this.z+"]");
    } // end to console
    
    // static dot method
    static dot(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.dot: non-vector parameter";
            else
                return(v1.x*v2.x + v1.y*v2.y + v1.z*v2.z);
        } // end try
        
        catch(e) {
            console.log(e);
            return(NaN);
        }
    } // end dot static method
    
    // static cross method
    static cross(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.cross: non-vector parameter";
            else {
                var crossX = v1.y*v2.z - v1.z*v2.y;
                var crossY = v1.z*v2.x - v1.x*v2.z;
                var crossZ = v1.x*v2.y - v1.y*v2.x;
                return(new Vector(crossX,crossY,crossZ));
            } // endif vector params
        } // end try
        
        catch(e) {
            console.log(e);
            return(NaN);
        }
    } // end dot static method
    
    // static add method
    static add(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.add: non-vector parameter";
            else
                return(new Vector(v1.x+v2.x,v1.y+v2.y,v1.z+v2.z));
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end add static method

    // static subtract method, v1-v2
    static subtract(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.subtract: non-vector parameter";
            else {
                var v = new Vector(v1.x-v2.x,v1.y-v2.y,v1.z-v2.z);
                return(v);
            }
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end subtract static method

    // static scale method
    static scale(c,v) {
        try {
            if (!(typeof(c) === "number") || !(v instanceof Vector))
                throw "Vector.scale: malformed parameter";
            else
                return(new Vector(c*v.x,c*v.y,c*v.z));
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end scale static method
    
    // static normalize method
    static normalize(v) {
        try {
            if (!(v instanceof Vector))
                throw "Vector.normalize: parameter not a vector";
            else {
                var lenDenom = 1/Math.sqrt(Vector.dot(v,v));
                return(Vector.scale(lenDenom,v));
            }
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end scale static method
    
} // end Vector class

/* utility functions */

// draw a pixel at x,y using color
function drawPixel(imagedata,x,y,color) {
    try {
        if ((typeof(x) !== "number") || (typeof(y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x<0) || (y<0) || (x>=imagedata.width) || (y>=imagedata.height))
            throw "drawpixel location outside of image";
        else if (color instanceof Color) {
            var pixelindex = (y*imagedata.width + x) * 4;
            imagedata.data[pixelindex] = color.r;
            imagedata.data[pixelindex+1] = color.g;
            imagedata.data[pixelindex+2] = color.b;
            imagedata.data[pixelindex+3] = color.a;
        } else 
            throw "drawpixel color is not a Color";
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end drawPixel
    

//get the input triangles from the standard class URL
function getInputTriangles() {
    const INPUT_TRIANGLES_URL = 
        "https://ncsucgclass.github.io/prog1/triangles.json";
        
    // load the triangles file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_TRIANGLES_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log*("Unable to open input triangles file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input triangles

//Part ii of the project
function drawPixelswithLightSourceInInputTriangles(context) {

    var w = context.canvas.width;
    var h = context.canvas.height;
    var eyesPosition = new Vector(0.5*w,0.5*h,-0.5*512);

    console.log(eyesPosition);
    var viewUp = new Vector(0,1,0);
    var lookat = new Vector(0,0,1);
    const disToEyes = 0.5 * 512;

    //light source
    var lightRGB = new Vector(1,1,1);
    var lightLoc = new Vector(-3,1,-0.5);

    var inputTriangles = getInputTriangles();
    // var w = context.canvas.width;
    // var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);

     if (inputTriangles != String.null) {
        var x = 0; var y = 0; // pixel coord init
        var cx = 0; var cy = 0; // init center x and y coord
        var numTrianglePixels = 0; // init num pixels in triangle
        var c = new Color(0,0,0,0); // init the triangle color
        var n = inputTriangles.length; // the number of input files
        //console.log("number of files: " + n);

        //Determine distance for depth concern
        var detArray = matrix(w, h, 1000);
        console.log(detArray);
        // Loop over the triangles, draw rand pixels in each
        for (var f=0; f<n; f++) {
            var tn = inputTriangles[f].triangles.length;

            //Get all the r,g,b index
                var ambientR = inputTriangles[f].material.ambient[0];
                var ambientG = inputTriangles[f].material.ambient[1];
                var ambientB = inputTriangles[f].material.ambient[2];
                console.log(ambientR);

                var diffuseR = inputTriangles[f].material.diffuse[0];
                var diffuseG = inputTriangles[f].material.diffuse[1];
                var diffuseB = inputTriangles[f].material.diffuse[2];

                var specularR = inputTriangles[f].material.specular[0];
                var specularG = inputTriangles[f].material.specular[1];
                var specularB = inputTriangles[f].material.specular[2];

                var lightN = inputTriangles[f].material.n;
                console.log("LightN" + lightN);
            //console.log("number of triangles in this files: " + tn);
            // c.change(
            //         inputTriangles[f].material.diffuse[0]*255,
            //         inputTriangles[f].material.diffuse[1]*255,
            //         inputTriangles[f].material.diffuse[2]*255,
            //         255);

            // Loop over the triangles, draw each in 2d
            for(var t=0; t<tn; t++){

                var vertex1 = inputTriangles[f].triangles[t][0];
                var vertex2 = inputTriangles[f].triangles[t][1];
                var vertex3 = inputTriangles[f].triangles[t][2];

                var vertexPos1 = inputTriangles[f].vertices[vertex1] ;
                var vertexPos2 = inputTriangles[f].vertices[vertex2] ;
                var vertexPos3 = inputTriangles[f].vertices[vertex3] ;

                //Real normal
                var a1 = new Vector(vertexPos1[0], vertexPos1[1], vertexPos1[2]);
                var a2 = new Vector(vertexPos2[0], vertexPos2[1], vertexPos2[2]);
                var a3 = new Vector(vertexPos3[0], vertexPos3[1], vertexPos3[2]);
                
                //Normal vector
                var a12 = Vector.subtract(a2, a1);
                var a23 = Vector.subtract(a3, a2);
                var a31 = Vector.subtract(a1, a3);
                var realNormal = Vector.cross(a12, a23);
                
                //realNormal.toConsole();

                //Triangle normal in dimension
                var v1 = new Vector(vertexPos1[0]*w, vertexPos1[1]*h, vertexPos1[2]*512);
                var v2 = new Vector(vertexPos2[0]*w, vertexPos2[1]*h, vertexPos2[2]*512);
                var v3 = new Vector(vertexPos3[0]*w, vertexPos3[1]*h, vertexPos3[2]*512);
                
                //Normal vector
                var v12 = Vector.subtract(v2, v1);
                var v23 = Vector.subtract(v3, v2);
                var v31 = Vector.subtract(v1, v3);
                var normal = Vector.cross(v12, v23);
                //normal.toConsole();
                //Triangle plane coefficient
                var coeff = Vector.dot(normal, v1);
            

                for(var x=0 ; x<w; x++) {
                    for(var y=0; y<h; y++) {
                        var ray = Vector.subtract(new Vector(x, y, 0), eyesPosition);
                        //Do ray & plane intersect
                        if(Vector.dot(normal, ray) != 0) {
                            //ray distance to intersection
                            var distance = (coeff - Vector.dot(normal, eyesPosition)) / (Vector.dot(normal, ray));
                            //console.log(distance);
                            //coordinates of intersection
                            var cod = Vector.add(eyesPosition, Vector.scale(distance, ray));
                            //cod.toConsole();
                            //Determine if its in triangle
                            var t1 = (Vector.dot(normal, Vector.cross(v12, Vector.subtract(cod, v1)))) < 0.0;
                            var t2 = (Vector.dot(normal, Vector.cross(v23, Vector.subtract(cod, v2)))) < 0.0;                            
                            var t3 = (Vector.dot(normal, Vector.cross(v31, Vector.subtract(cod, v3)))) < 0.0;
                            // draw the pixel if inside the triangle
                            if((t1==t2)&&(t2==t3)) {
                                // drawPixel(imagedata,x,y,c);
                                if(distance <= detArray[x][y]){
                                    //Calculate the color of that pixel by using phong lighting calculation.

                                    //Recover the vector from 512 times scale
                                    var realCod =  Vector.scale(1/512, cod);
                                    var Lvec = Vector.subtract(lightLoc, realCod);
                                    //Calculate R
                                    var temp = Vector.scale(Vector.dot(realNormal, Lvec), realNormal);
                                    var temp2 = Vector.scale(2,temp);
                                    var Rvec = Vector.subtract(temp2,Lvec);
                                   
                                    var realEyesPosition = Vector.scale(1/512, eyesPosition);
                                    var Vvec = Vector.subtract(realEyesPosition, realCod);
                                    //Vvec.toConsole();
                                    //Use the formula I = La Ka + Ld Kd (N*L) + Ls Ks (R*V)^n
                                    var colorR = 1*ambientR + 1*diffuseR * Vector.dot( Vector.normalize(realNormal), Vector.normalize(Lvec))
                                    + 1*specularR *Math.pow( Vector.dot(Vector.normalize(Rvec), Vector.normalize(Vvec)) ,lightN );

                                    var colorG = 1*ambientG + 1*diffuseG * Vector.dot( Vector.normalize(realNormal), Vector.normalize(Lvec) ) +
                                        1*specularG* Math.pow( Vector.dot(Vector.normalize(Rvec), Vector.normalize(Vvec) ), lightN);
                                    var colorB = 1*ambientB + 1*diffuseB * Vector.dot( Vector.normalize(realNormal), Vector.normalize(Lvec) ) +
                                        1*specularB*Math.pow( Vector.dot(Vector.normalize(Rvec), Vector.normalize(Vvec) ), lightN);
                                    
                                    console.log("check number");
                                    console.log(colorR);
                                    


                                    detArray[x][y] = distance;
                                    //change color
                                    c.change(colorR*255,colorG*255,colorB*255,255);
                                    drawPixel(imagedata,x,y,c);
                                }
                            }
                        }
                    }
                }
            } // end for files
        context.putImageData(imagedata, 0, 0);
        } 
    }
} // end draw rand pixels in input triangles

//Part i of the project
function drawPixelsInInputTriangles(context) {

    var w = context.canvas.width;
    var h = context.canvas.height;
    var eyesPosition = new Vector(0.5*w,0.5*h,-0.5*512);

    console.log(eyesPosition);
    var viewUp = new Vector(0,1,0);
    var lookat = new Vector(0,0,1);
    const disToEyes = 0.5 * 512;

    //light source
    // var lightLoc = new Vector(1*w,1*h,1*512);

    var inputTriangles = getInputTriangles();
    // var w = context.canvas.width;
    // var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);

     if (inputTriangles != String.null) {
        var x = 0; var y = 0; // pixel coord init
        var cx = 0; var cy = 0; // init center x and y coord
        var numTrianglePixels = 0; // init num pixels in triangle
        var c = new Color(0,0,0,0); // init the triangle color
        var n = inputTriangles.length; // the number of input files
        //console.log("number of files: " + n);

        //Determine distance for depth concern
        var detArray = matrix(w, h, 1000);
        console.log(detArray);
        // Loop over the triangles, draw rand pixels in each
        for (var f=0; f<n; f++) {
            var tn = inputTriangles[f].triangles.length;
            //console.log("number of triangles in this files: " + tn);

            //Get diffuse color
            c.change(
                    inputTriangles[f].material.diffuse[0]*255,
                    inputTriangles[f].material.diffuse[1]*255,
                    inputTriangles[f].material.diffuse[2]*255,
                    255);

            // Loop over the triangles, draw each in 2d
            for(var t=0; t<tn; t++){
                var vertex1 = inputTriangles[f].triangles[t][0];
                var vertex2 = inputTriangles[f].triangles[t][1];
                var vertex3 = inputTriangles[f].triangles[t][2];

                var vertexPos1 = inputTriangles[f].vertices[vertex1] ;
                var vertexPos2 = inputTriangles[f].vertices[vertex2] ;
                var vertexPos3 = inputTriangles[f].vertices[vertex3] ;

                //Triangle normal
                var v1 = new Vector(vertexPos1[0]*w, vertexPos1[1]*h, vertexPos1[2]*512);
                var v2 = new Vector(vertexPos2[0]*w, vertexPos2[1]*h, vertexPos2[2]*512);
                var v3 = new Vector(vertexPos3[0]*w, vertexPos3[1]*h, vertexPos3[2]*512);
                
                //Normal vector
                var v12 = Vector.subtract(v2, v1);
                var v23 = Vector.subtract(v3, v2);
                var v31 = Vector.subtract(v1, v3);
                var normal = Vector.cross(v12, v23);
                //Triangle plane coefficient
                var coeff = Vector.dot(normal, v1);
            
                for(var x=0 ; x<w; x++) {
                    for(var y=0; y<h; y++) {
                        var ray = Vector.subtract(new Vector(x, y, 0), eyesPosition);
                        //Do ray & plane intersect
                        if(Vector.dot(normal, ray) != 0) {
                            //ray distance to intersection
                            var distance = (coeff - Vector.dot(normal, eyesPosition)) / (Vector.dot(normal, ray));
                            //console.log(distance);
                            //coordinates of intersection
                            var cod = Vector.add(eyesPosition, Vector.scale(distance, ray));
                            //Determine if its in triangle
                            var t1 = (Vector.dot(normal, Vector.cross(v12, Vector.subtract(cod, v1)))) < 0.0;
                            var t2 = (Vector.dot(normal, Vector.cross(v23, Vector.subtract(cod, v2)))) < 0.0;                            
                            var t3 = (Vector.dot(normal, Vector.cross(v31, Vector.subtract(cod, v3)))) < 0.0;
                            // draw the pixel if inside the triangle
                            if((t1==t2)&&(t2==t3)) {
                                // drawPixel(imagedata,x,y,c);
                                if(distance <= detArray[x][y]){
                                    detArray[x][y] = distance;
                                    drawPixel(imagedata,x,y,c);
                                }
                            }
                        }
                    }
                }
            } // end for files
        context.putImageData(imagedata, 0, 0);
        } 
    }
} // end draw rand pixels in input triangles

//Retrieve from https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
function matrix( rows, cols, defaultValue){
  var arr = [];
  // Creates all lines:
  for(var i=0; i < rows; i++){
      // Creates an empty line
      arr.push([]);
      // Adds cols to the empty line:
      arr[i].push( new Array(cols));
      for(var j=0; j < cols; j++){
        // Initializes:
        arr[i][j] = defaultValue;
      }
  }
return arr;
}


//put random points in the triangles from the class github
function drawRandPixelsInInputTriangles(context) {
    var inputTriangles = getInputTriangles();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.1;
    var numCanvasPixels = (w*h)*PIXEL_DENSITY; 
    
    if (inputTriangles != String.null) { 
        var x = 0; var y = 0; // pixel coord init
        var cx = 0; var cy = 0; // init center x and y coord
        var numTrianglePixels = 0; // init num pixels in triangle
        var c = new Color(0,0,0,0); // init the triangle color
        var n = inputTriangles.length; // the number of input files
        //console.log("number of files: " + n);

        // Loop over the triangles, draw rand pixels in each
        for (var f=0; f<n; f++) {
            var tn = inputTriangles[f].triangles.length;
            //console.log("number of triangles in this files: " + tn);
            
            // Loop over the triangles, draw each in 2d
            for(var t=0; t<tn; t++){
                var vertex1 = inputTriangles[f].triangles[t][0];
                var vertex2 = inputTriangles[f].triangles[t][1];
                var vertex3 = inputTriangles[f].triangles[t][2];

                var vertexPos1 = inputTriangles[f].vertices[vertex1];
                var vertexPos2 = inputTriangles[f].vertices[vertex2];
                var vertexPos3 = inputTriangles[f].vertices[vertex3];
                //console.log("vertexPos1 " + vertexPos1);
                //console.log("vertexPos2 " + vertexPos2);
                //console.log("vertexPos3 " + vertexPos3);
                
                // triangle position on canvas
                
                var v1 = [w*vertexPos1[0], h*vertexPos1[1]];
                var v2 = [w*vertexPos2[0], h*vertexPos2[1]];
                var v3 = [w*vertexPos3[0], h*vertexPos3[1]];
                
                // calculate triangle area on canvas (shoelace formula)
                var triangleArea = 0.5*Math.abs(v1[0]*v2[1]+v2[0]*v3[1]+v3[0]*v1[1]-v2[0]*v1[1]-v3[0]*v2[1]-v1[0]*v3[1]);
                var numTrianglePixels = triangleArea; // init num pixels in triangle
                //console.log("triangle area " + triangleArea);
                numTrianglePixels *= PIXEL_DENSITY; // percentage of triangle area to render to pixels
                numTrianglePixels = Math.round(numTrianglePixels);
                // console.log("numTrianglePixels " + numTrianglePixels);
                c.change(
                    inputTriangles[f].material.diffuse[0]*255,
                    inputTriangles[f].material.diffuse[1]*255,
                    inputTriangles[f].material.diffuse[2]*255,
                    255); // triangle diffuse color
                for (var p=0; p<numTrianglePixels; p++) {
                    var point; // on canvas plane
                    var triangleTest = 0;
                    while (triangleTest == 0 ){ //if the pixel outside the triangle
                  
                        point = [Math.floor(Math.random()*w), Math.floor(Math.random()*h)];
                        // plane checking
                        
                        var t1 = ((point[0]-v2[0]) * (v1[1] - v2[1]) - (v1[0] - v2[0]) * (point[1] - v2[1])) < 0.0;
                        var t2 = ((point[0]-v3[0]) * (v2[1] - v3[1]) - (v2[0] - v3[0]) * (point[1] - v3[1])) < 0.0;
                        var t3 = ((point[0]-v1[0]) * (v3[1] - v1[1]) - (v3[0] - v1[0]) * (point[1] - v1[1])) < 0.0;
                        
                        if((t1==t2)&&(t2==t3)) // draw the pixel if inside the triangle
                            triangleTest = 1;
                    }
                    drawPixel(imagedata,point[0],point[1],c);
                    //console.log("color: ("+c.r+","+c.g+","+c.b+")");
                    //console.log("x: "+ x);
                    //console.log("y: "+ y);
                } // end for pixels in triangle
            } // end for triangles
        } // end for files
        context.putImageData(imagedata, 0, 0);
    } // end if triangle file found
} // end draw rand pixels in input triangles

//draw 2d projections traingle from the JSON file at class github
function drawInputTrainglesUsingPaths(context) {
    var inputTriangles = getInputTriangles();
    
    if (inputTriangles != String.null) { 
        var c = new Color(0,0,0,0); // the color at the pixel: black
        var w = context.canvas.width;
        var h = context.canvas.height;
        var n = inputTriangles.length; 
        //console.log("number of files: " + n);

        // Loop over the input files
        for (var f=0; f<n; f++) {
            var tn = inputTriangles[f].triangles.length;
            //console.log("number of triangles in this files: " + tn);
            
            // Loop over the triangles, draw each in 2d
            for(var t=0; t<tn; t++){
                var vertex1 = inputTriangles[f].triangles[t][0];
                var vertex2 = inputTriangles[f].triangles[t][1];
                var vertex3 = inputTriangles[f].triangles[t][2];

                var vertexPos1 = inputTriangles[f].vertices[vertex1];
                var vertexPos2 = inputTriangles[f].vertices[vertex2];
                var vertexPos3 = inputTriangles[f].vertices[vertex3];
                //console.log("vertexPos1 " + vertexPos1);
                //console.log("vertexPos2 " + vertexPos2);
                //console.log("vertexPos3 " + vertexPos3);
                
                context.fillStyle = 
                    "rgb(" + Math.floor(inputTriangles[f].material.diffuse[0]*255)
                    +","+ Math.floor(inputTriangles[f].material.diffuse[1]*255)
                    +","+ Math.floor(inputTriangles[f].material.diffuse[2]*255) +")"; // diffuse color
            
                var path=new Path2D();
                path.moveTo(w*vertexPos1[0],h*vertexPos1[1]);
                path.lineTo(w*vertexPos2[0],h*vertexPos2[1]);
                path.lineTo(w*vertexPos3[0],h*vertexPos3[1]);
                path.closePath();
                context.fill(path);

            } // end for triangles
        } // end for files
    } // end if triangle files found
} // end draw input triangles


/* main -- here is where execution begins after window load */

function main() {

    // Get the canvas and context
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
 
    // Create the image
    //drawRandPixels(context);
      // shows how to draw pixels
    
    //drawRandPixelsInInputEllipsoids(context);
      // shows how to draw pixels and read input file
      
    //drawInputEllipsoidsUsingArcs(context);
      // shows how to read input file, but not how to draw pixels
    
    //drawRandPixelsInInputTriangles(context);
    // shows how to draw pixels and read input file
    
    //drawInputTrainglesUsingPaths(context);
    // shows how to read input file, but not how to draw pixels

    //Project part 1
    //drawPixelsInInputTriangles(context);
    
    //Project part 2
    drawPixelswithLightSourceInInputTriangles(context)
}
