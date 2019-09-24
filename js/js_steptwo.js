//Award system - step2

function CardInputsObj($card) {
    var $fare = $card.find('tr.fare');
    var $surcharge = $card.find('tr.surcharge-tr');
    
    this.price = {
        fare: {
            inLocalCurrency: $fare.find('input.local-currency-price').val(),
            inPoints: $fare.find('input.points-price').val()
        },
        surcharge: {
            inLocalCurrency: $surcharge.find('input.local-currency-price').val(),
            inPoints: $surcharge.find('input.points-price').val()
        }
    };
    this.chargedPrice = {
        fare: {
            inLocalCurrency: $fare.find('input.local-currency-charged').val(),
            inPoints: $fare.find('input.points-charged').val()
        },
        surcharge: {
            inLocalCurrency: $surcharge.find('input.local-currency-charged').val(),
            inPoints: $surcharge.find('input.points-charged').val()
        }
    };
};

function copyCardInputs(cardInputsObj, $toCard) {
    $toCardFare = $toCard.find('tr.fare');
    $toCardSurcharge = $toCard.find('tr.surcharge-tr');

    $toCardFare.find('input.local-currency-price').val(cardInputsObj.price.fare.inLocalCurrency);
    $toCardFare.find('input.points-price').val(cardInputsObj.price.fare.inPoints);

    $toCardSurcharge.find('input.local-currency-price').val(cardInputsObj.price.surcharge.inLocalCurrency);
    $toCardSurcharge.find('input.points-price').val(cardInputsObj.price.surcharge.inPoints);

    $toCardFare.find('input.local-currency-charged').val(cardInputsObj.chargedPrice.fare.inLocalCurrency);
    $toCardFare.find('input.points-charged').val(cardInputsObj.chargedPrice.fare.inPoints);

    $toCardSurcharge.find('input.local-currency-charged').val(cardInputsObj.chargedPrice.surcharge.inLocalCurrency);
    $toCardSurcharge.find('input.points-charged').val(cardInputsObj.chargedPrice.surcharge.inPoints);

    $toCard.find('input').focus().blur();
}

function handleCardArrow($cardHeader) {
    var $cardHeaderArrow = $cardHeader.find($('a .mb-0 > i'));
    $cardHeaderArrow.toggleClass('fa-angle-up');
    $cardHeaderArrow.toggleClass('fa-angle-down');
}

function handleCardHeaderDesign($cardHeader) {
    var $cardBody = $cardHeader.next();
    if ($cardBody.hasClass('collapse show') || hasUserInput($cardBody.find('input')) || isFlightSelected($cardBody)) {
        $cardHeader.addClass('header-active');
    } else {
        $cardHeader.removeClass('header-active');
    }
}

function handleCardsHeaders($cards) {    
    for (var i = 0; i < $cards.length; ++i) {
        var $currentCardHeader = $($cards[i]).prev();
        handleCardArrow($currentCardHeader);
        handleCardHeaderDesign($currentCardHeader);
    }
}

function hasUserInput(inputsArray) {
    var hasInputValues = false;
    if (inputsArray) {
        for (var i = 0; i < inputsArray.length; ++i) {
            hasInputValues = inputsArray[i].value !== '' ? true : false;
            if (hasInputValues) {
                break;
            }
        }
    }
    return hasInputValues;
}

function isFlightSelected($card) {
    if ($card.find('button.selected-button').length >= 1) {
        return true;
    }
    return false;
}

function isCardInputsValid($card) {
    var $cardInputs = $card.find('input');
    var isValid = false;
    for (var i = 0; i < $cardInputs.length/2; ++i) {
        isValid = $cardInputs[i].value !== '' ? true : false;
        if (!isValid) {
            break;
        }
    }
    return isValid;
}

function openNextCard($currentCard) {
    if (isCardInputsValid($currentCard)) {
        $currentCard.find('.bottom-error').hide();
        var nextCard = $currentCard.next().find('.collapse');
        nextCard.collapse('show');
    } else {
        $currentCard.find('.bottom-error').show();
        $($currentCard.find('input')[0]).css('border-bottom', '1px solid #d72032');
    }
}

function closeSurcharge() {
    $('.add-surcharge').removeClass('d-none');
    $('.surcharge-tr').addClass('d-none');
    $('.total-tr').addClass('d-none');
}


