var tempElement;
var dialogState;

function clickAdd(icon){
    var column = icon;
    while (column.className != "column") {
        column = column.parentElement;
    }
    tempElement = column;
    var columnHeader = icon.parentElement.parentElement.children[0].innerHTML;
    var dialogText = 'Neue Aufgabe zu "' + columnHeader +  '" hinzufügen';
    dialogState = "addWorkItem";
    showDialog(dialogText, "Aufgabe", "Beschreibung");
}

function clickEditWorkItem(icon){
    var workItem = icon;
    while (workItem.className != "workItem"){
        workItem = workItem.parentElement;
    }
    tempElement = workItem;
    var workItemHeader = icon.parentElement.parentElement.children[0].innerHTML;
    var dialogText = 'Aufgabe "' + workItemHeader +  '" bearbeiten';
    dialogState = "editWorkItem";
    showDialog(dialogText, "Aufgabe", "Beschreibung");
}

function clickAddComment(icon){
    var discussionList = icon;
    while (discussionList.id != "discussion"){
        discussionList = discussionList.parentElement;
    }
    var children = discussionList.children;
    for(i = 0; i < children.length; i++){
        if (children[i].id == "discussionList"){
            discussionList = children[i];
        }
    }
    tempElement = discussionList;
    dialogState = "addComment";
    showDialog("Kommentar verfassen", "Name", "Kommentar");
}

function showDialog(dialogText, labelInput1, labelInput2){
    document.getElementById("input1").style.border = "solid royalblue 1px";
    document.getElementById("input2").style.border = "solid royalblue 1px";
    document.getElementById("dialogText").innerHTML = dialogText;
    document.getElementById("labelInput1").innerHTML = labelInput1 + ":";
    document.getElementById("labelInput2").innerHTML = labelInput2 + ":";
    if (dialogState == "addWorkItem" || dialogState == "addComment") {
        document.getElementById("input1").value = "";
        document.getElementById("input2").value = "";
    }
    else if (dialogState == "editWorkItem"){
        document.getElementById("input1").value = tempElement.children[0].children[0].innerHTML;
        document.getElementById("input2").value = tempElement.children[1].innerHTML;
    }
    var overlayBackground = document.getElementById("overlayBackground");
    overlayBackground.style.visibility = "visible";
    var overlay = document.getElementById("overlay");
    overlay.style.visibility = "visible";
}

function closeDialog(dialogResult){
    var input1 = document.getElementById("input1").value;
    var input2 = document.getElementById("input2").value;
    if (dialogResult == "OK") {
        if (input1 == ""){
            document.getElementById("input1").focus();
            document.getElementById("input1").style.border = "solid red 1px";
            return;
        }
        else if (input2 == ""){
            document.getElementById("input2").focus();
            document.getElementById("input1").style.border = "solid royalblue 1px";
            document.getElementById("input2").style.border = "solid red 1px";
            return;
        }

        if (dialogState == "addWorkItem")
            addWorkItem(tempElement, input1, input2);
        else if (dialogState == "editWorkItem")
            editWorkItem(tempElement, input1, input2);
        else if (dialogState == "addComment")
            addComment(tempElement, input1, input2);
    }

    var overlayBackground = document.getElementById("overlayBackground");
    overlayBackground.style.visibility = "hidden";
    var overlay = document.getElementById("overlay");
    overlay.style.visibility = "hidden";

}

