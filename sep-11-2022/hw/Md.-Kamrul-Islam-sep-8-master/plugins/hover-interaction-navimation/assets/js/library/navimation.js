function navimation(config) {
  // variables
  let parent = config?.parent ? config?.parent : $("ul"),
    item = config?.item ? config?.item : $("ul").find("li"),
    event = config?.event ? config?.event : "mouseenter",
    id = config?.navimationTag?.id ? config?.navimationTag?.id : "navimation",
    attr = config?.navimationTag?.attr ? config?.navimationTag?.attr : {},
    css = config?.navimationTag?.css ? config?.navimationTag?.css : {},
    background = config?.navimationTag?.background ? config?.navimationTag?.background : "red",
    height = config?.navimationTag?.height ? config?.navimationTag.height : "2px",
    timeTranslate = config?.navimationTag?.timeTranslate ? config?.navimationTag?.timeTranslate : "0.5s",
    timeFunctionTranslate = config?.navimationTag?.timeFunctionTranslate ? config?.navimationTag?.timeFunctionTranslate : "linear",
    timeHide = config?.navimationTag?.timeHide ? config?.navimationTag?.timeHide : "0.5s" , 
    timeFunctionHide = config?.navimationTag?.timeFunctionHide ? config?.navimationTag?.timeFunctionHide : "linear";
  // create navimation tag
  $(parent).prepend(`<div id=${id}></div>`);
  // default style
  $(parent).css({
    position: "relative",
  });
  $(parent)
    .find(`#${id}`)
    .attr({...attr})
    .css({
      position: "absolute",
      bottom: "0",
      transition: ` left ${timeTranslate} ${timeFunctionTranslate} , transform ${timeHide} ${timeFunctionHide}`,
      width: "0",
      transform: "scale(0)",
      height: `${height}`,
      background: `${background}`,
      ...css,
    });
  // handle event
  item.on(event, function () {
    let left = $(this).offset().left - parent.offset().left;
    $(parent)
      .find(`#${id}`)
      .css({
        width: `${$(this).outerWidth()}px`,
        left: `${left}px`,
        transform: "scale(1)",
      });
  });
  // add event to parent
  if (event === "mouseenter") {
    parent.on("mouseleave", function () {
      $(parent).find(`#${id}`).css({
        transform: "scaleX(0)",
      });
    });
  }
}

