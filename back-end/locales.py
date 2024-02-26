import json
from pydantic import TypeAdapter
from models import Locale

adapter = TypeAdapter(list[Locale])
with open("locales.json") as f:
    locales = sorted(adapter.validate_python(json.load(f)), key=lambda x: x.country)
