function swalFireMore(nb) {
    Swal.fire({
        title: events[nb].title + " (" + events[nb].date + ")",
        html: events[nb].time + "<br>" + events[nb].place + "<br><br>" + events[nb].text + "<br><br>" + "<div style=\"width: 100 %\"><iframe width=\"100%\" height=\"10%\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" src=" + events[nb].map + "><a href=\"https://www.gps.ie/\" > gps devices</a></iframe ></div >",
        icon: "info",
        confirmButtonText: "Zavřít",
        confirmButtonColor: "#544565"
    });
}

function swalFireMember(nb) {
    let content = "";

    if (members[nb].img) {
        content += "<img alt='profile-photo' src='./img/members/" + members[nb].img + "' class='w-50 pb-4' style='border-radius: 10px;'>"
    }

    if (members[nb].role) {
        content += "<br><i>" + members[nb].role + "</i><br><br>";
    }

    if (members[nb].about) {
        content += "<span class='text-start'>" + members[nb].about + "</span>";
    }

    Swal.fire({
        title: members[nb].fullname,
        html: content,
        icon: "question",
        confirmButtonText: "Zavřít",
        confirmButtonColor: "#544565"
    });
}