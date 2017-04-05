	/***************
	  Nav on Mobile
	**************/

	$('.navmobile').click(function() {
		$('.nav').toggle('display');
	});


	/***************
	 Flickr API
	**************/


 var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";


 $('form').submit(function (evt) {
    var $submitButton = $('#submit');
    var $searchField = $('#search');
    evt.preventDefault();
    $searchField.prop("disabled",true);
    $submitButton.attr("disabled", true).val("searching....");
    var website = $searchField.val();
    $('#photos').html('');
    $.getJSON(flickerAPI, {
        tags: website,
        format: "json"
      },
    function(data){
      var photoHTML = '';
      if (data.items.length > 0) {
        $.each(data.items,function(i,photo) {
          photoHTML += '<li class="grid-25 tablet-grid-50">';
          photoHTML += '<a href="' + photo.link + '" class="image">';
          photoHTML += '<img src="' + photo.media.m + '"></a></li>';
        }); /* end each*/
      } else {
        photoHTML = "<p>No photos found that match: " + animal + ".</p>"
      }
      $('#photos').html(photoHTML);
      $searchField.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Search");
    }); /* end getJSON*/

  }); /* end click*/


  /**********************
    Submit Contact Form
  *********************/

var $form = $('#ajax-contact');
var formMessages = $('#form-messages');
$message.hide();
  $form.submit(function (e) {
    var $submitButton = $('#submitButton');
    e.preventDefault();
    var $formdata = $form.serialize();
    $.ajax({
      type: 'POST',
      url: $form.attr('action')/*php mailer*/,
      data: $formdata,
    }.done(function(response) {
      $(formMessages).removeClass('error');
      $(formMessages).addClass('success');
      $(formMessages).text(response);

     $form.hide(); /*hides the form*/
     $(formMessages).show(); /*showes the message*/

    }).fail(function(response) {
       $(formMessages).removeClass('success');
       $(formMessages).addClass('error');
        if (data.responseText !== '') {
          $(formMessages).text(data.responseText); /*if AJAX gave an error, show it*/
        } else {
          $(formMessages).text('Oops! An error occured and your message could not be sent.'); 
        }
        $form.hide(); /*hides the form*/
        $(formMessages).show(); /*showes the message*/
    }); /*end AJAX*/

  }); /*End Form Submit*/




