function listImages(list, themachineid) {
        list.forEach(function(image) { // for each link l in ArrayOfImages
            var div = document.createElement('div');
            var img = document.createElement('img'); // create an img element
            // div.id = image
            var themachine = document.getElementById(themachineid);
            img.src = "img/" + image + ".png"; // set its src to the link l
            themachine.appendChild(div); // append it to the body 
            div.appendChild(img); // append it to the body 
        });
    }
listImages(vegetables, "machine1");
listImages(vegetables, "machine2");
listImages(vegetables, "machine3");
listImages(base, "machine4"); 

// Define Machine
    const btn = document.querySelector('#randomizeButton');
const results = {
    machine1: document.querySelector('#machine1Result'),
    machine2: document.querySelector('#machine2Result'),
    machine3: document.querySelector('#machine3Result'),
    machine4: document.querySelector('#machine4Result')
};
const el1 = document.querySelector('#machine1');
const el2 = document.querySelector('#machine2');
const el3 = document.querySelector('#machine3');
const el4 = document.querySelector('#machine4');
const machine1 = new SlotMachine(el1, {
    active: 0,
    type: vegetables,
    number: 1
});
const machine2 = new SlotMachine(el2, {
    active: 1,
    type: vegetables,
    number: 2
});
const machine3 = new SlotMachine(el3, {
    active: 2,
    type: vegetables,
    number: 3
});
const machine4 = new SlotMachine(el4, {
    active: 3,
    type: base,
    number: 4
});

var vegetable1 = "";
var vegetable2 = "";
var vegetable3 = "";
var thebase = "";

var machine1index = "";
var machine2index = "";
var machine3index = "";
var machine4index = "";

var theingredient = "nil"

var pageloaded = false;

var thetype = "";
var theindex = "";
var themachine = "";

var loaded = false;
var firstspin = false;

var slottimes = new Array(
    0,
    500,
    1000,
    1500,
);

var vegetableMachine = document.getElementById("vegetableMachine");
var spinbutton = document.getElementById("spin");
var footer = document.getElementById("footer");
var machineResult = document.getElementById("machineResult");

var numberofspins = 0;
var therecipename = document.getElementById("recipename")
var conjunction = "";
var comma = "";

// Slot Machine

function randomNumber() {
    therandomindex = Math.floor(Math.random() * this.tiles.length);
    alert(therandomindex);
    checkRepeated(therandomindex);
}

function checkRepeated(thenumber) {
    if (machine1index == thenumber) {
        randomNumber();
    } else if (machine2index == thenumber) {
        randomNumber();
    } else if (machine3index == thenumber) {
        randomNumber();
    } else if (machine4index == thenumber) {
        randomNumber();
    } else {
        return thenumber;
    }
}


function getnamefromIndex(index, type) {
    if (index > 0) {
        theingredient = type[index - 1];
        return theingredient;
    } else {
        theingredient = type[index + type.length - 1];
        return theingredient;
    }
}

function whichNametoUpdate(active, machine, name) {
    if (machine == 1) {
        vegetable1 = name;
        machine1index = active;
    }
    if (machine == 2) {
        vegetable2 = name;
        machine2index = active;
        comma = ", "
    }
    if (machine == 3) {
        vegetable3 = name;
        machine3index = active;
        conjunction = " and "
    }
    if (machine == 4) {
        thebase = name;
        machine4index = active;
    }
}


// Generate Recipe Name

function onComplete(active, type) {
    thetype = this.type;
    theindex = this.active;
    themachine = this.number;
    whichNametoUpdate(theindex, themachine, getnamefromIndex(theindex, thetype));
    if (themachine != 4) {
      $("#beep1-3").get(0).play();
    }
    else {
      $("#beep4").get(0).play();
    }
    setRecipeName();
}

function wrapSpan(veg) {
    return "<span class='nb vg'>" + veg + "</span>"
}

