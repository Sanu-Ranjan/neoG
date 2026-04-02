import { useState } from "react";
import { useForm } from "react-hook-form";
import useFetch from "./useFetch";

const CATEGORY_OPTIONS = [
  "Budget",
  "Mid-Range",
  "Luxury",
  "Boutique",
  "Resort",
  "Other",
];
const PRICE_RANGE_OPTIONS = [
  "$$ (11-30)",
  "$$$ (31-60)",
  "$$$$ (61+)",
  "Other",
];

const AddHotelForm = ({ onHotelAdded }) => {
  const hotelApi = import.meta.env.VITE_HOTEL_API;
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      reservationsNeeded: false,
      isParkingAvailable: false,
      isWifiAvailable: false,
      isPoolAvailable: false,
      isSpaAvailable: false,
      isRestaurantAvailable: false,
    },
  });

  const onSubmit = async (formData) => {
    setError(null);

    const payload = {
      ...formData,
      category: formData.category ? [formData.category] : [],
      amenities: formData.amenities
        ? formData.amenities.split(",").map((a) => a.trim())
        : [],
      photos: formData.photos
        ? formData.photos.split(",").map((p) => p.trim())
        : [],
      rating: formData.rating ? Number(formData.rating) : undefined,
    };

    try {
      const res = await fetch(`${hotelApi}/hotels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.success) {
        onHotelAdded(json.data.data);
        reset();
      } else {
        setError(json.message || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add a Hotel</h2>

      <div>
        <label>Name</label>
        <input {...register("name", { required: "Name is required" })} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <br />

      <div>
        <label>Category</label>
        <select {...register("category", { required: "Category is required" })}>
          <option value="">-- Select Category --</option>
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.category && <p>{errors.category.message}</p>}
      </div>
      <br />

      <div>
        <label>Location</label>
        <input
          {...register("location", { required: "Location is required" })}
        />
        {errors.location && <p>{errors.location.message}</p>}
      </div>
      <br />

      <div>
        <label>Rating (optional, 0 - 5)</label>
        <input
          type="number"
          step="0.1"
          {...register("rating", {
            min: { value: 0, message: "Rating must be at least 0" },
            max: { value: 5, message: "Rating must be at most 5" },
          })}
        />
        {errors.rating && <p>{errors.rating.message}</p>}
      </div>
      <br />

      <div>
        <label>Website (optional)</label>
        <input {...register("website")} />
      </div>
      <br />

      <div>
        <label>Phone Number</label>
        <input
          {...register("phoneNumber", { required: "Phone number is required" })}
        />
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
      </div>
      <br />

      <div>
        <label>Check-In Time</label>
        <input
          {...register("checkInTime", {
            required: "Check-in time is required",
          })}
        />
        {errors.checkInTime && <p>{errors.checkInTime.message}</p>}
      </div>
      <br />

      <div>
        <label>Check-Out Time</label>
        <input
          {...register("checkOutTime", {
            required: "Check-out time is required",
          })}
        />
        {errors.checkOutTime && <p>{errors.checkOutTime.message}</p>}
      </div>
      <br />

      <div>
        <label>Amenities (optional, comma separated e.g. Pool, Gym)</label>
        <input {...register("amenities")} />
      </div>
      <br />

      <div>
        <label>Price Range (optional)</label>
        <select {...register("priceRange")}>
          <option value="">-- Select Price Range --</option>
          {PRICE_RANGE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <br />

      <div>
        <label>
          <input type="checkbox" {...register("reservationsNeeded")} />{" "}
          Reservations Needed
        </label>
      </div>
      <br />

      <div>
        <label>
          <input type="checkbox" {...register("isParkingAvailable")} /> Parking
          Available
        </label>
      </div>
      <br />

      <div>
        <label>
          <input type="checkbox" {...register("isWifiAvailable")} /> WiFi
          Available
        </label>
      </div>
      <br />

      <div>
        <label>
          <input type="checkbox" {...register("isPoolAvailable")} /> Pool
          Available
        </label>
      </div>
      <br />

      <div>
        <label>
          <input type="checkbox" {...register("isSpaAvailable")} /> Spa
          Available
        </label>
      </div>
      <br />

      <div>
        <label>
          <input type="checkbox" {...register("isRestaurantAvailable")} />{" "}
          Restaurant Available
        </label>
      </div>
      <br />

      <div>
        <label>Photos (optional, comma separated URLs)</label>
        <input {...register("photos")} />
      </div>
      <br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Hotel"}
      </button>
    </form>
  );
};

const HotelList = ({ hotels }) => {
  if (!hotels?.length) return <p>No hotels found</p>;
  return (
    <>
      <h2>All Hotels</h2>
      <ul>
        {hotels.map(({ _id, name }) => (
          <li key={_id}>{name}</li>
        ))}
      </ul>
    </>
  );
};

function App() {
  const hotelApi = import.meta.env.VITE_HOTEL_API;
  const [addedHotel, setAddedHotel] = useState(null);
  const { data, error, loading } = useFetch(`${hotelApi}/hotels`);

  return (
    <>
      <h1>Hotels</h1>
      <AddHotelForm onHotelAdded={setAddedHotel} />
      {addedHotel && (
        <p style={{ color: "green" }}>
          ✅ "{addedHotel.name}" added successfully!
        </p>
      )}
      <hr />
      {loading ? (
        <p>Loading hotels...</p>
      ) : error ? (
        <p>Error loading hotels</p>
      ) : (
        <HotelList hotels={data?.data?.data} />
      )}
    </>
  );
}

export default App;
