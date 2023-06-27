var datatable;


const closeButton = document.querySelector("#modal_close");


$(document).ready(function () {
    loadDataTable();
    
});


function loadDataTable() {
    datatable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Expense/GetExpenses"
        },
        "columns": [
            {
                "data": "date", "width": "10%",
                "render": function (data) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return (month.toString().length > 1 ? month : "0" + month) + "/" + date.getDate() + "/" + date.getFullYear();
                }
            },
            { "data": "amount", "width": "10%" },
            { "data": "expenseCategory.name", "width": "15%" },
            { "data": "method", "width": "15%" },
            {
                "data": function (data) {

                    if (data.account != null) {
                    return data.account.name;
                    }

                    else if (data.creditCard != null) {
                        return data.creditCard.name;
                    }
                    
                    else if (data.debt != null) {
                        return data.debt.entity;
                    }

                }
                , "defaultContent": ""
                ,"width": "15%"
            },
            { "data": "description", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                        <div>
                            <button onclick="editProduct(${data})" class="btn btn-outline-light">Edit</button> 
                        </ div>
                    `;
                }
                  , "width": "15%"
            }

        ]
    });
};


function editProduct(id) {
    const modal = document.querySelector("#expenseModal");
    modal.showModal();
    closeButton.addEventListener('click', () => {
        modal.close();
    })
}



