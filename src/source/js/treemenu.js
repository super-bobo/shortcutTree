	
	//JSON数据
	var zNodes =[//模拟数据,按照这个格式
		{ id:1, name:"部门1",open:true,
			children: [
			{ id:11, name:"部门1-1", open:true,
				children: [
					{id: 111, name: "部门1-1-1",
						children: [
							{id: 1111, name: "部门1-1-1-1"},
							{id: 1112, name: "部门1-1-1-2"},
						]},
					{id: 112, name: "部门1-1-2"},
				]},
			{ id:12, name:"部门1-2", open:true,
				children: [
					{id: 121, "name": "部门1-1-1"},
					{id: 122, "name": "部门1-1-2"},
			]}
			]
		},
		{ id:2, name:"部门2", open:true}
		];
	function shortcutTree(){
		this.ztree;
	}

	shortcutTree.prototype.init = function(){
		var setting = {
			check: {
				enable: true,
			},
			view: {
				dblClickExpand: false
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onCheck: shortcutTree.checkNode,
				
			}
		};
		this.ztree = $.fn.zTree.init($("#shortcutTree"), setting, zNodes);

		$("#treeDrag").dragsort({
			dragEnd: function(){//拖动顺序后的回调
				shortcutTree.setCode();
			},
			dragBetween: true,
			placeHolderTemplate: '<li class="tree-helper"></li>'
		});


		$("#treeDrag").on('dblclick', ".tree-list", function(){//编辑
			shortcutTree.editHtml($(this));
		});

		$("#treeDrag").on('click', '.edit-input', function(e){
			e.stopPropagation();
		})

		$(document).on('click', function(e){//赋值,删除input
			shortcutTree.deleteInput();
		});

		$("#treeDrag").on('click', '.tree-delete-btn', function(){
			var thisNode = $(this).parent('li');
			var deleteId = thisNode.attr("statusid");
			shortcutTree.deleteHtml(deleteId);
		})
	};

	shortcutTree.checkNode = function(event, treeId, treeNode){
		var getTree = $.fn.zTree.getZTreeObj("shortcutTree");
		var checkType = treeNode.checked;
		if(checkType){
			getTree.setChkDisabled(treeNode, checkType, false, checkType);
			getTree.setChkDisabled(treeNode, !checkType, false, !checkType);
		}else{
			getTree.setChkDisabled(treeNode, checkType, false, !checkType);
			if(treeNode.children){
				var childrenLen = treeNode.children.length;
				for(var i=0; i < childrenLen; i++){
					getTree.checkNode(treeNode.children[i], false, true);
				}
			}
		}
		shortcutTree.setHtml(treeNode.id, treeNode.name, checkType);
	};

	shortcutTree.setHtml = function(tid, name, checkType){
		var getTree = $.fn.zTree.getZTreeObj("shortcutTree");
		var nodes = getTree.getCheckedNodes(true);
		var dragWrapper = $("#treeDrag");
		var liHtml = '<li class="tree-list" statusid="' + tid + '"> <div class="text">'+ name +'</div><span class="tree-delete-btn glyphicon glyphicon-remove-circle" aria-hidden="true"></span></li>';
		if(checkType){
			dragWrapper.prepend(liHtml);
		}else{
			dragWrapper.find(".tree-list").each(function(index, el) {
				var deleteNode = false;
				if(nodes.length ==0){
					$(el).remove();
				}else{
					for(var i in nodes){
						if(nodes[i].id == $(el).attr("statusid")){
							deleteNode = false;
							return;
						}else{
							deleteNode = true;
						}
					}
				}
				if(deleteNode){
					$(el).remove();
				}
			});
		}
		shortcutTree.setCode();
	};

	shortcutTree.deleteHtml = function(id){
		var getTree = $.fn.zTree.getZTreeObj("shortcutTree");
		var node = getTree.getNodeByParam("id", id);
		$("#" + node.tId).find("#" + node.tId + '_check').trigger('click');
	};

	shortcutTree.editHtml = function(currnetNode){
		var inputHtml = $('<input type="text" class="edit-input" value="'+ currnetNode.find('.text').html() + '">');
		currnetNode.append(inputHtml).addClass('bg');
		inputHtml.focus().select();
	};

	shortcutTree.deleteInput = function(){
		var inputNode = $("#treeDrag").find(".edit-input");
		var valText = inputNode.val();
		inputNode.parent(".tree-list").find(".text").html(valText);
		inputNode.parent(".tree-list").removeClass('bg');
		inputNode.remove();
	};

	shortcutTree.setCode = function(){
		$("#treeDrag").children('li').each(function(index, el) {
			$(el).attr("index", index);
		});
	};

	$(function(){
		var shortcut = new shortcutTree();
		shortcut.init();
	});