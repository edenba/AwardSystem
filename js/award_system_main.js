$(document).ready(function () {

    $('#segments .start-btn').click(function () {
        $('.segment').addClass('show-check');
        $(this).parents('.segment').addClass('active').removeClass('show-check');
    });
    $('#segments .done-btn').click(function () {
        var someChecked = false;

        $(this).parents('.segment').addClass('finished master').removeClass('active').find('.group-num').show();
        $('.segment').each(function () {
            var isChecked = $(this).hasClass('checked');
            if (isChecked) {
                $(this).addClass('finished').removeClass('show-check').find('.group-num').show();
                someChecked = true;
            } else {
                $(this).removeClass('active show-check checked').addClass('blocked');
            }
        });
        if (!someChecked) {
            someChecked = false;
            $('.segment').removeClass('active finished master checked show-check blocked').find('.group-num').hide();
            $('.checkbox').prop('checked', false);
        }
    });
    $('#segments .checkbox').change(function () {
        $(this).parents('.segment').toggleClass('checked');
    });
    $('#segments .remove-btn').click(function () {
        $('.segment').removeClass('active finished master checked show-check blocked').find('.group-num').hide();
        $('.checkbox').prop('checked', false);
    });
    $('.first-segment').click(function () {
        $(this).toggleClass('checked');
    });


    if ($('body').hasClass('login-page') == true) {
        $('.header-top').addClass('header-shadow');
    } else {
        $('.header-top').removeClass('header-shadow');
    }

    //edit award event
    $('.edit-box').on('click', function (e) {
        var $card = $($(e.target).parents('.container').find('.card')[0]);
        var hasRewardId = $(e.target).parent().siblings('.rewardId').length;
        var $editBox = $(e.target).parents('.detail-box');
        editAward($card, hasRewardId, $editBox);
    });

    //read only award event
    $('.hide-box').on('click', function (e) {
        var $card = $($(e.target).parents('.container').find('.card')[0]);
        var $showBox = $(e.target).parents('.detail-box');
        var hasRewardId = $showBox.find('.rewardId').length;

        showAward($card, hasRewardId, $showBox)
    });

    setTimeout(function () {
        $('.slider-indicator').css('width', '70%');
    }, 300);

    //select upgrade
    $('#upgrade-select').click(function (event) {
        var largeTextEl = $(this).find('.products-table-large-text');
        var smallText = $(this).find('.products-table-large-text').text();
        var smallTextEl = $(this).find('.products-table-small-text');
        var currSmallText = $(this).find('.products-table-small-text').text();
        elBlur(smallTextEl, currSmallText, largeTextEl);
        largeTextEl.hide();
        smallTextEl.text(smallText);
        $('.select-wrap').show();
        $('#upgrade-select label').addClass('small-label');
        event.stopPropagation();
    });

    function elBlur(el, savedLabel, largeTextEl) {
        $('#upgrade-select').blur(function () {
            $(this).children('.single-product').removeClass('checked-product');
            $(this).find('.select-wrap').hide();
            largeTextEl.show();
            el.text(savedLabel);
            event.stopPropagation();
        });
    }


    //model change member number function
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })

    //popover "remove group"
    $(function () {
        $('[data-toggle="removeGroup"]').popover({
            trigger: 'hover',
            html: true,
            content: function () {
                //return $('#gift-table').html();
            }
        });
    })

    //popover "name of passenger"
    $(function () {
        $('[data-toggle="name-passenger"]').popover({
            trigger: 'hover',
            html: true,
            content: function () {
                //return $('#gift-table').html();
            }
        });
    })

    //set value for popovers    
    $('.pass-name').each(function () {
        var name = $(this).text();
        $(this).attr('data-content', name);
    });

    //show edit pnr
    $(".pnr a").click(function () {
        $(".edit-details-pnr").show();
        $(".edit-details-pnr input").val($(".pnr-number").text());
        $(".pnr").hide();
    });

    //show edit member number
    $(".memnum a").click(function () {
        $(".edit-details-member").show();
        $(".edit-details-member input").val($(".memnum label").text());
        $(".memnum").hide();
    });


    ///////step one

    //open or close tr in gift table
    $("#gift-table td.open-condition a").click(function (event) {
        var $img = $(event.target).parents('tr:not(".wrapper-tr-condition")').find('.open-condition img');
        var $el = $(event.target).parents('tr:not(".wrapper-tr-condition")').next();
        $el.toggle();
        var isVisible = $el.is(":visible");
        if (isVisible) {
            $img.attr('src', '../icons/close-row-24-px.png');
        } else {
            $img.attr('src', '../icons/open-row-24-px.png');
        }
    });

    //close btn in model hide tr 
    $('.modal-footer .close-btn').click(function () {
        $('.wrapper-tr-condition').hide();
        $('.open-condition img').attr('src', '../icons/open-row-24-px.png');
    });

    //hover start a group
    $(".segment-box:not('.disabled')").hover(function () {
        $(this).find(".hover-grup").show();
    }, function () {
        $(this).find(".hover-grup").hide();
    });

    //expose the done btn and checkboxs and remove hover group
    $(".hover-grup").click(function () {
        var $segparent = $(this).parent();
        var doneNum = $(".done-btn-grup:visible").length;
        if (doneNum == 0) {
            $segparent.find('.done-btn-grup').show();
            $segparent.parent().addClass('active');
            $('.hover-grup').hide();
            $(".segment-box:not('.disabled')").each(function () {
                var bool = $(this).find('.done-btn-grup').is(":visible");
                if (!bool) {
                    $(this).find('.chk').show();
                }
            });
        }

        //$(".hover-grup").remove();
        $(".segment-box").unbind('mouseenter mouseleave');
        $(".done-btn-grup:visible").click(function () {
            $(".segment-box:has('.done-btn-grup:visible')").find('.wrapper-group').show();
            $(".segment-box:has('.done-btn-grup:visible')").find('.done-btn-grup').hide();
            var itemsChecked = false;
                $(".segment-box.active:has('.chk>input:checked')").each(function () {
                    $(this).find('.chk').hide();
                    $(this).find('.group-number').show();
                    itemsChecked = true;
                });
           
            $(".segment-box:has('.chk>input:not(:checked)')").each(function (e) {
                $(this).find('.chk').hide();
            });

            //if (!itemsChecked) {
            //    $('.segment-box').removeClass('active');
            //    $('.wrapper-group').hide();
            //    ////alert('hey');
            //    //$(".segment-box.active").each(function () {
            //    //    $(this).removeClass('active');
            //    //    $(this).find('.group-number').hide();
            //    //    $(this).find('.wrapper-group').hide();
            //    //});
            //    $(".segment-box:not('.disabled')").hover(function () {
            //        $(this).find(".hover-grup").show();
            //    }, function () {
            //        $(this).find(".hover-grup").hide();
            //    });
            //}

        });
    });

    //add or remove class active for checkboxs
    $(".chk>input[type='checkbox']").change(function () {
        var isChecked = $(this).is(":checked");
        if (isChecked) {
            $(this).parents('.segment-box').addClass('active');
        } else {
            $(this).parents('.segment-box').removeClass('active');
        }
    });

    //login page - if enter button disabled - change css.
    $(".div-enter .login-btn").click(function () {
        var isDisabled = $('.div-enter').hasClass('btn-disabled');
        //first click
        if (!isDisabled) {
            ++numClicks;
            $('.div-enter').addClass('btn-disabled');
            $(".input-pnr label").addClass('pnrdesign-label');
            $(".input-member label").addClass('memberdesign-label');
            $(".input-member").addClass('memberdesign-input');
            $("label").css('color', '#3ebacc');
            $('input').css('border-bottom', '1px solid #3ebacc');
        }
        else {
            //second click
            if (numClicks === 1) {
                ++numClicks;
                $('.error-msg-login').show();
                $('.pnr').addClass('invalid-input');
                $('.member-number').addClass('invalid-input');
                $("label").css('color', '#d72032');
            }
                //third click
            else {
                $('.general-error-message-login').removeClass('d-none');
            }

        }
    });

    //on input focus change css 
    $(".pnr input").focus(function () {
        $(".pnr label").addClass('design-label');
    });

    $(".pnr input").focusout(function () {
        if ($(".pnr input").val()) {
            return true;
        } else {
            $(".pnr label").removeClass('design-label');
        }
    });

    //handle member number input design
    $(".member-number input").focus(function () {
        $(".member-number label").addClass('design-label');
    });

    $(".member-number input").focusout(function () {
        if ($(".member-number input").val()) {
            return true;
        } else {
            $(".member-number label").removeClass('design-label');
        }
    });

    //for this first segment - add/remove class 
    $("#one_segment").click(function (event) {
        var $el = $("#one_segment");
        if ($el.hasClass('active')) {
            $el.removeClass('active');
        } else {
            $el.addClass('active');
        }
    });

    //click on removeGroup
    $('.wrapper-group img').click(function () {
        $(".segment-box.active").each(function () {
            $(this).removeClass('active');
            $(this).find('.group-number').hide();
            $(this).find('.wrapper-group').hide();
        });
        $(".segment-box:not('.disabled')").hover(function () {
            $(this).find(".hover-grup").show();
        }, function () {
            $(this).find(".hover-grup").hide();

        });
    });

    $('.create-btn').click(function () {
        var $el = $('.create-btn');
        $el.css('background-color', '#c3c3c3');
        $el.addClass('create-disabled');
        $el.css('border', '1px solid #c3c3c3');
    });

    //select upgrade css
    $("input[type='radio']").change(function () {
        var bool = $("#upgrade").is(':checked');
        if (!bool) {
            $("label[for='upgrade']").removeClass('small-label');
            $(".select-wrap").hide();
        }
    });

    //show error msg-step one
    $(".edit-details-pnr button").click(function () {
        //display error
        $('.edit-details-member').addClass('invalid-input');
        $('.edit-details-pnr').addClass('invalid-input');
        $('.error-msg').show();
        $(".invalid-input label").css('color', '#d72032');
    });
    //hide tr's when the model is closing
    $(".modal-footer .close-btn").click(function () {
        $("#test4").hide();
        $("#wrapper-tr3").hide();
        $(".table-flight img").attr('src', '../icons/open-row-24-px.png');
    });

    //add bg color to selected product
    $('.box-group.single-product').click(function () {
        var $clickedProduct = $(this);
        var $checkedProduct = $('.box-group.single-product.checked-product');
        if ($clickedProduct === $checkedProduct) {
            return;
        }

        var $upgradeWrapper = $checkedProduct.find('div.select-wrap');
        if ($upgradeWrapper) {
            $upgradeWrapper.hide();
        }

        $('.box-group.single-product').removeClass('checked-product');
        $clickedProduct.addClass('checked-product');
    })
});

