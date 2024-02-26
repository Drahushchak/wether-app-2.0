# WEATHER APP 2.0

## Requirements
- Python 3.11 or higher
- Poetry
- npm
- postgreSQL (should have no password)

## Running the app
1. Create database called `weather`
2. Clone the repository
3. Go to backend folder and run `poetry install`
4. Run `poetry run python database.py` to create the tables
5. Run `poetry run python fixtures.py` to populate the tables
6. Run `poetry run uvicorn main:app --reload` to start the backend
7. Go to frontend folder and run `npm install`
8. Run `npm run dev` to start the frontend
