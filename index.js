document.addEventListener('DOMContentLoaded', function(){
  console.log('DOM READy')
  var source;

  var todoList = document.querySelector('.todo-list');
  var todoListItems = todoList.querySelectorAll('.todo-list-item');

  [].forEach.call(todoListItems, function(todoListItem){
    todoListItem.draggable = true
    todoListItem.addEventListener('dragenter', dragenter, false)
    todoListItem.addEventListener('dragstart', dragstart, false)
    todoListItem.addEventListener('dragend', dragend, false)
  })


  function isbefore(a, b) {
    console.log('isBefore', a.parentNode == b.parentNode)
    if (a.parentNode == b.parentNode) {
      for (var cur = a; cur; cur = cur.previousSibling) {
        if (cur === b) {
          return true;
        }
      }
    }
    return false;
  }

  function dragstart(e) {
    source = e.target;
    e.dataTransfer.effectAllowed = 'move';
  }

  function dragenter(e) {
    e.preventDefault()
    var target = getDraggableTarget(e)
    if (isbefore(source, target)) {
      target.parentNode.insertBefore(source, target);
    }
    else {
      target.parentNode.insertBefore(source, target.nextSibling);
    }
  }

  function dragend(e) {
    console.log('DRAG END')
    e.preventDefault()
    var target = getDraggableTarget(e)
    logRankChanges(target.parentNode)
  }

  function logRankChanges(node){
    console.log('RANK CHANGE ', node);
    var todoListItems = [].slice.call(node.children).map(function(todoListItem, index){
      todoListItem.querySelector('.todo-list-item-rank').innerText = index
      return {
        node: todoListItem,
        description: todoListItem.querySelector('.todo-list-item-description').innerText,
        prevRank: parseInt(todoListItem.querySelector('.todo-list-item-rank').innerText,10),
        newRank: index,
      }
    })

    todoListItems.forEach(function(todoListItem){
      console.log(`${todoListItem.description} moved from ${todoListItem.prevRank} to ${todoListItem.newRank}`)
    })
  }

  function getDraggableTarget(event){
    var target = event.target
    while(target && !target.draggable){ target = target.parentNode }
    return target
  }
}, false);
