
class BasicList {

	constructor() {
		// this.userList = document.querySelector("#user-list");
		// this.selectAll = document.querySelector("#select-all");
		// this.statsInfo = document.querySelector("#stats");
		// this.emailDropdown = document.querySelector("#dropdown-email");
		// this.roleDropdown = document.querySelector("#dropdown-role");
		// this.search = document.querySelector("#inputSearch");
		// this.nextBtn = document.querySelector("#next-page");
		// this.backBtn = document.querySelector("#back-btn");

		// this.detailsView = document.querySelector("#details-view");
		// this.mainView = document.querySelector("#main-view");
		// this.detailsItems = document.querySelector("#details-items");

		this.dataCopy = dataCopy
		this.userList = view.userList;
		this.selectAll = view.selectAll;
		this.statsInfo = view.statsInfo;
		this.emailDropdown = view.emailDropdown;
		this.roleDropdown = view.roleDropdown;
		this.search = view.search;
		this.nextBtn = view.nextBtn;
		this.backBtn = view.backBtn;

		this.detailsView = view.detailsView;
		this.mainView = view.mainView;
		this.detailsItems = view.detailsItems;
		this.btnFolder = view.btnFolder;
		this.btnServer = view.btnServer;

		this.usersListData = [];
		this.pageConfig = {
			currentPage: 0,
		}
	}

	initComponent() {
		this.initListeners()
		// this.prepareUsersListData(this.dataCopy)
		// this.buildUsersList();
	}

	initListeners() {
		this.userList.addEventListener("click", this.tableLineHandler.bind(this));
		this.selectAll.addEventListener("click", this.selectAllItems.bind(this));
		this.search.addEventListener("keyup", this.searchHandler.bind(this));
		this.emailDropdown.addEventListener("click", this.sortingHandler.bind(this));
		this.roleDropdown.addEventListener("click", this.sortingHandler.bind(this));
		this.backBtn.addEventListener("click", this.openMain.bind(this));
		this.btnFolder.addEventListener("click", this.initList.bind(this));
		this.btnServer.addEventListener("click", this.getUsersList.bind(this));
	}
	initList() {
		this.prepareUsersListData(this.dataCopy)
		this.buildUsersList();
	}


	async getUsersList() {
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/users')
			const json = await response.json();
			this.dataCopy = json
			this.prepareUsersListData(json)
			this.buildUsersList();
		} catch (error) {
			console.log(error);
		}
	}


	prepareUsersListData(param) {
		this.usersListData = listService.duplicateArray(param, 1);
	}

	buildUsersList(filterSortFunction) {
		let page = this.getNextPage();
		filterSortFunction && (page = filterSortFunction(page));
		let result = page.map(item => listService.tableTemplate(item));
		this.userList.innerHTML += result.join("");
		listService.initTooltip();
	}
	buildUsersListSort(filterSortFunction) {
		let page = this.getNextPageAll();
		filterSortFunction && (page = filterSortFunction(page));
		let result = page.map(item => listService.tableTemplate(item));
		this.userList.innerHTML += result.join("");
		listService.initTooltip();
	}


	getNextPage() {
		return this.usersListDatServer
	}
	getNextPageAll() {
		return this.dataCopy
	}

	tableLineHandler(event) {
		let isButton = event.target.getAttribute("data-row-id");
		isButton ? this.openDetail(isButton) : this.selectTableLine(event);
	}

	openDetail(buttonId) {
		listService.hideElements([this.mainView]);
		listService.showElements([this.detailsView]);
		let user = this.usersListData.filter(item => item.id == buttonId);
		this.detailsItems.innerHTML = listService.detailsTemplate(user[0]);
	}

	selectAllItems() {
		let checkboxes = this.userList.querySelectorAll("input[type=checkbox]");
		checkboxes.forEach(item => this.selectAll.checked ? item.checked = true : item.checked = false);
	}

	searchHandler(event) {
		event.preventDefault();
		// let value = event.target.value;
		// if (event.keyCode === 13 && (value.length == 0 || value.length > 2)
		// ) {
		// 	this.pageConfig.currentPage = 0;
		// 	this.userList.innerHTML = "";
		// 	this.buildUsersList(config.sortingConfig["Find"]);
		// }
		this.pageConfig.currentPage = 0;
		this.userList.innerHTML = "";
		this.buildUsersList(config.sortingConfig["Find"]);
	}

	sortingHandler(event) {
		event.preventDefault();
		event.currentTarget.querySelector("button").innerHTML = event.target.innerText;
		let sortingType = event.target.getAttribute("sorting-type");
		sortingType && this.applySortingMethod(sortingType);
	}

	applySortingMethod(sortingType) {
		this.pageConfig.currentPage = 0;
		this.userList.innerHTML = "";

		this.buildUsersListSort(config.sortingConfig[sortingType]);
	}

	openMain() {
		listService.hideElements([this.detailsView]);
		listService.showElements([this.mainView]);
	}

	selectTableLine(event) {
		let tableLines = event.currentTarget.querySelectorAll("tr");
		tableLines.forEach(item => item.classList.remove("table-active"));
		event.target.closest("tr").classList.add("table-active");
	}






}

