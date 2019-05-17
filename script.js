const apiKey = 'Sm4Y8pZ3YnZNN5CjYwzPKo0d2M8pJsomPaeA3gIG';
const searchURL = 'developer.nps.gov/api/v1/parks?statecode=';


function formatInput(states, max) {
    const statesArr = states.replace(/\s/g, '').split(",")

}

function watchForm() {
    $('form').submit(function(event) {
        const states = $('#states-input').val();
        const resultsMax = $('#resultsMax-input').val();
        $('form').trigger('reset');

    });
}

$(watchForm());