from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import supabase
from models import Property, addresses, images

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://nationhome.netlify.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Nation Home Realty"}

@app.get("/parentproperties")
async def getParentProperties():
    return [
        {"name": name, "address": address, "image": images.get(name, "")}
        for name, address in addresses.items()
    ]

@app.get("/allproperties")
async def getAllProperties():
    response = (
        supabase.table("all_properties")
        .select("*")
        .execute()
    )
    if not response.data:
        return {"message": "No properties found please call"}
    properties = [Property(**row).model_dump() for row in response.data]
    return properties

@app.post("/allproperties")
async def addNewProperty(body: Property):
    response = (
        supabase.table("all_properties")
        .insert({"name": body.name, "address": body.address, "city": body.city, "image": body.image, "price": body.price})
        .execute()
    )
    return response

@app.put("/allproperties/{name}")
async def updateProperty(name: str, body: Property):
    existing = (
        supabase.from_("all_properties")
        .select("id")
        .ilike("name", name)
        .execute()
    )

    if not existing.data:
        raise HTTPException(status_code=404, detail="Not found")

    property_id = existing.data[0]["id"]

    response = (
        supabase.table("all_properties")
        .update({"name": body.name, "address": body.address, "city": body.city, "price": body.price})
        .eq("id", property_id)
        .execute()
    )
    return response

@app.delete("/allproperties/{name}")
async def deleteProperty(name: str):
    existing = (
        supabase.from_("all_properties")
        .select("id")
        .ilike("name", name)
        .execute()
    )

    if not existing.data:
        raise HTTPException(status_code=404, detail="Not found")

    property_id = existing.data[0]["id"]

    response = (
        supabase.table("all_properties")
        .delete()
        .eq("id", property_id)
        .execute()
    )
    return response
