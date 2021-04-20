from onemapsg import OneMapClient
import json

with open("token.json") as f: # currently, token is being hardcoded for authorisation 
    token_details = json.load(f)
token, expiry = token_details['access_token'], token_details['expiry_timestamp']

# get credentials
with open("credentials.json") as f:
    credentials = json.load(f)
email, password = credentials['email'], credentials['password']

# authorise user
Client = OneMapClient(email, password)
Client.token = token

# obtain coordinates from postal code. not 100% accurate but relatively accurate 
def get_coordinate(postal_code):
    data = Client.search(postal_code)
    coordinates = data['results'][0]
    latitude, longitude = coordinates['LATITUDE'], coordinates['LONGITUDE']
    return latitude, longitude

def calculate_time(start, end):
    # get coordinates of start and end location
    start_coordinates = get_coordinate(start)
    end_coordinates = get_coordinate(end)

    # get travelling information
    travel_data = Client.get_public_transport_route(start_coordinates, end_coordinates, date="2021-03-31", time="12:00:00", mode="TRANSIT")
    # print(travel_data)

    # obtain durations 
    durations = []
    for itinerary in travel_data['plan']['itineraries']:
        durations.append(itinerary['duration'])

    # take average of the 3 given routes and return average in minutes 
    average_time_seconds = sum(durations)/3
    travel_time_minutes = average_time_seconds / 60
    return travel_time_minutes
