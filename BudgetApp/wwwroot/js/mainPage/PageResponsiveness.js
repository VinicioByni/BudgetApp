
// Resize changes, responsiveness
$(window).on('resize', function (event) {

    var windowWidth = $(window).width()

    if (windowWidth < 768) {
        $('#column_1_second_level').attr("class", "col-md-auto col-xl-12")
        $('#column_2_second_level').attr("class", "col-md-auto col-xl-12")
    }

    else {
        $('#column_1_second_level').attr("class", "col-5 col-xl-12")
        $('#column_2_second_level').attr("class", "col-5 col-xl-12")
    }

})





