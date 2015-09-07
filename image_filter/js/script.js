$(document).ready(function() {
  imageSource = "img/72H.jpg";
  addCropBox();
  var filterList = $("div.filter-list");
  var filters = ["Original"].concat(Object.keys($.filterMe.filters));
  $.each(filters, function(index, filter) {
    var sampleImage = $("<img>").attr({ "src": "img/sample.png", "data-filter": filter});
    sampleImage.filterMe();
    var filterElement = $("<a>").attr({"href": "javascript:void(0)", "data-toggle": "tooltip", "data-placement": "left", "title": filter}).addClass("filter-option thumbnail").html(sampleImage);
    var filterWrapper = $("<div>").addClass("col-sm-4").html(filterElement);
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

    imageReload();
    addCropBox();
  });

  // setTimeout(function() {
    $("a.filter-option").click(function() {
      imageReload()
      var option = $(this).children("img").attr("data-filter");
      $(".filter").attr("data-filter", option);
      $("#filter_name").text(option);
      $(".filter").filterMe();
      // addCropBox();
    })
  // }, 2000);

  $("button.add-crop-box").click(function() {
    addCropBox();
  });

  $('[data-toggle="tooltip"]').tooltip();

  function imageReload() {
    var img = $("<img>").attr({"src": imageSource, "data-filter": ""}).addClass("img-responsive filter");
    $("div.img-wrapper .row:first-child").html(img);
  }

  function addCropBox() {
    $(".cropped-image").attr("href", "javascript:void(0)");
    $(".img-wrapper .filter").cropper({
      aspectRatio: NaN,
      preview: ".img-preview",
      zoomable: false,
      crop: function(e) {
        $(".get-cropped-image").click(function() {
          var img = $(".img-wrapper .filter").cropper("getCroppedCanvas");
          $(".img-preview").html(img);
          $(".cropped-image").attr("href", img.toDataURL());
        });
      }
    });
  }


})
