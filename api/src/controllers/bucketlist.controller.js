import Sequelize from "sequelize";
import Bucketlist from "../models/bucketlist.model";
import Item from "../models/item.model";

const { Op } = Sequelize;

class BucketlistController {
  /*
   *
   * controller to create a bucketlist
   * required: name, created_by
   *
   */
  static async createBucketlist(req, res) {
    try {
      const { name } = req.body;
      // verify that the bucketlist doesnt exist

      const listCheck = await Bucketlist.findOne({
        where: { name, created_by: req.user.id }
      });

      if (listCheck) {
        throw new Error("this bucketlist already exist");
      }

      const newBucketlist = await Bucketlist.create({
        name,
        created_by: req.user.id
      });

      if (!newBucketlist) {
        throw new Error("oops!, could not create the list, try again");
      }

      // fetch this bucketlist and return
      const returnedBucketlist = await Bucketlist.findOne({
        include: [
          {
            model: Item,
            as: "items"
          }
        ],
        where: { name, created_by: req.user.id }
      });

      return res.status(201).json({
        status: "success",
        message: "Bucketlist created successfully",
        data: returnedBucketlist
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
   * controller to get all user bucketlist
   * required: name, created_by
   *
   */
  static async fetchAllBucketlist(req, res) {
    try {
      const { limit, q } = req.query;

      // perform pagination if limit exists
      if (limit) {
        const bucketlist = await Bucketlist.findAll({
          include: [
            {
              model: Item,
              as: "items"
            }
          ],
          limit,
          where: { created_by: req.user.id }
        });

        if (!bucketlist) {
          throw new Error("could not retrieve the bucketlist");
        }

        return res.status(200).json({
          status: "success",
          message: "bucketlist retrieved successfully",
          data: bucketlist
        });
      }

      //   perform search if q is present
      if (q) {
        const bucketlist = await Bucketlist.findAll({
          include: [
            {
              model: Item,
              as: "items"
            }
          ],
          where: { created_by: req.user.id, name: { [Op.like]: `%${q}%` } }
        });

        if (!bucketlist) {
          throw new Error("could not retrieve the bucketlist");
        }

        return res.status(200).json({
          status: "success",
          message: "bucketlist retrieved successfully",
          data: bucketlist
        });
      }
      const bucketlists = await Bucketlist.findAll({
        include: [
          {
            model: Item,
            as: "items"
          }
        ],
        where: { created_by: req.user.id }
      });

      if (!bucketlists) {
        throw new Error("could not retrieve the bucketlists");
      }

      return res.status(200).json({
        status: "success",
        message: "bucketlist retrieved successfully",
        data: bucketlists
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
   * controller to get a single user bucketlist
   * required: name, created_by
   *
   */
  static async fetchBucketlist(req, res) {
    try {
      const { id } = req.params;

      const bucketlist = await Bucketlist.findOne({
        include: [
          {
            model: Item,
            as: "items"
          }
        ],
        where: { id, created_by: req.user.id }
      });

      if (!bucketlist) {
        console.log(bucketlist);
        throw new Error("could not retrieve the bucketlist");
      }

      //   retrive the items associated to the bucketlist

      return res.status(200).json({
        status: "success",
        message: "bucketlist retrieved successfully",
        data: bucketlist
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
   * controller to update a single user bucketlist
   * required: name, created_by
   *
   */
  static async updateBucketlist(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const bucketlist = await Bucketlist.findOne({
        where: { id, created_by: req.user.id }
      });

      if (!bucketlist) {
        throw new Error("could not retrieve the bucketlist");
      }

      //   make sure the sent data is different
      if (name === bucketlist.name) {
        throw new Error("please modify the bucketlist name or cancel");
      }

      //   update the bucket list
      const updatedBucketList = await Bucketlist.update(
        { name },
        { where: { id, created_by: req.user.id } }
      );

      if (!updatedBucketList) {
        throw new Error("could not modify this bucketlist");
      }

      return res.status(200).json({
        status: "success",
        message: "bucketlist retrieved successfully"
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
   * controller to delete a single user bucketlist
   * required: name, created_by
   *
   */
  static async deleteBucketlist(req, res) {
    try {
      const { id } = req.params;

      const bucketlist = await Bucketlist.destroy({
        where: { id, created_by: req.user.id }
      });

      if (!bucketlist) {
        throw new Error("could not delete the bucketlist");
      }

      return res.status(200).json({
        status: "success",
        message: "bucketlist deleted successfully"
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }
}

export default BucketlistController;