$(document).ready(function () {
    //event fires everytime card opens
    $('.collapse').on('shown.bs.collapse', function (e) {
        var $cardBody = $(e.target);
        var $cardHeader = $cardBody.prev();

        handleCardArrow($cardHeader);
        handleCardHeaderDesign($cardHeader);
    });

    //event fires everytime card closed
    $('.collapse').on('hidden.bs.collapse', function (e) {
        var $cardBody = $(e.target);
        var $cardHeader = $cardBody.prev();

        handleCardArrow($cardHeader);
        handleCardHeaderDesign($cardHeader);

        if ($('.collapse:not(".show")').length === 3) {
            $('.open-all-tab').removeClass('d-none');
            $('.close-all-tab').addClass('d-none');
        }
    });

    //event fires when 'next' button clicked
    $('.next-button').on('click', function (e) {
        openNextCard($(e.target).parents('.card'));
    });

    //event fires when 'done' button clicked
    $('.done-button').on('click', function () {
        $('.general-error-message').removeClass('d-none');
        //display error on card 3
        $($('.collapse')[2]).collapse('show');
        $($('.local-currency-price')[4]).css('border-bottom', '1px solid #d72032');
        $($('.bottom-error')[2]).show();

        //disable 'charge account' button
        var chargeAccountBtn = $('.chargeBtn button');
        chargeAccountBtn.addClass('disableBtn');

    });

    //event fires when 'copy' button clicked
    $('.copy-button').on('click', function (e) {
        var $copyButton = $(e.target);
        var $card = $copyButton.parents('.card');
        var $nextCard = $card.next();
        var $nextButton = $copyButton.parent().next();

        var cardInputsObj = new CardInputsObj($card);
        $nextButton.click();
        copyCardInputs(cardInputsObj, $nextCard);

    });

    //remove card
    $('.close-collapse img').on('click', function(e) {       
        if ($('.close-collapse.shown').length === 1) {
            $('#delete-collapse').modal('show');
        } else {
            $(e.target).parent().removeClass('shown');
            $(e.target).parents('.card').hide();
        }
    });

    //go to step1 in case all cards removed
    $('#delete-collapse .yes-btn').on('click', function () {
        $('#delete-collapse').modal('hide');
        window.location.replace('../html/step_one.html');        
    });


    //open and close all the tabs 
    $(".open-all-tab img").click(function () {
        var $closedCards = $('.collapse:not(".show")');

        $closedCards.addClass('show');
        $('.open-all-tab').addClass('d-none');
        $('.close-all-tab').removeClass('d-none');

        handleCardsHeaders($closedCards);
    });

    $(".close-all-tab img").click(function () {
        var $openCards = $('.collapse.show');

        $(".collapse.show").removeClass('show');
        $('.close-all-tab').addClass('d-none');
        $('.open-all-tab').removeClass('d-none');

        handleCardsHeaders($openCards);
    });

    //change label css when focus in and out
    $(".table-currency td input").focusin(function () {
        var $el = $(this).parent();
        $el.find('label:not(".total-label")').addClass('currency-small-label');
    });

    $(".table-currency td input").focusout(function () {
        if ($(this).val()) {
            return true;
        } else {
            var $el = $(this).parent();
            $el.find('label:not(".total-label")').removeClass('currency-small-label');
            $el.find('label:not(".total-label")').addClass('regular-label');
        }
    });

    //add surchagre btn
    $(".add-surcharge").click(function () {
        $('.add-surcharge').addClass('d-none');
        $('.surcharge-tr').removeClass('d-none');
        $('.total-tr').removeClass('d-none');
    });

    //event fires when 'gift' button clicked
    $('.card img.open-baggage').on('click', function (e) {
        var $button = $(e.target);
        var $cardHeader = $button.parents('.card-header');
        var $cardBody = $button.parents('.card').children('.collapse');
        openBaggage($cardBody, $cardHeader);
    });
    $('#collapseOne').collapse('show');
});

//edit or delete buttons - after select option from baggage table
function editUpgrade(self, id, parent, action) {
    $(id + ' .advanced-upgrade').addClass('d-none');   
    if (action === 'delete') {
        $(id + ' .mssage-alert').removeClass('d-none');
        $(id + ' .div-heading').removeClass('d-none');
        $(id + ' .edit-currency').removeClass('d-none');
        $(id + ' .table tr').css("font-weight", "400");
        $(id + ' .selected-button').addClass('select-button').removeClass('selected-button').html('Select');        
        $(parent + ' .open-baggage').attr("src", "../icons/star-24-px.png");
    } else {
        $(id + ' .tabel-baggage').removeClass('d-none');
    }
}

//show baggage table
function openBaggage($cardBody, $cardHeader) {
    var $tableBaggage = $cardBody.find('.tabel-baggage');
    var $openBaggage = $cardHeader.find('.open-baggage');
    var isBaggageOpen = $openBaggage.attr('data-isOpen');
    if ($cardBody.hasClass('show')) {
        if (isBaggageOpen === 'false' && $cardBody.find('.advanced-upgrade').hasClass('d-none')) {
            $tableBaggage.removeClass('d-none');
            $openBaggage.attr("src", "../icons/gift-selected-24-px.png");
            $openBaggage.attr('data-isOpen', 'true');
        } else if (isBaggageOpen === 'true' && $cardBody.find('.selected-button').length === 0) {
            $tableBaggage.addClass('d-none');
            $openBaggage.attr("src", "../icons/star-24-px.png");
            $openBaggage.attr('data-isOpen', 'false');
        }
    }
}

function selectAward(button) {
    var $button = $(button);
    var $cardBody = $button.parents('.collapse');

    //remove all bold lines    
   $cardBody.find('.table tr').css("font-weight", "400");

    //bold only selected line 
    $button.parents('tr').css('font-weight', 'bold');

    //update selected design, allow only 1 button to be selected
    $cardBody.find('button.selected-button').removeClass('selected-button').addClass('select-button').html('Select');
    $button.addClass('selected-button').removeClass('select-button').html('Selected');

    //disable 'copy to next' button & change its color
    $cardBody.find('.copy-button').css('color', '#c3c3c3');

    //hide unnecessary elements
    $cardBody.find('.tabel-baggage').addClass('d-none');
    $cardBody.find('.mssage-alert').addClass('d-none');
    $cardBody.find('.div-heading').addClass('d-none');
    $cardBody.find('.edit-currency').addClass('d-none');

    //show element
    $cardBody.find('.advanced-upgrade').removeClass('d-none');

    //update gift attribute
    $cardBody.prev().find('.open-baggage').attr('data-isOpen', 'false');
}
//show loader and after 3 sec' show model. 
$(".chargeBtn").click(function () {
    $("#loader").show();
    setTimeout(function () {
        $('#loader').fadeOut();
    }, 3000);
    setTimeout(function () {
        $("#charged-successfully").modal('show');
    }, 3000);
});