const bollar = [
  {
    title: "Basketboll",
    category: "Basket",
    productId: 12561256,
    extraEquipment: "Luftpump",
    material: "Gummi",
    color: "Orange",
    price: 200,
    level: "Nybörjare",
  },
  {
    title: "Baseball",
    category: "Baseball",
    productId: 12561289,
    extraEquipment: "Handske",
    material: "Läder",
    color: "Vit",
    price: 145,
    level: "Professionell",
  },
  {
    title: "Fotboll",
    category: "Fotboll",
    productId: 12561255,
    extraEquipment: "Luftpump",
    material: "Läder",
    color: "Flera",
    price: 89,
    level: "Nybörjare",
  },
  {
    title: "Golfboll",
    category: "Golf",
    productId: 12561999,
    extraEquipment: "peg",
    material: "Plast/Gummi",
    color: "Vit",
    price: 59,
    level: "Blandat",
  },
  {
    title: "Handboll",
    category: "Handboll",
    productId: 12561211,
    extraEquipment: "Luftpump",
    material: "Läder",
    color: "Orange",
    price: 249,
    level: "Nybörjare",
  },
  {
    title: "Tennisboll",
    category: "Tennis",
    productId: 12561495,
    extraEquipment: "Tennisracket",
    material: "Gummi",
    color: "Gul",
    price: 99,
    level: "Professionell",
  },
];

bollar.forEach((boll) => {
  boll.img = `assets/img/${boll.title}.jpg`;
  boll.cartSum = boll.price;
});

localStorage.setItem("bollar", JSON.stringify(bollar));
