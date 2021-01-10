
const view = {
    userList: document.querySelector("#user-list"),
    selectAll: document.querySelector("#select-all"),
    statsInfo: document.querySelector("#stats"),
    emailDropdown: document.querySelector("#dropdown-email"),
    roleDropdown: document.querySelector("#dropdown-role"),
    search: document.querySelector("#inputSearch"),
    nextBtn: document.querySelector("#next-page"),
    backBtn: document.querySelector("#back-btn"),
    detailsView: document.querySelector("#details-view"),
    mainView: document.querySelector("#main-view"),
    detailsItems: document.querySelector("#details-items"),
    btnFolder: document.querySelector("#btn-folder"),
    btnServer: document.querySelector("#btn-server"),
};


const dataCopy = utils.formatData(users.slice());
const basicList = new BasicList(dataCopy, view);

const pagingList = new PagingList();
pagingList.initComponent();



