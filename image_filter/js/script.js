$(document).ready(function() {
  $("a.filter-option").click(function() {
    var option = this.text;
    $(".filter").attr("data-filter", option);
    $(".filter").filterMe();
  });
})
