## for test
hotel.controller.js 
see this file hotel.controller.js 
const createHotelData = async (req, res) => {
  try {


    const {
      hotelName,
      location,
      address,
      contactNumber,
      description,
      checkinTime,
      checkoutTime,
      pricePerNight,
      availableRoomsCount,
      amenities,
      hotelType,
      rating,
    } = req.body;


    const hotelData = {
      hotelName,
      location,
      address,
      contactNumber,
      description,
      checkinTime,
      checkoutTime,
      pricePerNight,
      availableRoomsCount,
      amenities,
      hotelType,
      rating,
    };


    const newHotel = new Hotel(hotelData);
    const savedHotel = await newHotel.save();


    return res
      .status(201)
      .json({ message: "Hotel Data created successfully", savedHotel });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
hotel.router.js file
//? endpoint : http://localhost:5001/api/v1/hotel/hotel-data
router.post("/hotel-data", createHotelData);

app.js file 
app.use("/api/v1/hotel", hotelRouter);
now i want to write test using jest and supertest as simple as test file 