from ast import literal_eval as make_tuple
import pandas as pd
from geopy.distance import geodesic
from geopy.geocoders import Nominatim
import os
import requests
import folium

class Meter_Map():
    def __init__(self, address="523 W 7th St. Los Angeles, CA 90017"):
        self.address = address
        geolocator = Nominatim()
        self.location = geolocator.geocode(self.address)
        path = os.getcwd()

        self.df_inventory = pd.read_csv(path+'/Parking_Meter_Inventory.csv')
        self.df_inventory['LatLng'] = self.df_inventory['LatLng'].apply(make_tuple)
        # print(self.df_inventory.head())
        self.df_inventory = self.df_inventory.dropna(axis=0, subset=['LatLng'])
        self.df_inventory = self.df_inventory.rename(columns={'SpaceID': 'spaceid'})
        self.get_occupancy()
        self.output_df = pd.merge(self.df_occ, self.df_inventory, on='spaceid', how='inner')
        self.filter_by_location(self.address)
        self.render()

        pass

    def get_occupancy(self):
        occupid_api = 'https://data.lacity.org/resource/e7h6-4a3e.json'
        occupid_data = requests.get(occupid_api).json()
        self.df_occ = pd.DataFrame(occupid_data)

        pass

    def render(self):
        self.m = folium.Map(location=[self.location.latitude, self.location.longitude], zoom_start=16)
        for index, row in self.display_df.iterrows():
            folium.Marker((row['LatLng'][0], row['LatLng'][1])).add_to(self.m)
        return self.m

    def set_address(self, address):
        geolocator = Nominatim()
        self.location = geolocator.geocode(address)

    def filter_by_location(self, address=""):
        self.set_address(address)
        loc = (self.location.latitude, self.location.longitude)
        distance = []
        for index, row in self.output_df.iterrows():
            dist = geodesic(row['LatLng'], loc).miles
            distance.append(dist)

        self.output_df['distance'] = distance
        location_filter = self.output_df['distance'] < .5
        vacant_filter = self.output_df['occupancystate'] == 'VACANT'
        self.display_df = self.output_df[location_filter][vacant_filter]
        return self.display_df