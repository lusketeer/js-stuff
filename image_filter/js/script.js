$(document).ready(function() {
  var filterList = $("div.filter-list");
  var filters = ["Original"].concat(Object.keys($.filterMe.filters));
  $.each(filters, function(index, filter) {
    var sampleImage = $("<img>").attr({ "src": "img/sample.png", "data-filter": filter});
    sampleImage.filterMe();
    var filterElement = $("<a>").attr("href", "javascript:void(0)").addClass("filter-option thumbnail").html(sampleImage);
    var filterWrapper = $("<div>").addClass("col-sm-4").html(filterElement);
    // var filterElement = $("<a>").addClass("filter-option btn btn-success col-sm-4").html(filter);
    filterList.append(filterWrapper);
  });
  setTimeout(function() {
    $("a.filter-option").click(function() {
      var img = $("<img>").attr({"src": "img/72H.jpg", "data-filter": ""}).addClass("img-responsive filter");
      $("div.img-wrapper").html(img);
      var option = $(this).children("img").attr("data-filter");
      $(".filter").attr("data-filter", option);
      $(".filter").filterMe();
    });
  }, 2000);
})
