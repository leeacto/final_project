$(document).ready(function(){!function(){var e=document.querySelector("#take-picture"),t=document.querySelector("#show-picture");e&&t&&(console.log("getting through two"),e.onchange=function(e){var r,o=e.target.files;if(o&&o.length>0){r=o[0];try{var n=window.URL||window.webkitURL,c=n.createObjectURL(r);t.src=c,n.revokeObjectURL(c)}catch(a){try{var i=new FileReader;i.onload=function(e){t.src=e.target.result},i.readAsDataURL(r)}catch(a){var u=document.querySelector("#error");u&&(u.innerHTML="createObjectURL or FileReader are not working")}}}})}(),$("#upload").click(function(e){e.preventDefault();var t=$(this).attr("href");$.colorbox({width:"550px",height:"550px",href:t,onComplete:function(){function e(e){if(e.files&&e.files[0]){var t=new FileReader;t.onload=function(e){$("#preview").attr("src",e.target.result)},t.readAsDataURL(e.files[0])}}$("#take-picture").change(function(){e(this)})}}),$("#save_to_db").submit()})});