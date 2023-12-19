const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  static #products = [];

  init() {
    const exist = fs.existsSync("./data/products.json");

    if (!exist) {
      const path = "./data/products.json";
      const data = JSON.stringify([]);
      fs.writeFileSync(path, data);
    }
  }

  constructor() {
    this.init();
  }

  async create(data) {
    try {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo || `Foto de ${data.title}`,
        price: data.price,
        stock: data.stock || 15,
      };
      const productsFile = JSON.parse(
        await fs.promises.readFile("./data/products.json", "utf-8")
      );
      productsFile.push(product);
      const productsJson = JSON.stringify(productsFile, null, 2);

      await fs.promises.writeFile("./data/products.json", productsJson);
    } catch (error) {
      return error.message;
    }
  }

  async read() {
      const fecthProducts = JSON.parse(
        await fs.promises.readFile("./data/products.json", "utf-8")
      );
      
  }
}

const products = new ProductManager({});

async function createProducts() {
  await products.create({
    title: "Libro",
    price: 150,
  });
  await products.create({
    title: "Pava",
    price: 200,
    photo: "https://www.distriecono.com.ar/images/5654_00.jpg",
  });
  await products.create({
    title: "Silla",
    price: 400,
  });
  await products.create({
    title: "Termo",
    price: 250,
  });
  await products.create({
    title: "Mate",
    price: 100,
  });
  await products.create({
    title: "Teclado",
    price: 500,
  });
}
createProducts();

console.log(products.read())

module.exports = ProductManager;
