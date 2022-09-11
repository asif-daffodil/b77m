$(function () {
  let $shadow = $(".text");
  let $shadowLighter = $(".lighter");
  let $shadowBolder = $(".bolder");
  //let shadowMax = $(window).innerHeight();
  let shadowMax = 450;
  let shadowMin = shadowMax * -1;
  let shadowMidPoints = [
    $shadow.offset().left + $shadow.width() / 2,
    $shadow.offset().top + $shadow.height() / 2
  ];

  let shadowSteps = 20;
  var shadowBlur = 10;

  $(document).on("mousemove", (e) => {
    let shadowX = Math.min(
      shadowMax,
      Math.max(shadowMin, shadowMidPoints[0] - e.pageX)
    );
    let shadowY = Math.min(
      shadowMax,
      Math.max(shadowMin, shadowMidPoints[1] - e.pageY)
    );
    var shadowValue;
    var shadowValueBolder;
    var shadowOpacity;
    var shadowOpacityBolder;

    for (var i = 0; i < shadowSteps; i++) {
      var newOffsetX = Math.floor(((shadowX / 2) * i) / 50);
      var newOffsetY = Math.floor(((shadowY / 2) * i) / 50);
      shadowOpacity = 1 - shadowSteps * i * 0.002;
      shadowOpacityBolder = 1 - shadowSteps * i * 0.005;
      shadowBlur = i * 1.5;
      if (shadowValue === undefined) {
        shadowValue = "0px 0px " + 10 + "px rgba(20, 17, 15, 0.3)";
        shadowValueBolder = "0px 0px " + 10 + "px rgba(20, 17, 15, 1)";
      } else {
        shadowValue +=
          ", " +
          newOffsetX * 2 +
          "px " +
          newOffsetY * 2 +
          "px " +
          shadowBlur * 1.25 +
          "px rgba(20, 17, 15, " +
          shadowOpacity / 5 +
          ")";
        shadowValueBolder +=
          ", " +
          newOffsetX * 0.25 +
          "px " +
          newOffsetY * 0.25 +
          "px " +
          shadowBlur * 1.5 +
          "px rgba(20, 17, 15, " +
          shadowOpacityBolder / 5 +
          ")";
      }
    }
    $shadowLighter.css("text-shadow", shadowValue);
    $shadowBolder.css("text-shadow", shadowValueBolder);
  });
});