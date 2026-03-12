from pydantic import BaseModel, model_validator

addresses: dict[str, str] = {
    "Eastmoor": "101-151 Eastmoor Ave, Daly City",
    "Willow Street": "46 Willow St, Redwood City",
    "San Bruno Ave": "35 San Bruno Ave, Brisbane",
    "Bay Road": "1640 and 1660-1670 Bay Rd, East Palo Alto",
    "Mowry Ave": "5970 Mowry Ave, Newark",
    "North Amphlett Boulevard": "747-753 N Amphlett Blvd, San Mateo",
    "El Camino Real": "840 El Camino Real, Belmont",
    "Hillcrest Boulevard": "5 Hillcrest Blvd, Millbrae",
    "Gellert Boulevard": "345 Gellert Blvd, Daly City",
    "San Mateo Ave": "591 San Mateo Ave, San Bruno",
}

images: dict[str, str] = {
    "Eastmoor": "https://ssl.cdn-redfin.com/photo/9/mbpaddedwide/253/genMid.422701253_2.jpg",
    "Willow Street": "https://images1.apartments.com/i2/X-OfxdjmybxwxE2uF4e5VG6MLUIiWsUawd56NbTaPdo/111/46-willow-st-redwood-city-ca-foto-principal.jpg",
    "San Bruno Ave": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=MTN0bGuWzbLT2mokYR1GeQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=78.938286&pitch=0&thumbfov=100",
    "Bay Road": "https://maps.googleapis.com/maps/api/streetview?location=1660+Bay+Rd%2C+Palo+Alto%2C+CA+94303&size=1536x1152&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&source=outdoor&&signature=3fnffVvnm4bSs9cl7n6aW4LJess=",
    "Mowry Ave": "https://images1.loopnet.com/i2/uLoNqi-aXD4ZT49zct1iAgzSRlqpMcPMqzAfS5Tv_M8/112/5970-Mowry-Ave-Newark-CA-Primary-Photo-1-HighDefinition.jpg",
    "North Amphlett Boulevard": "https://maps.googleapis.com/maps/api/streetview?location=753+N+Amphlett+Blvd%2C+San+Mateo%2C+CA+94401&size=1536x1152&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&source=outdoor&&signature=OV3da4Ooecd9EbYzbUeQuO_ZC10=",
    "El Camino Real": "https://ssl.cdn-redfin.com/photo/8/bigphoto/237/ML81911237_A.jpg",
    "Hillcrest Boulevard": "",
    "Gellert Boulevard": "https://images1.loopnet.com/i2/Evx-r0Cm6EoSvcjTxX6aYQeA2q4rNRJ0JY18JWGUF4g/112/345-Gellert-Blvd-Daly-City-CA-Primary-Photo-1-HighDefinition.jpg",
    "San Mateo Ave": "https://maps.googleapis.com/maps/api/streetview?location=591%20San%20Mateo%20Ave%2C%20San%20Bruno%2C%20CA%2094066&size=960x720&client=gme-movotoinc&signature=62AdCe904ZkbJrUrhBsIUSt8QO4=",
    "More not listed, please call for details": ""
}

class Property(BaseModel):
    name: str
    address: str = ""
    city: str = ""
    image: str = ""
    price: float

    @model_validator(mode="after")
    def set_address_and_city_from_name(self):
        if self.name in addresses:
            self.address = addresses[self.name]
            self.city = addresses[self.name].split(", ")[-1]
            self.image = images[self.name]
        return self
