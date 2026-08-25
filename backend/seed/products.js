// 55 realistic supermarket products across all 15 categories.
// `image` holds an emoji used as a lightweight placeholder tile (no network images needed).
// `color` is the tile background color used by the frontend ProductCard.
let bc = 8901030000000; // fake EAN-13 base, incremented per product
const nextBarcode = () => String(bc++);

const P = (
  name,
  brand,
  category,
  price,
  mrp,
  unit,
  gstPercent,
  stock,
  image,
) => ({
  name,
  brand,
  category,
  price,
  mrp,
  unit,
  gstPercent,
  stock,
  image,
  barcode: nextBarcode(),
  active: true,
});

module.exports = [
  // Vegetables
  P('Tomato', 'Farm Fresh', 'Vegetables', 30, 35, '1 kg', 0, 80, 'https://i.pinimg.com/1200x/29/40/61/294061c8da24641b45df7c7f672faf32.jpg', '#E4572E'),
  P('Potato', 'Farm Fresh', 'Vegetables', 25, 28, '1 kg', 0, 120, 'https://i.pinimg.com/1200x/e3/d6/4a/e3d64a225cc8a6729c32bdcbab97596f.jpg', '#C68958'),
  P('Onion', 'Farm Fresh', 'Vegetables', 35, 40, '1 kg', 0, 100, 'https://i.pinimg.com/1200x/af/3a/82/af3a82fb0e65182d2e9a49c866203717.jpg', '#B983C7'),
  P('Carrot', 'Farm Fresh', 'Vegetables', 40, 45, '1 kg', 0, 60, 'https://i.pinimg.com/1200x/01/66/26/0166261fa0018cbb019c459ea8588c06.jpg', '#F2994A'),
  P('Beans', 'Farm Fresh', 'Vegetables', 50, 55, '500 g', 0, 40, 'https://i.pinimg.com/1200x/e5/9f/80/e59f80e74ea6f704caf050d84e7ff9ff.jpg', '#4C9A2A'),
  P('Cabbage', 'Farm Fresh', 'Vegetables', 28, 32, '1 kg', 0, 35, 'https://i.pinimg.com/736x/2c/bb/13/2cbb1306c25616c8c2b6ee8404c25785.jpg', '#6DBE45'),
  P('Cauliflower', 'Farm Fresh', 'Vegetables', 32, 36, '1 kg', 0, 30, 'https://i.pinimg.com/1200x/26/a0/cd/26a0cdf9b23787c571f28c1faf64b929.jpg', '#DDEBB0'),
   P('Vendaikai', 'Farm Fresh', 'Vegetables', 32, 36, '1 kg', 0, 30, 'https://i.pinimg.com/736x/d3/0e/df/d30edfd09a2efb55c99375925540476e.jpg', '#DDEBB0'),
  P('Pundu', 'Farm Fresh', 'Vegetables', 32, 36, '1 kg', 0, 30, 'https://i.pinimg.com/1200x/34/83/01/348301c4997610f490a349d5ab27b82b.jpg', '#DDEBB0'),
 P('Ingee', 'Farm Fresh', 'Vegetables', 32, 36, '1 kg', 0, 30, 'https://i.pinimg.com/736x/18/ae/e0/18aee0ce5830c490ef3196e8c08609db.jpg', '#DDEBB0'),
 P('Vara Milagai', 'Farm Fresh', 'Vegetables', 32, 36, '1 kg', 0, 30, 'https://i.pinimg.com/1200x/c2/53/19/c253194e37f372d238a19b370f282e81.jpg', '#DDEBB0'),
 P('Chinna vengayam ', 'Farm Fresh', 'Vegetables', 32, 36, '1 kg', 0, 30, 'https://i.pinimg.com/736x/08/47/f1/0847f1ae06b5b20e5379c7e6af1d5ba4.jpg', '#DDEBB0'),

  // Fruits
  P('Banana', 'Farm Fresh', 'Fruits', 45, 50, '1 dozen', 0, 70, 'https://i.pinimg.com/1200x/5c/5b/e0/5c5be08eb5277b986f1b60191448e3ce.jpg', '#F6C90E'),
  P('Lemon', 'Farm Fresh', 'Fruits', 180, 200, '1 kg', 0, 55, 'https://i.pinimg.com/736x/14/e6/6c/14e66c0e1d52900a1a523b9f79507b8c.jpg', '#C0392B'),
  P('Mango Alphonso', 'Farm Fresh', 'Fruits', 350, 400, '1 kg', 0, 25, '🥭', '#F39C12'),
 

  // Rice & Grains
  P('Aashirvaad Atta', 'Aashirvaad', 'Rice & Grains', 280, 300, '5 kg', 5, 60, 'https://i.pinimg.com/1200x/ad/90/71/ad9071aaa3023abcd2f744f17c974767.jpg', '#D9A441'),
  P('India Gate Basmati Rice', 'India Gate', 'Rice & Grains', 420, 460, '5 kg', 5, 40, 'https://i.pinimg.com/1200x/7c/f2/99/7cf299fbf0ac0a7210e75f9f7eee96c5.jpg', '#EFE3C8'),
  P('thuvarai parupu', 'dool', 'Rice & Grains', 320, 340, '5 kg', 5, 35, 'https://i.pinimg.com/736x/66/6e/ed/666eed8ca6b74ff9be6739aafa3464ae.jpg', '#F1E6C6'),
  P('Anil Rava', 'Anil', 'Rice & Grains', 260, 285, '5 kg', 5, 30, 'https://i.pinimg.com/1200x/e7/5b/cb/e75bcba60d070d7bf2a49a90533ce0f1.jpg', '#D9A441'),
  P('kadalai', 'Kadalai', 'Rice & Grains', 60, 65, '500 g', 5, 45, 'https://i.pinimg.com/236x/38/3d/69/383d69d999849bba710e8a35493029f4.jpg', '#EDE0C8'),
  P('Rava / Sooji', 'MTR', 'Rice & Grains', 55, 60, '1 kg', 5, 50, '🌽', '#E8D28B'),

  // Pulses
  P('Toor Dal', 'Tata Sampann', 'Nuts', 150, 165, '1 kg', 5, 55, 'https://i.pinimg.com/736x/cb/f3/6d/cbf36ddc3c2b251605d84d857a7f5836.jpg', '#E1A73B'),
  P('Moong Dal', 'Badam', 'Nuts', 140, 150, '1 kg', 5, 50, 'https://i.pinimg.com/736x/13/5f/1b/135f1b56ae9e47cc3c1364b657e6b910.jpg', '#C7D64B'),
  P('Chana Dal', 'Tata Sampann', 'Nuts', 110, 120, '1 kg', 5, 45, 'https://i.pinimg.com/1200x/25/b8/06/25b8062468b0f0c6389631a2056c5aee.jpg', '#D9A441'),
  P('Urad Dal', 'black', 'Nuts', 145, 155, '1 kg', 5, 40, 'https://i.pinimg.com/1200x/cd/a4/6e/cda46ee737fb25317077e36e2f545145.jpg', '#5B4636'),
  P('Rajma (Kidney Beans)', 'Tata Sampann', 'Nuts', 160, 175, '1 kg', 5, 35, 'https://i.pinimg.com/736x/7b/ed/3b/7bed3b3dad7726b1e3a2a78249b31fa1.jpg', '#8B2E2E'),
  P('Rajma (Kidney Beans)', 'Tata Sampann', 'Nuts', 160, 175, '1 kg', 5, 35, 'https://i.pinimg.com/1200x/c7/1f/44/c71f44a1790af6cd7478381d476559f7.jpg', '#8B2E2E'),
  P('Rajma (Kidney Beans)', 'Tata Sampann', 'Nuts', 160, 175, '1 kg', 5, 35, 'https://i.pinimg.com/1200x/38/15/54/3815547a599f697314fbe3cb88cc2b14.jpg', '#8B2E2E'),
  P('Rajma (Kidney Beans)', 'Tata Sampann', 'Nuts', 160, 175, '1 kg', 5, 35, 'https://i.pinimg.com/1200x/57/d5/a0/57d5a07d6549493a7a0decb0771d85bd.jpg', '#8B2E2E'),
  P('Toor Dal', 'Tata Sampann', 'Nuts', 150, 165, '1 kg', 5, 55, 'https://i.pinimg.com/1200x/87/fb/9e/87fb9e7aa48f2ddbc1ea2a0c1dcbb7c6.jpg', '#E1A73B'),

  // Oil
  P('Fortune Sunflower Oil', 'Fortune', 'Oil', 195, 210, '1 L', 5, 60, '🛢️', '#F2C230'),
  P('Saffola Gold Oil', 'Saffola', 'Oil', 210, 225, '1 L', 5, 45, '🛢️', '#F2C230'),
  P('Dhara Mustard Oil', 'Dhara', 'Oil', 180, 195, '1 L', 5, 30, '🛢️', '#D2A24C'),
  P('Idhayam Gingelly Oil', 'Idhayam', 'Oil', 220, 240, '1 L', 5, 20, '🛢️', '#C7861D'),

  // Spices
  P('Everest Turmeric Powder', 'Everest', 'Spices', 45, 50, '100 g', 5, 70, '🧂', '#F2B705'),
  P('MDH Chilli Powder', 'MDH', 'Spices', 55, 60, '100 g', 5, 65, '🌶️', '#C0392B'),
  P('Everest Coriander Powder', 'Everest', 'Spices', 40, 45, '100 g', 5, 55, '🧂', '#8FAE3D'),
  P('MDH Garam Masala', 'MDH', 'Spices', 65, 70, '100 g', 5, 40, '🧂', '#8B5A2B'),
  P('Catch Salt', 'Catch', 'Spices', 22, 25, '1 kg', 5, 90, '🧂', '#DCE6EA'),

  // Coffee & Tea
  P('Bru Coffee', 'Bru', 'Coffee & Tea', 185, 200, '200 g', 10, 50, '☕', '#6F4E37'),
  P('Nescafe Sunrise 2rs', 'Nescafe', 'Coffee & Tea', 2, 2, '3 g', 0, 45, 'https://i.pinimg.com/736x/34/4f/ae/344fae9b69cee1e1eeaf9a4cb2391743.jpg', '#4B3621'),
  P('Continental Coffee', 'Continental', 'Coffee & Tea', 175, 190, '200 g', 12, 30, '☕', '#5C4033'),
  P('Levista Coffee', 'Levista', 'Coffee & Tea', 195, 210, '200 g', 12, 25, '☕', '#3E2723'),
  P('Lipton Green Tea', 'Lipton', 'Coffee & Tea', 140, 150, '30 g', 0, 60, 'https://i.pinimg.com/736x/c1/46/db/c146dbbc5008037132f080868a5c6154.jpg', '#2E7D32'),
  P('3 Roses', 'Brooke Bond', 'Coffee & Tea', 130, 140, '250 g', 0, 55, 'https://i.pinimg.com/1200x/a6/46/c0/a646c0c21d80bd56328053910f7540b0.jpg', '#B71C1C'),
  P('3 Roses Natural Tea', 'Brooke Bond', 'Coffee & Tea', 130, 140, '250 g', 0, 55, 'https://i.pinimg.com/1200x/da/03/da/da03da0dee3ff332e16a350d6f3ae3f8.jpg', '#B71C1C'),
  P('3 Roses ', '3 Roses', 'Coffee & Tea', 45, 55, '50 g', 0, 55, 'https://i.pinimg.com/1200x/a6/46/c0/a646c0c21d80bd56328053910f7540b0.jpg', '#B71C1C'),

  // Biscuits
  P('Dark fantasy', 'Sunfeast', 'Biscuits', 40, 40, '100 g', 0, 200, 'https://i.pinimg.com/736x/64/7e/2b/647e2b0b38b3f52e2ac993801b7eb7ad.jpg', '#F5D142'),
  P('Britannia Good Day', 'Britannia', 'Biscuits', 10, 10, '150 g', 0, 900, 'https://i.pinimg.com/736x/5f/4d/2f/5f4d2f47cf1d82041494f20e70ccffa8.jpg', '#F2A93B'),
  P('Britannia Marie Gold', 'Britannia', 'Biscuits', 10, 10, '150 g', 0, 1005, 'https://i.pinimg.com/736x/b9/f9/ee/b9f9eeb27b58338bbbbedf37ca10eed5.jpg', '#E8C36A'),
  P('Sunfeast Bourbon', 'Sunfeast', 'Biscuits', 10, 10, '150 g', 0, 70, 'https://i.pinimg.com/736x/17/b9/2e/17b92e308be50ac32ee3b2c4928a7b6b.jpg', '#6D4C41'),
  P('Parle-G 5rs pack', 'Parle', 'Biscuits', 5, 5, '500 g', 0, 75, 'https://i.pinimg.com/1200x/7c/4c/14/7c4c1430f94d9eb0bf5d2f012f5fc5ed.jpg', ),
  P('Parle-G 3rs Small pack', 'Parle', 'Biscuits', 3, 3, '20 g', 0, 100, 'https://i.pinimg.com/1200x/7c/4c/14/7c4c1430f94d9eb0bf5d2f012f5fc5ed.jpg', ),
  P('JimJam', 'Bratannia', 'Biscuits', 10, 10, '100 g', 0, 75, 'https://i.pinimg.com/736x/9c/96/02/9c96029a886e5e246151716fd6f81d00.jpg', '#E9B44C'),
  P('Nutri Choice', 'Bratannia', 'Biscuits', 20, 22, '100 g', 0, 75, 'https://i.pinimg.com/736x/5b/f5/35/5bf5357a59b843ffbd96951c0a67e40c.jpg', '#E9B44C'),
  P('Oreo', 'cadbary', 'Biscuits', 10, 10, '200 g', 0, 75, 'https://i.pinimg.com/736x/b3/94/0f/b3940f24841b44f17212a89033741a26.jpg',),
  P('Lotte Choco Pie', 'Lotte', 'Biscuits', 20, 22, '100 g', 5, 75, 'https://i.pinimg.com/736x/c3/56/d1/c356d1e3542943c50845f9ef1bd70035.jpg', '#E9B44C'),
  P('Parle Hide & Seek', 'Parle', 'Biscuits', 35, 38, '120 g', 0, 60, 'https://i.pinimg.com/736x/ed/78/6a/ed786a6d36f3380b0e4d27538a27c398.jpg', '#4E342E'),

  // Snacks
  P("5 Star 5rs", "Cadbary", 'Snacks', 20, 20, '52 g', 0, 100, 'https://i.pinimg.com/736x/06/95/72/0695725f813d279967167e36a4f5266b.jpg',),
  P('Kit Kat', 'Nestle', 'Snacks', 20, 20, '72 g', 0, 80, 'https://i.pinimg.com/736x/25/df/fc/25dffc2fae196ccf1bcbf3f5c108b08c.jpg',),
  P('Kit kat', 'Nestle', 'Snacks', 10, 10, '75 g', 0, 90, 'https://i.pinimg.com/736x/02/5e/f5/025ef589dcfba8326326a8cb745e0c83.jpg',),
  P('Dairy Milk 10rs', 'Cadbary', 'Snacks', 10, 10, '200 g', 0, 40, 'https://i.pinimg.com/736x/2e/20/68/2e20684bf1861da5dd45d3b450e5dcc1.jpg',),
  P('Dairy Milk Bubbly', 'Cadbary', 'Snacks', 45, 50, '200 g', 0, 35, 'https://i.pinimg.com/736x/42/da/7f/42da7f253274bb8e36be22f7bc21269d.jpg', ),
  P('Dairy Milk Oreo', 'Cadbary', 'Snacks', 80, 80, '200 g', 0, 35, 'https://i.pinimg.com/736x/d1/fe/bd/d1febd75a09149a52d82e43143fccf46.jpg', ),
  P('Dairy Milk Silk', 'Cadbary', 'Snacks', 80, 80, '200 g', 0, 35, 'https://i.pinimg.com/736x/e8/c3/80/e8c380c83550e74caa60a90106d6ca2b.jpg', '#C08552'),
  P('Lays 5rs', 'Lays', 'Snacks', 5, 5, '20 g', 0, 35, 'https://i.pinimg.com/1200x/a8/6c/95/a86c95a9092280d3eec06bb6bd8c9c92.jpg', '#C08552'),
  P('Little Hearts 5rs', 'Bratannia', 'Snacks', 5, 5, '20 g', 0, 35, 'https://i.pinimg.com/1200x/b5/f4/43/b5f44349f92574b52aa4cfb9aead6535.jpg', '#C08552'),
  P('Little Hearts 10rs', 'Bratannia', 'Snacks', 10, 10, '30 g', 0, 35, 'https://i.pinimg.com/736x/f7/7a/77/f77a77ed8d04743b83f0e96007b660f3.jpg', '#C08552'),
  P('Bingo 5rs', 'ITC', 'Snacks', 5, 5, '20 g', 0, 35, 'https://i.pinimg.com/736x/8d/67/a2/8d67a27f34b5a23df4c7fe9f9e89ea77.jpg', '#C08552'),
  P('Bingo 10rs', 'ITC', 'Snacks', 10, 10, '200 g', 0, 35, 'https://i.pinimg.com/1200x/ab/bb/9f/abbb9f685c408daeb72fa34e2dcf31e9.jpg', '#C08552'),
  P('Kurkure 5rs', 'ITC', 'Snacks', 5, 5, '20 g', 0, 60, 'https://i.pinimg.com/736x/1a/5a/94/1a5a94118a23fd04364ce0b5068a5229.jpg', ),
  P('Kurkure 10rs', 'ITC', 'Snacks', 10, 10, '20 g', 0, 60, 'https://i.pinimg.com/736x/1a/5a/94/1a5a94118a23fd04364ce0b5068a5229.jpg', ),

  // Dairy Products
  P('Aavin Milk', 'Aavin', 'Dairy Products', 28, 28, '500 ml', 0, 60, '🥛', '#F5F5F5'),
  P('Amul Curd', 'Amul', 'Dairy Products', 35, 38, '400 g', 5, 50, '🥣', '#F7F1E3'),
  P('Amul Butter', 'Amul', 'Dairy Products', 55, 58, '100 g', 12, 45, '🧈', '#F6D96A'),
  P('Amul Paneer', 'Amul', 'Dairy Products', 90, 95, '200 g', 5, 35, '🧀', '#FDF3D0'),
  P('Amul Cheese Slices', 'Amul', 'Dairy Products', 130, 140, '200 g', 12, 30, '🧀', '#F6C244'),

  // Beverages
  P('Coca-Cola', 'Coca-Cola', 'Beverages', 40, 40, '750 ml', 28, 70, '🥤', '#B71C1C'),
  P('Sprite', 'Sprite', 'Beverages', 40, 40, '750 ml', 28, 65, '🥤', '#2E7D32'),
  P('Real Fruit Juice Mixed', 'Real', 'Beverages', 110, 120, '1 L', 12, 40, '🧃', '#F2994A'),
  P('Bisleri Water', 'Bisleri', 'Beverages', 20, 20, '1 L', 18, 100, '💧', '#2196F3'),

  // Personal Care
  P('Colgate Strong Teeth', 'Colgate', 'Personal Care', 55, 60, '150 g', 18, 60, '🪥', '#D32F2F'),
  P('Dove Soap', 'Dove', 'Personal Care', 60, 65, '100 g', 18, 55, '🧼', '#F0F0F0'),
  P('Head & Shoulders Shampoo', 'H&S', 'Personal Care', 180, 195, '180 ml', 18, 30, '🧴', '#1565C0'),
  P('Nivea Body Lotion', 'Nivea', 'Personal Care', 210, 225, '200 ml', 18, 25, '🧴', '#1E88E5'),

  // Household Products
  P('Vim Dishwash Bar', 'Vim', 'Household Products', 20, 22, '1 pc', 18, 80, '🧽', '#4CAF50'),
  P('Surf Excel Detergent', 'Surf Excel', 'Household Products', 210, 225, '1 kg', 18, 40, '🧺', '#1565C0'),
  P('Harpic Toilet Cleaner', 'Harpic', 'Household Products', 95, 105, '500 ml', 18, 35, '🚽', '#00897B'),
  P('Good Knight Mosquito Coil', 'Good Knight', 'Household Products', 45, 50, '1 pack', 18, 50, '🦟', '#43A047'),

  // Bakery
  P('Britannia Bread', 'Britannia', 'Bakery', 45, 48, '400 g', 5, 40, '🍞', '#E8C36A'),
  P('Whole Wheat Bread', 'Modern', 'Bakery', 50, 55, '400 g', 5, 30, '🍞', '#C68958'),
  P('Butter Croissant', 'Local Bakery', 'Bakery', 35, 40, '1 pc', 5, 20, '🥐', '#F2C230'),
  P('Chocolate Muffin', 'Local Bakery', 'Bakery', 40, 45, '1 pc', 5, 18, '🧁', '#6D4C41'),

  // Frozen Foods
  P('McCain French Fries', 'McCain', 'Frozen Foods', 130, 140, '425 g', 12, 30, '🍟', '#F2C230'),
  P('Frozen Green Peas', 'Safal', 'Frozen Foods', 70, 75, '500 g', 5, 35, '🟢', '#7FB135'),
  P('Veg Frozen Nuggets', "McCain", 'Frozen Foods', 150, 165, '400 g', 12, 25, '🍢', '#E8B44C'),
  P('Frozen Paratha', 'Vadilal', 'Frozen Foods', 85, 90, '400 g', 5, 28, '🫓', '#EFE3C8'),
];
