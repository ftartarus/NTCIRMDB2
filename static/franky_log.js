/**
 * Created by franky on 16/4/1.
 */

var iframe1 = document.getElementById("iframe1");
var window1 = iframe1.contentWindow;
var iframe2 = document.getElementById("iframe2");
var window2 = iframe2.contentWindow;
var current_page_url = window.location.href;
var current_site = get_set(current_page_url);
var server_site = current_site;
var current_port = get_port(current_page_url);
var current_task = get_task(current_page_url);
var current_taskunit = get_taskunit(current_page_url);

var mouse_tracking_info = "";
var mouse_tracking_count = 0;
var mouse_tracking_group_limit = 100;
var mouse_tracking_baseline_stamp = (new Date()).getTime();
var mouse_tracking_time_stamp = mouse_tracking_baseline_stamp;

var mouse_tracking_pos_stamp_html1 = { 'x': 0, 'y': 0 };
var mouse_tracking_scroll_stamp_html1 = {'scrollX': 0, 'scrollY': 0};
var mouse_tracking_pos_stamp_html2 = { 'x': 0, 'y': 0 };
var mouse_tracking_scroll_stamp_html2 = {'scrollX': 0, 'scrollY': 0};


var mouse_tracking_least_move_interval = 20;//ms
var mouse_hover_least_move_interval = 100;//ms
var mouse_tracking_least_move_distance = 20;//px

send_mouse_info(formInfo("html", "UNIT_START", ""));
window.onbeforeunload = function(ev){
    mouse_tracking_group_limit = 1;
    ev = ev || window.event;
    send_mouse_info(formInfo("html", "UNIT_END", ""));
};

function get_set(url_str) {
    var ret = "127.0.0.1";
    var site_re = /http:\/\/([\w\.]+):\w+\//;
    if (site_re.test(url_str)) {
        ret = RegExp.$1;
    }
    return ret;
}

function get_port(url_str) {
    var port = "8000";
    var port_re = /http:\/\/[\w\.]+:(\w+)\//;
    if (port_re.test(url_str)) {
        port = RegExp.$1;
    }
    return port;
}

function get_task(url_str) {
    var task = "";
    var task_re = /http:\/\/[\w\.]+:\w+\/task\/anno\/([0-9a-z]+)\/.+\//;
    if (task_re.test(url_str)) {
        task = RegExp.$1;
    }
    return task;
}

function get_taskunit(url_str) {
    var taskunit = "";
    var taskunit_re = /http:\/\/[\w\.]+:\w+\/task\/anno\/[0-9a-z]+\/(.+)\//;
    if (taskunit_re.test(url_str)) {
        taskunit = RegExp.$1;
    }
    return taskunit;
}

function getMousePos(window0, ev) {
    //alert("get mouse");
    var e = ev || window0.event;
    var scrollX = window0.document.documentElement.scrollLeft || window0.document.body.scrollLeft;
    var scrollY = window0.document.documentElement.scrollTop || window0.document.body.scrollTop;
    var clientLeft = window0.document.body.clientLeft;
    var clientTop = window0.document.body.clientTop;
    var x = e.pageX || e.clientX + scrollX - clientLeft;
    //alert("x:" + x);
    var y = e.pageY || e.clientY + scrollY - clientTop;
    //alert('x: ' + x + '\ny: ' + y);
    return { 'x': x, 'y': y };
}

function time_info() {
    var new_time_stamp = (new Date()).getTime();
    return new_time_stamp;
}

function ajax_log_message(log_str) {
    var encode_str = log_str;
    //alert(encode_str + "\n");
    var log_url = "http://" + server_site + ":" + current_port + "/task/LogService/" + current_task + '/' + current_taskunit + "/";
    $.ajax({
        type: 'POST',
        url: log_url,
        data: {message: encode_str},
        complete: function (jqXHR, textStatus) {
            //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
        }
    });
}

function send_mouse_info(info) {
    mouse_tracking_info = mouse_tracking_info + info;
    mouse_tracking_count++;
    if (mouse_tracking_count >= mouse_tracking_group_limit) {
        ajax_log_message(mouse_tracking_info);
        mouse_tracking_count = 0;
        mouse_tracking_info = "";
    }
}

function formInfo(html, action_info, log_str) {
    var time_str = time_info();
    var info = "TIME=" + time_str + "\t" + "HTML=" + html + "\t" + "ACTION=" + action_info + "\t" + "INFO:\t" + log_str + "\n";
    return info;
}

