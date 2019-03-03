var data = JSON.parse(localStorage.getItem('data'))


if (data == null || data.length == 0) {
    var promise = new Promise(function (resolve, reject) {
        jQuery.ajax({
            type: 'get',
            url: 'http://192.168.1.10:8080/5Jquery/data.json',
            success: function (data) {
                resolve(data)
            }
        })
    }).then(function (data) {
        localStorage.setItem('data', JSON.stringify(data))
        drawTable()
    })
} else {
    drawTable()
}



function drawTable() {
    if ($('#tab')) {
        $('#tab').remove()
    }
    $('body').append("<table id='tab' border='1'><tr id = 'head'><th class='un'>username</th><th class='age'>age</th><th class='name'>name</th><th class='gender'>gender</th><th class='company'>company</th><th class='ph'>phone</th><th>view option</th><th>delete option</th></tr></table>")
    data = JSON.parse(localStorage.getItem('data'))
    var len = data.length
    for (let i = 0; i < len; i++) {
        if (data[i] !== null)
            $('#tab').append('<tr id=' + i + '><td class="un">' + data[i].username + '</td><td class="age">' + data[i].age + '</td><td class="name">' + data[i].name + '</td><td class="gender">' + data[i].gender + '</td><td class="company">' + data[i].company + '</td><td class="ph">' + data[i].phone + '</td><td><button id=\"v' + i + '\" >View</button></td><td><button id=\"d' + i + '\">delete</button></td></tr>')
    }
    evn()
}

$(':checkbox').click(function (e) {
    var cl = e.target.id
    if (this.checked) {
        $("." + cl).hide()
    } else {
        $("." + cl).show()
    }
})

function evn() {
    $('button').click(function (e) {
        var id = e.target.id
        var p = parseInt(id.substring(1))

        if (id.substring(0, 1) == "v") {
            if ($('.view' + p).length > 0) {
                $('.view' + p).toggle()
                if ($('.view')) {
                    $('.view').remove()
                }
            } else {
                if ($('.view')) {
                    $('.view').remove()
                }
                $("#" + p).after("<tr class='view" + p + " view'><td >" + data[p].balance + data[p].eyeColor + data[p].email + data[p].address + "</td><td>tags:" + data[p].tags + "</td><td>friends:" + getFriends(p) + "</td><td><img src=" + data[p].picture + "></td></tr>")
            }

            function getFriends(val) {
                var d = data[val].friends
                var s = "";
                for (var i = 0; i < d.length; d++) {
                    s += d[i].name + " ,"
                }
                return s
            }
        } else if (id.substring(0, 1) == "d") {
            if ($('.view' + p)) {
                $('.view' + p).remove()
            }
            $("#" + p).remove()
            data.splice(p, 1)
            localStorage.setItem('data', JSON.stringify(data))
            drawTable()
        }
    })

}

$('#search').keyup(function () {
    var str = $('#search').val()
    $('tr').hide()
    $('#head').show()
    $('tr:contains(' + str + ')').show()
    jQuery.expr[':'].contains = function (a, i, m) {
        return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0
    }
})