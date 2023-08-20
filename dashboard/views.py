from django.shortcuts import render
from django.http import HttpResponse
import requests


def dashboard(request):

# Replace placeholders in the URL to get the full API URL
    api = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=BRL'
    
    # Make a GET request to the API and retrieve the JSON response
    data_base = requests.get(api).json()
    
    # Extract relevant data from the JSON
    data_base = data_base['RAW']['BTC']
    price = data_base['BRL']['PRICE']
    price = '{:,.2f}'.format(price).replace(',', 'x').replace('.',',').replace('x','.')
    # Return a tuple with the formatted price and time

    return render(request, 'home.html', {'bitcoin': price})