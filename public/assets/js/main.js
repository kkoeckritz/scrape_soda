$(() => {
    // change visited nav link to active
    $(".nav-item").click(function() {
        $(".nav-item").removeClass("active");
        $(this).addClass("active");
    });

    // scrape articles, refresh page on Refresh button click
    $("#refresh").on("click", function() {
        $.ajax({
            method: "GET",
            url: "/scrape",
        }).done(() => {
            window.location = "/"
        })
    });

    $(".add_to_library").on("click", function() {
        var article_id = $(this).attr("data-id");
        $.ajax({
            method: "POST",
            url: `/articles/add/${article_id}`
        }).done(() => {
            window.location = "/"
        })
    });
});