/**
 * Javascript Library for task creation.
 * 
 * Variables for
 *  -Canvas
 *  -Context + sets image smoothing.
 *  -Frame rate
 *  -Colors
 *  -hashed image
 *  -Letter arrays for each key
 * Functions for 
 *  -drawing lines
 *  -wrapText() - wrapping text into columns
 *  -longText() - for longer text with multiple paragraphs
 *  -Drawing context screens
 *  -Drawing titles for tasks;
 *  -Drawing containers with titles
 *  -Change keyCode to node daemon button (For user testing)
 * Objects defined
 *  -StartUp Tasks.
 *  -Other Tasks
 *  -Buttons
 */

  var c = document.getElementById("view");
  var ctx = c.getContext("2d");
  //ctx.webkitImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
    /**
     * Set the canvas and context here so that it is set once and
     * the naming is consistent. Make sure there is a Canvas with
     * the view ID in console HTML files.
     */
  
  var fps = 10;
    /**
     * Frames per second the tasks run at. This can theoritcally be changed
     * here but would cause many issues with animation speeds.
     */ 
  
  var black = '#000';
  var white = '#fdfefc';
    /**
     * Set the only two colors used here. Use these instead of strings so that
     * changes are easy and consistency is ensured.
     * The black may need to change form this pure black to something off-black
     * to improve chronological consistency/realism of the screen.
     */ 
  
  var hash = new Image();
  hash.src = "../hash.png";
    /**
     * Sets the hash image object so it can be used in any task.
     * 
     * The hash image is used to indicate unselectable/disabled objects
     * or something being offline or otherwise invalid.
     * Usually set at 40% opacity as well.
     * { ctx.drawImage(hash, sX, sY, sW, sH, dX, dY, dW, dH); }
     * The hash image should be drawn onto the task screen so that the 
     * coordinates of the rectange where you want the hash (dX, dY, dW, dH) 
     * match the source (sX, sY, sW, sH). This will ensure that the image isn't 
     * distorted and seperate hashed elements will visually align.
     */ 
      

  var consoleTime = 0;
    /**
     * The consoleTime variable is incremented with every frame
     * This is used to syncronise elements and to progress animations
     * Eg, flashing selections use { consoleTime%8 <= 3 } to flash at a rate of 
     * once per 8 frames (half on, half off).
     */

  var phase = 0;
    /**
     * The phase variable indicates what step or page the task is up to.
     * Used primarily in a switch statement in each task's draw function
     * to determine what is to be drawn on the screen as well as in the 
     * input handler function to set determine the input's effect.
     */

  var selectionArray = [];
    /**
     * The selectionArray holds all of the objects the user can select
     * in the current phase (Typically buttons and inputs).
     */

  var selection = 0;
    /**
     * The selection variable indicates what object in the selectionArray is
     * currently selected { selectionArray[selection] }. The current selection 
     * should be indicated by the element flashing. This behaviour is protoyped 
     * into buttons already by setting selectionArray[selection].active as true.
     */
  
  var key2 = ['A','B','C'];
  var key3 = ['D','E','F'];
  var key4 = ['G','H','I'];
  var key5 = ['J','K','L'];
  var key6 = ['M','N','O'];
  var key7 = ['P','Q','R','S'];
  var key8 = ['T','U','V'];
  var key9 = ['W','X','Y','Z'];
    /**
     * Arrays for the letters on each key.
     * When inputting text cycle through the letters in these arrays when a button is
     * pressed consecutively.
     */

  function drawLine(from,to,width){
    ctx.beginPath();
    ctx.moveTo(from[0],from[1]);
    ctx.lineTo(to[0],to[1]);
    ctx.lineWidth = width;
    ctx.strokeStyle = white;
    ctx.stroke();
    ctx.closePath();
  }
    /**
     * Function to speed up line drawing
     * 'from' and 'to' are arrays of coordinates [x,y] and 'width' is line width.
     */
  
  function wrapText(ctx, text, x, y, maxWidth, lineHeight){
    var words = text.split(' ');
      var line = '';
      for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        }
        else {
          line = testLine;
        }
      }
    ctx.fillText(line, x, y);
  }
    /**
     * Function to print a single block of text. text needs to be a single string.
     */
  
  function longText(ctx, text, x, y, maxWidth, lineHeight){
    for(var p = 0; p < text.length; p++){
      var words = text[p].split(' ');
        var line = '';
        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
      ctx.fillText(line, x, y);
      y += (lineHeight*1.5);
    }
  }
   /**
    * Function to print multiple paragraphs of text.
    * Each paragraph should be a string in an array.
    * eg { text = ['First paragraph text here.','Second paragraph text here.']
    */
  
  inputCheck = function(){
    if(input == ''){
      error = 'ERROR 102A - Input can not be left blank';
      return false;
    }else{
      return true;
    }
  }
   /**
    * Function to validate the name users input in the start up task.
    */
  
  function context(head, subhead){
    drawLine([190,103],[616,103],2)
    ctx.fillStyle = white;
    ctx.font = '21pt apollo';
    var y = 218
    if(ctx.measureText(head).width < 426){
      y = 218-41
    }
    wrapText(ctx, head, 190, 140, 426, 34)
    ctx.font = '13pt apollo';
    if(typeof subhead == "string"){
      wrapText(ctx, subhead, 190, y, 426, 21)
    }else{
      longText(ctx, subhead, 190, y, 426, 21)
    }
    // Added this so that the longText format for text with multiple paragraphs can be used.
  }
    /** 
     * Function for drawing a context screen
     *
     * Context screens provide the user with basic information on the task
     * Typically used in 'phase 0' of a task or when new information is incoming.
     * Used in conjunction with a button (typically contextButton).
     */
  
  function taskTitle(text, y){
    ctx.fillStyle = white;
    ctx.font = '21pt apollo';
    var w = ctx.measureText(text).width;
    var x = (800 - w)/2
    ctx.fillText(text, x, y);
  }
   /** 
    * Function for adding the task title to the screen
    *
    * The title of the task should appear on almost every phase of the task.
    */
  
  function container(title, x, y, w, h){
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.lineWidth = 2;
    ctx.strokeStyle = white;
    ctx.stroke(); 
    ctx.font = '13pt apollo';
    var titleW = ctx.measureText(title).width;
    var titleX = x + (w - titleW)/2;
    var titleY = y + 6;
    var backX = (x + (w - titleW)/2)-10;
    var backY = y - 10;
    var backW = titleW + 20;
    var backH = 20
    ctx.fillStyle = black;
    ctx.fillRect(backX, backY, backW, backH);
    ctx.fillStyle = white;
    ctx.fillText(title, titleX, titleY);
  }
    /** 
     * Function for drawing a container
     *
     * Containers are used to seperate blocks and sections of the task on the screen
     * Almost every element on the screen is within a container and all containers have a title.
     * Note that the the container has no background so if the container is drawn over
     * other elements they will show through. A ctx.fillRect(x,y,w,h) with the same vars 
     * as the container can be used to give it a background.
     */

  
  function keyTest(i){
    var obj = {}
    switch(i){
      case 187://Backspace (Using the +,= key as backspace to prevent having to overide browser functions)
        return {'btn-num-back':1}
        break;
      case 13://Enter
        return {'btn-act-enter':1}
        break;
      case 37://Key left.
        return {'btn-nav-left':1}
        break;
      case 38://Key up.
        return {'btn-nav-up':1}
        break;
      case 39://Key right.
        return {'btn-nav-right':1}
        break;
      case 40://Key down.
        return {'btn-nav-down':1}
        break;
      case 46://Delete
        return {'btn-act-reset':1}
        break;
      case 48://0
      case 96://(NumPad)
        return {'btn-num-0':1}
        break;
      case 49://1
      case 97://(NumPad)
        return {'btn-num-1':1}
        break;
      case 50://2
      case 98://(NumPad)
        return {'btn-num-2abc':1}
        break;
      case 51://3
      case 99://(NumPad)
        return {'btn-num-3def':1}
        break;
      case 52://4
      case 100://(NumPad)
        return {'btn-num-4ghi':1}
        break;
      case 53://5
      case 101://(NumPad)
        return {'btn-num-5jkl':1}
        break;
      case 54://6
      case 102://(NumPad)
        return {'btn-num-6mno':1}
        break;
      case 55://7
      case 103://(NumPad)
        return {'btn-num-7pqrs':1}
        break;
      case 56://8
      case 104://(NumPad)
        return {'btn-num-8tuv':1}
        break;
      case 57://9
      case 105://(NumPad)
        return {'btn-num-9wxyz':1}
        break;
      case 190://.
      case 110://(NumPad)
        return {'btn-num-period':1}
        break;
      default: 
        console.log(i, 'No action for this keyCode')
        break;
    }
  }
    /** 
     * Function for returning keyCodes as equivalent node inputs.
     *
     * If the task object is in test mode it will pick up on keypresses and pass
     * them through this function. This funtion then returns the key's node 
     * equivalent so that keyboard inputs can be handled by the same input_Hander 
     * funciton as node inputs would be.
     */
  

  function startUp(team, complete){
    var self = this;
    this.team = team;
    this.complete = complete;
    this.test_mode = false;
  }
    /** 
     * Constructor function for a start up task.
     *
     * Will be set to complete once user has successfully entered a name. Test_mode will enable
     * keyboard input.
     */

    startUp.prototype.loop = null;
    
    //METHODS
    startUp.prototype.draw = function(){
      var self = this;
      drawLine([190,103],[616,103],2)
      ctx.fillStyle = white;
      ctx.font = '22pt apollo';
      wrapText(ctx, "OPERATOR LOGIN", 190, 140, 426, 33)
      ctx.font = '13pt apollo';
      wrapText(ctx, "Please input your name and press ENTER", 190, 174, 426, 20)
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = white;
      ctx.rect(190,195,250,33);
      ctx.stroke();
      ctx.closePath();
      ctx.fillStyle = white;
      ctx.font = '13pt apollo';
      if(error != null){
        wrapText(ctx, error, 190, 290, 426, 20);
      }
      if(consoleTime%8 <= 3){
        ctx.fillText(input + tempInput, 195, 216);
      }else{
        ctx.fillText(input, 195, 216);
      }
      if(this.complete == true){
        var team = this.team;
        ctx.font = '13pt apollo';
        wrapText(ctx, 'Welcome '+input+', your '+team+' training is complete. Press Enter to proceed.', 190, 290, 426, 20);
      }
    }
    /** 
     * Function for drawing the start up task on the screen
     *
     * These are used in all PM00 tasks. Will be set to complete once user has successfully 
     * entered a name. Test_mode will enable keyboard input.
     */


  function task(){
    var self = this;
    this.test_mode = false; 
      //Mode for user testing. Changes input from node IO input to keyDown.
      //False by default
    this.draw = function(){
      //Call this function to start the task
      //Redefined in the task's dedicated .js file
      console.log('Function to draw task does not exist');
    }
    this.stop = function(){
      //Call this function to stop the task
      //Redefine for any task setup that can't be stopped with this function
      //Such as tasks not using phase/loop system or other special setups
      clearTimeout(self.loop);
      console.log('Task stopped');
    }
    this.input_Handler = function(params){
      //Function called after io change from node daemon
      console.log('Handler function not set for this task');
    }
  }
    /** 
     * Task object 
     *
     * Object used to create a self-contained task. Tasks should be able to be initiated by
     * calling { TASK_NAME.draw() }
     */

  //Button Objects
  function button(x, y, w, h, text, active) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.text = text;
    this.active = active;
    // The active property is true if the button is currently selected.
    // This will cause the button to flash to indicate that it is active.
  }

    button.prototype.hashed = null;
      /** The hashed property is true if the button is unavailable for selection.
        * If the button is unavailable and hashed is true it will be drawn on the
        * screen obscured by the hash.png image and at lower opacity.
       */
    
    button.prototype.draw = function(){
      //Method for drawing button
      var x = this.x + 2;
      var y = this.y + 2;
      var w = this.width - 4;
      var h = this.height;
      var text = this.text;
      var i = 1;
      if(this.hashed == true){
        ctx.save();
        ctx.globalAlpha = .4;
      }
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.fillStyle = white;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
      ctx.fillStyle = white;
      ctx.font = '13pt apollo';
      var m = (w - ctx.measureText(text).width) / 2;
      ctx.fillText(text, x + m, y + 21);
      if(this.hashed == true){
        ctx.drawImage(hash, x, y, w, h, x, y, w, h);
        ctx.restore();
      }
      //To flash the button when it is the active selection
      if(this.active == true && this.hashed != true){
        ctx.clearRect(x+1,y+1,w-2,h-2);
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        if(consoleTime%8 <= 3){
          ctx.fillStyle = white;
          ctx.fill();
        }
        ctx.closePath();
        if(consoleTime%8 <= 3){
          ctx.fillStyle = black;
        }else{
          ctx.fillStyle = white;
        }
        ctx.font = '13pt apollo';
        ctx.fillText(text, x + m, y + 21);
        ctx.fillStyle = white;
      }
    }
     /** 
      * Function to draw button
      */
    
    button.prototype.action = function(){
      //Button's behaviour. Unique to each button. Must be set when each button is created
      console.log('Error -  no action set for button ' + this);
    }
    /** 
     * A button's action function is what is meant to happen if the user presses it 
     * ( presses the ENTER input while that button is the active selection). Buttons
     * frequently move the task into a different phase and so they are a good place to
     * redefine the selectionArray for the new phase.
     * Also button action functions are a good place for calls to funcitons that need to be
     * run once and not when the task is created rather than in the task's draw function. 
     */
  
