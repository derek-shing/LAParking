from app import app
from flask import render_template
import folium
from folium import plugins
import requests
import pandas as pd
from ast import literal_eval as make_tuple
import os

path =os.getcwd()




x = 34.057219
y = -118.268751
m = folium.Map(location=[x, y])
final_df = pd.read_csv(path+'/Parking_Meter_Inventory.csv')
final_df = final_df.dropna(axis=0, subset=['LatLng'])

final_df['LatLng'] = final_df['LatLng'].apply(make_tuple)
test_df = final_df.head(20)

@app.route('/')
@app.route('/index')
def index():
    global m
    for point in test_df['LatLng']:
        folium.Marker(point).add_to(m)
    #return render_template('index.html', title="LA Parking Space", content=m)
    return m.get_root().render()