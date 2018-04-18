$('document').ready(function () {
    $('.toolContainer span').on('click', function () {
        let open;
        let selector = findInner($(this));
        if ($(selector).attr('class').indexOf('open') != -1) {
            let toolContainerCloseAnim = anime({
                targets: selector,
                height: 0,
                easing: 'easeInOutQuart',
                complete: toolContainerAnim($(this), 'close')
            });
            $(selector).removeClass('open');
        } else {
            let toolContainerOpenAnim = anime({
                targets: selector,
                height: $(`${selector} .converter`).height() + 40,
                easing: 'easeInOutQuart',
                complete: toolContainerAnim($(this), 'open')
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

    $('#emojiText').on('keyup', function () {
        $('#emojiTextRes').val(emojiText($(this).val()));
        let characters = characterCount('#emojiTextRes');
        $('.emojiText .characterCount').text(characters);
        if (characters > 2000) {
            $('.emojiText .characterCount').css('color', '#F44336');
        } else {
            $('.emojiText .characterCount').css('color', 'black');
        }
    });

    new ClipboardJS('.button');

    $(window).on('resize', function () {
        let toolContainerCorrectAnim = anime({
            targets: '.toolContainerInner',
            height: $('.toolContainerInner .converter').height() + 40,
            easing: 'easeInOutQuart'
        });
    });
});

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

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

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

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

function characterCount(el) {
    return $(el).val().split('').length;
}

function toolContainerAnim(el, state) {
    if (state == 'open') {
        el.addClass('upsidedown');
    } else {
        el.removeClass('upsidedown');
    }
}

function findInner(el) {
    let selectorArray = el.parent().attr('class').split(" ");
    for (let i = 0; i < selectorArray.length; i++) {

        if (selectorArray[i] == 'toolContainer') {
            selectorArray[i] = '.toolContainerInner';
        } else {
            selectorArray[i] = `.${selectorArray[i]}`;
        }
    }
    return selectorArray.join("");
}