function log_mouse_tracking_html1(ev) {
    var new_time_stamp = (new Date()).getTime();
    var cur_pos = getMousePos(window1, ev);
    var time_interval = new_time_stamp - mouse_tracking_time_stamp;
    var time_start = mouse_tracking_time_stamp - mouse_tracking_baseline_stamp;
    var time_end = new_time_stamp - mouse_tracking_baseline_stamp;
    var abs_pos_distance = Math.abs(cur_pos.x - mouse_tracking_pos_stamp_html1.x) + Math.abs(cur_pos.y - mouse_tracking_pos_stamp_html1.y);
    if (time_interval < mouse_tracking_least_move_interval || abs_pos_distance < mouse_tracking_least_move_distance) {
        return;
    }
    var info = "FROM\tx=" + mouse_tracking_pos_stamp_html1.x + "\ty=" + mouse_tracking_pos_stamp_html1.y + "\tTO\tx=" + cur_pos.x + "\ty=" + cur_pos.y + "\ttime=" + time_interval + "\tstart=" + time_start + "\tend=" + time_end;
    send_mouse_info(formInfo("html1", "MOUSE_MOVE", info));
    mouse_tracking_time_stamp = new_time_stamp;
    mouse_tracking_pos_stamp_html1 = cur_pos;
}

function log_mouse_tracking_html2(ev) {
    var new_time_stamp = (new Date()).getTime();
    var cur_pos = getMousePos(window2, ev);
    var time_interval = new_time_stamp - mouse_tracking_time_stamp;
    var time_start = mouse_tracking_time_stamp - mouse_tracking_baseline_stamp;
    var time_end = new_time_stamp - mouse_tracking_baseline_stamp;
    var abs_pos_distance = Math.abs(cur_pos.x - mouse_tracking_pos_stamp_html2.x) + Math.abs(cur_pos.y - mouse_tracking_pos_stamp_html2.y);
    if (time_interval < mouse_tracking_least_move_interval || abs_pos_distance < mouse_tracking_least_move_distance) {
        return;
    }
    var info = "FROM\tx=" + mouse_tracking_pos_stamp_html2.x + "\ty=" + mouse_tracking_pos_stamp_html2.y + "\tTO\tx=" + cur_pos.x + "\ty=" + cur_pos.y + "\ttime=" + time_interval + "\tstart=" + time_start + "\tend=" + time_end;
    send_mouse_info(formInfo("html2", "MOUSE_MOVE", info));
    mouse_tracking_time_stamp = new_time_stamp;
    mouse_tracking_pos_stamp_html2 = cur_pos;
}

$(window1).mousemove(function(ev){
    log_mouse_tracking_html1(ev);
});

$(window2).mousemove(function(ev){
    log_mouse_tracking_html2(ev);
});

var isTargetWindow1 = true;
$(window1).focus(function () {
    isTargetWindow1 = true;
    send_mouse_info(formInfo("html1", "JUMP_IN", ""));
    mouse_tracking_time_stamp = (new Date()).getTime();
});

$(window1).blur(function () {
    if (isTargetWindow1) {
        send_mouse_info(formInfo("html1", "JUMP_OUT", ""));
        isTargetWindow1 = false;
    }
});

var isTargetWindow2 = true;
$(window2).focus(function () {
    isTargetWindow2 = true;
    send_mouse_info(formInfo("html2", "JUMP_IN", ""));
    mouse_tracking_time_stamp = (new Date()).getTime();
});

$(window2).blur(function () {
    if (isTargetWindow2) {
        send_mouse_info(formInfo("html2", "JUMP_OUT", ""));
        isTargetWindow2 = false;
    }
});

/*var isTargetWindow = true;
$(window).focus(function () {
    isTargetWindow = true;
    send_mouse_info(formInfo("html", "JUMP_IN", ""));
    mouse_tracking_time_stamp = (new Date()).getTime();
});

$(window).blur(function () {
    if (isTargetWindow) {
        send_mouse_info(formInfo("html", "JUMP_OUT", ""));
        isTargetWindow = false;
    }
});*/


$(window1).scroll(function () {
    var c_left = $(this).scrollLeft();
    var c_top = $(this).scrollTop();
    var new_x = mouse_tracking_pos_stamp_html1.x + c_left - mouse_tracking_scroll_stamp_html1.scrollX;
    var new_y = mouse_tracking_pos_stamp_html1.y + c_top - mouse_tracking_scroll_stamp_html1.scrollY;
    var abs_pos_distance = Math.abs(new_x - mouse_tracking_pos_stamp_html1.x) + Math.abs(new_y - mouse_tracking_pos_stamp_html1.y);
    if (abs_pos_distance < mouse_tracking_least_move_distance) {
        return;
    }
    var message = "FROM\t" + "x=" + mouse_tracking_pos_stamp_html1.x + "\ty=" + mouse_tracking_pos_stamp_html1.y + "\tTO\tx=" + new_x + "\t" + "y=" + new_y;
    mouse_tracking_scroll_stamp_html1.scrollX = c_left;
    mouse_tracking_scroll_stamp_html1.scrollY = c_top;
    mouse_tracking_pos_stamp_html1.x = new_x;
    mouse_tracking_pos_stamp_html1.y = new_y;
    send_mouse_info(formInfo("html1", "SCROLL", message));
    mouse_tracking_time_stamp = (new Date()).getTime();
});

