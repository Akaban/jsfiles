const {e, b, c, a} = {
    "e": "sites_tbl",
    "b": "sites",
    "c": "/ipID/23.227.38.0/ipIDii/23.227.38.255/sort/6/asc/1",
    "a": "1"
}

const cb = function(j) {
                var h = $("#" + e + ">tbody").exists();
                if ($("#" + e + "_top").exists()) {
                    if ($(window).scrollTop() > $("#" + e + "_top").offset().top || ($(window).height() + $(window).scrollTop() - $("#" + e + "_bottom").offset().top) < 20) {
                        $("html, body").animate({
                            scrollTop: $("#" + e + "_top").offset().top - 60
                        }, 400)
                    }
                } else {
                    $("html, body").animate({
                        scrollTop: 0
                    }, 400)
                }
                if (h) {
                    $("#" + e).trigger("sortStart")
                } else {
                    $(".ovr" + e).fadeIn(300)
                }
                if ($.url.segment(1) == "browse") {
                    url = "/ajax_table/" + b + "/" + j
                } else {
                    if (b == "editlog" && $.inArray($.url.segment(1), ["editdata", "editrecord"]) != -1) {
                        url = "/ajax_log/" + $.url.segment(2) + "/id/" + $.url.segment(3) + "/logtype/0/pagenum/" + j + "/lang/" + language + "/tableID/" + e
                    } else {
                        url = "/ajax_data/" + b + "/" + j + "/tableID/" + e
                    }
                }
                $.ajax({
                    type: "POST",
                    url: url + c,
                    cache: false,
                    data: {
                        getpage: "yes",
                        lang: language
                    },
                    dataType: "html",
                    success: function(k) {
                        $("*[title]").hint("destroy");
                        if (k.length < 100) {
                            alert(k)
                        } else {
                            if (h) {
                                if (strpos(k, "<tr") !== 0) {
                                    k = k.substring(strpos(k, "<tr"))
                                }
                                if (typeof g !== "object") {
                                    g = {}
                                }
                                if (typeof f !== "boolean") {
                                    f = false
                                }
                                def = {
                                    widgets: ["zebra"],
                                    tableID: e
                                };
                                g = $.extend(def, g);
                                $("#" + e + ">tbody").html(k).init_multimedia();
                                $("#" + e).tablesorter(g);
                                tablesorter_common(e, f, false);
                                $("#" + e).trigger("update");
                                if ($.inArray(e, ["sites_tbl", "sites_detailstbl", "sites_detailstbl2"]) != -1) {
                                    $("#" + e + " .row_name").float_button(11, 10)
                                }
                            } else {
                                $("#" + e + "_body").html(k).init_multimedia()
                            }
                        }
                        if ($.url.segment(1) == "browse") {
                            $(".url_nav_pagenum").html(j);
                            $(".url_nav_page a").attr("href", $.url.segment_replace(-1, 3, j));
                            if (j > 1) {
                                $(".url_nav_page").removeClass("hide")
                            } else {
                                $(".url_nav_page").addClass("hide")
                            }
                        }
                        if (h) {
                            $("#" + e).trigger("sortEnd")
                        } else {
                            $(".ovr" + e).fadeOut(300)
                        }
                    }
                })
            }