function editInput(hide, show, text) {
    $(show).show();
    $(hide).hide();
}

function stickyFunc() {
    // When the user scrolls the page, execute myFunction 
    window.onscroll = function () { myFunction() };

    // Get the header
    var header = document.getElementById("header");

    // Get the offset position of the navbar
    var sticky = header.offsetTop;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
}

// step2 - Selected Awards behavior //
var numClicks = 0;

function sharedSelectedAwards($card) {
    $('.detail-box').css('border', '0');
    $('.hide1, .hide2, .wrapper-buttons').hide();
    $($('.close-collapse')[1]).removeClass('shown');
    $($('.close-collapse')[2]).removeClass('shown');
    if (!$card.find('.tabel-baggage').hasClass('d-none')) {
        $card.find('.tabel-baggage').addClass('d-none');
    }
    $card.find('.add-surcharge').addClass('d-none');
    $card.find('.surcharge-tr, .total-tr').removeClass('d-none');
}

function showAward($card, hasRewardId, $showBox) {
    sharedSelectedAwards($card);
    var $advancedUpgrade = $card.find('.advanced-upgrade');
    var $tableBaggage = $card.find('.tabel-baggage');
    var $editCurrency = $card.find('.edit-currency');
    var $divHeading = $card.find('.div-heading');
    var $messageAlert = $card.find('.mssage-alert');

    $showBox.css({
        'border': 'solid 2px #3ebacc'
    });

    $card.find('.open-baggage').addClass('d-none');
    $card.find('.close-collapse').hide();
    $('.back').hide();
    $('.close').removeClass('d-none');

    //has reward
    if (hasRewardId) {
        if ($advancedUpgrade.hasClass('d-none')) {
            $advancedUpgrade.removeClass('d-none');
        }
        if (!$messageAlert.hasClass('d-none')) {
            $messageAlert.addClass('d-none');
        }
        if (!$divHeading.hasClass('d-none')) {
            $divHeading.addClass('d-none');
        }
        if (!$editCurrency.hasClass('d-none')) {
            $editCurrency.addClass('d-none');
        }
        if (!$tableBaggage.hasClass('d-none')) {
            $tableBaggage.addClass('d-none');
        }
        $advancedUpgrade.find('span').addClass('d-none');
    }
        //no reward
    else {
        $card.find('.table-currency input').val(650).css('opacity', '0.4').prop('disabled', true);
        $card.find('.table-currency label').addClass('currency-small-label').css({
            'opacity': '0.4',
            'background': 'none'
        });
        $card.find('.surcharge-td img').hide();
    }
}

