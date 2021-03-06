let activeUser = {
    _id: '',
    username: '',
    password: '',
    kudos: [{}]
};

const renderKudos = function () {
    $('#target').empty();
    $.ajax({
        url: '/api/kudo',
        method: "GET"
    }).then(function (response) {
        if (!response.error) {
            let card = `<div class="row">`;
            $.each(response, function (index, data) {
                card += `<div class="card col-4">
                <div class="card-header"><button type="button" class="close" value="${data._id}" aria-label="Delete">
                <span aria-hidden="true">&times;</span>
            </button>
                <h5 class="card-title">${data.title}</h5>
                <h6 class="card-subtitle text-muted">To: ${data.recipient.username}</h6>
                </div>
                <div class="card-body">
                <p class="card-text">${data.body}</p>
                <div class="card-footer text-muted">From: ${data.sender.username}</div>
                </div>
                </div>
                `

            })
            $('#target').append(card + `</div>`);

        }
        else {
            alert("Whoops! There was a problem! " + response.error);
        }
    });
};

const renderMyKudos = function (event) {
    event.preventDefault();
    $('#target').empty();
    $.ajax({
        url: `/api/user/kudo/${activeUser._id}`,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        if (!response.error) {
            let KudosReceived = `<div id="accordion">
        <div class="card">
          <div class="card-header" id="KudosReceived">
            <h5 class="mb-0">
              <button class="btn btn-link" data-toggle="collapse" data-target="#KudosReceivedCollapse" aria-expanded="true" aria-controls="KudosReceivedCollapse">
                Kudos Received
              </button>
            </h5>
          </div>
      
          <div id="KudosReceivedCollapse" class="collapse show" aria-labelledby="KudosReceived" data-parent="#accordion">
            <div class="row card-body">`
            $.each(response, function (index, data) {
                KudosReceived += `<div class="card col-4">
                <div class="card-header"><button type="button" class="close" value="${data._id}" aria-label="Delete">
                <span aria-hidden="true">&times;</span>
            </button>
                <h5 class="card-title">${data.title}</h5>
                <h6 class="card-subtitle text-muted">To: ${data.recipient.username}</h6>
                </div>
                <div class="card-body">
                <p class="card-text">${data.body}</p>
                <div class="card-footer text-muted">From: ${data.sender.username}</div>
                </div>
                </div>
                `
            })
            KudosReceived += `</div></div>`
            $('#target').append(KudosReceived);
            let KudosSent = `<div class="card">
    <div class="card-header" id="KudosSent">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#KudosSentCollapse" aria-expanded="false" aria-controls="KudosSentCollapse">
          Kudos Sent
        </button>
      </h5>
    </div>
    <div id="KudosSentCollapse" class="collapse" aria-labelledby="KudosSent" data-parent="#accordion">
      <div class="row card-body">`
            $.each(activeUser.kudos, function (index, data) {
                KudosSent += `<div class="card col-4">
        <div class="card-header"><button type="button" class="close" value="${data._id}" aria-label="Delete">
        <span aria-hidden="true">&times;</span>
    </button>
        <h5 class="card-title">${data.title}</h5>
        <h6 class="card-subtitle text-muted">To: ${data.recipient.username}</h6>
        </div>
        <div class="card-body">
        <p class="card-text">${data.body}</p>
        <div class="card-footer text-muted">From: ${data.sender.username}</div>
        </div>
        </div>
        `
            })
            KudosSent += `</div>
    </div>
  </div>`
            $('#target').append(KudosSent);
        }
        else {
            alert("Whoops! There was a problem! " + response.error);
        }
    });
}

const renderUserDropdown = function () {
    $('#recipient-name').empty();
    $.ajax({
        url: '/api/user',
        method: "GET"
    }).then(function (response) {
        let newOption = '';
        $.each(response, function (index, data) {
            newOption += `< option value = ${data._id}> ${data.username}</option > `
        })
        $('#recipient-name').append(newOption);
    })
}

const openNewKudoForm = function (event) {
    event.preventDefault();
    renderUserDropdown();
}

const newKudo = function (event) {
    event.preventDefault();
    let newKudo = {
        title: $('#message-title').val().trim(),
        body: $('#message-body').val().trim(),
        sender: activeUser._id,
        recipient: $('#recipient-name').val()
    }
    console.log(newKudo);
    $.ajax({
        url: `/ api / kudo`,
        method: "POST",
        data: newKudo
    }).then(function (response) {
        // console.log(response);
        if (!response.error) {
            let kudoArray = [{}];
            $.each(activeUser.kudos, function (index, kudo) {
                kudoArray.push(kudo._id);
            })
            kudoArray.push(response._id);
            let newUser = {
                username: activeUser.username,
                password: activeUser.password,
                kudos: kudoArray
            }
            $.ajax({
                url: `/ api / user / ${activeUser._id} `,
                method: "PUT",
                data: newUser
            }).then(function (response) {
                console.log(response);
                if (!response.error) {
                    renderKudos();
                }
            })
        }
    })

}



const login = function (event) {
    event.preventDefault();
    let userInfo = {
        username: $('#usernameInput').val().trim(),
        password: $('#passwordInput').val().trim()
    }
    $.ajax({
        url: '/api/user',
        method: "GET"
    }).then(function (response) {
        let found = false;
        if (!response.error) {
            $.each(response, function (index, data) {
                if (userInfo.username === data.username && userInfo.password === data.password) {
                    found = true;
                    $('#SeeMyKudosButton').removeClass('hide');
                    $('#PostANewKudoButton').removeClass('hide');
                    $('#logoutButton').removeClass('hide');
                    $('#usernameInput').css('display', 'none');
                    $('#passwordInput').css('display', 'none');
                    $('#loginButton').addClass('hide');
                    $('#registerButton').addClass('hide');
                    activeUser._id = data._id;
                    activeUser.username = data.username;
                    activeUser.password = data.password;
                    activeUser.kudos = data.kudos;
                    console.log(activeUser);
                }
            })
            if (!found) {
                alert("Username/Password combination does not exist");
                $('#usernameInput').val('').focus();
                $('#passwordInput').val('');
            }
        }
        else {
            alert("Whoops! There was a problem! " + response.error);
        }
    })
}

const logout = function (event) {
    event.preventDefault();
    activeUser._id = '';
    activeUser.username = '';
    activeUser.password = '';
    $('#SeeMyKudosButton').addClass('hide');
    $('#PostANewKudoButton').addClass('hide');
    $('#logoutButton').addClass('hide');
    $('#usernameInput').css('display', 'inline-block');
    $('#passwordInput').css('display', 'inline-block');
    $('#loginButton').removeClass('hide');
    $('#registerButton').removeClass('hide');
    $('#usernameInput').val('').focus();
    $('#passwordInput').val('');
    renderKudos;
}


$(document).ready(
    renderKudos
)

$('#loginButton').on('click', login);
$('#logoutButton').on('click', logout);
$('#brand').on('click', renderKudos);
$('#SeeAllKudosButton').on('click', renderKudos);
$('#SeeMyKudosButton').on('click', renderMyKudos);
$('#PostANewKudoButton').on('click', openNewKudoForm);
$('#send-kudo').on('click', newKudo);