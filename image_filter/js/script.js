$(document).ready(function() {
  imageSource = "img/72H.jpg";
  var $image = $(".img-wrapper .filter");
  var filterList = $("div.filter-list");
  var filters = ["Original"].concat(Object.keys($.filterMe.filters));
  $.each(filters, function(index, filter) {
    var sampleImage = $("<img>").attr({ "src": "img/sample.png", "data-filter": filter});
    sampleImage.filterMe();
    var filterElement = $("<a>").attr({"href": "javascript:void(0)", "data-toggle": "tooltip", "data-placement": "left", "title": filter}).addClass("filter-option thumbnail").html(sampleImage);
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

    imageReload();
  });

  setTimeout(function() {
    $("a.filter-option").click(function() {
      imageReload()
      var option = $(this).children("img").attr("data-filter");
      $(".filter").attr("data-filter", option);
      $("#filter_name").text(option);
      $(".filter").filterMe();
      addCropBox();
    });
  }, 2000);





  $('[data-toggle="tooltip"]').tooltip()

  function imageReload() {
    var img = $("<img>").attr({"src": imageSource, "data-filter": ""}).addClass("img-responsive filter");
    $("div.img-wrapper .row:first-child").html(img);
  }

  function addCropBox() {
    $image.cropper({
      aspectRatio: NaN,
      preview: ".img-preview",
      zoomable: false,
      crop: function(e) {
        console.log(e);
        // $("#dataX").val(Math.round(e.x));
        // $("#dataY").val(Math.round(e.y));
        // $("#dataHeight").val(Math.round(e.height));
        // $("#dataWidth").val(Math.round(e.width));
        // $("#dataRotate").val(e.rotate);
        // $("#dataScaleX").val(e.scaleX);
        // $("#dataScaleY").val(e.scaleY);
        $(".get-cropped-image").click(function() {
          var img = $image.cropper("getCroppedCanvas");
          $(".img-preview").html(img);
          $(".cropped-image").attr("href", img.toDataURL());
        });
      }
    });
  }
})
