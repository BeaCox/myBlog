// author by removef
// https://removeif.github.io/
// 音乐处理
var lastIndex;
var musicJsons;
$.getJSON("../json_data/music.json", function (data) {
    musicJsons = data;
    for (var i = 0; i < musicJsons.length; i++) {
        musicJsons[i].loop = false;
        var $li = $('<li><span>' + musicJsons[i].title + '</span>&nbsp;&nbsp;&nbsp;&nbsp;时长：' + musicJsons[i].time + '&nbsp;&nbsp;&nbsp;&nbsp; 歌手：' + musicJsons[i].author + '</li>');
        $li.attr('id', i);
        $li.css('list-style-type', 'none');
        $li.css('height', '40px');
        $li.css('color', '#888888');
        $li.click(function (event) {
            var id = Number(this.id);
            playMusic(musicJsons[id]);
            $('#musiclist #' + lastIndex).css('color', '#888888');
            $(this).css('color', '#3273dc');
            lastIndex = id;
            mePlayerMethod.play();
        });
        var $musiclist = $('#musiclist');
        $musiclist.append($li);
    }

    var index = Math.floor(Math.random() * musicJsons.length);
    $('#musiclist #' + index).css('color', '#3273dc');
    lastIndex = index;
    playMusic(musicJsons[index]);
});

function playMusic(data, playendcallback) {
    mePlayer({
        theme: 'default',
        music: data,
        target: '.music',
        autoplay: false
    }, function () {
        var index;
        index = lastIndex + 1;
        if (index >= musicJsons.length) {
            index = 0;
        }
        playMusic(musicJsons[index]);
        $('#musiclist #' + lastIndex).css('color', '#888888');
        $('#musiclist #' + index).css('color', '#3273dc');
        lastIndex = index;
        mePlayerMethod.play();
    });
    var descr = data.desc;
    if (descr == undefined) {
        $('#desc').html("");
    } else {
        $('#desc').html("<blockquote>" + descr + "</blockquote>");
    }
}

