const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

/*********MIDDLEWARE**********/
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

/*********ROUTES**********/

const products = [
  {
    id: "1",
    name: "Algae Peel-Off Mask",
    details:
      "Algae Peel-Off Mask with moisturizing and soothing properties.",
    brand: "BKIND",
    price: 115.0,
    currency: "USD",
    image: "uploads/bkind-algae-main.webp",
    hoverImage:
      "uploads/bkind-algae-hover.webp",
    category: "face-care",
    created_at: "2024-08-15",
    stock: 8,
  },
  {
    id: "2",
    name: "Active Toning Essence",
    details: "Delays the aging process",
    price: 59.0,
    brand: "MOKOSH",
    currency: "USD",
    image: "uploads/mokosh-active-main.webp",
    hoverImage:
      "uploads/mokosh-active-hover.webp",
    mlOptions: ["12 ml", "24 ml", "36 ml"],
    category: "face-care",
    created_at: "2025-01-10",
    stock: 5,
    bestSeller: true,
  },
  {
    id: "3",
    name: "Figa Smoothing Face Cream",
    details: "Reduces fine wrinkles, rejuvenates, improves facial oval",
    price: 70.0,
    brand: "MOKOSH",
    currency: "USD",
    image: "uploads/mokosh-figa-main.webp",
    hoverImage:
      "uploads/mokosh-figa-hover.webp",
    category: "face-care",
    created_at: "2025-02-13",
    stock: 4,
  },
  {
    id: "4",
    name: "Jasmine Body Oil",
    details: "Moisturizes, smooths and firms the body",
    price: 170.0,
    brand: "Herbivore",
    currency: "USD",
    image: "uploads/herbivore-jasmine-main.webp",
    hoverImage:
      "uploads/herbivore-jasmine-hover.webp",
    mlOptions: ["12 ml", "24 ml", "36 ml"],
    category: "body-care",
    created_at: "2024-11-07",
    stock: 6,
  },
  {
    id: "5",
    name: "Firming face serum Orange",
    details: "Perfect for natural skin tightening",
    price: 69.0,
    brand: "MOKOSH",
    currency: "USD",
    image: "uploads/mokosh-firming-main.webp",
    hoverImage:
      "uploads/mokosh-firming-hover.webp",
    mlOptions: ["12 ml", "24 ml", "36 ml"],
    category: "face-care",
    bestSeller: true,
    created_at: "2025-05-02",
    stock: 15,
  },
  {
    id: "6",
    name: "Body salt scrub 300 g",
    details: "Perfect for natural skin tightening",
    price: 68.0,
    brand: "MOKOSH",
    currency: "USD",
    image: "uploads/mokosh-body-salt-main.webp",
    hoverImage:
      "uploads/mokosh-body-salt-hover.webp",
    category: "body-care",
    bestSeller: true,
    created_at: "2024-01-07",
    stock: 18,
  },
  {
    id: "7",
    name: "Moisturizing hand lotion",
    details:
      "Effectively nourishes the skin of the hands and protects it from drying out",
    price: 11.5,
    brand: "MOKOSH",
    currency: "USD",
    image: "uploads/mokosh-moisturizing-main.webp",
    hoverImage:
      "uploads/mokosh-moisturizing-hover.webp",
    category: "hand-care",
    bestSeller: true,
    created_at: "2024-02-07",
    stock: 2,
  },
  {
    id: "8",
    name: "Corrective eye cream",
    details: "Reduces dark circles and puffs under the eyes",
    price: 29.0,
    brand: "MOKOSH",
    currency: "USD",
    image: "uploads/mokosh-corrective-main.webp",
    hoverImage:
      "uploads/mokosh-corrective-hover.webp",
    category: "face-care",
    bestSeller: true,
    created_at: "2025-05-01",
    stock: 11,
  },
  {
    id: "9",
    name: "Nourishing hand balm",
    details: "Moisturizes, soothes, repairs and promotes tissue healing",
    price: 96.0,
    brand: "BKIND",
    currency: "USD",
    image: "uploads/bkind-nourishing-main.webp",
    hoverImage:
      "uploads/bkind-nourishing-hover.webp",
    category: "hand-care",
    created_at: "2025-02-01",
    bestSeller: true,
    stock: 18,
  },
  {
    id: "10",
    name: "Iodine & bromine salt",
    details: "Fights cellulite",
    price: 13.9,
    brand: "MOKOSH",
    currency: "USD",
    image: "uploads/mokosh-iodine-main.webp",
    hoverImage:
      "uploads/mokosh-iodine-hover.webp",
    mlOptions: ["12 ml", "24 ml", "36 ml"],
    category: "bath-body",
    created_at: "2025-02-17",
    bestSeller: true,
    stock: 8,
  },
  {
    id: "11",
    name: "Orchid Antioxidant Beauty Face Oil",
    details: "Orchid Antioxidant Beauty Face Oil contains lush",
    price: 86.0,
    brand: "Herbivore",
    currency: "USD",
    image: "uploads/herbivore-orchid-main.webp",
    hoverImage:
      "uploads/herbivore-orchid-hover.webp",
    mlOptions: ["12 ml", "24 ml", "36 ml"],
    category: "face-care",
    created_at: "2024-03-07",
    bestSeller: true,
    stock: 13,
  },
  {
    id: "12",
    name: "Bakuchiol Retinol Alternative Serum",
    details: "Orchid Antioxidant Beauty Face Oil contains lush",
    price: 55.0,
    brand: "Herbivore",
    currency: "USD",
    image: "uploads/herbivore-bakuchiol-main.webp",
    hoverImage:
      "uploads/herbivore-bakuchiol-hover.webp",
    mlOptions: ["12 ml", "24 ml", "36 ml"],
    category: "face-care",
    created_at: "2024-11-07",
    stock: 0,
  },
  {
    id: "13",
    name: "Lapis Blue Tansy Face Oil",
    details: "Lapis Blue Tansy Face Oil",
    price: 170.0,
    brand: "HERBIVORE",
    currency: "USD",
    image: "uploads/herbivore-lapis-main.webp",
    hoverImage:
      "uploads/herbivore-lapis-hover.webp",
    mlOptions: ["12 ml", "24 ml", "36 ml"],
    category: "face-care",
    created_at: "2025-03-25",
    stock: 4,
  },
  {
    id: "14",
    name: "Conditioner bar - colored or white hair",
    details: "Conditioner bar - colored or white hair",
    price: 80.0,
    brand: "BKIND",
    currency: "USD",
    image: "uploads/bkind-conditioner-main.webp",
    hoverImage:
      "uploads/bkind-conditioner-hover.webp",
    category: "hair-care",
    created_at: "2025-02-10",
    stock: 0,
  },
  {
    id: "15",
    name: "Moisturizing body lotion",
    details: "Mokosh body lotion",
    price: 65.0,
    brand: "MOKOSH",
    currency: "USD",
    image: "uploads/mokosh-moisturizing-body-lotion-main.webp",
    hoverImage:
      "uploads/mokosh-moisturizing-body-lotion-hover.webp",
    mlOptions: ["12 ml", "24 ml", "36 ml"],
    category: "body-care",
    created_at: "2025-02-11",
    stock: 1,
  },
  {
    id: "16",
    name: "Patchouli essential oil",
    details: "Chemical-free and synthetic-free.",
    price: 13.90,
    brand: "MOKOSH",
    currency: "USD",
    image: "uploads/mokosh-patchouli-oil-main.webp",
    hoverImage:
      "uploads/mokosh-patchouli-oil-hover.webp",
    category: "essential-oils",
    created_at: "2024-09-10",
    stock: 5,
  },
  {
    id: "17",
    name: "Argan oil for nails",
    details: "Strengthens nails",
    price: 19.00,
    brand: "MOKOSH",
    currency: "USD",
    image: "uploads/mokosh-argan-nail-care-main.webp",
    hoverImage:
      "uploads/mokosh-argan-nail-care-hover.webp",
    category: "essential-oils",
    created_at: "2024-09-10",
    stock: 5,
  },
  {
    id: "18",
    name: "Shampoo Bar - coily and curly hair",
    details: "Easy to foam",
    price: 80.00,
    brand: "BKIND",
    currency: "USD",
    image: "uploads/bkind-conditioner-gray-main.webp",
    hoverImage:
      "uploads/bkind-conditioner-gray-hover.webp",
    category: "hair-care",
    created_at: "2025-04-06",
    stock: 4,
  },
  {
    id: "19",
    name: "Nourishing hand balm - balsam, pine cedar",
    details: "The balm contains essential oils of balsam, pine and cedar",
    price: 96.00,
    brand: "BKIND",
    currency: "USD",
    image: "uploads/bkind-nourishing-gray-main.webp",
    hoverImage:
      "uploads/bkind-nourishing-gray-hover.webp",
    category: "hand-care",
    created_at: "2025-03-15",
    stock: 5,
  },
];

