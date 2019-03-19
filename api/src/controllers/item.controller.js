import Item from "../models/item.model";
// import Bucketlist from "../models/bucketlist.model";

class ItemController {
  /*
   *
   * controller to create an item to the bucketlist
   * required: name, bucketlist_id
   *
   */
  static async createItem(req, res) {
    try {
      const { name } = req.body;
      const { id } = req.params;

      // verify that the bucketlist doesnt have the item already
      const itemCheck = await Item.findOne({
        where: { name, bucketlist_id: id }
      });

      if (itemCheck) {
        throw new Error("this item already exists in this bucketlist");
      }

      const newItem = await Item.create({
        name,
        bucketlist_id: id
      });

      if (!newItem) {
        throw new Error("oops!, could not create the item, try again");
      }

      return res.status(201).json({
        status: "success",
        message: "Item created successfully in the bucketlist",
        data: newItem
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }

  /*
   *
   * controller to get all item in a bucketlist
   * required: bucketlist_id, item_id
   *
   */
  static async getAllItem(req, res) {
    try {
      const { id } = req.params;

      // verify that the bucketlist doesnt have the item already
      const item = await Item.findAll({
        where: { bucketlist_id: id }
      });

      if (!item) {
        throw new Error("no item in this bucketlist");
      }

      return res.status(200).json({
        status: "success",
        message: "item retrieved successfully",
        data: item
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }

  /*
   *
   * controller to get an item in a bucketlist
   * required: item_id, bucketlist_id
   *
   */
  static async getItem(req, res) {
    try {
      // eslint-disable-next-line camelcase
      const { id, item_id } = req.params;

      // verify that the bucketlist doesnt have the item already
      const item = await Item.findOne({
        where: { bucketlist_id: id, id: item_id }
      });

      if (!item) {
        throw new Error("this item is not in this bucketlist");
      }

      return res.status(200).json({
        status: "success",
        message: "item retrieved successfully",
        data: item
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }

  /*
   *
   * controller to edit an item in a bucketlist
   * required: item_id, bucketlist_id
   *
   */
  static async editItem(req, res) {
    try {
      // eslint-disable-next-line camelcase
      const { id, item_id } = req.params;
      const { name, done } = req.body;

      // verify that the bucketlist doesnt have the item already
      const item = await Item.findOne({
        where: { bucketlist_id: id, id: item_id }
      });

      if (!item) {
        throw new Error("this item is not in this bucketlist");
      }

      const itemUpdateData = {
        name: name || item.name,
        done: done || item.done
      };

      const itemUpdated = await Item.update(
        { name: itemUpdateData.name, done: itemUpdateData.done },
        { where: { id: item_id, bucketlist_id: id } }
      );

      const itemReturned = await Item.findOne({
        where: { bucketlist_id: id, id: item_id }
      });

      if (!itemUpdated) {
        throw new Error("could not modify this item");
      }

      return res.status(200).json({
        status: "success",
        message: "item updated successfully",
        data: itemReturned
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }

  /*
   *
   * controller to delete an item in a bucketlist
   * required: item_id, bucketlist_id
   *
   */
  static async deleteItem(req, res) {
    try {
      // eslint-disable-next-line camelcase
      const { id, item_id } = req.params;

      const item = await Item.destroy({
        where: { id: item_id, bucketlist_id: id }
      });

      if (!item) {
        throw new Error("could not delete the bucketlist");
      }

      return res.status(200).json({
        status: "success",
        message: "item deleted successfully"
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }
}

export default ItemController;
