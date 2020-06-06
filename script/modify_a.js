function addTarget(d, ev) {
    var tag_a = document.getElementsByTagName('a');
    for (var i = tag_a.length - 1; i >= 0; i--) {
        tag_a[i].setAttribute("target", "_blank");
    };
}
document.addEventListener("readystatechange", addTarget);