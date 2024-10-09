import Address from "../models/Address";

export class AddressController {
  static async addAddress(req, res, next) {
    const data = req.body;
    const user_id = req.user.aud;
    try {
      const addressData = {
        user_id,
        title: data.title,
        address: data.address,
        landmark: data.landmark,
        house: data.house,
        lat: data.lat,
        lng: data.lng,
      };
      const address = await new Address(addressData).save();
      // delete address.user_id;
      // delete address.__v;
      const response_address = {
        title: address.title,
        address: address.address,
        landmark: address.landmark,
        house: address.house,
        lat: address.lat,
        lng: address.lng,
        created_at: address.created_at,
        update_at: address.updated_at,
      };
      res.send(response_address);
    } catch (e) {
      next(e);
    }
  }

  static async getAddresses(req, res, next) {
    const user_id = req.user.aud;
    const perPage = 5;
    const currentPage = parseInt(req.query.page) || 1;
    const prevPage = currentPage == 1 ? null : currentPage - 1;
    let nextPage = currentPage + 1;
    try {
      const address_doc_count = await Address.countDocuments({ user_id });
      // send an empty array if no document on filter query exists
      if (!address_doc_count) {
        res.json({
          addresses: [],
          perPage,
          currentPage,
          prevPage,
          nextPage: null,
          totalPages: 0,
          // totalRecords: address_doc_count,
        });
      }
      const totalPages = Math.ceil(address_doc_count / perPage);
      if (totalPages == 0 || totalPages == currentPage) {
        nextPage = null;
      }
      if (totalPages < currentPage) {
        throw "No more Addreses available";
      }
      const addresses = await Address.find({ user_id }, { user_id: 0, __v: 0 })
        .skip(currentPage * perPage - perPage)
        .limit(perPage);

      res.json({
        addresses,
        perPage,
        currentPage,
        prevPage,
        nextPage,
        totalPages,
        // totalRecords: address_doc_count,
      });
    } catch (e) {
      next(e);
    }
  }

  static async getLimitedAddresses(req, res, next) {
    const user_id = req.user.aud;
    const limit = req.query.limit;
    try {
      const addresses = await Address.find(
        { user_id },
        { user_id: 0, __v: 0 }
      ).limit(limit);
      res.send(addresses);
    } catch (e) {
      next(e);
    }
  }

  static async deleteAddress(req, res, next) {
    const user_id = req.body.aud;
    const id = req.params.id;
    try {
      await Address.findOneAndDelete({ user_id, _id: id });
      res.json("Address deleted successfully");
    } catch (e) {
      next(e);
    }
  }

  static async getAddressById(req, res, next) {
    const user_id = req.body.aud;
    const id = req.params.id;
    try {
      const address = await Address.findOne({ user_id, _id: id });
      res.send(address);
    } catch (e) {
      next(e);
    }
  }

  static async editAddress(req, res, next) {
    const user_id = req.body.aud;
    const id = req.params.id;
    const data = req.body;
    try {
      const address = await Address.findOneAndUpdate(
        { user_id, _id: id },
        {
          user_id,
          title: data.title,
          address: data.address,
          landmark: data.landmark,
          house: data.house,
          lat: data.lat,
          lng: data.lng,
          updated_at: new Date(),
        },
        { new: true }
      );
      if (address) {
        res.send(address);
      } else {
        throw "Address does not exist";
      }
      res.send(address);
    } catch (e) {
      next(e);
    }
  }

  static async checkAddresses(req, res, next) {
    const user_id = req.user.aud;
    const data = req.query;
    try {
      const addresses = await Address.findOne(
        { user_id, lat: data.lat, lng: data.lng },
        { user_id: 0, __v: 0 }
      );
      res.send(addresses);
    } catch (e) {
      next(e);
    }
  }
}
