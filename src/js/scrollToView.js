/**
 * Created by Doan Kutbay on 03-Jun-17.
 */
function goToByScroll(id){
    // Scroll
    $('html,body').animate({
            scrollTop: $("#"+id+"-part").offset().top},
        'slow');
}

$("header a").click(function(e) {
    // Prevent a page reload when a link is pressed
    e.preventDefault();
    // Call the scroll function
    goToByScroll($(this).attr("id"));
});