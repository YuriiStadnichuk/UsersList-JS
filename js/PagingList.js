class PagingList extends BasicList {
    constructor() {
        super(),
            this.pageConfig = {
                itemsPerPage: 5,
                currentPage: 0
            }
    }
    initListeners() {
        BasicList.prototype.initListeners.apply(this);
        this.nextBtn.addEventListener("click", this.getNextPageHandler.bind(this));
    }

    getNextPageHandler(event) {
        event && event.preventDefault();
        this.buildUsersList();
        if (this.isMaxPage()) {
            this.blockNextPage();
            this.countStats();
        }
    }

    isMaxPage() {
        return (this.pageConfig.currentPage * this.pageConfig.itemsPerPage) > this.usersListData.length;
    }

    blockNextPage() {
        this.nextBtn.classList.add("disabled");
    }

    countStats() {
        let stats = this.usersListData.reduce((sum, item) => {
            (item.role == "Admin") ? sum.admins++ : sum.users++;
            return sum;
        }, { admins: 0, users: 0 });
        this.statsInfo.innerHTML = `Статистика системы. Админов: ${stats.admins}, Пользователей: ${stats.users}`;
    }

    getNextPage() {
        let start = this.pageConfig.itemsPerPage * this.pageConfig.currentPage;
        let end = this.pageConfig.itemsPerPage + start;
        this.pageConfig.currentPage++;
        return this.usersListData.slice(start, end);
    }
}