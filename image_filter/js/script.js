$(document).ready(function() {
  imageSource = "img/72H.jpg";
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

  $("select.image-source-list").change(function(e) {
    e.preventDefault();
    var selected = $("select option:selected")
    var newImageUrl = selected.val();
    if (newImageUrl !== "") {
      imageSource = newImageUrl;
    } else {
      imageSource = "img/72H.jpg";
    }
    // imageReload()
    $("img.filter").attr("src", imageSource);
  });

  setTimeout(function() {
    $("a.filter-option").click(function() {
      imageReload()
      debugger
      var option = $(this).children("img").attr("data-filter");
      $(".filter").attr("data-filter", option);
      $("#filter_name").text(option);
      $(".filter").filterMe();
    });
  }, 2000);

  function imageReload() {
    var img = $("<img>").attr({"src": imageSource, "data-filter": ""}).addClass("img-responsive filter");
    $("div.img-wrapper").html(img);
  }
})
