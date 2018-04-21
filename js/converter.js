$(document).ready(function () {
    document.styleSheets[2].disabled = true;

    $('.toolContainer').on('click', function () {
        let open;
        let selector = findInner($(this));
        if ($(selector).attr('class').indexOf('open') != -1) {
            let toolContainerCloseAnim = anime({
                targets: selector,
                height: 0,
                easing: 'easeInOutQuart',
                complete: toolContainerAnim($(this).find('span'), 'close')
            });
            $(selector).removeClass('open');
        } else {
            let toolContainerOpenAnim = anime({
                targets: selector,
                height: $(`${selector} .converter`).height() + 40,
                easing: 'easeInOutQuart',
                complete: toolContainerAnim($(this).find('span'), 'open')
            });
            $(selector).addClass('open');
        }
    });

    $('textarea').each(function () {
        this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    $('textarea.input').on('keyup', function () {
        let $count = $(this).parent().find('span');
        if ($count.text() > 2000) {
            $count.css('color', '#F44336');
        } else {
            if ($('body').hasClass('dark')) {
                $count.css('color', 'white');
            } else {
                $count.css('color', 'black');
            }

        }
    });

    $('#emojiText').on('keyup', function () {
        $('#emojiTextRes').val(emojiText($(this).val()));
        $('.emojiText .characterCount').text(characterCount('#emojiTextRes'));
    });

    $('#clappify').on('keyup', function () {
        $('#clappifyRes').val(clappify($(this).val()));
        $('.clappify .characterCount').text(characterCount('#clappifyRes'));
    });

    $('#clappifyDeluxeText').on('keyup', function () {
        $('#clappifyDeluxeRes').val(clappifyDeluxe($(this).val(), $('#clappifyDeluxeEmote').val()));
        $('.clappifyDeluxe .characterCount').text(characterCount('#clappifyDeluxeRes'));
    });
    $('#clappifyDeluxeEmote').on('keyup', function () {
        $('#clappifyDeluxeRes').val(clappifyDeluxe($('#clappifyDeluxeText').val(), $(this).val()));
        $('.clappifyDeluxe .characterCount').text(characterCount('#clappifyDeluxeRes'));
    });

    var clipboard = new ClipboardJS('.button');

    $(window).on('resize', function () {
        $('.toolContainerInner').each(function () {
            if ($(this).hasClass('open')) {
                let toolContainerCorrectAnim = anime({
                    targets: this,
                    height: $('.toolContainerInner .converter').height() + 40,
                    easing: 'easeInOutQuart'
                });
            }
        });
        moveFix();
    });

    $('#siteSwitch').on('click', function () {
        if ($(this).text() == 'Home') {
            this.switchText('Info');
        } else {
            this.switchText('Home');
        }
        move();
    });

    $('#themeSwitch').on('click', function () {
        if ($(this).text().indexOf('Dark') !== -1) {
            this.switchText('White Mode');
        } else {
            this.switchText('Dark Mode');
        }
        switchCSS();
    });

    let url = window.location.href.split('?')[1]; // tab-1
    $(`.toolContainer.${url} .arrow`).click();
});

// Converters

/**
 * Converts input text to Emoji Text
 * @param {String} input Input from a textfield which gets converted in this method
 * @returns {String} Return field, which stores the converted text 
 */
function emojiText(input) {
    if (input != "") {
        let splitToConvert = input.split("");
        let readyResult = "";
        for (var i = 0; i < splitToConvert.length; i++) {
            splitToConvert[i] = splitToConvert[i].toLowerCase();
            if (isNumeric(splitToConvert[i]) || isLetter(splitToConvert, i) || splitToConvert[i] == ' ' || splitToConvert[i] == '?' || splitToConvert[i] == '!') {
                switch (splitToConvert[i]) {
                    case ' ':
                        readyResult += '      ';
                        break;
                    case '!':
                        readyResult += ':exclamation: ';
                        break;
                    case '?':
                        readyResult += ':question: ';
                        break;
                    case '0':
                        readyResult += ':zero: ';
                        break;
                    case '1':
                        readyResult += ':one: ';
                        break;
                    case '2':
                        readyResult += ':two: ';
                        break;
                    case '3':
                        readyResult += ':three: ';
                        break;
                    case '4':
                        readyResult += ':four: ';
                        break;
                    case '5':
                        readyResult += ':five: ';
                        break;
                    case '6':
                        readyResult += ':six: ';
                        break;
                    case '7':
                        readyResult += ':seven: ';
                        break;
                    case '8':
                        readyResult += ':eight: ';
                        break;
                    case '9':
                        readyResult += ':nine: ';
                        break;
                    default:
                        readyResult += `:regional_indicator_${splitToConvert[i]}: `;
                        break;
                }
            }
        }
        return readyResult;
    }
}
/**
 * Adds ':clap:' to input text
 * @param {String} input Input from a textfield which gets converted in this method
 * @returns {String} Return field, which stores the converted text
 */
function clappify(input) {
    input = input.split(" ");
    let clappifiedInput = "";
    for (let i = 0; i < input.length; i++) {
        clappifiedInput += input[i];
        if (i < input.length - 1) {
            clappifiedInput += " :clap: ";
        }
    }
    return clappifiedInput;
}
/**
 * Adds a custom emote to the input text
 * @param {String} input Input from a textfield which gets converted in this method
 * @param {String} emote Input from a textfield which is being injected in above defined text
 * @returns {String} Return field, which stores the converted text
 */
function clappifyDeluxe(input, emote) {
    input = input.split(" ");
    let clappifiedInput = "";
    for (let i = 0; i < input.length; i++) {
        clappifiedInput += input[i];
        if (i < input.length - 1) {
            clappifiedInput += ` ${emote} `;
        }
    }
    return clappifiedInput;
}
/**
 * Checks if a String is a number
 * @param {String} n String to checkk whether it is numeric or not
 * @returns {Boolean} returns if input is numeric
 */
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
/**
 * Checks if a specific character is a letter according to ASCII or if it is an Umlaut (Ger), if that is the chase, it gets converted into characters -> ä = ae, ö = oe, ü = ue, ß = ss
 * @param {Array} array Array of characters
 * @param {int} i Position in above defined array 
 * @returns {boolean} Returns whether the character meets the requirements stated above or not
 */
function isLetter(array, i) {
    let currentChar = array[i];
    if (((currentChar > '@') && (currentChar < '[')) || ((currentChar > '`') && (currentChar < '{'))) {
        return true;
    } else {
        switch (currentChar) {
            case '\u00e4':
                array[i] = 'a';
                array.insert(i + 1, 'e');
                return true;
            case '\u00f6':
                array[i] = 'o';
                array.insert(i + 1, 'e');
                return true;
            case '\u00fc':
                array[i] = 'u';
                array.insert(i + 1, 'e');
                return true;
            case '\u00df':
                array[i] = 's';
                array.insert(i + 1, 's');
                return true;
            default:
                return false;
        }
    }
}
/**
 * Used to return how many characters are within a given element
 * @param {String} el String of an element to be found with jquery within the function
 * @returns {int} Number of letters/characters within the handed over element
 */
function characterCount(el) {
    return $(el).val().split('').length;
}

// Expanding Functions

/**
 * Function used to insert object in an array at a given place
 * @param {int} index Index of Array that this function is expanding
 * @param {Object} item Object which will be put into the defined place in the array
 */
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
/**
 * Function expanding HTMLElement to conveniently change the Text of a view buttons on the page
 * @param {String} newText New Text the button should hold
 */
HTMLElement.prototype.switchText = function (newText) {
    $(this).fadeToggle(200, function () {
        $(this).text(newText);
        $(this).fadeToggle(200);
    });
}

function findInner(el) {
    let selectorArray = el.attr('class').split(" ");
    for (let i = 0; i < selectorArray.length; i++) {
        if (selectorArray[i] == 'toolContainer') {
            selectorArray[i] = '.toolContainerInner';
        } else {
            selectorArray[i] = `.${selectorArray[i]}`;
        }
    }
    return selectorArray.join("");
}

// Animations

function toolContainerAnim(el, state) {
    if (state == 'open') {
        el.addClass('upsidedown');
    } else {
        el.removeClass('upsidedown');
    }
}

function move() {
    if (!$('.info').hasClass('active')) {
        let moveInfo = anime({
            targets: 'main',
            translateX: 0 - $(window).width(),
            easing: 'easeInOutExpo',
            elasticity: 300,
            complete: changeClass('info')
        });
    } else {
        let moveInfo = anime({
            targets: 'main',
            translateX: 0,
            easing: 'easeInOutExpo',
            elasticity: 300,
            complete: changeClass('home')
        });
    }
}

function moveFix() {
    if ($('.info').hasClass('active')) {
        let moveInfo = anime({
            targets: 'main',
            translateX: 0 - $(window).width(),
            easing: 'easeInOutExpo',
            elasticity: 300
        });
    } else {
        let moveInfo = anime({
            targets: 'main',
            translateX: 0,
            easing: 'easeInOutExpo',
            elasticity: 300
        });
    }
}

function switchCSS() {
    if (document.styleSheets[2].disabled == true) {
        document.styleSheets[2].disabled = false;
    } else {
        document.styleSheets[2].disabled = true;
    }
}

function changeClass(state) {
    if (state == 'info') {
        $('.info').addClass('active');
        $('.home').removeClass('active');
        $('body').css('overflow-y', 'hidden');
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1000, 'swing');
    } else {
        $('.home').addClass('active');
        $('.info').removeClass('active');
        $('body').css('overflow-y', 'auto');
    }
}