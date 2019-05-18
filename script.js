//EXAMPLE REQUEST: "https://developer.nps.gov/api/v1/parks?stateCode=nv%2Cor%2Cny&limit=10&api_key=Sm4Y8pZ3YnZNN5CjYwzPKo0d2M8pJsomPaeA3gIG"

const apiKey = 'Sm4Y8pZ3YnZNN5CjYwzPKo0d2M8pJsomPaeA3gIG';
const searchURL = 'https://developer.nps.gov/api/v1/parks?';

function formatData(data) {
    console.log(data);
    $('.results').empty();
    console.log(data.data.length);
    for (i = 0; i < data.limit; i++) {
        $('.results').append(`<h2>Park Name: ${data["data"][i]["fullName"]}</h2>
        <p>Description: ${data["data"][i]["description"]}</p>
        <p>Link: <a href="${data["data"][i]["url"]}" target="_blank">${data["data"][i]["url"]}</a></p>`)
    };
}

function callAPI(url) {
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => formatData(responseJson))
    .catch(err => $('.error').text(`Something went wrong: ${err.message}`));
}


function formatInput(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    console.log(queryItems.join("&"));

    return queryItems.join("&");
}

function getParkData(states, max) {
    const params = {
        stateCode: states.replace(/\s/g, ''),
        limit: max,
        api_key: apiKey
    };
    console.log(params);
    const queryString = formatInput(params);
    const url = searchURL + queryString;
    console.log(url);
    callAPI(url);
}

function watchForm() {
    $('form').submit(function(event) {
        event.preventDefault();
        let states = $('#states-input').val();
        const resultsMax = $('#resultsMax-input').val();
        console.log(states, resultsMax);
        $('form').trigger('reset');
        getParkData(states, resultsMax);
    });
}

$(watchForm());