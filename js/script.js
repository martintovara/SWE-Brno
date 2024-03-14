var current = "#home";

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
        content += "<div class='w-25 m-auto pb-2'><img alt='profile-photo' src='./img/members/" + members[nb].img + "' class='w-100' style='border-radius: 10px;'></div>"
    }

    if (members[nb].role) {
        content += "<i>(" + members[nb].role + ")</i><br><br>";
    }

    if (members[nb].about) {
        content += "<span class='text-start'>" + members[nb].about + "</span>";
    }

    Swal.fire({
        title: members[nb].fullname,
        html: content,
        icon: "question",
        confirmButtonText: "Zavřít",
        confirmButtonColor: "#544565",
        customClass: "swal-profile"
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function setSrcProfileCards() {
    const imgType = ".png";
    const pathWomen = "img/women/";
    const pathMen = "img/men/";

    //Number of women/men imgs
    const nbWomen = 13;
    const nbMen = 8;

    const women = shuffleArray(Array.from({ length: nbWomen }, (_, index) => index + 1));
    const men = shuffleArray(Array.from({ length: nbMen }, (_, index) => index + 1));

    let ids = document.querySelectorAll('[id*="card-profile"]');

    for (let i = 0; i < ids.length; i++) {
        let auxWomen = 0;
        let auxMen = 0;

        if (ids[i].alt.includes("woman")) {
            ids[i].src = pathWomen + women[i] + imgType;
            auxWomen++;
        } else {
            ids[i].src = pathMen + men[i] + imgType;
            auxMen++;
        }
    }
}

function copyEmail() {
    const email = document.getElementById("email").innerHTML;
    navigator.clipboard.writeText(email);
    makeToastWithMailto("Email byl zkopírován do schránky", 5000, email);
}

function makeToastWithMailto(text, duration, email) {
    Toastify({
        text: text,
        duration: duration,
        newWindow: true,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "white",
            color: "black",
        },
        onClick: function () {
            window.location.href = "mailto:" + email;
        } // Callback after click
    }).showToast();
}

function menuHighlight() {
    let pages = ["home", "aboutSWE", "SWEBrno", "contact"];
    for (let i = 0; i < pages.length; i++) {
        if (partInViewport(pages[i]) && getViewPercentage(pages[i]) > 49) {
            let active = document.getElementsByClassName("menu-item-active");
            if (active[0]) {
                active[0].classList.remove("menu-item-active");
            }

            current = "index#" + pages[i];

            document.getElementById("nav-" + pages[i]).classList.add("menu-item-active");
        } else {


        }
    }
}

function partInViewport(id) {
    let elem = document.getElementById(id);
    let x = elem.getBoundingClientRect().left;
    let y = elem.getBoundingClientRect().top;
    let ww = Math.max(document.documentElement.clientWidth, window.innerWidth);
    let hw = Math.max(document.documentElement.clientHeight, window.innerHeight);
    let w = elem.clientWidth;
    let h = elem.clientHeight;

    return (
        (y < hw &&
            y + h > 0) &&
        (x < ww &&
            x + w > 0)
    );
}

function getViewPercentage(id) {
    let element = document.getElementById(id);

    const viewport = {
        top: window.pageYOffset,
        bottom: window.pageYOffset + window.innerHeight
    };

    const elementBoundingRect = element.getBoundingClientRect();
    const elementPos = {
        top: elementBoundingRect.y + window.pageYOffset,
        bottom: elementBoundingRect.y + elementBoundingRect.height + window.pageYOffset
    };

    if (viewport.top > elementPos.bottom || viewport.bottom < elementPos.top) {
        return 0;
    }

    // Element is fully within viewport
    if (viewport.top < elementPos.top && viewport.bottom > elementPos.bottom) {
        return 100;
    }

    // Element is bigger than the viewport
    if (elementPos.top < viewport.top && elementPos.bottom > viewport.bottom) {
        return 100;
    }

    const elementHeight = elementBoundingRect.height;
    let elementHeightInView = elementHeight;

    if (elementPos.top < viewport.top) {
        elementHeightInView = elementHeight - (window.pageYOffset - elementPos.top);
    }

    if (elementPos.bottom > viewport.bottom) {
        elementHeightInView = elementHeightInView - (elementPos.bottom - viewport.bottom);
    }

    const percentageInView = (elementHeightInView / window.innerHeight) * 100;

    return Math.round(percentageInView);
}
