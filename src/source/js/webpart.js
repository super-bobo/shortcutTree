function webpartSet(){
}
webpartSet.prototype.init = function(){
  $(".webpack-moduleshow").dragsort({
    dragEnd: function(){//拖动顺序后的回调
      webpartSet.setCode();
    },
    dragSelector: ".panel-heading",
    placeHolderTemplate: '<div class="webpart-helper"></div>'
  });

  $("#webpartModuleShow").on('click', '.webpart-switch-btn', function(){
    webpartSet.openOrMoveModule($(this));
  })
};

webpartSet.openOrMoveModule = function(current){
  var currentNode = current.parents('.panel');
  if(currentNode.hasClass('panel-default')){
    currentNode.removeClass('panel-default').addClass('panel-primary');
    currentNode.parent('.webpart-panel').siblings('').append(currentNode);
    current.removeClass('glyphicon-plus-sign').addClass('glyphicon-minus-sign');
  }else{
    $(currentNode).removeClass('panel-primary').addClass('panel-default');
    currentNode.parent('.webpart-panel').siblings('').append(currentNode);
    current.removeClass('glyphicon-minus-sign').addClass('glyphicon-plus-sign');
    current.parents('.panel-heading').removeAttr('data-cursor').removeAttr('style');
  }
}

webpartSet.setCode = function(){
  $(".webpart-panel").find('.panel').each(function(index, el) {
    $(el).attr("index", index);
  });
}

$(function() {
  var webpart = new webpartSet();
  webpart.init();
});