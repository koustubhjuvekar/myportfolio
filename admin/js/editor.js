tinymce.init({

selector:'#editor',

height:650,

menubar:true,

plugins:

'lists link image table code preview codesample media fullscreen autosave',

toolbar:

'undo redo | blocks | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | image media table link | codesample code preview fullscreen'

});

function previewPost(){

const html=tinymce.get("editor").getContent();

const win=window.open();

win.document.write(html);

}

function publishPost(){

const title=document.getElementById("title").value.trim();

const category=document.getElementById("category").value;

const content=tinymce.get("editor").getContent();

if(title==""){

alert("Enter Title");

return;

}

const date=new Date().toLocaleDateString();

let html=`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>${title}</title>

<link rel="stylesheet" href="../css/style.css">

</head>

<body>

<div class="article">

<h1>${title}</h1>

<p>${date}</p>

<hr>

${content}

</div>

</body>

</html>

`;

console.log(html);

alert("HTML Generated Successfully.");

}