function setRecipeName() {

    var recipename = wrapSpan(vegetable1) + comma + wrapSpan(vegetable2) + conjunction + wrapSpan(vegetable3) + " " + wrapSpan(thebase);
    
 
    therecipename.innerHTML = recipename;
    
    
    if (firstspin == false) {
        setTimeout(function() {
            firstspin = true;
             $("#recipename").animate({
              opacity: 1
            }, 1000);
            animateCSS('#machine1Result', 'pulse');
            animateCSS('#machine2Result', 'pulse');
            animateCSS('#machine3Result', 'pulse');
            animateCSS('#machine4Result', 'pulse');
        }, 1500)
    }
}


// Number Combinations

var combinations = (vegetables.length * vegetables.length * vegetables.length * base.length);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$("#combinations").text(numberWithCommas(combinations) + " possible combinations");

// Disable Nudge Hold
function disableNudgeHold(truth) {
    $('button.nudge').attr('disabled', truth);
    $('button.hold').attr('disabled', truth);
}
disableNudgeHold(true);

// Nudge and Spin
function nudge(machine) {
    $("#nudge-sound").get(0).play();
    machine.next();
    whichNametoUpdate(machine.active, machine.number, getnamefromIndex(machine.active, machine.type));
    setRecipeName();

}

// Spin Machine

function addSpin() {
    numberofspins = numberofspins + 1;
}

function spin(machine) {
    if (loaded == false) {
        machine1.shuffle();
        machine2.shuffle();
        machine3.shuffle();
        machine4.shuffle();
        loaded = true;
    } else {
        numberofspins = 0;
         
        disableNudgeHold(false);

        if (firstspin == true) {
        
        if (machine == 5) {
            $("#spin-sound").get(0).play();
        } else {
            $("#hold-sound").get(0).play();
        }
      } else {
        // $("#firstspin-sound").get(0).play();
        $("#vegenerator-music").get(0).play();
        $("#recipename").animate({
             opacity: 0
         }, 200);
      }

        if (machine != machine1) {
            //machine1.shuffle(2, onComplete ;
            setTimeout(() => machine1.shuffle(2, onComplete), slottimes[numberofspins]);
            addSpin();
            vegetable1 = "";
        }
        else {
          therecipename.innerHTML = wrapSpan(vegetable1);
        }
        if (machine != machine2) {
            setTimeout(() => machine2.shuffle(2, onComplete), slottimes[numberofspins]);
            addSpin();
            vegetable2 = "";
            comma = "";
        }
        else {
          therecipename.innerHTML = wrapSpan(vegetable2);
        }
        if (machine != machine3) {
            setTimeout(() => machine3.shuffle(2, onComplete), slottimes[numberofspins]);
            addSpin();
            vegetable3 = "";
            conjunction = "";
        }
        else {
          therecipename.innerHTML = wrapSpan(vegetable3);
        }
        if (machine != machine4) {
            setTimeout(() => machine4.shuffle(2, onComplete), slottimes[numberofspins]);
            addSpin();
            thebase = "";  
        }
        else {
          therecipename.innerHTML = wrapSpan(vegetable4);
        }
    }
}

// Typing
var i = 0;
var txt = 'vegenerator'; /* The text */
var speed = 60; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("typewriter").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

var g = 0;
var txt2 = 'generate a recipe'; /* The text */
var speed = 60; /* The speed/duration of the effect in milliseconds */

function typeWriter2() {
    if (g < txt2.length) {
        document.getElementById("recipename").innerHTML += txt2.charAt(g);
        g++;
        setTimeout(typeWriter2, speed);
    }
}


// Page Load
function visible(element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
}

const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = document.querySelector(element);

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, {
            once: true
        });
    });



// Keyboard Shortcuts

$(document).on('keypress',function(e) {
    if (pageloaded == true) {
    if(e.which == 13) {
        spin(5);
    }
    if (firstspin == true) {
        if(e.which == 49) {
            nudge(machine1);
        }
        if(e.which == 50) {
            nudge(machine2);
        }
        if(e.which == 51) {
            nudge(machine3);
        }
        if(e.which == 52) {
            nudge(machine4);
        }
    }
    }
});



/// Budgetify
function Budgetify(){
  vegetables.splice( $.inArray(removeItem, vegetables), 'Avocado' );
}