const users = [
  {
    id: "1",
    email: "leyla@gmail.com",
    password: "123456"
  },
];

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send("Access denied!");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token!");
    req.user = user;
    next();
  });
}

// Giriş İşlemi
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).send("Email or password is wrong!");

  if (user.password !== password)
    return res.status(401).send("Email or password is wrong!");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.send({ token });
});

/***********************************************************/
/********* GET: ALL PRODUCTS **********/
/***********************************************************/

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/products/filter/:category", (req, res) => {
  const list = products.filter(
    (item) => item.category.toLowerCase() === req.params.category.toLowerCase()
  );
  if (list.length === 0) {
    return res.status(404).send("Was not found");
  }
  res.send(list);
});

/***********************************************************/
/********* GET: SINGLE PRODUCT **********/
/***********************************************************/

app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product.id === req.params.id);
  if (!product) {
    return res.status(404).send("Product with given id was not found");
  }
  res.send(product);
});

/***********************************************************/
/********* POST: ADD PRODUCT **********/
/***********************************************************/

app.post("/api/products", authenticateToken, upload.single("productImage"), (req, res) => {
  // if (error) return res.status(400).send(error);

  const product = {
    id: uuidv4(),
    name: req.body.name,
    details: req.body.details,
    brand: req.body.brand,
    brandImage: req.body.brandImage,
    price: req.body.price,
    currency: req.body.currency,
    image: req.file ? req.file.path : "", 
    hoverImage: req.body.hoverImage || (req.file ? req.file.path : ""),
    category: req.body.category,
    created_at: req.body.created_at,
    stock: Number(req.body.stock) || 1,
  };

  products.push(product);
  res.send(product);
});

