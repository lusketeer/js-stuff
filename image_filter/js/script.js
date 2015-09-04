$(document).ready(function() {
  var filterList = $("div.filter-list");
  var filters = ["Original"].concat(Object.keys($.filterMe.filters));
  $.each(filters, function(index, filter) {
    var filterElement = $("<a>").addClass("filter-option btn btn-success col-sm-4").html(filter);
    filterList.append(filterElement);
  });
  $("a.filter-option").click(function() {
    var img = $("<img>").attr({"src": "img/72H.jpg", "data-filter": ""}).addClass("img-responsive filter");
    $("div.img-wrapper").html(img);
    var option = (this.text === "Original") ? "" : this.text;
    $(".filter").attr("data-filter", option);
    $(".filter").filterMe();
  });
})
