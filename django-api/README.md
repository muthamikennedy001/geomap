# Django React Integration

Workflow Overview:
User fills out the form in the React frontend with the input data (Temperature, Humidity, Moisture, etc.).

When the user submits the form, a POST request is sent to the Django backend.

The Django backend receives the input data and uses the predict.py script to make a fertilizer recommendation based on the input data.

The backend sends the recommendation back to the frontend as a response to the POST request.

The React frontend displays the fertilizer recommendation to the user.

Yes
changed

pip install -r requirements.txt
npm install