$("#myId1").on("click", () => {
  alert("ha ha ha");
});

$("button:eq(0)").on("click", () => {
  $("#myId1").hide(100);
});

$("button:eq(1)").on("click", () => {
  $("#myId1").show(100);
});

$("button:eq(2)").on("click", () => {
  $("#myId1").toggle(100);
});

$("#aniDiv").css({ position: "relative", width: "max-content", color: "red" });
$("#aniBtn").on("click", () => {
  $("#aniDiv").animate({ left: "200px" }, "slow", () => {
    $("#aniDiv").animate({ left: "0px" }, "slow");
  });
});
