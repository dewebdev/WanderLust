const sampleListings = [
  {
    title: "Beachfront Paradise in Mangalore",
    description:
      "Experience the serene beauty of coastal Karnataka with this beachfront property in Mangalore. Perfect for a peaceful getaway.",
    image: {
      url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.booking.com%2Fhotel%2Fin%2Fsaffronstays-ocean-pearl.html&psig=AOvVaw3RKERT66OboNtKA1rKhu0k&ust=1721131056965000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDl-_3-qIcDFQAAAAAdAAAAABAE",
      filename: "beachfront-paradise-mangalore.jpg",
    },
    price: 1500000,
    location: "Mangalore",
    country: "India",
    review: [],
    geometry: {type: "Point", coordinates: [74.856, 12.9141]},
    __v: 0,
  },
  {
    title: "Seaside Villa in Udupi",
    description:
      "Enjoy the tranquility of Udupi in this luxurious seaside villa. Perfect for a relaxing retreat.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4aCCb4rICsNbmOJoFqnc6Oorvnpd_izOleg&s",
      filename: "seaside-villa-udupi.jpg",
    },
    price: 2500000,
    location: "Udupi",
    country: "India",
    review: [],
    geometry: {type: "Point", coordinates: [74.7421, 13.3409]},
    __v: 0,
  },
  {
    title: "Coastal Bungalow in Kundapura",
    description:
      "Stay at this beautiful bungalow in Kundapura, offering stunning coastal views and a serene environment.",
    image: {
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/293899396.jpg?k=221cabe5e5f4fc673821250e48659f209e93403cdecb69279f064a2c8c2f5932&o=&hp=1",
      filename: "coastal-bungalow-kundapura.jpg",
    },
    price: 1800000,
    location: "Kundapura",
    country: "India",
    review: [],
    geometry: {type: "Point", coordinates: [74.6897, 13.6209]},
    __v: 0,
  },
  {
    title: "Lakeview Cottage in Kateel",
    description:
      "This charming cottage in Kateel offers stunning views of the lake and is perfect for a peaceful retreat.",
    image: {
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/497911405.jpg?k=3518f79abba7642e2f4dbbf1c81cec99ff31dc0cac45f5aa8010c791a9d5bbeb&o=&hp=1",
      filename: "lakeview-cottage-kateel.jpg",
    },
    price: 1200000,
    location: "Kateel, Mangalore",
    country: "India",
    review: [],
    geometry: {type: "Point", coordinates: [74.8811, 12.9562]},
    __v: 0,
  },
  {
    title: "Seaside Cottage in Malpe",
    description:
      "Relax in this beautiful seaside cottage in Malpe, just steps away from the beach.",
    image: {
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/59524738.jpg?k=aa1fde6501657ba993b634ccb00d3794178cf285b9f279293145970afdf30cca&o=&hp=1",
      filename: "seaside-cottage-malpe.jpg",
    },
    price: 2000000,
    location: "Malpe, Udupi",
    country: "India",
    review: [],
    geometry: {type: "Point", coordinates: [74.7028, 13.3476]},
    __v: 0,
  },
  {
    title: "Oceanfront Villa in Karwar",
    description:
      "Enjoy the ocean views from this luxurious villa in Karwar, perfect for a peaceful retreat.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk_yau21zdpfkdmaC2wK31rg9VT11Axi2h1g&s",
      filename: "oceanfront-villa-karwar.jpg",
    },
    price: 3000000,
    location: "Karwar",
    country: "India",
    review: [],
    geometry: {type: "Point", coordinates: [74.124, 14.805]},
    __v: 0,
  },
  {
    title: "Beach House in Gokarna",
    description:
      "Experience the beauty of Gokarna from this stunning beach house, just a short walk from the shore.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfkac4LuuTJZUn5W_gSHWLhibdTeAW386jzg&s",
      filename: "beach-house-gokarna.jpg",
    },
    price: 2200000,
    location: "Gokarna",
    country: "India",
    review: [],
    geometry: {type: "Point", coordinates: [74.3142, 14.5464]},
    __v: 0,
  },
  {
    title: "Luxury Beachfront Villa in Alibaug",
    description:
      "This luxurious beachfront villa in Alibaug offers stunning views and a serene environment for a relaxing getaway.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhU7aFBa82oN7Ud2DgGGvXYHaG1TM3Vj3bw&s",
      filename: "luxury-beachfront-villa-alibaug.jpg",
    },
    price: 4500000,
    location: "Alibaug",
    country: "India",
    review: [],
    geometry: {type: "Point", coordinates: [72.8724, 18.6425]},
    __v: 0,
  },
  {
    title: "Seafront Villa in Dapoli",
    description:
      "Relax in this seafront villa in Dapoli, offering stunning views and a peaceful environment.",
    image: {
      url: "https://ik.imagekit.io/5tgxhsqev/saffronstays-media/tr:w-800,h-460,q-62,f-webp/image/upload/xiahqaxpbctni1ta61pv",
      filename: "seafront-villa-dapoli.jpg",
    },
    price: 2800000,
    location: "Dapoli",
    country: "India",
    review: [],
    geometry: {type: "Point", coordinates: [73.1833, 17.7687]},
    __v: 0,
  },
  {
    title: "Beachfront Cottage in Murud",
    description:
      "Stay at this charming beachfront cottage in Murud, perfect for a relaxing beach holiday.",
    image: {
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/241484370.jpg?k=7c71d26dc581a784983e05372f22a31f71bc4b2181ac76c8dcf2195f1df208f0&o=&hp=1",
      filename: "beachfront-cottage-murud.jpg",
    },
    price: 1700000,
    location: "Murud, Maharashtra",
    country: "India",
    review: [],
    geometry: {type: "Point", coordinates: [73.1134, 18.3241]},
    __v: 0,
  },
];

module.exports = {data: sampleListings};
