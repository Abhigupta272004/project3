function convert() {
    var fromCurrency = document.getElementById("fromCurrency").value;
    var toCurrency = document.getElementById("toCurrency").value;
    var amount = document.getElementById("amount").value;
    var resultElement = document.getElementById("result");
    var errorMessageElement = document.getElementById("errorMessage");

    var apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch exchange rates');
            }
            return response.json();
        })
        .then(data => {

            var exchangeRate = data.rates[toCurrency];
            if (!exchangeRate) {
                throw new Error('Invalid currency selected');
            }
            var convertedAmount = (amount * exchangeRate).toFixed(2);

            // Display the result
            resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            errorMessageElement.textContent = '';
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            resultElement.textContent = '';
            errorMessageElement.textContent = 'Error converting currencies. Please try again.';
        });
}