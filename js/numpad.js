(function(){
  "use strict";
  // For this demo, all keys preform the same action
  var actions = {
    keyUp: displayKey,
    keyDown: displayKey
  };

  var numpad = {
    13: {
      class: ".key-enter",
      callback: actions
    },
    96: {
      class: ".key-zero",
      callback: actions
    },
    97: {
      class: ".key-one",
      callback: actions
    },
    98: {
      class: ".key-two",
      callback: actions
    },
    99: {
      class: ".key-three",
      callback: actions
    },
    100: {
      class: ".key-four",
      callback: actions
    },
    101: {
      class: ".key-five",
      callback: actions
    },
    102: {
      class: ".key-six",
      callback: actions
    },
    103: {
      class: ".key-seven",
      callback: actions
    },
    104: {
      class: ".key-eight",
      callback: actions
    },
    105: {
      class: ".key-nine",
      callback: actions
    },
    106:  {
      class: ".key-multiply",
      callback: actions
    },
    107: {
      class: ".key-add",
      callback: actions
    },
    109: {
      class: ".key-subtract",
      callback: actions
    },
    110: {
      class: ".key-decimal",
      callback: actions
    },
    111: {
      class: ".key-divide",
      callback: actions
    },
    144: {
      class: ".key-numlock",
      callback: actions
    },
  };

  /**
   * Get the numpad key object no matter how the key was activated.
   *
   * @param {Object} obj - Either a KeyboardEvent or numpad key object.
   * @returnS {Object} The numpad key object.
   */
  function _getKeyObj(obj) {
    return (obj.class ? obj : numpad[obj.keyCode]);
  }

  /**
   * Key action.
   *
   * @param {Object} key - A numpad key object.
   */
  function keyPress(key) {
    document.querySelector(key.class).classList.add("active");
    key.callback.keyDown();
  }

  /**
   * Key release.
   *
   * @param {Object} e - Either a KeyboardEvent or numpad key object.
   */
  function keyUp(e) {
    // Get a numpad key object
    e = _getKeyObj(e);

    var activeKey = document.querySelector(".btn.active");
    if (activeKey) {
      activeKey.classList.remove("active");
      e.callback.keyUp();
    }
  }

  /**
   * Key depress.
   *
   * @param {Object} e - A KeyboardEvent object.
   */
  function keyDown(e) {
    if (e.keyCode in numpad) {
      keyPress(numpad[e.keyCode]);
    }
  }

  /**
   * Roughly simulate the keydown/keyup event when a button is clicked/tapped.
   *
   * @param {Object} e - A MouseEvent object.
   */
  function keyClick(e) {
    // Make sure we clicked a button
    if (e.target.classList.contains("btn")) {
      // Extract the button's class
      var keyClass = "." + e.target.classList[e.target.classList.length - 1];

      for (var keyCode in numpad) {
        // Find the respective numpad key object and activate it
        if (numpad.hasOwnProperty(keyCode) && keyClass === numpad[keyCode].class) {
          var key = numpad[keyCode];
          keyPress(key);

          // Small delay to replicate the keyup event
          setTimeout(keyUp, 100, key);
          break;
        }
      }
    }
  }


  var Qbody    = document.querySelector("body"),
      Qtable   = document.querySelector(".numpad table"),
      QkeyArea = document.querySelector(".key-press-area");

  // Activate the key
  Qbody.addEventListener("keydown", keyDown);

  // Deactivate the key
  Qbody.addEventListener("keyup", keyUp);

  // Clicked key
  Qtable.addEventListener("click", keyClick);

  /**
   * Action to perform upon key press.
   */
  function displayKey() {
    QkeyArea.classList.toggle("visible");
  }
}());
