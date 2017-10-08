
function hndlr(response) {
  for (var i = 0; i < response.items.length; i++) {
    var item = response.items[i];
    // in production code, item.htmlTitle should have the HTML entities escaped.
    console.log("!",response);
    document.getElementById("content").innerHTML += "<br>" + item.htmlTitle;
  }
}
var resultString;
function hndlr2(response) {
  for (var i = 0; i < response.items.length; i++) {
    var item = response.items[i];
    resultString += 
    // in production code, item.htmlTitle should have the HTML entities escaped.
    console.log("!",response);
    document.getElementById("content2").innerHTML += "<br>" + item.htmlTitle;
  }
}

var resultString = '<li>
<a href="' + item.link + '">' + item.title + '</a>
  <p>description</p>
  </li>