/***********************************************************/
/********* PUT: UPDATE PRODUCT **********/
/***********************************************************/
app.put("/api/products/:id", authenticateToken, upload.single("productImage"), (req, res) => {
  console.log(req.params.id);
  const product = products.find((product) => product.id === req.params.id);
  if (!product) {
    return res.status(404).send("Product with given id was not found");
  }

  // Yalnız yeni şəkil yüklənibsə
  if (req.file) {
    product.image = req.file.path;
  }

  product.name = req.body.name;
  product.details = req.body.details;
  product.brand = req.body.brand;
  product.brandImage = req.body.brandImage;
  product.price = req.body.price;
  product.currency = req.body.currency;
  //  product.image = req.body.image;
  hoverImage: req.body.hoverImage || (req.file ? req.file.path : ""),
  product.category = req.body.category;
  product.created_at = req.body.created_at;
  stock: Number(req.body.stock) || 1,


  res.send(product);
});


/***********************************************************/
/********* DELETE: DELETE PRODUCT **********/
/***********************************************************/

app.delete("/api/products/:id", authenticateToken, (req, res) => {
  const product = products.find((product) => product.id === req.params.id);
  if (!product) {
    return res.status(404).send("Product with given id was not found");
  }
  const index = products.indexOf(product);
  products.splice(index, 1);

  res.send(products);
});

/********* PORT **********/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
