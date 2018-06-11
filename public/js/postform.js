$(document).ready(function () {
    var wbbOpt = {
      img_maxwidth:		600,
			img_maxheight:		600,
      smileConversion:	true,
      buttons: "bold,italic,underline,|,img,link,|,code,quote,|,bullist,numlist",
      lang: "en",
    };
    $("#post-content").wysibb(wbbOpt);
  });