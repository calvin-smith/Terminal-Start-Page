$(document).ready(function () {

    var userName = $( '#username' ).html();
    var deviceName = $( '#devicename' ).html();

    $('.link-group').each(function (counter) {

        var groupTitle = $(this).data('title');

        generateLSCommand (userName, deviceName, groupTitle, false);

        // ls header line with Total #
        $("#all-link-tables").append("<div class='ls-header'>Total " + $(this).children('a').length + "</div>");

        // Create the table for this link-group
        $("#all-link-tables").append("<table id='" + counter + "'class='ls-table'></table>");

        // Build ./ ../
        var text = "./";
        var permission = "drwxr-xr-x";
        var links = getLinks();
        var user = "root";
        var group = "root";
        var fileSize = getFileSize();
        var date = getDate();

        $("#" + counter).append(
            "<tr><td class='row-permissions'>" +
            permission +
            "</td><td class='row-links'>" +
            links +
            "</td><td class='row-user'>" +
            user +
            "</td><td class='row-group'>" +
            group +
            "</td><td class='row-filesize'>" +
            fileSize +
            "</td><td class='row-date'>" +
            date +
            "</td><td class='row-name'>" +
            text +
            "</td></tr>");

        var text = "../";
        var permission = "drwxr-xr-x";
        var links = getLinks();
        var user = "root";
        var group = "root";
        var fileSize = getFileSize();
        var date = getDate();

        $("#" + counter).append(
            "<tr><td class='row-permissions'>" +
            permission +
            "</td><td class='row-links'>" +
            links +
            "</td><td class='row-user'>" +
            user +
            "</td><td class='row-group'>" +
            group +
            "</td><td class='row-filesize'>" +
            fileSize +
            "</td><td class='row-date'>" +
            date +
            "</td><td class='row-name'>" +
            text +
            "</td></tr>");

        $(this).children('a').each(function () {

            var linkText = $(this).text();
            var href = $(this).attr('href');
            var permission = getPermission();
            var links = getLinks();
            var user = "root";
            var group = "root";
            var fileSize = getFileSize();
            var date = getDate();
            var extension = getExtension();

            $("#" + counter).append(
                "<tr><td class='row-permissions'>" +
                permission +
                "</td><td class='row-links'>" +
                links +
                "</td><td class='row-user'>" +
                user +
                "</td><td class='row-group'>" +
                group +
                "</td><td class='row-filesize'>" +
                fileSize +
                "</td><td class='row-date'>" +
                date +
                "</td><td class='row-name'>" +
                "<a class='ls-link' href='" +
                href +
                "'>" +
                linkText +
                extension +
                "</a>" +
                "</td></tr>");

        });

        counter++;

    });

    generateLSCommand (userName, deviceName, "", true);

});

function getPermission() {
    var output = "";
    var headerPool = "d-";
    var symbolPool = "rwx-";

    for (var i = 0; i <= 9; i++) {
        if (i == 0) {
            output += headerPool.charAt(Math.floor(Math.random() * headerPool.length));
        } else {
            output += symbolPool.charAt(Math.floor(Math.random() * symbolPool.length));
        }
    }
    return output;
}

function getLinks() {
    var output = "";
    output += Math.floor(Math.random() * 30);
    return output;
}

function getFileSize() {
    var output = "";
    output += Math.floor(Math.random() * 1500);
    return output;
}

function getDate() {
    var monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
    ];

    startDate = new Date('December 17, 2003 01:00:00');
    var output = "";
    randomDate = new Date(startDate.getTime() + Math.random() * (Date.now() - startDate.getTime()));
    output += monthNames[randomDate.getMonth()] + " ";
    output += randomDate.getDate() + " ";
    output += randomDate.getHours() + ":";
    output += randomDate.getMinutes().padZeroes();

    return output;
}

Number.prototype.padZeroes = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
}

function getExtension() {
    var output = "";
    var extensionList = [
        ".exe",
        ".json",
        ".html",
        ".sh",
        ".txt",
        ".css"
    ];

    output = extensionList[Math.floor(Math.random() * extensionList.length)];
    return output;
}

function generateLSCommand (userName, deviceName, groupTitle, addCursor) {
    
    var cursorHtml = "";
    if (addCursor) {
        cursorHtml = "<div class='cursor'>|</div>";
    }
    // Prompt and ls command
    $("#all-link-tables").append(
        "<div class='ls-command'>" +
        "<div class='ls-command-bracket-open ls-command-all'>" +
        "[" +
        "</div>" +
        "<div class='ls-command-username ls-command-all'>" +
        userName +
        "</div>" +
        "<div class='ls-command-at ls-command-all'>" +
        "@" +
        "</div>" +
        "<div class='ls-command-devicename ls-command-all'>" +
        deviceName +
        "</div>" +
        "<div class='ls-command-bracket-close ls-command-all'>" +
        "]" +
        "</div>" +
        "<div class='ls-command-prompt ls-command-all'>" +
        "$" +
        "</div>" +
        "<div class='ls-command-ls ls-command-all'>" +
        " ls" +
        "</div>" +
        "<div class='ls-command-ls-switches ls-command-all'>" +
        "-al" +
        "</div>" +
        "<div class='ls-command-path ls-command-all'>" +
        " ~/" +
        "</div>" +
        "<div class='ls-command-grouptitle ls-command-all'>" +
        groupTitle +
        "</div>" +
        cursorHtml +
        "</div>");
}
