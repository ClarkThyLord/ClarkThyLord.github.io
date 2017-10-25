var objects = {}, selectedObjects = {};


/**
 * Function to handle dragging start of an object within object's managing.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function objManagingDragStart(e) {

  e.dataTransfer.setData('Text', e.target.id);

}


/**
 * Function to handle dragging enter of an object within object's managing.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function objManagingDragEnter(e) {

  e.target.parentNode.classList.add("hover-" + e.target.classList[0]);

}


/**
 * Function to handle dragging over of an object within object's managing.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function objManagingDragOver(e) {

  e.preventDefault();

}


/**
 * Function to handle dragging leave of an object within object's managing.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function objManagingDragLeave(e) {

  e.target.parentNode.classList.remove("hover-" + e.target.classList[0]);

}


/**
 * Function to handle dragging drop of an object within object's managing.
 * @param {Event} [e] Event to be handled.
 * @return {undefined} Returns nothing.
 */
function objManagingDragDrop(e) {

  e.target.parentNode.classList.remove("hover-" + e.target.classList[0]);

}


/**
 * Create HTML, meant for object's managing, out of a given object's data.
 * @param {Object} [obj] name of the file.
 * @return {String} String representing object's data in HTML.
 */
function objToHTML(obj){

  var inner = "";
  for (sub in obj.sub){

    inner += "" + objToHTML(sub) + "";

  }

  return "" + inner + "";

}


/**
 * Create an object.
 * @param {string} [name] Name for the new object.
 * @param {string} [type] Type of object to be created.
 * @return {undefined} Returns the objects name.
 */
function objCreate(name, type) {

  // Check that all given values are valid
  name = name || "Sprite " + Object.keys(objects).length;
  type = type || "sprite";

  // Make sure this object's name is unique
  while (name in objects) {

    name += "1"

  }

  // Object's Structure:
  // {String} [object's name] : {
  //
  //  "name": {String} [object's name],
  //  "type": {String} [object's type],
  //  "sub": {List of Objects} [sub objects],
  //  "canvas_id": {String} [object's canvas id],
  //  "canvas_obj": {Canvas Object} [object's canvas object)]
  //
  //  }
  objects[name] = {

    "name": name,
    "type": type,
    "sub": [],
    "canvas_id": name,
    "canvas_obj": null

  }

  return name;

}


// var dragSrcEl = null;
//
// function handleDragStart(e) {
//   // Target (this) element is the source node.
//   dragSrcEl = this;
//
//   e.dataTransfer.effectAllowed = 'move';
//   e.dataTransfer.setData('text/html', this.outerHTML);
//
//   this.classList.add('dragElem');
// }
// function handleDragOver(e) {
//   if (e.preventDefault) {
//     e.preventDefault(); // Necessary. Allows us to drop.
//   }
//   this.classList.add('over');
//
//   e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
//
//   return false;
// }
//
// function handleDragEnter(e) {
//   // this / e.target is the current hover target.
// }
//
// function handleDragLeave(e) {
//   this.classList.remove('over');  // this / e.target is previous target element.
// }
//
// function handleDrop(e) {
//   // this/e.target is current target element.
//
//   if (e.stopPropagation) {
//     e.stopPropagation(); // Stops some browsers from redirecting.
//   }
//
//   // Don't do anything if dropping the same column we're dragging.
//   if (dragSrcEl != this) {
//     // Set the source column's HTML to the HTML of the column we dropped on.
//     //alert(this.outerHTML);
//     //dragSrcEl.innerHTML = this.innerHTML;
//     //this.innerHTML = e.dataTransfer.getData('text/html');
//     this.parentNode.removeChild(dragSrcEl);
//     var dropHTML = e.dataTransfer.getData('text/html');
//     this.insertAdjacentHTML('beforebegin',dropHTML);
//     var dropElem = this.previousSibling;
//     addDnDHandlers(dropElem);
//
//   }
//   this.classList.remove('over');
//   return false;
// }
//
// function handleDragEnd(e) {
//   // this/e.target is the source node.
//   this.classList.remove('over');
//
//   /*[].forEach.call(cols, function (col) {
//     col.classList.remove('over');
//   });*/
// }
//
// function addDnDHandlers(elem) {
//   elem.addEventListener('dragstart', handleDragStart, false);
//   elem.addEventListener('dragenter', handleDragEnter, false)
//   elem.addEventListener('dragover', handleDragOver, false);
//   elem.addEventListener('dragleave', handleDragLeave, false);
//   elem.addEventListener('drop', handleDrop, false);
//   elem.addEventListener('dragend', handleDragEnd, false);
//
// }
//
// var cols = document.querySelectorAll('#columns .column');
// [].forEach.call(cols, addDnDHandlers);
