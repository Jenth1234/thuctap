const Comment = require("../../models/comment/comment.model");
const MetadaraCmtProductService = require("../../service/metadata_cmt_product/metadatacmtproduct.service");
const mongoose = require("mongoose"); // Added mongoose import
const { Types } = mongoose;

class COMMENT_SERVICE {
  createComment = async (payload) => {
    try {
      const countCMT = 5;
      const query = {
        PRODUCT_ID: payload.PRODUCT_ID,
        ORGANIZATION_ID: payload.ORGANIZATION_ID,
        LIST_COMMENT_MAX_NUMBER: { $lt: countCMT },
      };

      const comment_obj = {
        USER_ID: payload.USER_ID,
        CONTENT: payload.CONTENT,
        ATTACHMENTS: payload.ATTACHMENTS,
        FROM_DATE: Date.now(),
        THRU_DATE: null,
      };

      await MetadaraCmtProductService.updateCmtCount(
        payload.PRODUCT_ID,
        payload.ORGANIZATION_ID,
        1
      );

      await Comment.updateOne(
        query,
        {
          $push: {
            LIST_COMMENT: comment_obj,
          },
          $inc: { LIST_COMMENT_MAX_NUMBER: 1 },
        },
        { upsert: true }
      );

      return comment_obj;
    } catch (error) {
      throw new Error(`Error creating comment: ${error.message}`);
    }
  };

  getCommentsByUser = async (userId) => {
    try {
      const comments = await Comment.find({ "LIST_COMMENT.USER_ID": userId });
      return comments;
    } catch (error) {
      throw new Error(`Error getting comments by user: ${error.message}`);
    }
  };

  getCommentWithUserInfo = async (page, limit, userId) => {
    try {
      const skips = page ? (page - 1) * limit : 0;
      const cmtWithUserInfo = await Comment.aggregate([
        {
          $unwind: "$LIST_COMMENT",
        },
        {
          $lookup: {
            from: "users",
            localField: "LIST_COMMENT.USER_ID",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            "LIST_COMMENT.CONTENT": 1,
            "LIST_COMMENT.FROM_DATE": 1,
            "user.USERNAME": 1,
            "user.EMAIL": 1,
          },
        },
        {
          $sort: { "LIST_COMMENT.FROM_DATE": -1 },
        },
        {
          $skip: skips,
        },
        {
          $limit: limit,
        },
      ]);
      return cmtWithUserInfo;
    } catch (error) {
      throw new Error(
        `Error getting comments with user info: ${error.message}`
      );
    }
  };

  getCommentsByProduct = async (productId) => {
    try {
      const comments = await Comment.find({ PRODUCT_ID: productId });
      return comments;
    } catch (error) {
      throw new Error(`Error getting comments by product: ${error.message}`);
    }
  };

  updateCommentContent = async (commentId, content) => {
    try {
      const result = await Comment.findOneAndUpdate(
        { "LIST_COMMENT._id": Types.ObjectId(commentId) },
        {
          $set: { "LIST_COMMENT.$.CONTENT": content },
        },
        { new: true }
      );

      if (result) {
        const updatedComment = result.LIST_COMMENT.find(
          (comment) => comment._id.toString() === commentId
        );
        return updatedComment;
      }

      return null;
    } catch (error) {
      throw new Error(`Error updating comment content: ${error.message}`);
    }
  };

  deleteComment = async (commentId, userId) => {
    try {
      const result = await Comment.findOneAndUpdate(
        {
          LIST_COMMENT: {
            $elemMatch: {
              _id: Types.ObjectId(commentId),
              USER_ID: userId,
            },
          },
        },
        {
          $pull: {
            LIST_COMMENT: {
              _id: Types.ObjectId(commentId),
              USER_ID: userId,
            },
          },
          $inc: {
            LIST_COMMENT_MAX_NUMBER: -1,
          },
        },
        { new: true }
      );

      return result;
    } catch (error) {
      throw new Error(`Error deleting comment: ${error.message}`);
    }
  };

  createReply = async (commentId, payload) => {
    try {
      const replies_obj = {
        USER_ID: payload.USER_ID,
        CONTENT: payload.CONTENT,
        ATTACHMENTS: payload.ATTACHMENTS,
        FROM_DATE: Date.now(),
        THRU_DATE: null,
      };

      const result = await Comment.updateOne(
        { "LIST_COMMENT._id": new Types.ObjectId(commentId) },
        { $push: { "LIST_COMMENT.$.REPLIES": replies_obj } }
      );

      return result;
    } catch (error) {
      throw new Error(`Error creating reply: ${error.message}`);
    }
  };
}

module.exports = new COMMENT_SERVICE();
