/**
 * 侧边栏信息，依赖jquery
 */
define(["lscache"], function (lscache) {
    return {
        init: function () {
            function showSideBarInfo(data) {
                if (data.articleFilings != null) {
                    $.each(data.articleFilings, function (i, item) {
                        var ym = item.yearMonth.year + '-'
                            + item.yearMonth.monthValue;
                        $("#articleFilings").append(
                            "<li><a href='/monthFilings/" + ym + "'>"
                            + ym + '</a>' + '(' + item.count
                            + ')' + '</li>');
                    });
                }
                var nLi = $("#pop-art-ul").find(".none");
                $.each(data.popularArticles, (function () {
                    $li = nLi.clone().show().appendTo($("#pop-art-ul"));
                    $li.find(".entry-title").append($("<a>", {
                        ref: "bookmark",
                        href: "/article/" + this.id,
                        html: this.title
                    }));
                    $li.find(".entry-category").append($("<a>", {
                        href: "/articles/page/1?typeId=" + this.typeId + "#content",
                        html: this.typeName
                    }));
                    $li.find(".entry-datetime").html(this.createTime);
                }));
                nli = $("#recentcomments").find(".none");
                $.each(data.recentlyComments, (function () {
                    $li = nLi.clone().html("<span class='comment-author-link'>" +
                        this.userName
                        + "</span> : <a href='/article/" + this.articleId + "#comments" + this.id + "'>" + this.comment + "</a>").show().appendTo($("#recentcomments"));
                }));
            }

            if (lscache.get("sidebarInfo")) {
                showSideBarInfo(lscache.get("sidebarInfo"));
            } else {
                $.ajax({
                    type: "GET",
                    url: "/sidebarInfo",
                    dataType: "json",
                    success: function (data) {
                        showSideBarInfo(data);
                        lscache.set("sidebarInfo", data, 1440)
                    }
                });
            }
        }
    }
});