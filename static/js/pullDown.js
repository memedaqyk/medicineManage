let iconAdd = document.getElementById('icon-add');
let mulu = document.getElementById('mulu');

iconAdd.addEventListener('click', function() {
	if (mulu.className == "mulu_active") {
		mulu.className = "";
	}else if (mulu.className == "") {
		mulu.className = "mulu_active";
	}
});