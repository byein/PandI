var mv = document.getElementById("pvideo");
var mvs = document.getElementById("pvideosrc");
mvs.onerror = function(){
    mv.removeAttributeNode();
}