function editAward($card, hasRewardId, $editBox) {
    sharedSelectedAwards($card);
    var $tableBaggage = $card.find('.tabel-baggage');
    var $advancedUpgrade = $card.find('.advanced-upgrade');
    var $editCurrency = $card.find('.edit-currency');
    var $divHeading = $card.find('.div-heading');
    var $messageAlert = $card.find('.mssage-alert');

    //add box border
    $editBox.css({
        'border': 'solid 2px #3ebacc'
    });

    //show close button
    $card.find('.close-collapse').show();
    $('.surcharge-td img').show();

    //show gift icon
    if ($card.find('.open-baggage').hasClass('d-none')) {
        $card.find('.open-baggage').removeClass('d-none')
    }
    //has reward
    if (hasRewardId) {
        if ($advancedUpgrade.hasClass('d-none')) {
            $advancedUpgrade.removeClass('d-none');
        }
        if (!$messageAlert.hasClass('d-none')) {
            $messageAlert.addClass('d-none');
        }
        if (!$divHeading.hasClass('d-none')) {
            $divHeading.addClass('d-none');
        }
        if (!$editCurrency.hasClass('d-none')) {
            $editCurrency.addClass('d-none');
        }

        //choose second reward from table
        $($tableBaggage.find('tr')[3]).find('td').css('font-weight', 'bold');
        if (!$tableBaggage.find('.selected-button').length) {
            $($tableBaggage.find('.select-button')[1]).addClass('selected-button').removeClass('select-button').html('Selected');
        }
    }
        //no reward
    else {
        $card.find('.table-currency input').val(650).focus().blur().css('opacity', '1').prop('disabled', false);
    }
}



