(function(){
  "use strict";
  // For this demo, all keys preform the same action
  const actions = {
    keyUp: displayKey,
    keyDown: displayKey
  };

  const numpad = {
    "Enter": {
      class: ".key-enter",
      callback: actions
    },
    "0": {
      class: ".key-zero",
      callback: actions
    },
    "1": {
      class: ".key-one",
      callback: actions
    },
    "2": {
      class: ".key-two",
      callback: actions
    },
    "3": {
      class: ".key-three",
      callback: actions
    },
    "4": {
      class: ".key-four",
      callback: actions
    },
    "5": {
      class: ".key-five",
      callback: actions
    },
    "6": {
      class: ".key-six",
      callback: actions
    },
    "7": {
      class: ".key-seven",
      callback: actions
    },
    "8": {
      class: ".key-eight",
      callback: actions
    },
    "9": {
      class: ".key-nine",
      callback: actions
    },
    "*":  {
      class: ".key-multiply",
      callback: actions
    },
    "+": {
      class: ".key-add",
      callback: actions
    },
    "-": {
      class: ".key-subtract",
      callback: actions
    },
    ".": {
      class: ".key-decimal",
      callback: actions
    },
    "/": {
      class: ".key-divide",
      callback: actions
    },
    "NumLock": {
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
    return (obj.class ? obj : numpad[obj.key]);
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
    // Handle the numlock key specially
    let isNumLockKey = e.location === 0 && e.key === "NumLock";

    // Only activate if it's a key we know
    let isNumpadKey = e.location === 3;
    if ((isNumpadKey && e.key in numpad) || isNumLockKey) {
      keyPress(numpad[e.key]);
    }
  }

  /**
   * Roughly simulate the keydown/keyup event when a button is clicked/tapped.
   *
   * @param {Object} e - A MouseEvent object.
   */
  function keyClick(e) {
    // Make sure we clicked a button
    if (e.target.matches(".btn")) {
      // Extract the button's key class
      var keyClass = `.${e.target.className.match(/(key-\w+)/)[1]}`;

      // Find the correct numpad key object and activate it
      for (const key of Object.entries(numpad)) {
         if (keyClass === key[1].class) {
          const keyToPress = key[1];
          keyPress(keyToPress);

          // Small delay to replicate the keyup event
          setTimeout(keyUp, 100, keyToPress);
          break;
        }
      }
    }
  }


  const qBody    = document.querySelector("body");
  const qTable   = document.querySelector(".numpad table");
  const qKeyArea = document.querySelector(".key-press-area");

  // Activate the key
  qBody.addEventListener("keydown", keyDown);

  // Deactivate the key
  qBody.addEventListener("keyup", keyUp);

  // Clicked key
  qTable.addEventListener("click", keyClick);

  /**
   * Action to perform upon key press.
   */
  function displayKey() {
    qKeyArea.classList.toggle("visible");
  }
}());
