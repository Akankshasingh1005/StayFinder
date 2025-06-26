import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";


export const addListing = async (req, res) => {
  try {
    const host = req.userId;
    const { title, description, rent, city, landmark, category } = req.body;

    if (
      !req.files?.image1 ||
      !req.files?.image2 ||
      !req.files?.image3
    ) {
      return res.status(400).json({ message: "All three images are required" });
    }

    const image1 = await uploadOnCloudinary(req.files.image1[0].path);
    const image2 = await uploadOnCloudinary(req.files.image2[0].path);
    const image3 = await uploadOnCloudinary(req.files.image3[0].path);

    const listing = await Listing.create({
      title,
      description,
      rent,
      city,
      landmark,
      category,
      image1,
      image2,
      image3,
      host
    });

    const user = await User.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(201).json(listing);

  } catch (error) {
    console.error("AddListing error:", error);
    return res.status(500).json({ message: "Something went wrong on the server" });
  }
};


export const getListing = async (req,res) => {
  try {
    let listing = await Listing.find().sort({createdAt:-1})
    return res.status(200).json(listing)
  } catch (error) {
    return res.status(500).json({ message: `Get listing error ${error}`});
    
  }
  }

export const findListing = async (req, res) => {
  try {
    let {id} = req.params
    let listing = await Listing.findById(id)
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    return res.status(200).json(listing);
    } catch (error) {
     return res.status(500).json({ message: `Findlisting error ${error}`});
    
  }
  
}

export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, rent, city, landmark, category } = req.body;

  
    const updateData = {
      title,
      description,
      rent,
      city,
      landmark,
      category
    };

  
    if (req.files?.image1) {
      const image1 = await uploadOnCloudinary(req.files.image1[0].path);
      updateData.image1 = image1;
    }
    if (req.files?.image2) {
      const image2 = await uploadOnCloudinary(req.files.image2[0].path);
      updateData.image2 = image2;
    }
    if (req.files?.image3) {
      const image3 = await uploadOnCloudinary(req.files.image3[0].path);
      updateData.image3 = image3;
    }

    const listing = await Listing.findByIdAndUpdate(id, updateData, { new: true });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    return res.status(200).json(listing);
  } catch (error) {
    console.error("UpdateListing error:", error);
    return res.status(500).json({ message: "UpdateListing error" });
  }
};

export const deleteListing = async (req, res) => {
  try {
    let {id} = req.params
    let listing = await Listing.findByIdAndDelete(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    let user = await User.findByIdAndUpdate(listing.host, {
      $pull: { listing: listing._id }
    }, { new: true });

    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    return res.status(200).json({message:"Listing Deleted"})
  } catch (error) {
    return res.status(500).json({message:`Delete Listing Error ${error}`})
  }
}

export const getFilteredListings = async (req, res) => {
  try {
    const { search } = req.query;

    const cleanedSearch = search?.replace(/\s+/g, "") || "";

    const query = cleanedSearch
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { city: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
            { landmark: { $regex: search, $options: "i" }  },
          ],
        }
      : {};

    const listings = await Listing.find(query);
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings", error });
  }
};

