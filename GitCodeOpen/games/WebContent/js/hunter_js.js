//<editor-fold desc="Create HTML Elements">
$('<div>', {id: 'playingArea'}).appendTo('body');
$('<div>', {id: 'ctrlArea'}).appendTo('body');
$('<img>', {class: 'hide'}).appendTo('#playingArea');
$('<div>', {id: 'buttonArea'}).appendTo('#ctrlArea');
$('<div>').appendTo('#ctrlArea');
$('<div>', {id: 'garbageBin'}).appendTo('#ctrlArea');
$('<div>', {id: 'shootingArea'}).appendTo('body');
$('<div>', {id: 'scoreArea'}).appendTo('body');
$('<p>Missed Characters</p>', {id: 'score'}).appendTo('#scoreArea');
$('<p>', {id: 'missedCharacters'}).appendTo('#scoreArea');
$('<img>', {id: 'target', class: 'hide'}).appendTo('#playingArea');
//</editor-fold>


var charMissed = 5;
//add gun to assignment
$('<img>', {
    id: 'gun',
    src: '../img/gun.png',
    dblclick: function (){
        fireGun();
    }
}).appendTo('#shootingArea');

$('<img>', {
    id: 'bullet',
    src: '../img/bullet.png',
    class: 'hide'
}).appendTo('#playingArea');

function fireGun() {
    var gun = $('#gun');
    var bullet = $('#bullet');
    var yOffset = $('#playingArea').height() - bullet.height();
    var xOffset = gun.offset().left;
    bullet.css("top", yOffset);
    bullet.css("left", xOffset);
    bullet.css("display", "block");
    shoot();
}

function shoot() {
    $('#bullet').animate(
        {top : '0%'},
        {progress: collision , complete: resetBullet},
        500);
}

function resetBullet() {
    $('#bullet').css("display", "none");
}


//make gun draggable
$('#gun').draggable({
    containment: 'parent',
    snap: 'parent',
    cursor: 'move'
});

$('<input>', {
    type: 'button',
    value: 'Add BackGround',
    click: function () {
        var path = prompt('Enter path of the image');
        if (path && path.trim() != "") {
            $(this).val('Change Background');

            $('#playingArea>img').first().replaceWith(
                $('<img>', {
                    src: path,
                    dblclick: fadeMe,
                    width: $('#playingArea').width(),
                    height: $('#playingArea').height(),
                    alt: 'backGround'
                }));
        }

    }
}).appendTo('#buttonArea');

function fadeMe(event) {
    $(this).fadeOut('slow');
}


$('<input>', {
    type: 'button',
    value: 'Load Characters',
    click: function () {
        $(this).prop("disabled", true);
        $('#start').prop("disabled", false);
        loadImages();
    }
}).appendTo('#buttonArea');

//START GAME BUTTON=======================================================
$('<input>', {
    type: 'button',
    id: 'start',
    value: 'Start Game',
    disabled: true,
    click: function() {
        //disables draggable
        $('.character').draggable({ disabled: true });
        $(this).prop("disabled", true);
        targetMove();
    }
}).appendTo('#buttonArea');

var pictureArray = ['1', '2', '3', '4', '5'];

function targetMove() {
    var target = $("#target");
    var pic = pictureArray[Math.floor(Math.random()*pictureArray.length)];
    pictureArray = jQuery.grep(pictureArray, function(value) {
        return value != pic;
    });
    if(typeof pic === 'undefined'){
        target.effect('explode');
        $('<p>').text(charMissed).appendTo('#scoreArea');
    }
    else{
        $(".character[src='../img/" + pic + ".png']").css('display', 'none');
        target.prop("src", "../img/"+pic+".png");
        target.show();
        target.animate({
            left: '100%'}, 5000, function(){
            target.hide("explode", {pieces: 50 });
            setTimeout(resetTarget, 1000);
        });
    }
}

function resetTarget() {
    var target = $("#target");
    target.css("left", "0");
    targetMove();
}

function collision() {
    var bullet = $('#bullet');
    var target = $('#target');
    var x1 = bullet.offset().left;
    var y1 = bullet.offset().top;
    var h1 = bullet.outerHeight(true);
    var w1 = bullet.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = target.offset().left;
    var y2 = target.offset().top;
    var h2 = target.outerHeight(true);
    var w2 = target.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2){
        return false;
    } else {
        target.stop();
        //target.effect('explode');
        charMissed --;
        resetTarget();
        //alert("hit");
    }
}

//this technique minimize the number of failure loading trip to one.
var imgNum = 1;
function loadImages() {
    $.get('../img/' + imgNum + '.png', function (data) {
        imgNum++;
        loadImages();
    }).fail(function () {

        for (var i = 1; i < imgNum; i++) {
            $('#ctrlArea').children().eq(1).append(
                $('<img>', {
                    src: '../img/' + i + '.png',
                    class: 'character',
                    border: '1px white solid',
                    alt: 'thumbnail'
                })
            );
        }
        //solve problem of dragging object outside a scrolling div
        $('.character').draggable({
            helper : 'clone',
            cursor : "crosshair",
            opacity : 0.35,
            stop : function(event, ui) {
                $('#playingArea').append($(this));
                $(this).css({
                    left : event.pageX,
                    top : event.pageY,
                    position : 'absolute'
                });

                $(this).draggable("option", {
                    helper : 'original',
                    opacity : 1
                });
            }
        });
        $('.character').mouseup(examineErase)
    });
}


$('#ctrlArea').children().eq(1).css({
    overflow: 'auto',
    height: '60%'
});

function removeCharacterFromPlayingArea(obj) {
    if (confirm('Are you sure, you want to remove?')) {
        obj.effect('explode');
        obj.show("fast");
        $('#ctrlArea').children().eq(1).prepend(obj);
        obj.draggable("option", {helper: 'clone', opacity: 0.35});
        $(obj).css({left: 0, top: 0, position: 'relative'});
    } else {
        obj.css({left: 0, top: 0});
    }
}


$('#ctrlArea').children().last().append($('<img>', {
    src: '../img/garbage.png',
    width: $('#ctrlArea').width(),
    hover: jump,
    alt: 'garbage'
}));


function jump() {
    $(this).effect('bounce', {times: 1}, 'slow');
}


function examineErase(event) {

    var pos = $('#ctrlArea').children().last().offset();
    var $garbage = $('#ctrlArea').children().last();
    var left = pos.left;
    var right = left + $garbage.width();
    var top = pos.top;
    var bottom = top + $garbage.height();

    if ((event.pageX > left && event.pageX < right)
        && (event.pageY > top && event.pageY < bottom)) {
        removeCharacterFromPlayingArea($(this));
    }

}