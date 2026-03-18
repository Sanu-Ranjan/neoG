const { initializeDb } = require("./db/db.connect");
const { Hotel } = require("./models/hotel.models");

// 1. Delete by ID
const deleteHotelById = async (id) => {
  try {
    const deleted = await Hotel.findByIdAndDelete(id);
    console.log("Deleted Hotel (by ID):", deleted);
  } catch (error) {
    console.log("Error deleting hotel by ID:", error);
  }
};

// 2. Delete by Phone Number
const deleteHotelByPhoneNumber = async (phoneNumber) => {
  try {
    const deleted = await Hotel.findOneAndDelete({ phoneNumber });
    console.log("Deleted Hotel (by Phone):", deleted);
  } catch (error) {
    console.log("Error deleting hotel by phone:", error);
  }
};

(async () => {
  await initializeDb();

  // provide id from db : 69b8dcc376dd1da439352311
  await deleteHotelById("69b8dcc376dd1da439352311");

  // provide phone number of sunset resort
  await deleteHotelByPhoneNumber("+1299655890");
})();
