//referenced code
//https://p5js.org/examples/image-background-image.html
//https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
//adapted by Natalee, Megan, Ali

// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

var sensors = [];

var splitter;



var diameter0, diameter1;// diameter2; //use to change the diameter of 3 circles
var bg;
let timer = 50



function setup() {
    bg = loadImage("Images/mazefinal2.png");
  createCanvas(1300, 1000);

  
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem12");

  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);


}

// We are connected and ready to go
function serverConnected() {
  println("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  println("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    println(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  println("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  println(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  //console.log(currentString);             // println the string
  latestData = currentString;            // save it for the draw method
  console.log("latestData" + latestData);   //check to see if data is coming in
  splitter = split(latestData, ',');       // split each number using the comma as a delimiter
  //console.log("splitter[0]" + splitter[0]); 
  diameter0 = splitter[0];                 //put the first sensor's data into a variable
  diameter1 = splitter[1];
  //diameter2 = splitter[2];    
     
    

    
}


function gotRawData(thedata) {
  println("gotRawData" + thedata);
}



function draw() {
 background(bg);   
  noStroke();   
    fill(36,87,221);
  ellipse(diameter0, diameter1, 50, 50);
   
  fill(255,255,255);
  textSize(50);
  text(timer, width/20, height/20);
   
      
  if (frameCount % 60 == 0 && timer > 0) { 
    timer --;
  }
  if (timer == 0) {
    text("GAME OVER", width/3, height*0.7);
  } else if (timer==40){
      text("You lost a friend!", width/3, height*0.7);
  } else if (timer == 35){
      text("Your romantic relationship is over!", width/3, height*0.7);
  }  else if (timer == 30){
      text("You're losing too much sleep!", width/3, height*0.7);
  }  else if (timer == 25){
      text("You're failing all your classes", width/3, height*0.7);
  }  else if (timer == 20){
      text("You spent all your money on games!", width/3, height*0.7);
  }  else if (timer < 20 && timer >15){
      text("Welcome to technology addiction.", width/3, height*0.7);
  }else if (timer < 14 && timer > 10){
      text("It's all around us...", width/3, height*0.7);
  } else if (timer < 9){
      text("Don't forget about your life outside of the screen.", width/8, height*0.7);
  }
  

}
