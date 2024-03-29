from django.http import JsonResponse
import os
import pickle

# Determine the base directory of the Django project
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Define the path to the RandomForest.pkl file within the static folder
MODEL_FILE_PATH = os.path.join(BASE_DIR, 'static', 'RandomForest.pkl')

# Load the trained model from the pickle file
with open(MODEL_FILE_PATH, "rb") as file:
    classifier = pickle.load(file)

def make_prediction(Temperature, Humidity, Moisture, pH, Nitrogen, Potassium, Phosphorous, Soil_Num, Crop_Num):
    features = [[Temperature, Humidity, Moisture, pH, Nitrogen, Potassium, Phosphorous, Soil_Num, Crop_Num]]
    prediction = classifier.predict(features)
    return prediction[0]

def get_fertilizer_recommendation(request):
    if request.method == 'POST':
        # Get data from the request
        Temperature = request.POST.get('Temperature')
        Humidity = request.POST.get('Humidity')
        Moisture = request.POST.get('Moisture')
        pH = request.POST.get('pH')
        Nitrogen = request.POST.get('NitrogenLevel')
        Potassium = request.POST.get('PotassiumLevel')
        Phosphorous = request.POST.get('PhosphorusLevel')
        Soil_Num = request.POST.get('Soil_Num')
        Crop_Num = request.POST.get('Crop_Num')

        print("Temperature:", Temperature)
        print("Humidity:", Humidity)
        print("Moisture:", Moisture)
        print("pH:", pH)
        print("Nitrogen:", Nitrogen)
        print("Potassium:", Potassium)
        print("Phosphorous:", Phosphorous)
        print("Soil_Num:", Soil_Num)
        print("Crop_Num:", Crop_Num)       

        # Make prediction
        prediction = make_prediction(Temperature, Humidity, Moisture, pH, Nitrogen, Potassium, Phosphorous, Soil_Num, Crop_Num)

        # Return prediction as JSON response
        return JsonResponse({'prediction': prediction})
    elif request.method == 'GET':
        # Handle GET request
        return JsonResponse({'error': 'Method not allowed'}, status=405)
