import { body } from "express-validator";
import Item from "../models/Item";
import { error } from "console";

export class orderValidators {
  static placeOrder() {
    return [
      body("products", "Product ID is required")
        .isString()
        .custom((products, { req }) => {
          if (req.user.type != "user") {
            throw "You are not authorised to place an order";
          }
          products = JSON.parse(products);
          const product_ids = products.map((x) => x._id);
          console.log(product_ids);
          return Item.find({ _id: { $in: [...products] } })
            .then((server_products) => {
              if (
                !server_products ||
                server_products.length != products.length
              ) {
                throw "Products mismatched";
              } else {
                req.server_products = server_products;
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("address", "Address is required").isString(),
      body("status", "Order status is required").isString(),
      body("payment_status", "Payment is required").isString(),
      body("payment_mode", "Payment mode is required").isString(),
      body("grandTotal", "Order grandtotal is required").isNumeric(),
      body("deliveryCharge", "Delivery Charge is required").isNumeric(),
      body("total", "Order Total is required")
        .isNumeric()
        .custom((total, { req }) => {
          let tot = 0;
          const server_products = req.server_products.map((server_product) => {
            console.log(server_product);
            let products = JSON.parse(req.body.products);
            let product = products.find((x) => x._id == server_product._id);
            if (!product.quantity || product.quantity == 0) {
              throw "Please provide a proper quantity for " + product.name;
            }
            console.log(product);
            if (server_product.variations?.length == 0) {
              if (server_product.price != product.price) {
                console.log("price mismatch");
                throw (
                  "Price mismatch! Check the latest price of" + product.name
                );
              } else if (product.quantity > server_product.stock_unit) {
                throw "Out of stock" + product.name + "just went out of stock";
              }
              tot += server_product.price * parseFloat(product.quantity);
              return server_product;
            } else {
              let variation = server_product.variations.find(
                (variation) => variation.sku && variation.sku == product.sku
              );
              if (variation) {
                if (variation.price != product.price) {
                  console.log("price mismatch");
                  throw (
                    "Price mismatch! Check the latest price of" + product.name
                  );
                } else if (product.quantity > server_product.stock_unit) {
                  throw (
                    "Out of stock" + product.name + "just went out of stock"
                  );
                }
                tot += server_product.price * parseFloat(product.quantity);
                return server_product;
              } else {
                if (variation?.size?.lebgth > 0) {
                  let data = variation.size.find(
                    (x) => x.sku && x.sku == product.sku
                  );
                  if (data) {
                    if (data.price != product.price) {
                      throw (
                        "Price mismatch! Check the latest price of " +
                        product.name
                      );
                    } else if (product.quantity > data.stock.unit) {
                      throw (
                        "Out of stock" + product.name + "just went out of stock"
                      );
                    }
                    tot += data.price * parseFloat(product.quantity);
                    return server_product;
                  }
                } else {
                  throw "Products mismatch";
                }
              }
            }
          });
          console.log("total", tot);
          const grandTotal = tot + parseFloat(req.body.deliveryCharge);
          console.log("grant total", grandTotal);
          if (total != tot || req.body.grandTotal) {
            console.log("throw error");
            throw (
              "Amount to pay mismatch! Total amount should be " + grandTotal
            );
          } else {
            return true;
          }
        }),
    ];
  }
}
