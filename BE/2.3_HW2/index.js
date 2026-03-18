const { initializeDb } = require("./db/db.connect");
const { Hotel } = require("./models/hotel.models");

// 1. Update by ID
const updateHotelById = async (id, newData) => {
  try {
    const data = await Hotel.findByIdAndUpdate(id, newData, {
      returnDocument: "after",
    });
    console.log("Updated Hotel (by ID):", data);
  } catch (error) {
    console.log("Error updating hotel by ID:", error);
  }
};

// 2. Update by Name
const updateHotelByName = async (name, newData) => {
  try {
    const data = await Hotel.findOneAndUpdate({ name }, newData, {
      returnDocument: "after",
    });
    console.log("Updated Hotel (by Name):", data);
  } catch (error) {
    console.log("Error updating hotel by name:", error);
  }
};

// 3. Update by Phone Number
const updateHotelByPhone = async (phoneNumber, newData) => {
  try {
    const data = await Hotel.findOneAndUpdate({ phoneNumber }, newData, {
      returnDocument: "after",
    });
    console.log("Updated Hotel (by Phone):", data);
  } catch (error) {
    console.log("Error updating hotel by phone:", error);
  }
};

(async () => {
  await initializeDb();

  // 1. Update Lake View checkout time (use actual _id)
  await updateHotelById("69b94494eaf632ce6a0c22d3", {
    checkOutTime: "11 AM",
  });

  // 2. Update Sunset Resort rating
  await updateHotelByName("Sunset Resort", {
    rating: 4.2,
  });

  // 3. Update phone number
  await updateHotelByPhone("+1299655890", {
    phoneNumber: "+1997687392",
  });
})();
