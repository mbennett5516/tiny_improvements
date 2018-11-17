const renderKudos = function () {
    $('#target').empty();
    $.ajax({
        url: '/api/kudo',
        method: "GET"
    }).then(function (response) {
        if (!response.error) {
            $.each(response, function (index, data) {
                let card = `<div class="card col-4">
                <div class="card-header">
                <h5 class="card-title">${data.title}</h5>
                <h6 class="card-subtitle text-muted">To: ${data.recipient.username}</h6>
                </div>
                <div class="card-body">
                <p class="card-text">${data.body}</p>
                <div class="card-footer text-muted">From: ${data.sender.username}</div>
                </div>
                </div>`
                $('#target').append(card);
            })
        }
        else{
            alert("Whoops! There was a problem! " + response.error);
        }
    });
};

$(document).ready(
    renderKudos
)