$(window2).scroll(function () {
    var c_left = $(this).scrollLeft();
    var c_top = $(this).scrollTop();
    var new_x = mouse_tracking_pos_stamp_html2.x + c_left - mouse_tracking_scroll_stamp_html2.scrollX;
    var new_y = mouse_tracking_pos_stamp_html2.y + c_top - mouse_tracking_scroll_stamp_html2.scrollY;
    var abs_pos_distance = Math.abs(new_x - mouse_tracking_pos_stamp_html2.x) + Math.abs(new_y - mouse_tracking_pos_stamp_html2.y);
    if (abs_pos_distance < mouse_tracking_least_move_distance) {
        return;
    }
    var message = "FROM\t" + "x=" + mouse_tracking_pos_stamp_html2.x + "\ty=" + mouse_tracking_pos_stamp_html2.y + "\tTO\tx=" + new_x + "\t" + "y=" + new_y;
    mouse_tracking_scroll_stamp_html2.scrollX = c_left;
    mouse_tracking_scroll_stamp_html2.scrollY = c_top;
    mouse_tracking_pos_stamp_html2.x = new_x;
    mouse_tracking_pos_stamp_html2.y = new_y;
    send_mouse_info(formInfo("html2", "SCROLL", message));
    mouse_tracking_time_stamp = (new Date()).getTime();
});

function base_link_message(link_obj, action_info, type, html, window0, ev){
    var cur_pos = getMousePos(window0, ev);
    var message = "type=" + type + "\tx=" + cur_pos.x + "\ty=" + cur_pos.y;
    if (link_obj.href === undefined) {
        message = message + "\tsrc=" + link_obj.src;
    } else {
        message = message + "\tsrc=" + link_obj.href;
    }
    send_mouse_info(formInfo(html, action_info, message));
    if (html == "html1") {
        mouse_tracking_pos_stamp_html1 = cur_pos;
    }
    if (html == "html2") {
        mouse_tracking_pos_stamp_html2 = cur_pos;
    }
    mouse_tracking_time_stamp = (new Date()).getTime();
}

window.onload = function() {
    var idoc1 = iframe1.contentDocument;
    var idoc2 = iframe2.contentDocument;

    $(idoc1).find('a').hover(function(ev){
        var new_time_stamp = (new Date()).getTime();
        var time_interval = new_time_stamp - mouse_tracking_time_stamp;
        if (time_interval < mouse_hover_least_move_interval) {
            return;
        }
        base_link_message($(this).get(0), "HOVER", "anchor", "html1", window1, ev)
    });
    $(idoc1).find('a').click(function (ev) {
        base_link_message($(this).get(0), "CLICK", "anchor", "html1", window1, ev);
    });
    $(idoc1).find('img').hover(function(ev){
        var new_time_stamp = (new Date()).getTime();
        var time_interval = new_time_stamp - mouse_tracking_time_stamp;
        if (time_interval < mouse_hover_least_move_interval) {
            return;
        }
        base_link_message($(this).get(0), "HOVER", "image", "html1", window1, ev)
    });
    $(idoc1).find('img').click(function (ev) {
        base_link_message($(this).get(0), "CLICK", "image", "html1", window1, ev);
    });

    $(idoc2).find('a').hover(function(ev){
        var new_time_stamp = (new Date()).getTime();
        var time_interval = new_time_stamp - mouse_tracking_time_stamp;
        if (time_interval < mouse_hover_least_move_interval) {
            return;
        }
        base_link_message($(this).get(0), "HOVER", "anchor", "html2", window2, ev)
    });
    $(idoc2).find('a').click(function (ev) {
        base_link_message($(this).get(0), "CLICK", "anchor", "html2", window2, ev);
    });
    $(idoc2).find('img').hover(function(ev){
        var new_time_stamp = (new Date()).getTime();
        var time_interval = new_time_stamp - mouse_tracking_time_stamp;
        if (time_interval < mouse_hover_least_move_interval) {
            return;
        }
        base_link_message($(this).get(0), "HOVER", "image", "html2", window2, ev)
    });
    $(idoc2).find('img').click(function (ev) {
        base_link_message($(this).get(0), "CLICK", "image", "html2", window2, ev);
    });
};
