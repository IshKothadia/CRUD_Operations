//  index.js Isha Kothadia 301298827 26/02/2023 

$("#add-contact").submit(function (event) {
    alert("Data Inserted successfully");
})

$("#update-contact").submit(function (event) {
    event.preventDefault();

    var unindex_array = $(this).serializeArray();

    var data = {}
    $.map(unindex_array, function (n, i) {
        data[n['name']] = n['value'];
    })
    console.log(data);

    var request = {
        // http://localhost:3000/api/contacts/${data.id}
        // "url": `https://portfoliowebsite-ishakothadia.onrender.com/api/contacts/${data.id}`,
        "url":`https://portfoliowebsite-ishakothadia-contactlist.onrender.com/api/contacts/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("Data Updated successfully");
    })

})

if (window.location.pathname == "/business-contact-list") {

    $onDelete = $(".table tbody td a.delete");
    $onDelete.click(function () {
        var id = $(this).attr("data-id");
        var request = {
            "url": `https://portfoliowebsite-ishakothadia-contactlist.onrender.com/api/contacts/${id}`,
            // "url":`http://localhost:3000/api/contacts/${id}`,
            "method": "DELETE",
        }

        if (confirm("Are you sure want to delete this contact?")) {
            $.ajax(request).done(function (response) {
                alert("Data Deleted successfully");
                location.reload();
            });
        }
    })
}