function addWorkItem(column, workItemTitle, workItemDescription){
    var workItem = document.createElement("div");
    workItem.setAttribute("draggable", "true");
    workItem.setAttribute("ondragstart", "drag(event)");
    workItem.setAttribute("class", "workItem");
    workItem.id = uniqueID("workItem");
    var nameHeader = document.createElement("h3");
    var nameSpan = document.createElement("span");
    nameSpan.innerHTML = workItemTitle;
    nameHeader.appendChild(nameSpan);
    var editSpan = document.createElement("span");
    editSpan.setAttribute("class", "iconSmall");
    var editIcon = document.createElement("i");
    editIcon.setAttribute("class", "fa fa-pencil");
    editIcon.setAttribute("aria-hidden", "true");
    editIcon.setAttribute("title", "Aufgabe bearbeiten");
    editIcon.setAttribute("onclick", "clickEditWorkItem(this)");
    editSpan.appendChild(editIcon);
    nameHeader.appendChild(editSpan);

    workItem.appendChild(nameHeader);

    var desc = document.createElement("p");
    var descText = document.createTextNode(workItemDescription);
    desc.appendChild(descText);

    workItem.appendChild(desc);

    var sep = document.createElement("div");
    sep.className = "seperator";
    workItem.appendChild(sep);

    var workers = document.createElement("div");
    workers.setAttribute("id", "workers");
    var workersHeader = document.createElement("h4");
    var workersIconSpan = document.createElement("span");
    workersIconSpan.setAttribute("class", "iconLeft");
    var workersIcon = document.createElement("i");
    workersIcon.setAttribute("class", "fa fa-users");
    workersIcon.setAttribute("aria-hidden", "true");
    workersIconSpan.appendChild(workersIcon);
    workersHeader.appendChild(workersIconSpan);
    var workersSpan = document.createElement("span");
    workersSpan.innerHTML = "Mitarbeiter:";
    workersHeader.appendChild(workersSpan);
    var addSpan = document.createElement("span");
    addSpan.setAttribute("class", "iconSmall");
    var addIcon = document.createElement("i");
    addIcon.setAttribute("class", "fa fa-plus-circle");
    addIcon.setAttribute("aria-hidden", "true");
    addIcon.setAttribute("title", "Mitarbeiter hinzufügen");
    addIcon.setAttribute("onclick", "clickAddWorker(this)");
    addSpan.appendChild(addIcon);
    workersHeader.appendChild(addSpan);
    workers.appendChild(workersHeader);
    var workersList = document.createElement("ul");
    workersList.setAttribute("id", "workersList");
    workers.appendChild(workersList);

    workItem.appendChild(workers);

    workItem.appendChild(sep.cloneNode());

    var discussion = document.createElement("div");
    discussion.setAttribute("id", "discussion");
    var discussionHeader = document.createElement("h4");
    var discussionIconSpan = document.createElement("span");
    discussionIconSpan.setAttribute("class", "iconLeft");
    var discussionIcon = document.createElement("i");
    discussionIcon.setAttribute("class", "fa fa-comments");
    discussionIcon.setAttribute("aria-hidden", "true");
    discussionIconSpan.appendChild(discussionIcon);
    discussionHeader.appendChild(discussionIconSpan);
    var discussionSpan = document.createElement("span");
    discussionSpan.innerHTML = "Diskussion:";
    discussionHeader.appendChild(discussionSpan);
    var expandSpan = document.createElement("span");
    expandSpan.setAttribute("class", "iconSmall");
    var expandIcon = document.createElement("i");
    expandIcon.setAttribute("class", "fa fa-arrow-circle-o-down");
    expandIcon.setAttribute("aria-hidden", "true");
    expandIcon.setAttribute("title", "Diskussion anzeigen");
    expandIcon.setAttribute("onclick", "clickExpandDiscussion(this)");
    expandSpan.appendChild(expandIcon);
    discussionHeader.appendChild(expandSpan);
    discussion.appendChild(discussionHeader);

    var commentDiv = document.createElement("div");
    commentDiv.style.minHeight = "20px";
    commentDiv.setAttribute("id", "addDiscussion");
    commentDiv.style.display = "none";
    var commentSpan = document.createElement("span");
    commentSpan.setAttribute("class", "iconSmall");
    var commentIcon = document.createElement("i");
    commentIcon.setAttribute("class", "fa fa-commenting-o");
    commentIcon.setAttribute("aria-hidden", "true");
    commentIcon.setAttribute("title", "Kommentar verfassen");
    commentIcon.setAttribute("onclick", "clickAddComment(this)");
    commentSpan.appendChild(commentIcon);
    commentDiv.appendChild(commentSpan);
    discussion.appendChild(commentDiv);

    var discussionList = document.createElement("ul");
    discussionList.setAttribute("id", "discussionList");
    discussionList.style.display = "none";
    discussion.appendChild(discussionList);

    workItem.appendChild(discussion);

    column.appendChild(workItem);
    workItem.scrollIntoView(false);

    //===================================================
    column;
    workItemTitle;
    workItemDescription;

    let ajax = new XMLHttpRequest();
    ajax.open("PUT", "http://localhost/WebProg3/updateScript.php", true);
    ajax.send();
    //===================================================
}

function editWorkItem(workItem, workItemTitle, workItemDescription){
    workItem.children[0].children[0].innerHTML = workItemTitle;
    workItem.children[1].innerHTML = workItemDescription;
}

function addComment(discussionList, name, comment){
    var commentItem = document.createElement("li");
    var commentHeader = document.createElement("h4");
    var commentNameSpan = document.createElement("span");
    commentNameSpan.innerHTML = name;
    commentHeader.appendChild(commentNameSpan);
    var commentDateSpan = document.createElement("span");
    commentDateSpan.style.float = "right";
    commentDateSpan.style.textAlign = "right";
    commentDateSpan.style.marginRight = "10px";
    var date = new Date();
    commentDateSpan.innerHTML = twoDigits(date.getDate()) + "." + twoDigits(date.getMonth()) + "." + date.getFullYear() + "<br>" + twoDigits(date.getHours()) + ":" + twoDigits(date.getMinutes()) + " Uhr";
    commentHeader.appendChild(commentDateSpan);
    commentItem.appendChild(commentHeader);
    var commentContent = document.createElement("p");
    commentContent.style.wordWrap = "break-word";
    commentContent.innerHTML = comment;
    commentItem.appendChild(commentContent);
    if (discussionList.hasChildNodes() == true)
        discussionList.insertBefore(commentItem, discussionList.children[0]);
    else
        discussionList.appendChild(commentItem);
}

function clickAddWorker(icon){

    var list = icon;
    while (list != null && list.id != "workers"){
        list = list.parentElement;
    }

    var children = list.children;
    for (i = 0; i < children.length; i++){
        if (children[i].id == "workersList"){
            list = children[i];
            break;
        }
    }
    if (list.id != "workersList"){
        console.log("Keine Liste??");
        return;
    }
    var name = prompt("Name");
    if (name != null) {
        var worker = document.createElement("li");
        worker.setAttribute("id", "worker");
        var workerName = document.createElement("span");
        workerName.innerHTML = name;
        worker.appendChild(workerName);
        var deleteSpan = document.createElement("span")
        deleteSpan.setAttribute("class", "iconSmall");
        var deleteIcon = document.createElement("i");
        deleteIcon.setAttribute("class", "fa fa fa-trash-o");
        deleteIcon.setAttribute("aria-hidden", "true");
        deleteIcon.setAttribute("title", "Mitarbeiter löschen");
        deleteIcon.setAttribute("onclick", "clickDeleteWorker(this)");
        deleteSpan.appendChild(deleteIcon);
        worker.appendChild(deleteSpan);
        list.appendChild(worker);
    }
}

function clickDeleteWorker(icon){
    var worker = icon;
    while (worker != null && worker.id != "worker"){
        worker = worker.parentElement;
    }
    var workersList = worker.parentElement;
    var name = worker.children[0].innerHTML;
    if (confirm(name + " von dieser Aufgabe entfernen?") == true){
        workersList.removeChild(worker);
    }
}

function clickExpandDiscussion(icon){
    var iconClass = icon.getAttribute("class");
    var discussionList = icon;
    var addDiscussion;
    while (discussionList != null && discussionList.id != "discussion"){
        discussionList = discussionList.parentElement;
    }
    var children = discussionList.children;
    for (i = 0; i < children.length; i++){
        if (children[i].id == "discussionList") {
            discussionList = children[i];
        }
        else if (children[i].id == "addDiscussion"){
            addDiscussion = children[i];
        }
    }
    if (iconClass == "fa fa-arrow-circle-o-down"){
        icon.setAttribute("class", "fa fa-arrow-circle-o-up");
        icon.setAttribute("title", "Diskussion verbergen");
        addDiscussion.style.display = "block"
        discussionList.style.display = "block";
    }
    else{
        icon.setAttribute("class", "fa fa-arrow-circle-o-down");
        icon.setAttribute("title", "Diskussion anzeigen");
        addDiscussion.style.display = "none";
        discussionList.style.display = "none";
    }
}

function twoDigits(number){
    if (number < 10)
        return "0" + number;
    else
        return number;
}

function uniqueID(prefix){
    var counter = 0;
    var id = prefix + counter;
    while (document.getElementById(id) != null){
        counter++;
        id = prefix + counter;
    }
    return id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var element = document.getElementById(data);
    var column = ev.target;
    while (column.className != "column"){
        column = column.parentElement;
    }
    column.appendChild(element);
    element.scrollIntoView(false);
}

